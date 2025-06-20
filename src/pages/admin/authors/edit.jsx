import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_sevices/author";

export default function EditAuthor(){
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
      name: "",
      authors_history: "",
      });

      useEffect(() => {
        const fetchData =async () => {
          const [ authorData] = await Promise.all([
          showAuthor(id)
        ]);

        console.log("authorData:", authorData);

        setFormdata({
          name: authorData.data.name,
          authors_history: authorData.data.authors_history,
          _method: "PUT"
        })
      };

      fetchData();
    }, [id])

    console.log("form data",formData)
    
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

      await updateAuthor(id, payload);
      navigate("/admin/authors")
      } catch (error) {
        console.log(error);
        alert("edit author error")
      }
    };

    const handleReset = () => {
      setFormdata({
        name: "",
        authors_history: "",
      });
    };


  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Author
          </h2>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="grid gap-4 mb-4 sm:grid-cols-1 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  htmlFor="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="authors_history"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  authors_history
                </label>
                <input
                  type="text"
                  name="authors_history"
                  id="authors_history"
                  value={formData.authors_history}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="authors_history"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save author
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