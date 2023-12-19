import { DAYS_OF_WEEK } from "~/constants/Schedule";
import { TableHead, TableRow } from "./ui/table";
import { DayOfWeekMap } from "~/constants/DayOfWeekMap";

const TableHeaderRow = () => (
  <TableRow>
    <TableHead>Godziny</TableHead>
    {DAYS_OF_WEEK.map((day) => (
      <TableHead key={day}>{DayOfWeekMap[day]}</TableHead>
    ))}
  </TableRow>
);

export default TableHeaderRow;
