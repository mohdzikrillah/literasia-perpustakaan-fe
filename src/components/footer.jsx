import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <>
        <footer className="border-t-2 p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
          <div className="mx-auto max-w-screen-xl text-center">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              ©{" "}
              <Link to={"#"} className="hover:underline">
                2025
              </Link>
               . Literasia
            </span>
          </div>
        </footer>
        </>
    )
}