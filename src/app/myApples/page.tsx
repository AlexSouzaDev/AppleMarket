"use client";
// Import useUser instead of useAuth
import { useUser } from "@clerk/nextjs";
import { trpc } from "../../server/client";

import Header from "../components/Header";
import React from "react";

import ProductList from "../components/ProductList";
import { DM_Serif_Text } from "next/font/google";

const dmSerifText = DM_Serif_Text({ subsets: ["latin"], weight: ["400"], display: "swap" });

export default function Store() {

    // Use the useUser hook to get the user object and the signed-in status
    const { user, isSignedIn } = useUser();
    // The query will only run if the user is signed in
    const { data: devices, isLoading } = trpc.myApples.getDevices.useQuery(undefined, {
        enabled: isSignedIn,
    });

    if (isLoading && isSignedIn) {
        return <div>Loading your saved devices...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <h1 className={`${dmSerifText.className} text-4xl md:text-5xl font-black mb-8`}>
                    My Saved Apples
                </h1>
                {isSignedIn ? (
                    <>
                        <h2 className={`${dmSerifText.className} text-2xl md:text-3xl font-bold mb-4`}>
                            Welcome, {user?.firstName || user?.primaryEmailAddress?.emailAddress}
                        </h2>
                        <div className={`${dmSerifText.className} prose prose-invert max-w-none`}>
                            {/* You would replace ProductList with your DeviceCard component here */}
                            {/* <ProductList products={devices} /> */}
                            <p>You have {devices?.length || 0} devices saved.</p>
                        </div>
                    </>
                ) : (
                    <p>Please sign in to see your saved devices.</p>
                )}
            </main>
        </div>
    );
}