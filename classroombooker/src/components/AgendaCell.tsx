"use client";
import React from "react";
import { type Agenda, type LectureHours } from "~/lib/types/agenda";
import { doTimesOverlap } from "../utils/DoTimesOverlap";
import { TableCell } from "./ui/table";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AgendaDialog } from "./AgendaDialog";
import { LectureBadge } from "./LectureBadge";
import { type Lecture } from "~/types/Lecture";
import { LectureTypeMap } from "~/constants/LectureTypeMap";
import { type DayOfWeek } from "~/types/DayOfWeek";
import { type StudentGroup } from "~/types/StudentGroup";
const AgendaCell = React.memo(
  ({
    agenda,
    lecture,
    day,
    refetchLectures,
    studentGroups,
  }: {
    agenda: Agenda;
    lecture: LectureHours;
    day: DayOfWeek;
    studentGroups: StudentGroup[];
    refetchLectures: () => Promise<void>;
  }) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
    const itemForThisCell = agenda.find(
      (item) =>
        (item.dayOfWeek as DayOfWeek) === day &&
        doTimesOverlap(
          item.startTime,
          item.endTime,
          lecture.startTime,
          lecture.endTime,
        ),
    );

    const studentGroupToDisplay = studentGroups.find(
      (group) => group.id === itemForThisCell?.studentGroupId,
    );

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <TableCell className="p-0 transition-colors hover:cursor-pointer hover:bg-blue-600">
          <DialogTrigger asChild>
            <div className="flex h-full w-full flex-col p-4">
              <div>
                {itemForThisCell?.name}
                {itemForThisCell && (
                  <LectureBadge
                    variant={itemForThisCell?.type as Lecture}
                    className="ml-1"
                  >
                    {LectureTypeMap[itemForThisCell?.type as Lecture]?.[0]}
                  </LectureBadge>
                )}
              </div>
              {itemForThisCell?.studentGroupId && (
                <strong>{studentGroupToDisplay?.name}</strong>
              )}
            </div>
          </DialogTrigger>
          <DialogContent>
            <AgendaDialog
              agendaItem={itemForThisCell}
              day={day}
              refetchLectures={refetchLectures}
              studentGroups={studentGroups}
              setIsDialogOpen={() => setIsDialogOpen}
            />
          </DialogContent>
        </TableCell>
      </Dialog>
    );
  },
);

AgendaCell.displayName = "AgendaCell";

export default AgendaCell;
