import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudent } from "@/hooks/useStudent";
import { formatDate, formatNumber } from "@/lib/utils";
import { Student } from "@/models";

interface Props {
  student: Student | null
  show: boolean;
  onClose: () => void;
}

export function DetailDialog({show, onClose, student}: Props) {

  const { student: studentCurrent, loading, error } = useStudent(student?.id ?? null);

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby="student-dialog-description">
        <DialogHeader>
          <DialogTitle>Información</DialogTitle>
          <DialogDescription id="student-dialog-description"></DialogDescription>
        </DialogHeader>
        <div className="mt-4">

          {loading ? (
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="ml-4 flex-1">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3 mt-1" />
                </div>
              </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" /> 
                  <Skeleton className="h-4 w-3/4" /> 
                  <Skeleton className="h-4 w-full" /> 
                  <Skeleton className="h-4 w-1/2" /> 
                  <Skeleton className="h-4 w-full" /> 
                </div>
              </div> 
            ) : error ? (
              <div className="h-[150px] flex items-center justify-center">
                  No se encontro al estudiante
              </div>
            ) : (
              <>
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold">NV</div>
                    <div className="ml-4 flex-1">
                        <div className="flex items-center mb-1 justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 mr-2">{studentCurrent?.first_name} {studentCurrent?.last_name}</h2>
                            <span className={`text-xs font-medium text-white ${studentCurrent?.status == "Activo" ? 'bg-green-500' : 'bg-red-500'} py-[0.1rem] px-2 rounded-md`}>{studentCurrent?.status}</span>
                        </div>
                        <p className="text-sm text-gray-500">{studentCurrent?.email}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Celular:</span>
                        <span className="font-medium text-gray-800">{formatNumber(studentCurrent?.phone ?? '')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Cumpleaños:</span>
                        <span className="font-medium text-gray-800">{formatDate(studentCurrent?.birth_date)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Fecha Inscripción:</span>
                        <span className="font-medium text-gray-800">{formatDate(studentCurrent?.enrollment_date)}</span>
                    </div>
                </div>
              </>
            )}

        </div>
      </DialogContent>
    </Dialog>
  )
}