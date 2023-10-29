import { getScheduleData } from "~/utils/utils";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ScheduleData } from "~/lib/validators/schedule";

export const scheduleRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const data = await getScheduleData();
    console.log("DATA: ", data);
    const validatedData = ScheduleData.safeParse(data);
    if (!validatedData.success) {
      console.log(validatedData.error.issues);
      throw new Error("Invalid schedule data schema");
    } else {
      return validatedData.data;
    }
  }),
});
