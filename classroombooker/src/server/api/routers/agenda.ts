import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const agendaRouter = createTRPCRouter({
  getAgenda: publicProcedure
    .input(z.object({ roomId: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.lecture.findMany({
        where: { roomId: input.roomId },
      });
    }),
});
