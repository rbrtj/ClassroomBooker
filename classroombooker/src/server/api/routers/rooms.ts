import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const roomsRouter = createTRPCRouter({
  getRoomsForBuilding: publicProcedure
    .input(z.object({ buildingId: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.room.findMany({
        where: { buildingId: input.buildingId },
        orderBy: { name: "asc" },
      });
    }),
});
