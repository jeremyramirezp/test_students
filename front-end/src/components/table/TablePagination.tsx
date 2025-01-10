import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";

interface Props {
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void;
    showingFrom: number; 
    showingTo: number; 
    totalItems: number;
}

export const TablePagination = ({ currentPage, totalPages, onPageChange, showingFrom, showingTo, totalItems }: Props) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Mostrando 
            <span className="font-semibold text-gray-900 dark:text-white mx-1">{showingFrom} a {showingTo}</span>
            de 
            <span className="font-semibold text-gray-900 dark:text-white ms-1">{totalItems}</span>
        </span>
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink className="cursor-pointer" onClick={() => onPageChange(currentPage - 1)}>
                            <ChevronLeftIcon className="h-4 w-5" />
                        </PaginationLink>
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, index) => ( 
                        <PaginationItem className="cursor-pointer" key={index}> 
                            <PaginationLink 
                                isActive={currentPage === index + 1} 
                                onClick={() => onPageChange(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink> 
                        </PaginationItem> 
                    ))}
                    <PaginationItem>
                        <PaginationLink className="cursor-pointer" onClick={() => onPageChange(currentPage + 1)}>
                            <ChevronRightIcon className="h-4 w-5" />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
);