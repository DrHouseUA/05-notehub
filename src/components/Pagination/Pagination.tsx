import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import { useQueryClient } from "@tanstack/react-query";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
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
