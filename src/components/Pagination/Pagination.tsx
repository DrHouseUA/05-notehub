import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
    />
  );
};

export default Pagination;
