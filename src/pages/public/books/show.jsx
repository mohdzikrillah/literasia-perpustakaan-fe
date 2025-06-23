import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { showBook } from "../../../_sevices/books";
import { bookImageStorage } from "../../../_api";
import { createBorrowings } from "../../../_sevices/borrowings";

export default function ShowBook() {

  const {id} = useParams();
  const [book, setBook] = useState({});
  const [lostOfBook] = useState(1)


  const navigate =useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));



  useEffect(() => {
    const fetchData = async () => {
      const[bookData] = await Promise.all([
        showBook(id),
        
      ])
      console.log(bookData)
      setBook(bookData.data);
    }

    fetchData()
    console.log("User ID yang mengakses halaman ini:", userInfo.id);
  }, [userInfo.id])


  const handleSubmit = async(e) => {
        e.preventDefault();

        try {
          const payload = {
            book_id: id,
            user_id: userInfo.id,
            lostOfBook: lostOfBook
          }
          if (lostOfBook >= book.available_stock) {
              alert("Stock tidak tersedia atau tidak cukup.")
              navigate("/books")
            }
          await createBorrowings(payload);
          alert("Transaksi berhasil !. Waktu peminjama hanya 7 hari, jika telat anda akan kena denda Rp. 5000 per hari. Terima kasih")
          navigate("/books")
        } catch (error) {
          console.log(error);
          throw error
        }
      };

      console.log(lostOfBook)
      console.log(userInfo.id)


  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full"
                src={`${bookImageStorage}/${book.book_cover}`}
                alt=""
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {book.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-base font-normal text-gray-900 sm:text-lg dark:text-white">
                  Stok tersedia: {book.available_stock}
                </p>
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800"/>
              Sinopsis: <br />
              {book.synopsis}

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <form 
                onSubmit={handleSubmit} 
                className="mt-6 sm:mt-8 space-y-4">
                  <button
                    type="submit"
                    className="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center"
                    >
                    Pinjam
                  </button>
                </form>
              </div>
            </div>
          </div>
          <Outlet/>
        </div>
      </section>
    </>
  );
}
