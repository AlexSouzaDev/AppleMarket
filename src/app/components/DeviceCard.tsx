"use client";

import { useAuth } from '@clerk/nextjs';
import { trpc } from '@/server/client'; // Corrected import path
import { useEffect, useState } from 'react';

// Define the type for a single device based on your database schema
type Device = {
    id: number;
    modelId: string;
    capacity: number;
    color: string;
    condition: string;
    failures: unknown;
    extras: unknown;
    batteryHealth: number;
    estimatedPrice: number;
    notes: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    userId: string;
};

// --- Create the DeviceCard Component ---
const DeviceCard = ({ device, onDelete, onUpdateNote }: { device: Device, onDelete: (id: number) => void, onUpdateNote: (id: number, note: string) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState(device.notes || '');

    const handleSaveNote = () => {
        onUpdateNote(device.id, note);
        setIsEditing(false);
    };

    return (
        <div className="border rounded-lg p-4 shadow-md bg-white text-black">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold">{device.modelId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - {device.capacity}GB</h3>
                    <p className="text-2xl font-mono">€{device.estimatedPrice.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Saved on: {new Date(device.createdAt).toLocaleDateString()}</p>
                </div>
                <button onClick={() => onDelete(device.id)} className="text-red-500 hover:text-red-700 font-semibold">
                    Delete
                </button>
            </div>
            <div className="mt-4">
                {isEditing ? (
                    <div>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Add a note..."
                        />
                        <button onClick={handleSaveNote} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">
                            Save Note
                        </button>
                    </div>
                ) : (
                    <div onClick={() => setIsEditing(true)} className="cursor-pointer">
                        <p className="text-sm text-gray-700">{device.notes || 'Click to add a note...'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Page Component ---
export default function MyApplesPage() {
    const { isSignedIn } = useAuth();
    const { data: devices = [], refetch } = trpc.myApples.getDevices.useQuery<Device[]>();

    if (!isSignedIn) {
        return <div>Sign in to view this page.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">My Apples</h1>
            <div className="mt-4">
                {devices.map(device => (
                    <DeviceCard
                        key={device.id}
                        device={device}
                        // These handlers should ideally call tRPC mutations and then refetch
                        onDelete={(id) => {
                            // placeholder: you likely have a trpc.myApples.deleteDevice.useMutation()
                            // after success: refetch();
                        }}
                        onUpdateNote={(id, note) => {
                            // placeholder: call trpc.myApples.updateNote.useMutation()
                            // after success: refetch();
                        }}
                    />
                ))}
            </div>
        </div>
    );
}