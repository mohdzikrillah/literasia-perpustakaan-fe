import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUsers, getUser } from "../../../_sevices/auth";

export default function AdminUser() {
  const [users, setUsers] = useState([]);

  const [openDropdownId, setOpenDropdwnId] = useState(null);



const toggleDropdwn =(id) => {
    setOpenDropdwnId(openDropdownId === id ? null :id)
  }
  useEffect(()=>{
    const fetchData = async () => {
      const [usersData] = await Promise.all([
        getUser(),

      ])

      setUsers(usersData)
    }
    fetchData()
  },[])
  console.log(users);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure will delete");

    if (confirmDelete) {
      await deleteUsers(id);
      setUsers(users.filter((user) => user.id !== id));

    }
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
              User Report
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Role
                    </th>

                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {users.length > 0 ?
                  users.map((user) =>(

                  
                  <tr key={user.id} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.username}
                    </th>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3 flex items-center justify-end relative">
                      <button
                        id={`dropdown-button-${user.id}`}
                        onClick={() => toggleDropdwn(user.id)}
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

                      {openDropdownId === user.id && (
                      <div
                        id="dropdown"
                        className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        style={{ top: "100%", right:"0" }}
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby={`dropdown-button-${user.id}`}
                        >
                          <li>
                            <Link
                              to={`/admin/users/edit/${user.id}`}
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </Link>
                          </li>
                        </ul>
                        <div className="py-1">
                          <button
                          onClick={() => handleDelete(user.id)}
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
