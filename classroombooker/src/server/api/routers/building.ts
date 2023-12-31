import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const buildingRouter = createTRPCRouter({
  getBuildings: publicProcedure.query(({ ctx }) => {
    return ctx.db.building.findMany();
  }),
});
