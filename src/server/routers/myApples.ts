// src/server/routers/myApples.ts
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';

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
            const prisma = ctx.prisma as any;
            try {
                const result = await prisma.myApples.create({
                    data: {
                        userId: ctx.auth.userId,
                        ...input,
                    },
                });
                return result;
            } catch (err: any) {
                console.error('saveDevice error', { errMessage: err?.message, errCode: err?.code, errMeta: err?.meta });
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to save device', cause: err });
            }
        }),

    getDevices: protectedProcedure
        .query(async ({ ctx }) => {
            const prisma = ctx.prisma as any;
            try {
                return await prisma.myApples.findMany({
                    where: {
                        userId: ctx.auth.userId,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
            } catch (err: any) {
                console.error('getDevices error', { errMessage: err?.message, errCode: err?.code });
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to load devices', cause: err });
            }
        }),

    deleteDevice: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const prisma = ctx.prisma as any;
            try {
                return await prisma.myApples.deleteMany({
                    where: {
                        id: input.id,
                        userId: ctx.auth.userId,
                    },
                });
            } catch (err: any) {
                console.error('deleteDevice error', { errMessage: err?.message, errCode: err?.code });
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to delete device', cause: err });
            }
        }),

    updateNote: protectedProcedure
        .input(z.object({ id: z.number(), notes: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const prisma = ctx.prisma as any;
            try {
                return await prisma.myApples.updateMany({
                    where: {
                        id: input.id,
                        userId: ctx.auth.userId,
                    },
                    data: {
                        notes: input.notes,
                    },
                });
            } catch (err: any) {
                console.error('updateNote error', { errMessage: err?.message, errCode: err?.code });
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update note', cause: err });
            }
        }),
});