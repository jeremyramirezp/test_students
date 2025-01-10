import { TableHead, TableRow } from "../ui/table";

export const TableHeaderRow = ({ columns }: { columns: { name: string }[] }) => (
    <TableRow>
      {columns.map((item, i) => (
        <TableHead key={i} className="uppercase">
          {item.name}
        </TableHead>
      ))}
      <TableHead></TableHead>
    </TableRow>
);