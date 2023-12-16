import React from "react";
import { type Agenda, type LectureHours } from "~/lib/types/agenda";
import { doTimesOverlap } from "./utils/doTimesOverlap";
import { TableCell } from "../ui/table";
import { DayOfWeek } from "./utils/DayOfWeekMap";

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
    const itemsForThisCell = agenda.filter(
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
      <TableCell key={day}>
        {itemsForThisCell.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </TableCell>
    );
  },
);

AgendaCell.displayName = "AgendaCell";

export default AgendaCell;
