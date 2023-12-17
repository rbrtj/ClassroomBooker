"use client";
import React from "react";
import { type Agenda, type LectureHours } from "~/lib/types/agenda";
import { doTimesOverlap } from "../utils/DoTimesOverlap";
import { TableCell } from "./ui/table";
import { DayOfWeek } from "../constants/DayOfWeekMap";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AgendaDialog } from "./AgendaDialog";

const AgendaCell = React.memo(
  ({
    agenda,
    lecture,
    day,
    refetchLectures,
  }: {
    agenda: Agenda;
    lecture: LectureHours;
    day: string;
    refetchLectures: () => Promise<void>;
  }) => {
    const itemForThisCell = agenda.find(
      (item) =>
        DayOfWeek[item.dayOfWeek] === day &&
        doTimesOverlap(
          item.startTime,
          item.endTime,
          lecture.startTime,
          lecture.endTime,
        ),
    );
    return (
      <Dialog>
        <TableCell className="p-0 transition-colors hover:cursor-pointer hover:bg-blue-300">
          <DialogTrigger asChild>
            <div className="h-full w-full p-4">{itemForThisCell?.name}</div>
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
