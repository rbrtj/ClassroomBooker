"use client";
import { type AgendaItem } from "~/lib/types/agenda";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import LectureForm from "./LectureForm";
import { api } from "~/trpc/react";
import { type DayOfWeek } from "~/types/DayOfWeek";
import { type StudentGroup } from "~/types/StudentGroup";

export const AgendaDialog = ({
  agendaItem,
  day,
  refetchLectures,
  studentGroups,
  setIsDialogOpen,
}: {
  agendaItem: AgendaItem | undefined;
  day: DayOfWeek;
  studentGroups: StudentGroup[];
  refetchLectures: () => Promise<void>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // TODO: It shouldn't call api on each cell click.
  const { data: teachers } = api.teacher.getTeachers.useQuery();

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {agendaItem ? "Edytuj istniejącą" : "Stwórz"} lekcję
        </DialogTitle>
        <DialogDescription>
          {agendaItem
            ? "Możesz edytować istniejącą lekcję"
            : "Stwórz nową lekcję uzupełniając poniższe pola"}
        </DialogDescription>
      </DialogHeader>
      <LectureForm
        agendaItem={agendaItem}
        day={day}
        teachers={teachers}
        refetchLectures={refetchLectures}
        studentGroups={studentGroups}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};
