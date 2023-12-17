import { type Agenda } from "~/lib/types/agenda";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CLASSES_HOURS, DAYS_OF_WEEK } from "~/constants/Schedule";
import React from "react";
import LectureRow from "./AgendaLectureRow";
import TableHeaderRow from "./AgendaHeaderRow";
import AgendaCell from "./AgendaCell";

const DesktopRoomAgenda = ({ agenda, refetchLectures }: RoomAgendaProps) => {
  return (
    <div className="w-full overflow-x-scroll rounded-lg bg-white p-8 shadow-md md:overflow-x-visible">
      <Table className="w-full min-w-[600px] overflow-hidden rounded-lg md:min-w-0">
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          {CLASSES_HOURS.map((lecture) => (
            <LectureRow
              key={lecture.startTime}
              lecture={lecture}
              agenda={agenda}
              refetchLectures={refetchLectures}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const MobileRoomAgenda = ({ agenda, refetchLectures }: RoomAgendaProps) => {
  return (
    <div className="w-full overflow-x-scroll rounded-lg bg-white p-8 shadow-md md:overflow-x-visible">
      <Table className="w-full rounded-lg md:min-w-0">
        {DAYS_OF_WEEK.map((day) => (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>{day}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CLASSES_HOURS.map((lecture) => (
                <TableRow key={lecture.startTime}>
                  <TableCell>
                    {lecture.startTime} - {lecture.endTime}
                  </TableCell>
                  <AgendaCell
                    key={day}
                    agenda={agenda}
                    lecture={lecture}
                    day={day}
                    refetchLectures={refetchLectures}
                  />
                </TableRow>
              ))}
            </TableBody>
          </>
        ))}
      </Table>
    </div>
  );
};

interface RoomAgendaProps {
  agenda: Agenda;
  refetchLectures: () => Promise<void>;
}

export function RoomAgenda({ agenda, refetchLectures }: RoomAgendaProps) {
  return (
    <>
      <div className="h-full md:hidden">
        <MobileRoomAgenda agenda={agenda} refetchLectures={refetchLectures} />
      </div>
      <div className="container hidden w-full md:block">
        <DesktopRoomAgenda agenda={agenda} refetchLectures={refetchLectures} />
      </div>
    </>
  );
}
