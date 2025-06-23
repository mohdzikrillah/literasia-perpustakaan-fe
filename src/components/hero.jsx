import buku from '../assets/buku.jpg';

export default function Hero(){

    return(
        <>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-10 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12">
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch justify-between px-4 md:px-16 lg:px-24 py-10 gap-8">
              {/* Bagian Gambar */}
              <div className="lg:w-1/2 flex justify-center items-center h-full">
                <img
                  src={buku}
                  alt="Ilustrasi Buku"
                  className="h-full object-contain max-h-[500px] w-auto"
                />
              </div>
              
              {/* Bagian Teks */}
              <div className="lg:w-1/2 text-center lg:text-left flex flex-col justify-center h-full">
                <h1 className="mb-4 text-xl font-semibold tracking-normal leading-snug text-gray-800 md:text-2xl lg:text-3xl dark:text-white">
                  Selamat Datang di Perpustakaan Literasia
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 transition-all duration-500 ease-in-out hover:text-gray-700 dark:hover:text-gray-200">
                  Perpustakaan ini hadir sebagai pusat layanan informasi dan ilmu pengetahuan, 
                  <br />mendukung kebutuhan akademik dan pengembangan literasi seluruh civitas. 
                  <br />Melalui layanan daring ini, kami berkomitmen memberikan akses mudah terhadap koleksi digital dan berbagai kegiatan literasi.
                  <br />Mari bersama kita tumbuhkan budaya membaca, berpikir kritis, dan belajar sepanjang hayat.
                </p>
              </div>
            </div>

            <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
              <span className="font-semibold text-gray-400 uppercase">
                E-PERPUSTAKAAN
              </span>
              <div className="flex flex-col items-center mt-8 text-gray-700 dark:text-gray-300">
                {/* Ikon Utama */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m0 0a6 6 0 00-6-6H4V6a2 2 0 012-2h6a2 2 0 012 2zM12 18a6 6 0 016-6h2V6a2 2 0 00-2-2h-6a2 2 0 00-2 2"
                  />
                </svg>

                {/* Tautan dengan ikon */}
                <div className="flex flex-wrap justify-center sm:justify-between font-semibold text-lg tracking-wide">
                  <a
                    href="https://www.perpusnas.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mr-6 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {/* Ikon Perpusnas */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m0 0a6 6 0 00-6-6H4V6a2 2 0 012-2h6a2 2 0 012 2z"
                      />
                    </svg>
                    Perpusnas RI
                  </a>

                  <a
                    href="https://www.eperpus.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mr-6 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {/* Ikon ePerpus */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 19.5A2.5 2.5 0 006.5 22H18m-2-5v2.5a2.5 2.5 0 002.5 2.5H20V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13.5z"
                      />
                    </svg>
                    ePerpus
                  </a>

                  <a
                    href="https://www.perpus.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {/* Ikon Perpus.org */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5h12M9 3v2m-6 4h12M9 7v2m-6 4h12M9 11v2"
                      />
                    </svg>
                    Perpus.org
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
        </>
    )
}