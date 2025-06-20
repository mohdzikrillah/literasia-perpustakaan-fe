import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthors } from "../../../_sevices/author";
import { showBook, updateBook } from "../../../_sevices/books";
import { getCategories } from "../../../_sevices/category";

export default function BookEdit() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormdata] = useState({
      title: "",
      available_stock: 0,
      category_id: 0,
      author_id:0,
      book_cover:null,
      synopsis: "",
      });

      useEffect(() => {
        const fetchData =async () => {
          const [categoryData, authorData, bookData] = await Promise.all([
          getCategories(),
          getAuthors(),
          showBook(id)
        ]);

        console.log("bookData:", bookData);

        setCategories(categoryData);
        setAuthors(authorData);
        setFormdata({
          title: bookData.data.title,
          available_stock: bookData.data.available_stock,
          category_id: bookData.data.category_id,
          author_id: bookData.data.author_id,
          book_cover: bookData.data.book_cover,
          synopsis: bookData.data.synopsis,
          _method: "PUT"
        })
      };

      fetchData();
    }, [id])

    console.log("form data",formData)
    
    const handleChange = (e) => {
      const {name, value, files} = e.target;

      if (name === "book_cover") {
        setFormdata({
          ...formData,
          book_cover: files[0]
        });
      }else {
        setFormdata({
        ...formData,
        [name]: value,
      })
      };
    }


    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const payload = new FormData();
        for (const key in formData) {
          if (key === "book_cover"){
            if (formData.book_cover instanceof File) {
              payload.append("book_cover", formData.book_cover);
            } 
          } else {
              payload.append(key, formData[key]);
            }
          }
      await updateBook(id, payload);
      navigate("/admin/books")
      } catch (error) {
        console.log(error);
        alert("edit book error")
      }
    };

    const handleReset = () => {
      setFormdata({
        title: "",
        available_stock: 0,
        category_id: 0,
        author_id:0,
        book_cover:null,
        synopsis: "",
      });
    };


  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Book
          </h2>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  htmlFor="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Book title"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="available_stock"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="available_stock"
                  id="available_stock"
                  value={formData.available_stock}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Stock"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category ID
                </label>
                <select
                  type="number"
                  name="category_id"
                  id="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="">--select category--</option>
                  {categories.map((categories) =>(
                    <option key={categories.id} value={categories.id}>{categories.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="author_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author ID
                </label>
                <select
                  type="number"
                  name="author_id"
                  id="author_id"
                  value={formData.author_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="">--select author--</option>
                  {authors.map((authors) =>(
                    <option key={authors.id} value={authors.id}>{authors.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="book_cover"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cover
                </label>
                <input
                  type="file"
                  name="book_cover"
                  id="book_cover"
                  accept="image/* "
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 "
                >
                
                </input>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="synopsis"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  synopsis
                </label>
                <textarea
                  id="synopsis"
                  name="synopsis"
                  rows="6"
                  value={formData.synopsis}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Write a book synopsis here..."
                >
                  
                </textarea>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save book
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