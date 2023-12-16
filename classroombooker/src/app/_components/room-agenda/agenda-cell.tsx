"use client";
import React from "react";
import { type Agenda, type LectureHours } from "~/lib/types/agenda";
import { doTimesOverlap } from "./utils/doTimesOverlap";
import { TableCell } from "../ui/table";
import { DayOfWeek } from "./utils/DayOfWeekMap";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import EditCreateAgendaItem from "./edit-create-agenda-item";

const AgendaCell = React.memo(
  ({
    agenda,
    lecture,
    day,
  }: {
    agenda: Agenda;
    lecture: LectureHours;
    day: string;
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
            <EditCreateAgendaItem agendaItem={itemForThisCell} />
          </DialogContent>
        </TableCell>
      </Dialog>
    );
  },
);

AgendaCell.displayName = "AgendaCell";

export default AgendaCell;
