import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showUser, updateUser } from "../../../_sevices/auth";


export default function EditUser() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
      username: "",
      email:"",
      role:""

      });

      useEffect(() => {
        const fetchData =async () => {
          const [ UserData] = await Promise.all([
          showUser(id)
        ]);


        setFormdata({
          username: UserData.data.username,
          email: UserData.data.email,
          role: UserData.data.role,
          _method: "PUT"
        })
      };

      fetchData();
    }, [id])

    
    const handleChange = (e) => {
      const {name, value} = e.target;
        setFormdata({
        ...formData,
        [name]: value,
      })

    }


    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const payload = new FormData();
        for (const key in formData) {
              payload.append(key, formData[key]);
      }
      for (const [key, value] of payload.entries()) {
        console.log("kk",`${key}: ${value}`);
      };    
      await updateUser(id, payload);
      navigate("/admin/users")
      } catch (error) {
        console.log(error);
        alert("edit author error")
      }
    };

  const handleReset = () => {
      setFormdata({
        username: "",
        email: "",
        role: "",
      });
    };


  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit User
          </h2>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="grid gap-4 mb-4 sm:grid-cols-1 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  htmlFor="username"
                  type="text"
                  username="username"
                  value={formData.username}
                  onChange={handleChange}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  htmlFor="email"
                  type="email"
                  username="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-indigo-500"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <input
                  htmlFor="role"
                  type="text"
                  username="role"
                  value={formData.role}
                  onChange={handleChange}
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
              <button
                type="reset"
                className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}