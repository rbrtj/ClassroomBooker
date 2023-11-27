import { type LectureHours, type Agenda } from "~/lib/types/agenda";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CLASSES_HOURS, DAYS_OF_WEEK } from "~/lib/constants/schedule";
import { DayOfWeek } from "~/lib/enums/dayOfWeek";

interface RoomAgendaProps {
  agenda: Agenda;
}

const TableHeaderRow = () => (
  <TableRow>
    <TableHead>Godziny</TableHead>
    {DAYS_OF_WEEK.map((day) => (
      <TableHead key={day}>{day}</TableHead>
    ))}
  </TableRow>
);

const AgendaCell = ({
  agenda,
  lecture,
  day,
}: {
  agenda: Agenda;
  lecture: LectureHours;
  day: string;
}) => {
  console.log("LECTURE: ", lecture);
  const isTimeInLecture = (
    lectureStartTime: string,
    lectureEndTime: string,
    agendaStartTime: string,
    agendaEndTime: string,
  ) => {
    const [lectureStartHour, lectureStartMinute] = lectureStartTime.split(":");
    const [lectureEndHour, lectureEndMinute] = lectureEndTime.split(":");
    const [agendaStartHour, agendaStartMinute] = agendaStartTime.split(":");
    const [agendaEndHour, agendaEndMinute] = agendaEndTime.split(":");
    const agendaStartingDate = new Date(
      2023,
      0,
      1,
      +agendaStartHour!,
      +agendaStartMinute!,
    );
    const agendaEndingDate = new Date(
      2023,
      0,
      1,
      +agendaEndHour!,
      +agendaEndMinute!,
    );
    const lectureStartingDate = new Date(
      2023,
      0,
      1,
      +lectureStartHour!,
      +lectureStartMinute!,
    );
    const lectureEndingDate = new Date(
      2023,
      0,
      1,
      +lectureEndHour!,
      +lectureEndMinute!,
    );

    return (
      agendaStartingDate.getTime() === lectureStartingDate.getTime() ||
      agendaEndingDate.getTime() === lectureEndingDate.getTime() ||
      (agendaStartingDate < lectureStartingDate &&
        agendaEndingDate > lectureEndingDate)
    );
  };

  return (
    <TableCell key={day}>
      {agenda.map((agenda) => {
        const agendaSpansLecture = isTimeInLecture(
          lecture.startTime,
          lecture.endTime,
          agenda.startTime,
          agenda.endTime,
        );
        if (
          agendaSpansLecture &&
          agenda.evenWeek &&
          DayOfWeek[agenda.dayOfWeek] === day
        ) {
          return <div key={agenda.id}>{agenda.name}</div>;
        }
        return;
      })}
    </TableCell>
  );
};

const LectureRow = ({
  lecture,
  agenda,
}: {
  lecture: LectureHours;
  agenda: Agenda;
}) => (
  <TableRow key={lecture.startTime}>
    <TableCell>
      {lecture.startTime} - {lecture.endTime}
    </TableCell>
    {DAYS_OF_WEEK.map((day) => (
      <AgendaCell key={day} agenda={agenda} lecture={lecture} day={day} />
    ))}
  </TableRow>
);

export function RoomAgenda({ agenda }: RoomAgendaProps) {
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
}
