import { DAYS_OF_WEEK } from "~/constants/Schedule";
import { TableHead, TableRow } from "./ui/table";

const TableHeaderRow = () => (
  <TableRow>
    <TableHead>Godziny</TableHead>
    {DAYS_OF_WEEK.map((day) => (
      <TableHead key={day}>{day}</TableHead>
    ))}
  </TableRow>
);

export default TableHeaderRow;
