import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getTeachers: publicProcedure.query(({ ctx }) => {
    return ctx.db.teacher.findMany();
  }),
});
