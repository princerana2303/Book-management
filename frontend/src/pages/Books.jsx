/*
=====================================================
BOOKS PAGE
=====================================================

Features:

✔ Fetch books
✔ Create book
✔ Edit book
✔ Delete book
✔ Search
✔ Pagination
✔ Loading spinner
✔ Login success message
✔ Product tour
✔ Tour runs once using localStorage
*/

import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import "../styles/books.css";

const Books = () => {

  /* ==========================================
  READ SUCCESS MESSAGE FROM LOGIN PAGE
  ========================================== */
  const location = useLocation();
  const successMessage = location.state?.message;

  const [showMessage, setShowMessage] = useState(true);


  /* ==========================================
  PRODUCT TOUR STATE
  ========================================== */

  const [tourStep, setTourStep] = useState(() => {

    const completed = localStorage.getItem("booksTourCompleted");

    if (completed === "true") {
      return 999;
    }

    return 0;
  });

  const tourSteps = [
    "Add a new book using Title, Author and Year fields.",
    "Click Edit to modify an existing book.",
    "Click Delete to remove a book.",
    "Use the search bar to filter books.",
    "Use pagination to navigate between pages."
  ];


  /* ==========================================
  BOOK DATA
  ========================================== */

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);


  /* ==========================================
  PAGINATION
  ========================================== */

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;


  /* ==========================================
  SEARCH
  ========================================== */

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800); // Increased delay to 800ms for better UX

    return () => clearTimeout(timer);
  }, [search]);

  // Reset to first page when search changes
  useEffect(() => {
    if (debouncedSearch !== undefined) {
      setPage(1);
    }
  }, [debouncedSearch]);


  /* ==========================================
  EDIT MODE STATE
  ========================================== */

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    author: "",
    year: ""
  });


  /* ==========================================
  CREATE FORM STATE
  ========================================== */

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: ""
  });


  /* ==========================================
  RESET BOOKS DATA (FOR TESTING)
  ========================================== */

  const resetBooksData = () => {
    localStorage.removeItem("mock_books");
    window.location.reload();
  };


  /* ==========================================
  FETCH BOOKS
  ========================================== */

  const fetchBooks = useCallback(async (pageNumber = 1) => {

    try {

      setLoading(true);

      const res = await api.get(
        `/books?page=${pageNumber}&limit=${limit}&search=${debouncedSearch}`
      );

      setBooks(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);

    } catch (error) {

      console.error("Failed to load books:", error);
      // Don't show alert on search errors to avoid spam
      if (!debouncedSearch) {
        alert("Failed to load books");
      }

    } finally {

      setLoading(false);

    }

  }, [limit, debouncedSearch]);


  useEffect(() => {
    fetchBooks(page);
  }, [fetchBooks, page]);


  /* ==========================================
  CREATE BOOK
  ========================================== */

  const handleCreate = async (e) => {

    e.preventDefault();

    await api.post("/books", {
      ...formData,
      year: Number(formData.year)
    });

    setFormData({
      title: "",
      author: "",
      year: ""
    });

    setPage(1);
    fetchBooks(1);

  };


  /* ==========================================
  DELETE BOOK
  ========================================== */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this book?")) return;

    await api.delete(`/books/${id}`);

    fetchBooks(page);

  };


  /* ==========================================
  START EDIT
  ========================================== */

  const startEdit = (book) => {

    setEditingId(book._id);

    setEditData({
      title: book.title,
      author: book.author,
      year: book.year
    });

  };


  /* ==========================================
  CANCEL EDIT
  ========================================== */

  const cancelEdit = () => {
    setEditingId(null);
  };


  /* ==========================================
  SAVE EDIT
  ========================================== */

  const saveEdit = async (id) => {

    await api.put(`/books/${id}`, {
      ...editData,
      year: Number(editData.year)
    });

    cancelEdit();
    fetchBooks(page);

  };


  /* ==========================================
  LOADING SCREEN
  ========================================== */

  if (loading && books.length === 0) {

    return (

      <div>

        {/* Animated background elements */}
        <div className="books-bg">
          <div className="books-shape books-shape-1"></div>
          <div className="books-shape books-shape-2"></div>
          <div className="books-shape books-shape-3"></div>
          <div className="books-shape books-shape-4"></div>
          <div className="books-shape books-shape-5"></div>
        </div>

        <div className="books-loading">
          <div className="spinner-dark"></div>
          <p>Loading books...</p>
        </div>

      </div>

    );

  }


  /* ==========================================
  MAIN UI
  ========================================== */

  return (

    <div>

      {/* Animated background elements */}
      <div className="books-bg">
        <div className="books-shape books-shape-1"></div>
        <div className="books-shape books-shape-2"></div>
        <div className="books-shape books-shape-3"></div>
        <div className="books-shape books-shape-4"></div>
        <div className="books-shape books-shape-5"></div>
      </div>

      <div className="books-container">

        <h2>Books</h2>

        {/* Reset button for testing */}
        <button
          className="btn btn-cancel"
          onClick={resetBooksData}
          style={{ marginBottom: "15px", fontSize: "12px" }}
        >
          Reset to Default Books
        </button>

        {/* Loading indicator for search operations */}
        {loading && books.length > 0 && (
          <div className="search-loading">
            <div className="search-spinner"></div>
            <span>Updating results...</span>
          </div>
        )}


      {/* PRODUCT TOUR */}
      {tourStep < tourSteps.length && (

        <div className="books-tour">

          <div className="tour-card">

            <h3>📘 Books Page Tour</h3>

            <p>{tourSteps[tourStep]}</p>

            <div className="tour-actions">

              {tourStep > 0 && (
                <button
                  className="btn btn-cancel"
                  onClick={() => setTourStep(tourStep - 1)}
                >
                  Back
                </button>
              )}

              {tourStep < tourSteps.length - 1 ? (

                <button
                  className="btn btn-primary"
                  onClick={() => setTourStep(tourStep + 1)}
                >
                  Next
                </button>

              ) : (

                <button
                  className="btn btn-save"
                  onClick={() => {

                    localStorage.setItem("booksTourCompleted", "true");
                    setTourStep(999);

                  }}
                >
                  Finish
                </button>

              )}

            </div>

          </div>

        </div>

      )}


      {/* SUCCESS MESSAGE */}
      {successMessage && showMessage && (
        <p className="auth-success">{successMessage}</p>
      )}


      {/* SEARCH */}
      <div className="search-container">

        <input
          className={`search-input ${tourStep === 3 ? "tour-highlight" : ""}`}
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />

        {/* Search indicator */}
        {search && search !== debouncedSearch && (
          <div className="search-indicator">
            <span className="search-spinner"></span>
            Searching...
          </div>
        )}

      </div>


      {/* CREATE BOOK */}
      <form
        className={`add-book-form ${tourStep === 0 ? "tour-highlight" : ""}`}
        onSubmit={handleCreate}
      >

        <input
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
        />

        <input
          placeholder="Author"
          value={formData.author}
          onChange={(e) =>
            setFormData({ ...formData, author: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={(e) =>
            setFormData({ ...formData, year: e.target.value })
          }
          required
        />

        <button className="btn btn-primary">
          Add Book
        </button>

      </form>


      {/* BOOK LIST */}
      {books.map((book) => (

        <div key={book._id} className="book-row">

          {editingId === book._id ? (

            <>
              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />

              <input
                value={editData.author}
                onChange={(e) =>
                  setEditData({ ...editData, author: e.target.value })
                }
              />

              <input
                value={editData.year}
                onChange={(e) =>
                  setEditData({ ...editData, year: e.target.value })
                }
              />

              <button
                className="btn btn-save"
                onClick={() => saveEdit(book._id)}
              >
                Save
              </button>

              <button
                className="btn btn-cancel"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </>

          ) : (

            <>
              <div className="book-title">
                {book.title}
              </div>

              <div className="book-meta">
                {book.author} ({book.year})
              </div>

              <button
                className={`btn btn-edit ${tourStep === 1 ? "tour-highlight" : ""}`}
                onClick={() => startEdit(book)}
              >
                Edit
              </button>

              <button
                className={`btn btn-delete ${tourStep === 2 ? "tour-highlight" : ""}`}
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </>

          )}

        </div>

      ))}


      {/* PAGINATION */}
      {totalPages > 1 && (

        <div className={`pagination ${tourStep === 4 ? "tour-highlight" : ""}`}>

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ◀ Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (

            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>

          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next ▶
          </button>

        </div>

      )}

    </div>

    </div>

  );

};

export default Books;