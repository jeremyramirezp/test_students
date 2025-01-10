import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Button, DeleteDialog, DetailDialog, FormDialog, RadioGroupStatus, SearchInput, TableHeaderRow, TablePagination, TableRowItem } from '@/components';
import { useFetchData } from '@/hooks/useFetchData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student } from '@/models';
import { deleteStudent } from '@/api/student';
import { config } from '@/config';
import { useToast } from '@/hooks/use-toast';

const columns = [
  { name: 'Nombres' },
  { name: 'Correo' },
  { name: 'Celular' },
  { name: 'Cumpleaños' },
  { name: 'Estado' },
  { name: 'Fecha Inscripción' },
]

function Home() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const { data, setData, loading, error, otherData } = useFetchData<Student[]>(`${config.endpoint}/students?page=${page}&perPage=${itemsPerPage}&search=${searchTerm}&status=${statusFilter}`);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    if (value.length > 2 || value.length === 0) {
      setSearchTerm(value);
      setPage(1);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const confirmDelete = (student: Student) => { 
    setCurrentStudent(student);
    setShowDeleteModal(true);
  };

  const openDetail = (student: Student) => {
    setCurrentStudent(student);
    setShowDetailModal(true);
  };

  const openForm = (student: Student | null) => {
    setCurrentStudent(student);
    setShowFormModal(true);
  };

  const handleDelete = async (): Promise<void | null> => {
    if (! currentStudent) return null;
    try {
      const { id } = currentStudent;
      await deleteStudent(id);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setData(prevData => prevData?.filter(student => student.id !== id) || []);
      toast({
        title: "¡Completado!",
        description: "Estudiante eliminado correctamente",
        duration: 2000
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "¡Vaya! Algo salió mal.",
        description: (error as Error).message,
        duration: 2000
      });
    }
  }

  const handleSave = (newStudent: Student) => {
    setData(prevData => {
      if (! prevData) return [newStudent];

      const existingStudentIndex = prevData?.findIndex(student => student.id === newStudent.id);

      if (existingStudentIndex !== -1 && prevData) {
        const updatedStudents = [...prevData];
        updatedStudents[existingStudentIndex] = newStudent;
        return updatedStudents;
      }

      return [newStudent, ...(prevData || [])];
    });
  }

  const totalPages = otherData?.totalPages || 1;
  const totalItems = otherData?.totalItems || 0;

  const showingFrom = (page - 1) * itemsPerPage + 1; 
  const showingTo = Math.min(page * itemsPerPage, totalItems);

  return (
    <>
      <div className='p-3 sm:p-5 antialiased'>
        <div className='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden'>
          <div className='flex justify-center border-t dark:border-gray-700 pt-4'>
              <RadioGroupStatus onStatusChange={handleStatusChange} />
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4">
            <div className='flex items-center gap-2'>
              Mostrar
              <Select onValueChange={(value) => handleItemsPerPageChange(Number(value))}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              por página
            </div>
            <SearchInput placeholder='Buscar por nombre o correo' onSearch={handleSearch} />
            <Button 
                id="createProductButton"
                onClick={() => openForm(null)}
                label='Nuevo Estudiante'
                Icon={<PlusIcon className='h-4 w-4 mr-1.5 -ml-1' />}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableHeaderRow columns={columns} />
              </TableHeader>
              <TableBody>
                {loading ? ( 
                  <TableRow><TableCell colSpan={7} className="text-center">Cargando datos...</TableCell></TableRow>
                ) : error || ! data || data.length === 0 ?
                  ( <TableRow><TableCell colSpan={7} className="text-center">No Hay Registros</TableCell></TableRow> ) :
                  ( data.map((student) => (<TableRowItem key={student.id} student={student} openForm={() => openForm(student)} openDetail={() => openDetail(student)} onDelete={() => confirmDelete(student)} />) ))
                }
              </TableBody>
            </Table>
          </div>

          <TablePagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
            totalItems={totalItems}
            showingFrom={showingFrom}
            showingTo={showingTo}
          />
        </div>
      </div>

      <FormDialog show={showFormModal} onClose={() => setShowFormModal(false)} student={currentStudent} onSave={handleSave} />
      <DetailDialog show={showDetailModal} onClose={() => setShowDetailModal(false)} student={currentStudent} />
      <DeleteDialog show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} />
    </>
  )
}

export default Home