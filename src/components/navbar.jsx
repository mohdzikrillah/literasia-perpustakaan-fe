import { Link, useNavigate } from "react-router-dom";
import { logout } from "../_sevices/auth";
import literasiaLogo from '../assets/literasia.png';

export default function Navbar(){
  const token = localStorage.getItem("accessToken")
  const navigate =useNavigate()
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = async () => {
      if (token) {
        await logout({token, userInfo});
        navigate("/login");
      }
    }


  const handleBooksClick = (e) => {
    if (!token) {
      e.preventDefault();
      alert("Untuk mengakses halaman tersebut, anda harus login terlebih dahulu") 
      navigate("/login");
    }
  };


    return(
      <>
      <header>
        <nav className="bg-blue-600 shadow-md fixed top-0 left-0 w-full z-50 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to={"#"} className="flex items-center">
              <img
              src={literasiaLogo}
                className="mr-3 h-10 sm:h-10"
              />
            </Link>
            
            <div className="flex items-center lg:order-2">
              {token && userInfo ? (
                <>
              <Link
                to={"/admin"}
                className="bg-white text-blue-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none dark:focus:ring-gray-800"
              >
                {userInfo.username}
              </Link>
              <Link
                to={"/login"}
                onClick={handleLogout}
                className="bg-white text-blue-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none dark:focus:ring-gray-800"
              >
                Logout
              </Link>
                </>

              ):(
                <>
                <Link
                to={"login"}
                className="bg-white text-blue-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none dark:focus:ring-gray-800"
              >
                Masuk
              </Link>
              <Link
                to={"register"}
                className="bg-white text-blue-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none dark:focus:ring-gray-800"
              >
                Bergabung
              </Link>
                </>
              )}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-white rounded hover:text-gray-300 transition-colors duration-200"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleBooksClick}
                    to="/books"
                    className="block py-2 pr-4 pl-3 text-white rounded hover:text-gray-300 transition-colors duration-200"
                  >
                    Book
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleBooksClick}
                    to={"/borrow_history"}
                    className="block py-2 pr-4 pl-3 text-white rounded hover:text-gray-300 transition-colors duration-200"
                  >
                    Riwayat Peminjaman
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
    )
}