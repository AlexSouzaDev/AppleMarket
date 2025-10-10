import { DM_Serif_Text } from "next/font/google";
import Header from "../components/Header";

const dmSerifText = DM_Serif_Text({ subsets: ["latin"], weight: ["400"], display: "swap" });

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <h1 className={`${dmSerifText.className} text-4xl md:text-5xl font-black mb-8`}>
                    About Apple Vault
                </h1>
                <div className={`${dmSerifText.className} prose prose-invert max-w-3xl`}>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Apple Vault is a web app where users can vault their iOS phones, instantly understand
                        their current market value, and prepare to resell at a fair price.
                    </p>
                    <p className="text-xl text-gray-300 leading-relaxed mt-6">
                        Add your device to your personal vault, track condition and details, and generate a
                        transparent price estimate—so you can list confidently when it’s time to sell.
                    </p>
                </div>
            </main>
        </div>
    );
}