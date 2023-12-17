import { CLASSES_HOURS } from "~/constants/Schedule";

export const getPossibleLectureEndTime = (startTime: string) => {
  const startTimeIndex = CLASSES_HOURS.findIndex(
    (hour) => hour.startTime === startTime,
  );
  const endTimes = CLASSES_HOURS.map((hour) => hour.endTime);
  return endTimes.slice(startTimeIndex);
};
