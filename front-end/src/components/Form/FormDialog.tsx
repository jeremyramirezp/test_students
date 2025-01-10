import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Student } from "@/models";
import { InputForm } from "./components";
import { FormValues, schema } from "./models";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useStudent } from "@/hooks/useStudent";
import { useEffect, useState } from "react";
import { addStudent, updateStudent } from "@/api/student";
import { useToast } from "@/hooks/use-toast";

interface Props {
    show: boolean;
    onClose: () => void;
    student: Student | null;
    onSave: (student: Student) => void;
}

const convertValidationErrors = (errors: { [key: string]: string[] }) => { 
    const result: { [key: string]: FieldError } = {}; 
    for (const key in errors) { 
        if (errors.hasOwnProperty(key)) { 
            result[key] = { message: errors[key][0], type: "server" }; 
        } 
    } 
    return result;
};

export const FormDialog = ({ show, onClose, student, onSave }: Props) => {
    const { student: studentCurrent, loading } = useStudent(student?.id ?? null);
    const [formKey, setFormKey] = useState<number>(0);
    const [status, setStatus] = useState<string>("Activo");
    const [loadingForm, setLoadingForm] = useState<boolean>(false); 
    const [__, setErrorForm] = useState<string | null>(null);
    const [_, setServerErrors] = useState<{ [key: string]: FieldError }>({});
    const { toast } = useToast();

    const { control, handleSubmit, reset, setValue, setError, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

    useEffect(() => {
        if (! loading) { 
            const studentStatus = studentCurrent?.status || "Activo";
            reset({ 
                first_name: studentCurrent?.first_name || "", 
                last_name: studentCurrent?.last_name || "", 
                email: studentCurrent?.email || "", 
                phone: studentCurrent?.phone || "", 
                birth_date: studentCurrent?.birth_date ? studentCurrent.birth_date : '', 
                status: studentStatus
            });
            setStatus(studentStatus);
            setFormKey((prevKey) => prevKey + 1);
        }
    }, [loading, studentCurrent]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoadingForm(true);
        setErrorForm(null);
        setServerErrors({});

        const handleStudentOperation = async () => { 
            if (! student) { 
                return await addStudent(data);
            }
            return await updateStudent(student.id, data); 
        };
        try {
            const savedStudent = await handleStudentOperation();
            onSave(savedStudent);
            toast({ 
                title: "¡Completado!", 
                description: "Estudiante guardado correctamente", 
                duration: 2000 
            });
            onClose();
        } catch (error) {
            const err = error as any
            if (err.data) {
                const convertedErrors = convertValidationErrors(err.data);
                setServerErrors(convertedErrors);
                for (const key in convertedErrors) {
                    if (convertedErrors.hasOwnProperty(key)) {
                        setError(key as keyof FormValues, convertedErrors[key]);
                    }
                }
            } else {
                setErrorForm(err.message);
            }
        } finally { 
            setLoadingForm(false);
        }
    }
    return (
        <Dialog open={show}>
            <DialogContent className="sm:max-w-[700px]">
                <form onSubmit={handleSubmit(onSubmit)} key={formKey}>
                    <DialogHeader>
                        <DialogTitle>{(student) ? 'Editar': 'Nuevo'} Estudiante</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <InputForm control={control} name="first_name" label="Nombre" type="text" error={errors.first_name} />
                        <InputForm control={control} name="last_name" label="Apellidos" type="text" error={errors.last_name} />
                        <InputForm control={control} name="email" label="Correo" type="email" error={errors.email} />
                        <InputForm control={control} name="phone" label="Celular" type="number" error={errors.phone} />
                        <InputForm control={control} name="birth_date" label="Cumpleaños" type="date" error={errors.birth_date} />
                        <div className="space-y-2">
                            <label htmlFor="status" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Estado</label>
                            <Select value={status} onValueChange={(value: "Activo" | "Inactivo") => { setStatus(value); setValue("status", value); }}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder={status} />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="Activo">Activo</SelectItem>
                                <SelectItem value="Inactivo">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                            <p id="status_error" className="text-[0.8rem] text-red-500">{errors.status?.message}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>Cerrar</Button>
                        <Button type="submit" disabled={loadingForm}>
                            {loadingForm ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}