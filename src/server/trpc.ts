import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { prisma } from '@/lib/prisma';

export type Context = {
    auth: Awaited<ReturnType<typeof auth>>;
    prisma: typeof prisma;
};

export const createContext = async (_opts?: FetchCreateContextFnOptions): Promise<Context> => {
    // In Next.js App Router route handlers, auth() reads from cookies/headers
    const session = await auth();
    return {
        auth: session,
        prisma,
    };
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.auth?.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    // This is the corrected part
    return next({
        ctx: {
            // Pass the original context which includes prisma
            ...ctx,
            // And infer the auth and userId as non-nullable
            auth: ctx.auth,
            userId: ctx.auth.userId,
        },
    });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
