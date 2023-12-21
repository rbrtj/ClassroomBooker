import { type RouterOutputs } from "~/trpc/shared";

export type StudentGroup =
  RouterOutputs["studentGroup"]["getStudentGroups"][number];
