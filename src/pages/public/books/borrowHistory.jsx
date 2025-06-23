import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";
import { getBorrowings } from "../../../_sevices/borrowings";
import { createReturns } from "../../../_sevices/return";

export default function BorrowHistory() {
  const [borrowings, setBorrow] = useState([]);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Ambil data user
      if (!userInfo?.id) {
        console.error("User belum login atau userInfo tidak ditemukan");
        return;
      }

      const allBorrowings = await getBorrowings(); // Ambil semua peminjaman
      const userBorrowings = allBorrowings.filter(
        (borrow) => borrow.user_id === userInfo.id // Filter berdasarkan userInfo.id
      );

      setBorrow(userBorrowings);

      userBorrowings.forEach((borrow) => {
        console.log("Borrow ID:", borrow.id);
      });
    } catch (error) {
      console.error("Gagal mengambil data peminjaman:", error);
    }
  };

  fetchData();
}, []);
// setBorrow((prev) =>
//   prev.map((borrow) =>
//     borrow.id === id ? { ...item, status: "dikembalikan", returned: true } : item
//   )
// );


  const handleSubmit = async(e, id) => {
          e.preventDefault();
          try {
            const payload = {
              borrowing_id: id
            }
            const response = await createReturns(payload);
            const updatedStatus = response?.data?.status || "dikembalikan";
            setBorrow((prev) =>
            prev.map((item) =>
              item.id === id
                ? { ...item, status: updatedStatus, returned: true }
                : item
            )
          );
            alert("Pengembalian berhasil")

          } catch (error) {
            console.log(error);
            throw error
          }
        };

        

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="pt-24 pb-8 mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            
            {borrowings.length > 0?
            borrowings.map((borrow) => (
            <div key={borrow.id} className=" ounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div>
                <img
                className="mx-auto h-full dark:hidden"
                src={`${bookImageStorage}/${borrow.book?.book_cover}`}
                alt=""/>
              </div>
              <div className="pt-6">
                <div
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                >
                {borrow.book?.title ?? 'uknnown book'}
                </div>
                <div className="sm:grid-cols-2 mt-4 flex items-center justify-between gap-4">
                  <div>
                    Status buku: <br />{borrow.status}
                  </div>

                  {console.log(borrow.id)}
                  {borrow.status?.toLowerCase().includes("dikembalikan") || borrow.status?.toLowerCase().includes("telat") ? (
                        <Link
                        to={`/books`}
                          className="inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Pinjam Lagi
                        </Link>
                      ) : (
                        <form
                        onSubmit={(e) => handleSubmit(e, borrow.id)}>


                          <button  
                            className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4  focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                            >
                              Kembalikan
                          </button>
                        </form>
                      )}
                </div>
              </div>
            </div>

            )
          ) : (
              <p>Riwayat peminjaman kosong</p>
            )}
            
          </div>
          <div className="w-full text-center">
          </div>
        </div>
      </section>
    </>
  );
}
