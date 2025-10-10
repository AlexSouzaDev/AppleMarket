import Image from 'next/image';
import Link from 'next/link';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                        <Image src="/next.svg" alt="Logo" width={40} height={40} />
                        <span className="text-xl font-semibold tracking-tight text-black font-sans">
                            Apple Vault
                        </span>
                    </Link>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8 items-center">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-black font-medium transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-black font-medium transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/myApples" className="text-gray-600 hover:text-black font-medium transition-colors">
                                    myApples
                                </Link>
                            </li>
                            <li>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <span className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 transition-colors cursor-pointer">Sign in</span>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}