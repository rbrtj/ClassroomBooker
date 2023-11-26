import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { buildingRouter } from "./routers/building";
import { roomsRouter } from "./routers/rooms";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  building: buildingRouter,
  rooms: roomsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
