import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { get } from "http";
import { myApplesRouter } from "./myApples"; // This is the missing import line

let schema: z.ZodObject<{
    sellerEmail: z.ZodString;
    phoneModel: z.ZodString;
    capacity: z.ZodString;
    batteryHealth: z.ZodNumber;
    physicalCondition: z.ZodString;
    deviceFailure: z.ZodString;
    price: z.ZodNumber;
}>;
const productToSell = publicProcedure.input((val: unknown) => {
    schema = z.object({
        sellerEmail: z.string().email("Invalid email address"),

        phoneModel: z.string(),
        capacity: z.string(),
        batteryHealth: z.number().min(1, "Battery health must be at least 1").max(100, "Battery health cannot exceed 100"),
        physicalCondition: z.string(),
        deviceFailure: z.string(),

        price: z.number().min(1, "Price must be at least 1"),
    });
    return schema.parse(val);
});

// This is your main application router.
export const appRouter = router({
    // 2. Add your router here under the 'myApples' key
    myApples: myApplesRouter, // 1. Import your new router
    // You can add other routers here as your application grows
    // example: usersRouter,
});

// Export the type of your main router. This is used on the client side.
export type AppRouter = typeof appRouter;
