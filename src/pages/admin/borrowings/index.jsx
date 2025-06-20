import { useEffect, useState } from "react";
import { getBooks } from "../../../_sevices/books";
import { Link } from "react-router-dom";
import { getUser } from "../../../_sevices/auth";
import { deleteBorrowings, getBorrowings } from "../../../_sevices/borrowings";

export default function AdminBorrow() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [borrowings, setBorrowings] = useState([]);





  useEffect(()=>{
    const fetchData = async () => {
      const [booksData, userData, borrowData] = await Promise.all([
        getBooks(),
        getUser(),
        getBorrowings(),


      ])

      setBooks(booksData),
      setUsers(userData),
      setBorrowings(borrowData)


    }
    fetchData()
  },[])
  console.log(books);
  console.log(users);
  console.log(borrowings);


  const getUserName =(id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : "Unknown user";
  }

  const getBookName =(id) => {
    const book = books.find((book) => book.id === id);
    return book ? book.title : "Unknown author";
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure will delete");

    if (confirmDelete) {
      await deleteBorrowings(id);
      setBorrowings(borrowings.filter((borrow) => borrow.id !== id));

    }
  }



  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                Borrow Report
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Usernama
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Buku
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Jumlah Buku
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Tanggal Pinjam
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {borrowings.length > 0 ?
                  borrowings.map((borrow) =>(

                  
                  <tr key={borrow.id} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {getUserName(borrow.user_id)}
                    </th>
                    <td className="px-4 py-3">{getBookName(borrow.book_id)}</td>
                    <td className="px-4 py-3">{borrow.lostOfBook}</td>
                    <td className="px-4 py-3">{borrow.borrowing_date}</td>
                    <td className="px-4 py-3">{borrow.status}</td>
                    <td className="px-4 py-3">
                    <button
                    onClick={() => handleDelete(borrow.id)}
                    className="block py-2 px-4 text-sm text-red-700 hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-200 dark:hover:text-white"
                    >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-red-500 transition duration-75 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4v10a2 2 0 002 2h8a2 2 0 002-2V5h.5a.5.5 0 000-1H15V3a1 1 0 00-1-1H6zm1 4a.5.5 0 011 0v8a.5.5 0 01-1 0V6zm4 0a.5.5 0 011 0v8a.5.5 0 01-1 0V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    </button>
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
