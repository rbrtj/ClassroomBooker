import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  getDepartments: publicProcedure.query(({ ctx }) => {
    return ctx.db.building.findMany();
  }),
});
