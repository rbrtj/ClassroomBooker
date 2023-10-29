import { z } from "zod";

const ScheduleEntry = z.object({
  timeRange: z.string(),
  class: z.string(),
});

const DaySchedule = z.record(ScheduleEntry);

const RoomData = z.object({
  room: z.string(),
  class: DaySchedule,
});

export const ScheduleData = z.array(RoomData);
