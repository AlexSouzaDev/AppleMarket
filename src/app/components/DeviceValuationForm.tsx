"use client";

import { useEffect, useMemo, useState } from 'react';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { MODELS, CONDITIONS, FAILURES, EXTRAS } from '@/constants/models';
import { trpc } from '@/server/client';
import type { ModelId, ModelOption } from '@/types/models';
import { DM_Serif_Text } from "next/font/google";

const dmSerifText = DM_Serif_Text({ subsets: ["latin"], weight: ["400"], display: "swap" });

// Define the structure for our form's data
interface FormData {
    modelId: ModelId | '';
    capacity: number | '';
    color: string;
    condition: string;
    failures: string[];
    extras: string[];
    batteryHealth: number; // 70-100
    notes: string;
    // NEW:
    priceAdjType: 'none' | 'increase' | 'decrease';
    priceAdjValue: number; // percentage (0-100)
}

export default function DeviceValuationForm() {
    const [formData, setFormData] = useState<FormData>({
        modelId: '',
        capacity: '',
        color: '',
        condition: 'excellent',
        failures: [],
        extras: [],
        batteryHealth: 100,
        notes: '',
        // NEW defaults:
        priceAdjType: 'none',
        priceAdjValue: 0,
    });
    const [isDirty, setIsDirty] = useState(false);
    const { isSignedIn } = useAuth();

    const selectedModel = MODELS.find(m => m.id === formData.modelId);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIsDirty(true);
        if (name === 'capacity' || name === 'batteryHealth' || name === 'priceAdjValue') {
            setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value as any }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setIsDirty(true);
        setFormData(prev => {
            const currentValues = prev[name as keyof FormData] as string[];
            if (checked) {
                return { ...prev, [name]: [...currentValues, value] };
            } else {
                return { ...prev, [name]: currentValues.filter(item => item !== value) };
            }
        });
    };

    const calculateBatteryFactor = (health: number): number => {
        if (health >= 90) return 1.00;
        if (health >= 80) return 0.94;
        return 0.85;
    };

    const computedEstimated = useMemo(() => {
        if (!formData.modelId || !formData.capacity) return null;

        const model = MODELS.find(m => m.id === formData.modelId);
        if (!model) return null;

        const selectedCapacity = model.capacities.find(c => c === formData.capacity);
        if (!selectedCapacity) return null;

        let price = model.basePrice + selectedCapacity * 2;

        const batteryFactor = calculateBatteryFactor(formData.batteryHealth);
        const conditionFactor = CONDITIONS.find(c => c.id === formData.condition)?.factor ?? 1;
        price = price * batteryFactor * conditionFactor;

        const totalPenalty = formData.failures.reduce((sum, id) => sum + (FAILURES.find(f => f.id === id)?.penalty ?? 0), 0);
        price = price * Math.max(0, 1 - totalPenalty);

        const totalBonus = formData.extras.reduce((sum, id) => sum + (EXTRAS.find(e => e.id === id)?.bonus ?? 0), 0);
        price = price * (1 + totalBonus);

        // Apply price adjustment
        if (formData.priceAdjType === 'increase') {
            price *= (1 + formData.priceAdjValue / 100);
        } else if (formData.priceAdjType === 'decrease') {
            price *= (1 - formData.priceAdjValue / 100);
        }

        return Math.max(0, Math.round(price));
    }, [formData]);

    const adjustedEstimated = useMemo(() => {
        const base = Number(computedEstimated || 0);
        if (!base) return 0;
        const v = Number(formData.priceAdjValue || 0);
        if (!v || formData.priceAdjType === 'none') return Math.round(base);
        const delta = (base * v) / 100;
        const result = formData.priceAdjType === 'increase' ? base + delta : base - delta;
        return Math.max(0, Math.round(result));
    }, [computedEstimated, formData.priceAdjType, formData.priceAdjValue]);

    const utils = trpc.useUtils?.() as any;
    const saveMutation = trpc.myApples.saveDevice.useMutation({
        onSuccess: () => {
            // Invalidate list so MyApples page refreshes
            utils?.myApples?.getDevices?.invalidate();
            setFormData(prev => ({
                ...prev,
                // keep model selection for quicker multiple saves
                capacity: '',
                color: '',
                failures: [],
                extras: [],
                batteryHealth: 100,
                notes: '',
                // Reset price adjustment
                priceAdjType: 'none',
                priceAdjValue: 0,
            }));
            setIsDirty(false);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) return;
        if (!computedEstimated || !formData.modelId || !formData.capacity || !formData.color) return;
        saveMutation.mutate({
            modelId: formData.modelId,
            capacity: formData.capacity as number,
            color: formData.color,
            condition: formData.condition,
            failures: formData.failures,
            extras: formData.extras,
            batteryHealth: formData.batteryHealth,
            notes: formData.notes,
            estimatedPrice: adjustedEstimated, // use adjusted value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 bg-gray-100 text-black rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-center">Estimate Your Device's Value</h2>

            {/* Device Selection */}
            <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="modelId" className="block font-medium">Model</label>
                    <select name="modelId" id="modelId" value={formData.modelId} onChange={handleChange} required className="w-full p-2 border rounded">
                        <option value="" disabled>Select a Model</option>
                        {MODELS.map(model => (
                            <option key={model.id} value={model.id}>{model.displayName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="capacity" className="block font-medium">Capacity</label>
                    <select name="capacity" id="capacity" value={formData.capacity} onChange={handleChange} disabled={!selectedModel} required className="w-full p-2 border rounded disabled:bg-gray-200">
                        <option value="" disabled>Select Capacity</option>
                        {selectedModel?.capacities.map(cap => (
                            <option key={cap} value={cap}>{cap >= 1000 ? `${cap / 1000} TB` : `${cap} GB`}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="color" className="block font-medium">Color</label>
                    <select name="color" id="color" value={formData.color} onChange={handleChange} disabled={!selectedModel} required className="w-full p-2 border rounded disabled:bg-gray-200">
                        <option value="" disabled>Select Color</option>
                        {selectedModel?.colors.map(col => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {/* Condition */}
            <div>
                <label htmlFor="condition" className="block font-medium">Physical Condition</label>
                <select name="condition" id="condition" value={formData.condition} onChange={handleChange} required className="w-full p-2 border rounded">
                    {CONDITIONS.map(cond => (
                        <option key={cond.id} value={cond.id}>{cond.label}</option>
                    ))}
                </select>
            </div>

            {/* Battery Health */}
            <div>
                <label htmlFor="batteryHealth" className="block font-medium">Battery Health: {formData.batteryHealth}%</label>
                <input
                    type="range"
                    id="batteryHealth"
                    name="batteryHealth"
                    min={70}
                    max={100}
                    step={1}
                    value={formData.batteryHealth}
                    onChange={handleChange}
                    className="w-full"
                />
            </div>

            {/* Failures */}
            <div>
                <label className="block font-medium">Functional Failures (select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {FAILURES.map(fail => (
                        <label key={fail.id} className="flex items-center space-x-2 p-2 border rounded bg-white">
                            <input type="checkbox" name="failures" value={fail.id} onChange={handleCheckboxChange} />
                            <span>{fail.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Extras */}
            <div>
                <label className="block font-medium">Optional Extras (select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {EXTRAS.map(extra => (
                        <label key={extra.id} className="flex items-center space-x-2 p-2 border rounded bg-white">
                            <input type="checkbox" name="extras" value={extra.id} onChange={handleCheckboxChange} />
                            <span>{extra.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Adjustment */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
                <label className={`${dmSerifText.className} block text-sm text-white/80 mb-2`}>
                    Notes
                </label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any remarks (e.g., tiny scratch on frame, includes MagSafe case)…"
                    className="w-full resize-none rounded-xl border border-white/15 bg-black/30 p-3 text-sm outline-none focus:ring-2 focus:ring-white/20"
                />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <label className="text-xs text-white/60">Affect price:</label>
                    <select
                        name="priceAdjType"
                        value={formData.priceAdjType}
                        onChange={handleChange}
                        className="h-9 rounded-full border border-white/15 bg-black/30 px-3 text-sm"
                    >
                        <option value="none">No adjustment</option>
                        <option value="increase">Increase</option>
                        <option value="decrease">Decrease</option>
                    </select>
                    <input
                        type="number"
                        name="priceAdjValue"
                        min={0}
                        max={100}
                        step={1}
                        value={formData.priceAdjValue}
                        onChange={handleChange}
                        className="h-9 w-24 rounded-full border border-white/15 bg-black/30 px-3 text-sm"
                        placeholder="0"
                    />
                    <span className="text-sm text-white/60">%</span>

                    <div className="ml-auto text-sm">
                        <span className="text-white/50">Base:</span>
                        <span className="ml-1 text-white font-semibold">€{Number(computedEstimated || 0).toFixed(0)}</span>
                        <span className="mx-2 text-white/30">→</span>
                        <span className="text-white/50">Final:</span>
                        <span className="ml-1 text-emerald-300 font-semibold">€{adjustedEstimated}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="text-center">
                    <p className="text-lg text-gray-600 mb-2">Estimated Value</p>
                    <p className={`${dmSerifText.className} text-4xl text-black`} aria-live="polite">
                        {!isSignedIn
                            ? (isDirty ? '???' : '€0.00')
                            : (computedEstimated !== null ? `€${computedEstimated.toFixed(0)}` : '€0.00')}
                    </p>
                    {!isSignedIn && isDirty && (
                        <p className="text-sm text-gray-500 mt-1">Sign in to view your live estimate.</p>
                    )}
                    {saveMutation.isSuccess && (
                        <p className="text-sm text-green-600 mt-2">Saved to MyApples.</p>
                    )}
                    {saveMutation.isError && (
                        <p className="text-sm text-red-600 mt-2">Error saving. Try again.</p>
                    )}
                </div>

                {!isSignedIn ? (
                    <SignInButton mode="modal">
                        <button
                            type="button"
                            className="w-full mt-6 bg-black text-white rounded-full py-3 px-6 hover:bg-black/90 transition"
                        >
                            Sign in to Save
                        </button>
                    </SignInButton>
                ) : (
                    <button
                        type="submit"
                        disabled={saveMutation.status === 'pending'}
                        className="w-full mt-6 bg-black text-white rounded-full py-3 px-6 hover:bg-black/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saveMutation.status === 'pending' ? 'Saving...' : 'Save to MyApples'}
                    </button>
                )}
            </div>
        </form>
    );
}