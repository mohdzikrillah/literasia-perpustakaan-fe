import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/public"
import PublicLayout from "./layouts/public"
import Books from "./pages/public/books"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./layouts/admin"
import Dashboard from "./pages/admin"
import AdminBooks from "./pages/admin/books"
import BookCreate from "./pages/admin/books/create"
import AdminAuthors from "./pages/admin/authors"
import CreateAuthor from "./pages/admin/authors/create"
import BookEdit from "./pages/admin/books/edit"
import EditAuthor from "./pages/admin/authors/edit"
import ShowBook from "./pages/public/books/show"
import AdminCategory from "./pages/admin/categories"
import CategoryCreate from "./pages/admin/categories/create"
import EditCategory from "./pages/admin/categories/edit"
import AdminUser from "./pages/admin/users"
import BorrowHistory from "./pages/public/books/borrowHistory"
import EditUser from "./pages/admin/users/edit"
import AdminBorrow from "./pages/admin/borrowings"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="books">
            <Route index element={<Books/>}/>
            <Route path="show/:id" element={<ShowBook/>}/>
          </Route>
          <Route path="/borrow_history" element={<BorrowHistory/>}/>
        </Route>
        

        {/* Auth */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        {/* admin */}
        <Route path="admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>

          <Route path="books">
            <Route index element={<AdminBooks/>}/>
            <Route path="create" element={<BookCreate/>}/>
            <Route path="edit/:id" element={<BookEdit/>}/>
          </Route>
          <Route path="authors">
            <Route index element={<AdminAuthors/>}/>
            <Route path="create" element={<CreateAuthor/>}/>
            <Route path="edit/:id" element={<EditAuthor/>}/>
          </Route>
          <Route path="categories">
            <Route index element={<AdminCategory/>}/>
            <Route path="create" element={<CategoryCreate/>}/>
            <Route path="edit/:id" element={<EditCategory/>}/>
          </Route>
          <Route path="users">
            <Route index element={<AdminUser/>}/>
            <Route path="edit/:id" element={<EditUser/>}/>
          </Route>
          <Route path="borrowings">
            <Route index element={<AdminBorrow/>}/>
            <Route path="edit/:id" element={<EditUser/>}/>
          </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
