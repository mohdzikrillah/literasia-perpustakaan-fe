import { useEffect, useState } from "react";
import { deleteBook, getBooks } from "../../../_sevices/books";
import { getAuthors } from "../../../_sevices/author";
import { Link } from "react-router-dom";
import { getCategories } from "../../../_sevices/category";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthor] = useState([]);

  const [openDropdownId, setOpenDropdwnId] = useState(null);




  useEffect(()=>{
    const fetchData = async () => {
      const [booksData, categegoriesData, authorData] = await Promise.all([
        getBooks(),
        getCategories(),
        getAuthors(),


      ])

      setBooks(booksData),
      setCategories(categegoriesData)
      setAuthor(authorData)


    }
    fetchData()
  },[])
  console.log(books);
  console.log(categories);
  console.log(authors);


  const getCategoryName =(id) => {
    const category = categories.find((categories) => categories.id === id);
    return category ? category.name : "Unknown category";
  }

  const getAuthorName =(id) => {
    const author = authors.find((author) => author.id === id);
    return author ? author.name : "Unknown author";
  }

  const toggleDropdwn =(id) => {
    setOpenDropdwnId(openDropdownId === id ? null :id)
  }
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure will delete");

    if (confirmDelete) {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));

    }
  }



  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                Book Report
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link
                to={`/admin/books/create`}
                  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add Book
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Stock
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Cover Photo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Author
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {books.length > 0 ?
                  books.map((book) =>(

                  
                  <tr key={book.id} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {book.title}
                    </th>
                    <td className="px-4 py-3">{book.available_stock}</td>
                    <td className="px-4 py-3">{book.book_cover}</td>
                    <td className="px-4 py-3">{getCategoryName(book.category_id)}</td>
                    <td className="px-4 py-3">{getAuthorName(book.author_id)}</td>
                    <td className="px-4 py-3 flex items-center justify-end relative">
                      <button
                        id={`dropdown-button-${book.id}`}
                        onClick={() => toggleDropdwn(book.id)}
                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>

                      {openDropdownId === book.id && (
                      <div
                        id="dropdown"
                        className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        style={{ top: "100%", right:"0" }}
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby={`dropdown-button-${book.id}`}
                        >
                          <li>
                            <Link
                              to={`/admin/books/edit/${book.id}`}
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </Link>
                          </li>
                        </ul>
                        <div className="py-1">
                          <button
                          onClick={() => handleDelete(book.id)}
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      )}
                    </td>
                  </tr>
                  )) : (
                    <tr>
                      <td  className="text-center py-4 text-gray-500">
                      Data tidak ditemukan
                      </td>
                    </tr>
                  )
                  } 
                </tbody>
              </table>
            </div>
          </div>
      </section>
    </>
  );
}
