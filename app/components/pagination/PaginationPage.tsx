import { PaginationItem, PaginationLink } from "@/components/ui/pagination";

interface PaginationPagesProps {
  totalPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationPages({
  totalPages,
  currentPage,
  setPage,
}: PaginationPagesProps) {
  const handlePageClick =
    (pageNumber: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setPage(pageNumber);
    };

  return (
    <>
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              className="cursor-pointer"
              onClick={handlePageClick(pageNumber)}
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        );
      })}
    </>
  );
}
