"use client";
import { type AgendaItem } from "~/lib/types/agenda";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import LectureForm from "./LectureForm";
import { api } from "~/trpc/react";

export const AgendaDialog = ({
  agendaItem,
  day,
  refetchLectures,
}: {
  agendaItem: AgendaItem | undefined;
  day: string;
  refetchLectures: () => Promise<void>;
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
      />
    </>
  );
};
