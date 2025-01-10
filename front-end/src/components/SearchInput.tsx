import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEvent } from "react";

interface Props {
    placeholder: string;
    onSearch: (value: string) => void;
}

export const SearchInput = ({ placeholder, onSearch }: Props) => {

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  }

  return (
    <div className="w-full md:w-1/2"> 
      <div className="relative w-full"> 
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"> 
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-neutral-400" /> 
        </div> 
        <input 
          type="text" 
          placeholder={placeholder} 
          onChange={handleSearch} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-100 pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> 
      </div> 
    </div>
  );

}