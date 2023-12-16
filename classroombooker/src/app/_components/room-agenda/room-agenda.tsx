import { type Agenda } from "~/lib/types/agenda";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CLASSES_HOURS, DAYS_OF_WEEK } from "~/lib/constants/schedule";
import React from "react";
import LectureRow from "./lecture-row";
import TableHeaderRow from "./table-header-row";
import AgendaCell from "./agenda-cell";

interface RoomAgendaProps {
  agenda: Agenda;
}

const DefaultRoomAgenda = ({ agenda }: RoomAgendaProps) => {
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
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const MobileRoomAgenda = ({ agenda }: RoomAgendaProps) => {
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

export function RoomAgenda({ agenda }: RoomAgendaProps) {
  return (
    <>
      <div className="h-full md:hidden">
        <MobileRoomAgenda agenda={agenda} />
      </div>
      <div className="container hidden w-full md:block">
        <DefaultRoomAgenda agenda={agenda} />
      </div>
    </>
  );
}
