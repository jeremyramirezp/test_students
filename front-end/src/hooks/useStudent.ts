import { useState, useEffect } from 'react';
import { getStudent } from '@/api/student';
import { Student } from '@/models';

export function useStudent(studentId: number | null) {
    const [student, setStudent] = useState<Student | null>(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    useEffect(() => { 
        if (studentId) { 
            const fetchStudent = async () => { 
                setLoading(true); 
                try { 
                    const studentData = await getStudent(studentId);
                    setStudent(studentData); 
                    setError(null); 
                } catch (error) { 
                    setError((error as Error).message); 
                } finally {
                    setLoading(false); 
                }
            }; 
            fetchStudent(); 
        } else {
            setStudent(null);
            setLoading(false);
        }
    }, [studentId]); 
    return { student, loading, error }; 
}
