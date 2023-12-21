import { createTRPCRouter, publicProcedure } from "../trpc";

export const studentGroupRouter = createTRPCRouter({
  getStudentGroups: publicProcedure.query(({ ctx }) => {
    return ctx.db.studentGroup.findMany();
  }),
});
