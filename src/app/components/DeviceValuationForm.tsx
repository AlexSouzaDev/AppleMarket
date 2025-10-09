"use client";

import { useMemo, useState } from 'react';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { MODELS, CONDITIONS, FAILURES, EXTRAS } from '@/constants/models';
import { trpc } from '@/server/client';
import type { ModelId } from '@/types/models';
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
    // Absolute adjustment (can be negative)
    priceAdjAmount: number | '';
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
        priceAdjAmount: 0,
    });
    const [isDirty, setIsDirty] = useState(false);
    const { isSignedIn } = useAuth();

    const selectedModel = MODELS.find(m => m.id === formData.modelId);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIsDirty(true);

        if (name === 'capacity' || name === 'batteryHealth') {
            setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
            return;
        }

        if (name === 'priceAdjAmount') {
            if (value === '') {
                setFormData(prev => ({ ...prev, priceAdjAmount: '' }));
            } else {
                const n = Number.parseInt(value, 10);
                if (!Number.isNaN(n)) {
                    setFormData(prev => ({ ...prev, priceAdjAmount: Math.trunc(n) }));
                }
            }
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value as any }));
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

    // Base estimate (no manual adjustments)
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

        return Math.max(0, Math.round(price));
    }, [formData]);

    // Final = base + manual adjustment
    const adjustedEstimated = useMemo(() => {
        const base = Number(computedEstimated || 0);
        if (!base) return 0;
        const adj = formData.priceAdjAmount === '' ? 0 : Math.trunc(Number(formData.priceAdjAmount || 0));
        return Math.max(0, Math.round(base + adj));
    }, [computedEstimated, formData.priceAdjAmount]);

    const utils = trpc.useContext();
    const saveMutation = trpc.myApples.saveDevice.useMutation({
        onSuccess: () => {
            utils.myApples.getDevices.invalidate();
            setFormData(prev => ({
                ...prev,
                // keep model selection for quicker multiple saves
                capacity: '',
                color: '',
                failures: [],
                extras: [],
                batteryHealth: 100,
                notes: '',
                priceAdjAmount: 0,
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
            estimatedPrice: adjustedEstimated, // final adjusted value
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

            {/* Notes + Manual Price Adjustment */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white text-black p-4">
                <label className={`${dmSerifText.className} block text-sm text-black mb-2`}>
                    Notes
                </label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any remarks (e.g., tiny scratch on frame, includes MagSafe case)…"
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white text-black placeholder-black/60 caret-black p-3 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400"
                />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <label className="text-xs text-black/60">Price adjustment (absolute):</label>
                    <div className="flex items-center gap-2">
                        <span className="text-black/40 text-sm">€</span>
                        <input
                            type="number"
                            name="priceAdjAmount"
                            step={1}
                            value={formData.priceAdjAmount}
                            onChange={handleChange}
                            className="h-9 w-32 rounded-full border border-black/15 bg-white/90 px-3 text-sm"
                            placeholder="0"
                        />
                        <span className="text-xs text-black/50">(use negative to decrease)</span>
                    </div>

                    <div className="ml-auto text-sm">
                        <span className="text-black/50">Base:</span>
                        <span className="ml-1 text-black font-semibold">€{Number(computedEstimated || 0).toFixed(0)}</span>
                        <span className="mx-2 text-black/30">→</span>
                        <span className="text-black/50">Final:</span>
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