import { prisma } from '@/lib/prisma';

export function createContext(opts: any) {
    return {
        prisma,
        auth: opts.auth, // your Clerk auth
    };
}