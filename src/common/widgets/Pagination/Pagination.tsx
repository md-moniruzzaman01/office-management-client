import React, { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  limit?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalItems = 0,
  limit = 10,
  setCurrentPage,
}) => {
  const numberOfPages = Math.ceil(totalItems / limit) || 1;

  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage?.(1);
    }
  }, [currentPage, numberOfPages, setCurrentPage]);

  if (totalItems <= 0) {
    return null;
  }

  const handlePrevPage = () => {
    if (setCurrentPage && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (setCurrentPage && currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    if (setCurrentPage) setCurrentPage(1);
  };

  const handleLastPage = () => {
    if (setCurrentPage) setCurrentPage(numberOfPages);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 gap-4">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to <span className="font-medium">{Math.min(currentPage * limit, totalItems)}</span> of <span className="font-medium">{totalItems}</span> entries
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Page {currentPage} of {numberOfPages}</div>
        </div>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleNextPage}
          disabled={currentPage === numberOfPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleLastPage}
          disabled={currentPage === numberOfPages}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
