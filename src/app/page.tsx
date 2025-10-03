import Image from "next/image";
import { DM_Serif_Text, Alumni_Sans_SC } from "next/font/google";
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Header from './components/Header';
import DeviceValuationForm from './components/DeviceValuationForm';
import ClientOnly from './components/ClientOnly';
import products from './products.json';

const pageAlumni = Alumni_Sans_SC({ subsets: ["latin"], weight: ["800"], display: "swap" });
const dmSerifText = DM_Serif_Text({ subsets: ["latin"], weight: ["400"], display: "swap" });

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-black text-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-black overflow-visible">
          <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20 pb-8 md:pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left: headline and actions */}
              <div className="max-w-5xl">
                <h1 className={`${pageAlumni.className} text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8 text-white`}>
                  a brand new apple always sounds good.
                </h1>
                <p className={`${dmSerifText.className} text-2xl md:text-3xl text-white/70 leading-relaxed tracking-normal max-w-2xl mb-10`}>
                  get maximum value for your iPhone with an instant, no-hassle quote.
                </p>
                <div className="flex items-center gap-4">
                  <SignInButton mode="modal">
                    <span className={`${dmSerifText.className} inline-flex items-center rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition`}>
                      Get started
                    </span>
                  </SignInButton>
                  <a href="#learn" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                    See pricing
                  </a>
                </div>
              </div>

              {/* Right: hero image */}
              <div className="relative w-full md:justify-self-end md:-mr-24 lg:-mr-40">
                <div className="relative w-full max-w-[640px] lg:max-w-[760px] xl:max-w-[880px] aspect-[4/5] mx-auto md:mx-0 md:translate-x-10 lg:translate-x-16 scale-[1.18] md:scale-[1.32] lg:scale-[1.38] origin-center pointer-events-none">
                  <Image
                    src="/iphone-hero.png"
                    alt="Green iPhone product shot"
                    fill
                    priority
                    sizes="(min-width:1280px) 50vw, (min-width:1024px) 55vw, (min-width:768px) 50vw, 90vw"
                    className="object-contain drop-shadow-[0_50px_80px_rgba(0,0,0,0.7)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Device Valuation Section */}
        <section className="relative overflow-hidden bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className={`${pageAlumni.className} text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-8 text-black`}>
                what's your apple worth?
              </h2>
              <p className={`${dmSerifText.className} text-xl md:text-2xl text-black/70 leading-relaxed tracking-normal max-w-2xl mx-auto`}>
                get an instant valuation for your Apple device using our advanced pricing algorithm
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <DeviceValuationForm />
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Preview Section */}
        <section id="learn" className="mx-auto max-w-7xl px-6 py-20">
          <h2 className={`${dmSerifText.className} text-4xl md:text-5xl font-black tracking-tight mb-8`}>
            stay always ready to a upgrade.
          </h2>
          <SignedOut>
            <p className={`${dmSerifText.className} text-gray-400 mb-8`}>
              Sign in to evaluate your phone and see current market data.
            </p>
            <SignInButton mode="modal">
              <span className={`${dmSerifText.className} inline-flex items-center rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition`}>
                Sign in to continue
              </span>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {/* Add marketplace preview content here */}
          </SignedIn>
        </section>
      </main>
    </div>
  );
}
