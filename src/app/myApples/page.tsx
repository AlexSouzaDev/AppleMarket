"use client";
export const dynamic = "force-dynamic";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import { trpc } from "../../server/client";
import { DM_Serif_Text } from "next/font/google";

const headingFont = DM_Serif_Text({ subsets: ["latin"], weight: ["400"], display: "swap" });

// Helper colors
const ringColor = (pct: number) => {
    if (pct >= 90) return "#34d399";   // green-400
    if (pct >= 80) return "#fbbf24";   // yellow-400
    if (pct >= 70) return "#f97316";   // orange-500
    return "#ef4444";                  // red-500
};

const batteryBgClasses = (pct: number) => {
    if (pct >= 90) return "from-green-400 to-green-500";
    if (pct >= 80) return "from-yellow-400 to-yellow-500";
    if (pct >= 70) return "from-orange-400 to-orange-500";
    return "from-red-500 to-red-600";
};

export default function Store() {
    const { user, isSignedIn } = useUser();

    // tRPC utils (use trpc.useContext() if your version lacks useUtils)
    const utils = trpc.useUtils();

    type Device = {
        id: number; modelId: string; capacity: number; color: string; condition: string; failures: unknown; extras: unknown; batteryHealth: number; estimatedPrice: number; notes: string | null; createdAt: string | Date; updatedAt: string | Date;
    };

    const { data: devices = [], isLoading, error } = trpc.myApples.getDevices.useQuery<Device[]>(undefined, {
        enabled: !!isSignedIn,
    });

    const deleteMutation = trpc.myApples.deleteDevice.useMutation({
        onSuccess: () => utils.myApples.getDevices.invalidate()
    });

    const noteMutation = trpc.myApples.updateNote.useMutation({
        onSuccess: () => utils.myApples.getDevices.invalidate()
    });

    const handleDelete = (id: number) => {
        if (!confirm("Delete this device?")) return;
        deleteMutation.mutate({ id });
    };

    const handleNoteSave = (id: number, notes: string) => {
        noteMutation.mutate({ id, notes });
    };

    // Local UI state
    const [search, setSearch] = React.useState("");
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [noteDraft, setNoteDraft] = React.useState("");

    const filtered = React.useMemo<Device[]>(() => {
        if (!search.trim()) return devices;
        const q = search.toLowerCase();
        return devices.filter((d: Device) => {
            const model = (d.modelId || "").toLowerCase();
            const cap = String(d.capacity || "");
            const color = (d.color || "").toLowerCase();
            const notes = (d.notes || "").toLowerCase();
            return model.includes(q) || cap.includes(q) || color.includes(q) || notes.includes(q);
        });
    }, [devices, search]);

    const startEdit = (id: number, current: string | null) => {
        setEditingId(id);
        setNoteDraft(current || "");
    };

    const commitNote = () => {
        if (editingId == null) return;
        handleNoteSave(editingId, noteDraft.trim());
        setEditingId(null);
        setNoteDraft("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNoteDraft("");
    };

    const formatModel = (id: string) =>
        id.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Header />
                <main className="mx-auto max-w-4xl px-6 pt-20">
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-10 text-center backdrop-blur-xl">
                        <p className="text-sm text-white/60">Please sign in to see your saved devices.</p>
                    </div>
                </main>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Header />
                <main className="mx-auto max-w-4xl px-6 pt-24">
                    <p className="text-sm text-white/50">Loading your saved devices...</p>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Header />
                <main className="mx-auto max-w-4xl px-6 pt-24">
                    <p className="text-sm text-red-400">Failed to load devices.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-24">
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className={`${headingFont.className} text-4xl md:text-5xl font-black tracking-tight`}>
                            My Devices
                        </h1>
                        <p className="mt-2 text-sm text-white/50">
                            A lightweight inventory of every iPhone you've valued.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="h-10 w-56 rounded-full bg-white/5 border border-white/10 px-4 pl-9 text-sm placeholder-white/40 outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-md"
                            />
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">
                                ⌕
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex flex-wrap items-center gap-4">
                    <div className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs text-white/70 backdrop-blur-sm">
                        Total: {devices.length}
                    </div>
                    {search && (
                        <div className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs text-white/70 backdrop-blur-sm">
                            Filtered: {filtered.length}
                        </div>
                    )}
                    <div className="ml-auto text-sm text-white/40">
                        {user?.firstName || user?.primaryEmailAddress?.emailAddress}
                    </div>
                </div>

                <div className="grid gap-4">
                    {filtered.map((d: Device) => {
                        const isEditing = editingId === d.id;
                        const prog = Math.min(100, Math.max(0, d.batteryHealth ?? 0));
                        const ringStyle: React.CSSProperties = {
                            background: `conic-gradient(${ringColor(prog)} ${prog}%, rgba(255,255,255,0.08) ${prog}% 100%)`
                        };
                        return (
                            <div
                                key={d.id}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-xl transition hover:border-white/20 hover:from-white/20"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="relative">
                                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${batteryBgClasses(prog)} p-[2px]`}>
                                            <div className="h-full w-full rounded-[1rem] bg-black/60 backdrop-blur-sm flex items-center justify-center text-[10px] font-semibold tracking-wide text-white/80">
                                                {d.capacity}GB
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/40">
                                            {d.color}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
                                            <h3 className="text-base font-semibold leading-tight tracking-tight">
                                                {formatModel(d.modelId || "Unknown Model")}
                                            </h3>
                                            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-white/50 border border-white/10">
                                                {d.condition}
                                            </span>
                                            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50 border border-white/10">
                                                Battery {prog}%
                                            </span>
                                            <span className="rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 text-[10px]">
                                                €{d.estimatedPrice}
                                            </span>
                                        </div>

                                        {!isEditing && (
                                            <p className="mt-2 line-clamp-2 text-sm text-white/50">
                                                {d.notes?.length ? d.notes : <span className="italic text-white/30">No notes</span>}
                                            </p>
                                        )}

                                        {isEditing && (
                                            <div className="mt-3 space-y-3">
                                                <textarea
                                                    value={noteDraft}
                                                    onChange={e => setNoteDraft(e.target.value)}
                                                    rows={3}
                                                    className="w-full resize-none rounded-xl border border-white/15 bg-black/40 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                                                    placeholder="Add note (e.g. minor scratch near lens)"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={commitNote}
                                                        disabled={noteMutation.status === 'pending'}
                                                        className="rounded-full bg-white text-black px-4 py-1.5 text-xs font-medium hover:bg-white/90 disabled:opacity-50"
                                                    >
                                                        {noteMutation.status === 'pending' ? "Saving…" : "Save"}
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 flex flex-wrap gap-3 text-xs">
                                            {!isEditing && (
                                                <button
                                                    onClick={() => startEdit(d.id, d.notes)}
                                                    className="rounded-full border border-white/15 bg-white/5 px-4 py-1 font-medium text-white/70 hover:bg-white/10 hover:text-white"
                                                >
                                                    Edit Note
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(d.id)}
                                                disabled={deleteMutation.status === 'pending'}
                                                className="rounded-full bg-red-500/80 px-4 py-1 font-medium text-white hover:bg-red-500 disabled:opacity-50"
                                            >
                                                {deleteMutation.status === 'pending' ? "..." : "Delete"}
                                            </button>
                                            <span className="ml-auto self-center text-[10px] text-white/30">
                                                {d.createdAt ? new Date(d.createdAt as any).toLocaleDateString() : ""}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className="hidden sm:flex h-16 w-16 rounded-full items-center justify-center border border-white/10 bg-black/40"
                                        style={ringStyle}
                                    >
                                        <span className="text-xs font-semibold text-white/70">{prog}%</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filtered.length === 0 && (
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-white/40 backdrop-blur-md">
                            {devices.length > 0
                                ? "No matches for your search."
                                : "No devices saved yet. Use the valuation form to add one."}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}