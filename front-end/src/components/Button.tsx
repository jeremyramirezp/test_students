import { ButtonHTMLAttributes, ReactElement } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    label: string; 
    id: string; 
    className?: string;
    onClick: () => void; 
    Icon: ReactElement; 
}

export const Button = ({ 
    id, 
    onClick, 
    Icon, 
    label, 
    className = 'text-white bg-blue-500 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800', 
    ...props 
}: Props) => {
  return (
    <button 
        type="button" 
        id={id} 
        className={`flex items-center justify-center font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none border transition-all duration-300 ease-in-out ${className}`} 
        onClick={onClick} 
        {...props} 
    >
        {Icon}
        {label}
    </button>
  );
}