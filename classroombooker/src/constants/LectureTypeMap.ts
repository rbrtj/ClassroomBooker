import { type Lecture } from "~/types/Lecture";

export const LectureTypeMap: Record<Lecture, string> = {
  lecture: "Wykład",
  seminar: "Seminarium",
  other: "Inne",
  practice: "Laboratorium",
};
