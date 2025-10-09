import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers";
import { createContext } from "@/server/trpc";

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => createContext({ req } as any),
        onError({ error, path, type }) {
            console.error("tRPC error:", { path, type, message: error.message, code: error.code, cause: (error as any).cause });
        },
    });

export { handler as GET, handler as POST };