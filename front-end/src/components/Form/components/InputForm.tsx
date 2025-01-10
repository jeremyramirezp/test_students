import { FormValues } from '../models';
import { Control, Controller, FieldError } from "react-hook-form";

interface Props {
    name: keyof FormValues;
    control: Control<FormValues>;
    label: string;
    type?: string;
    error?: FieldError;
}

export const InputForm = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="space-y-2">
        <label htmlFor={name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <>
                    { name !== "status" && (
                        <input
                            type={type} 
                            id={name} 
                            {...field } 
                            value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value ?? ''}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                        />
                    )}
                </> }
            }
        />
        <p id={name + "_error"} className="text-[0.8rem] text-red-500">{error?.message}</p>
    </div>
  );
}

export default InputForm