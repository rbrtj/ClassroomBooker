import { type RouterOutputs } from "~/trpc/shared";
import { type CLASSES_HOURS } from "../constants/schedule";

export type Agenda = RouterOutputs["agenda"]["getAgenda"];

export type LectureHours = (typeof CLASSES_HOURS)[number];
