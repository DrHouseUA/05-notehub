import { useState } from "react";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchNotes,
  type FetchNotesResponse,
} from "../../services/noteService";
import Loader from "../Loader/Loader";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { data, isPending, isLoading, isFetching, isError } =
    useQuery<FetchNotesResponse>({
      queryKey: ["notes", currentPage, searchQuery],
      queryFn: () =>
        fetchNotes({ page: currentPage, perPage: 12, search: searchQuery }),
      placeholderData: keepPreviousData,
    });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setSearchQuery(value);
  }, 500);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleInputChange} />

        {isError && <p>Something went wrong, please try again</p>}
        {data && (
          <Pagination
            currentPage={currentPage}
            pageCount={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {(isPending || isFetching || isLoading) && <Loader />}
      {data && data.totalPages > 1 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
