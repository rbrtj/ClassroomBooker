import React from "react";
import { type Agenda, type LectureHours } from "~/lib/types/agenda";
import { TableCell, TableRow } from "./ui/table";
import { DAYS_OF_WEEK } from "~/constants/Schedule";
import AgendaCell from "./AgendaCell";

interface LectureRowProps {
  lecture: LectureHours;
  agenda: Agenda;
}

const LectureRow = React.memo(({ lecture, agenda }: LectureRowProps) => (
  <TableRow key={lecture.startTime}>
    <TableCell>
      {lecture.startTime} - {lecture.endTime}
    </TableCell>
    {DAYS_OF_WEEK.map((day) => (
      <AgendaCell key={day} agenda={agenda} lecture={lecture} day={day} />
    ))}
  </TableRow>
));

LectureRow.displayName = "LectureRow";

export default LectureRow;
