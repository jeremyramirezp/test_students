import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "../Button";
import { TableCell, TableRow } from "../ui/table";
import { Student } from "@/models";
import { formatDate, formatNumber } from "@/lib/utils";

const statusClasses: { [key: string]: string } = {
    Activo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Inactivo: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export const TableRowItem = ({ student, onDelete, openDetail, openForm }: { student: Student, onDelete: () => void, openDetail: () => void, openForm: () => void }) => {
    return (
      <TableRow>
        <TableCell>{student.first_name} {student.last_name}</TableCell>
        <TableCell>{student.email}</TableCell>
        <TableCell>{formatNumber(student.phone)}</TableCell>
        <TableCell>{formatDate(student.birth_date)}</TableCell>
        <TableCell>
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${statusClasses[student.status]}`}>
            {student.status}
          </span>
        </TableCell>
        <TableCell>{formatDate(student.enrollment_date)}</TableCell>
        <TableCell>
          <div className="flex items-center space-x-4">
            <Button
              id={`ver_${student.id}`}
              onClick={openDetail}
              label="Ver"
              Icon={<EyeIcon className="h-4 w-4 mr-1.5 -ml-1" />}
              className="text-gray-900 bg-white border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            />
            <Button
              id={`editar_${student.id}`}
              onClick={openForm}
              label="Editar"
              Icon={<PencilSquareIcon className="h-4 w-4 mr-1.5 -ml-1" />}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            />
            <Button
              id={`eliminar_${student.id}`}
              onClick={onDelete}
              label="Eliminar"
              Icon={<TrashIcon className="h-4 w-4 mr-1.5 -ml-1" />}
              className="text-red-700 hover:text-white border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };