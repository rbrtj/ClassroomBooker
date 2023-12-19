"use client";
import React from "react";
import { type Agenda, type LectureHours } from "~/lib/types/agenda";
import { doTimesOverlap } from "../utils/DoTimesOverlap";
import { TableCell } from "./ui/table";
import { DayOfWeekMap } from "../constants/DayOfWeekMap";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AgendaDialog } from "./AgendaDialog";
import { LectureBadge } from "./LectureBadge";
import { type Lecture } from "~/types/Lecture";
import { LectureTypeMap } from "~/constants/LectureTypeMap";
import { type DayOfWeek } from "~/types/DayOfWeek";
const AgendaCell = React.memo(
  ({
    agenda,
    lecture,
    day,
    refetchLectures,
  }: {
    agenda: Agenda;
    lecture: LectureHours;
    day: DayOfWeek;
    refetchLectures: () => Promise<void>;
  }) => {
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
    return (
      <Dialog>
        <TableCell className="p-0 transition-colors hover:cursor-pointer hover:bg-blue-600">
          <DialogTrigger asChild>
            <div className="h-full w-full p-4">
              {itemForThisCell?.name}
              {itemForThisCell && (
                <LectureBadge variant={itemForThisCell?.type as Lecture}>
                  {LectureTypeMap[itemForThisCell?.type as Lecture]?.[0]}
                </LectureBadge>
              )}
              {itemForThisCell && <p>14K2</p>}
            </div>
          </DialogTrigger>
          <DialogContent>
            <AgendaDialog
              agendaItem={itemForThisCell}
              day={day}
              refetchLectures={refetchLectures}
            />
          </DialogContent>
        </TableCell>
      </Dialog>
    );
  },
);

AgendaCell.displayName = "AgendaCell";

export default AgendaCell;
