import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { doTimesOverlap } from "~/utils/DoTimesOverlap";
import { TRPCError } from "@trpc/server";

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
  addLecture: publicProcedure
    .input(
      z.object({
        name: z.string(),
        roomId: z.number(),
        teacherId: z.number(),
        dayOfWeek: z.enum([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ]),
        evenWeek: z.boolean(),
        type: z.enum(["lecture", "seminar", "other", "practice"]),
        startTime: z.string(),
        endTime: z.string(),
        studentGroup: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const schedule = await ctx.db.lecture.findMany({
        where: {
          roomId: input.roomId,
          dayOfWeek: input.dayOfWeek,
          evenWeek: input.evenWeek,
        },
      });
      const isOverlapping = schedule.some((lecture) =>
        doTimesOverlap(
          lecture.startTime,
          lecture.endTime,
          input.startTime,
          input.endTime,
        ),
      );
      if (isOverlapping) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Lecture overlaps with another lecture",
        });
      }
      return ctx.db.lecture.create({
        data: {
          name: input.name,
          roomId: input.roomId,
          teacherId: input.teacherId,
          dayOfWeek: input.dayOfWeek,
          evenWeek: input.evenWeek,
          type: input.type,
          startTime: input.startTime,
          endTime: input.endTime,
          studentGroupId: input.studentGroup,
        },
      });
    }),
});
