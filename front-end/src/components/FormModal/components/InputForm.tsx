import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../models";

interface Props {
    name: keyof FormValues;
    control: Control<FormValues>;
    label: string;
    type?: string;
    error?: FieldError;
}

export const InputForm = ({ name, control, label, type, error }: Props) => {
    return (
        <div className="mb-5">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => 
                    <input
                        id={name}
                        type={type}
                        {...field}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                }
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error?.message}</p>
        </div>
    );
}