import { Link } from "react-router-dom";
import { useState } from "react";

function Course() {

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Alchemist",
      image: "https://covers.openlibrary.org/b/id/10521265-L.jpg",
      description: "A story about following your dreams."
    },
    {
      id: 2,
      title: "Atomic Habits",
      image: "https://covers.openlibrary.org/b/id/11153241-L.jpg",
      description: "Build good habits and break bad ones."
    }
  ]);

  const [newBook, setNewBook] = useState({
    title: "",
    image: "",
    description: ""
  });

  const [selectedBook, setSelectedBook] = useState(null);

  // Add Book
  const handleAddBook = () => {
    if (!newBook.title || !newBook.image || !newBook.description) return;

    const book = {
      id: Date.now(),
      ...newBook
    };

    setBooks([...books, book]);
    setNewBook({ title: "", image: "", description: "" });
  };

  // Delete Book
  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    if (selectedBook?.id === id) setSelectedBook(null);
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">

        {/* Header */}
        <div className="mt-28 text-center">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Books Collection <span className="text-pink-500">📚</span>
          </h1>

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700">
              Back
            </button>
          </Link>
        </div>

        {/* Add Book */}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Book Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={newBook.image}
              onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Description"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              className="border p-2 rounded"
            />
          </div>

          <button
            onClick={handleAddBook}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Book
          </button>
        </div>

        {/* Selected Book Info */}
        {selectedBook && (
          <div className="mt-10 p-6 border rounded-lg bg-white shadow">
            <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
            <img
              src={selectedBook.image}
              alt={selectedBook.title}
              className="w-60 mt-4 rounded"
            />
            <p className="mt-4 text-gray-700">{selectedBook.description}</p>
          </div>
        )}

        {/* Books Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedBook(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md"
              />

              <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent opening details
                  handleDelete(item.id);
                }}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default Course;