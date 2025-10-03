import { DM_Serif_Text } from "next/font/google";
import Header from "../components/Header";

const dmSerifText = DM_Serif_Text({ subsets: ["latin"], weight: ["400"], display: "swap" });

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <h1 className={`${dmSerifText.className} text-4xl md:text-5xl font-black mb-8`}>
                    About Apple Market
                </h1>
                <div className={`${dmSerifText.className} prose prose-invert max-w-3xl`}>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Welcome to Apple Market, your premier destination for buying and selling Apple products.
                        We provide a seamless platform for users to get the best value for their devices.
                    </p>
                    <p className="text-xl text-gray-300 leading-relaxed mt-6">
                        Our mission is to create a trusted marketplace where Apple enthusiasts can safely
                        trade their devices while getting the best possible market rates.
                    </p>
                </div>
            </main>
        </div>
    );
}