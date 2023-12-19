import { createTRPCRouter } from "~/server/api/trpc";
import { buildingRouter } from "./routers/building";
import { roomsRouter } from "./routers/rooms";
import { lecturesRouter } from "./routers/lectures";
import { teacherRouter } from "./routers/teacher";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  building: buildingRouter,
  rooms: roomsRouter,
  lectures: lecturesRouter,
  teacher: teacherRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
