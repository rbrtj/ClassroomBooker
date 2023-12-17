import { type RouterOutputs } from "~/trpc/shared";

export type Teacher = RouterOutputs["teacher"]["getTeachers"][number];
