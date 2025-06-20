import { useEffect, useState } from "react";
import { getBooks } from "../../../_sevices/books";
import { Link } from "react-router-dom";
import { getAuthors } from "../../../_sevices/author";
import { getCategories } from "../../../_sevices/category";
import { bookImageStorage } from "../../../_api";


export default function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthor] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const [booksData, categoriesData, authorData] = await Promise.all([
        getBooks(),
        getCategories(),
        getAuthors(),
      ])

      setBooks(booksData)
      setCategories(categoriesData)
      setAuthor(authorData)
    }

    fetchData()
  }, [])

  const getCategoryName =(id) => {
    const category = categories.find((categories) => categories.id === id);
    return category ? category.name : "Unknown category";
  }

  const getAuthorName =(id) => {
    const author = authors.find((author) => author.id === id);
    return author ? author.name : "Unknown author";
  }
  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="pt-24 pb-8 mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            
            {books.length > 0?
            books.map((book) => (
            <div key={book.id} className=" ounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="h-56 w-full">
                <Link to={`/books/show/${book.id}`}>
                  <img
                    className="mx-auto h-full dark:hidden"
                    src={`${bookImageStorage}/${book.book_cover}`}
                    alt=""
                  />
                </Link>
              </div>
              
              <div className="pt-6">
                <Link
                  to={`/books/show/${book.id}`}
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                >
                  {book.title}
                </Link>

                <ul className="mt-2 flex items-center gap-4">
                  <li className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {getCategoryName(book.category_id)}
                    </p>
                  </li>

                  <li className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {getAuthorName(book.author_id)}
                    </p>
                  </li>
                </ul>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <Link
                  to={`/books/show/${book.id}`}    
                    className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>

            )
          ) : (
              <p>Buku tidak ditemukan</p>
            )}
            
          </div>
          <div className="w-full text-center">
          </div>
        </div>
      </section>
    </>
  );
}
