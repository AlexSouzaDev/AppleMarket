import Image from "next/image";
import { DM_Serif_Text } from "next/font/google";
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Header from './components/Header';
import DeviceValuationForm from './components/DeviceValuationForm';
import ClientOnly from './components/ClientOnly';
import products from './products.json';

export const dynamic = "force-dynamic";

const dmSerifText = DM_Serif_Text({ subsets: ["latin"], weight: ["400"], display: "swap" });

export default function Home() {
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <div className="font-sans min-h-screen bg-black text-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-black overflow-visible">
          <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20 pb-8 md:pb-10">
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                {/* Left: headline and actions */}
                <div className="max-w-5xl">
                  <h1 className={`${dmSerifText.className} text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8 text-white`}>
                    a brand new apple always sounds good.
                  </h1>
                  <p className={`${dmSerifText.className} text-2xl md:text-3xl text-white/70 leading-relaxed tracking-normal max-w-2xl mb-10`}>
                    get maximum value for your iPhone with an instant, no-hassle quote.
                  </p>
                  <div className="flex items-center gap-4">
                    {hasClerk ? (
                      <ClientOnly>
                        <SignInButton mode="modal">
                          <span className={`${dmSerifText.className} inline-flex items-center rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition`}>
                            Get started
                          </span>
                        </SignInButton>
                      </ClientOnly>
                    ) : null}
                    <a href="#learn" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                      See pricing
                    </a>
                  </div>
                </div>
              </div>
              {/* Oversized floating image */}
              <div className="pointer-events-none absolute top-1/2 right-[-14%] md:right-[-18%] lg:right-[-22%] -translate-y-1/2">
                <div className="relative aspect-[4/5] w-[520px] sm:w-[600px] md:w-[760px] lg:w-[900px] xl:w-[1020px]">
                  <Image
                    src="/iphone-hero.png"
                    alt="Green iPhone product shot"
                    fill
                    priority
                    sizes="(min-width:1536px) 900px, (min-width:1280px) 820px, (min-width:1024px) 760px, 600px"
                    className="object-contain drop-shadow-[0_60px_110px_rgba(0,0,0,0.75)]"
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
              <h2 className={`${dmSerifText.className} text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-8 text-black`}>
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
          {hasClerk ? (
            <ClientOnly>
              <>
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
              </>
            </ClientOnly>
          ) : null}
        </section>
      </main>
    </div>
  );
}
