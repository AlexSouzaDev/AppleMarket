// src/server/routers/myApples.ts
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const myApplesRouter = router({
    saveDevice: protectedProcedure
        .input(z.object({
            modelId: z.string(),
            capacity: z.number(),
            color: z.string(),
            condition: z.string(),
            failures: z.array(z.string()),
            extras: z.array(z.string()),
            batteryHealth: z.number(),
            estimatedPrice: z.number(),
            notes: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            // Temporary cast to work around Prisma type generation desync
            const prisma = ctx.prisma as any;
            return prisma.myApples.create({
                data: {
                    userId: ctx.auth.userId,
                    ...input,
                },
            });
        }),

    getDevices: protectedProcedure
        .query(async ({ ctx }) => {
            const prisma = ctx.prisma as any;
            return prisma.myApples.findMany({
                where: {
                    userId: ctx.auth.userId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }),

    deleteDevice: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const prisma = ctx.prisma as any;
            return prisma.myApples.deleteMany({
                where: {
                    id: input.id,
                    userId: ctx.auth.userId,
                },
            });
        }),

    updateNote: protectedProcedure
        .input(z.object({ id: z.number(), notes: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const prisma = ctx.prisma as any;
            return prisma.myApples.updateMany({
                where: {
                    id: input.id,
                    userId: ctx.auth.userId,
                },
                data: {
                    notes: input.notes,
                },
            });
        }),
});