import { type RouterOutputs } from "~/trpc/shared";
import { type CLASSES_HOURS } from "../../constants/Schedule";

export type Agenda = RouterOutputs["lectures"]["getLectures"];

export type LectureHours = (typeof CLASSES_HOURS)[number];

export type AgendaItem = Agenda[number];

export type PreprocessedAgenda = Record<string, AgendaItem[]>;
