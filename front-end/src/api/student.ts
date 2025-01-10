import { FormValues } from "@/components/Form/models";
import { config } from "@/config";
import { Student } from "@/models";

const {
    endpoint
} = config

export const deleteStudent = async (studentId: number): Promise<boolean> => {
    try {
        const response = await fetch(`${endpoint}/students/${studentId}`, { method: 'DELETE' });
        if (! response.ok) {
            throw new Error('Error al eliminar el estudiante');
        }
        return true;
    } catch (error) { 
        const err = error as Error
        throw new Error(err.message)
    }
};

export const getStudent = async (studentId: number): Promise<Student | null> => {
    try {
        const response = await fetch(`${endpoint}/students/${studentId}`, { method: 'GET' });
        if (! response.ok) {
            throw new Error('Error al buscar al estudiante');
        }
        const jsonResult: { message: string; data: Student } = await response.json();
        if (jsonResult.message !== "") return null;
        return jsonResult.data;
    } catch (error) { 
        const err = error as Error
        throw new Error(err.message)
    }
};

export const addStudent = async (data: FormValues): Promise<Student> => {
    try {
        const response = await fetch(`${endpoint}/students`, { 
            method: 'POST' ,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    
        if (! response.ok) {
            const errorData = await response.json(); 
            throw errorData;
        }
        const jsonResult: { message: string; data: Student } = await response.json();
        return jsonResult.data;
    } catch (error) { 
        throw error;
    }
};

export const updateStudent = async (studentId: number, data: FormValues): Promise<Student> => {
    try {
        const response = await fetch(`${endpoint}/students/${studentId}`, { 
            method: 'PUT' ,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (! response.ok) {
            const errorData = await response.json(); 
            throw errorData;
        }
        const jsonResult: { message: string; data: Student } = await response.json();
        return jsonResult.data;
    } catch (error) { 
        throw error;
    }
};