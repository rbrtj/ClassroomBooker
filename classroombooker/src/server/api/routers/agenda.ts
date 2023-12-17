import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const lecturesRouter = createTRPCRouter({
  getLectures: publicProcedure
    .input(z.object({ roomId: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.lecture.findMany({
        where: { roomId: input.roomId },
      });
    }),
  deleteLecture: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.lecture.delete({
        where: { id: input.id },
      });
    }),
});
