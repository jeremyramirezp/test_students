import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useState } from "react";

interface Props { 
    show: boolean; 
    onClose: () => void; 
    onConfirm: () => Promise<void | null>;
}

export const DeleteDialog = ({ show, onClose, onConfirm }: Props) => {

    const [loading, setLoading] = useState(false);
    
    const handleConfirm = async () => {
        setLoading(true); 
        try {
            await onConfirm();
        } finally {
            setLoading(false);
            onClose();
        } 
    }

    return (
        <AlertDialog open={show}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Eliminara completamente al estudiante.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={loading}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={loading}>
                        {loading ? 'Borrando...' : 'Si, Borralo'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
