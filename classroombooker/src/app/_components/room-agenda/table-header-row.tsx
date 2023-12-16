import { DAYS_OF_WEEK } from "~/lib/constants/schedule";
import { TableHead, TableRow } from "../ui/table";

const TableHeaderRow = () => (
  <TableRow>
    <TableHead>Godziny</TableHead>
    {DAYS_OF_WEEK.map((day) => (
      <TableHead key={day}>{day}</TableHead>
    ))}
  </TableRow>
);

export default TableHeaderRow;
