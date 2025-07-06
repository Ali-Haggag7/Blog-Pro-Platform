import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import Login from "./pages/forms/Login"
import Register from "./pages/forms/Register"
import PostsPage from "./pages/posts-page/PostsPage"
import CreatePosts from "./pages/create-post/CreatePost"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Footer from "./components/footer/Footer"
import PostDetails from "./pages/post-details/PostDetails"
import Category from "./pages/category/Category"
import Profile from "./pages/profile/Profile"
import UsersTable from "./pages/admin/UsersTable"
import PostsTable from "./pages/admin/PostsTable"
import CategoriesTable from "./pages/admin/CategoriesTable"
import CommentsTable from "./pages/admin/CommentsTable"
import ForgotPassword from "./pages/forms/ForgotPassword"
import ResetPassword from "./pages/forms/ResetPassword"
import NotFound from "./pages/not-found/NotFound"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import VerifyEmail from "./pages/verify-email/VerifyEmail"
import { useEffect } from "react"

function App() {
  const { user } = useSelector(state => state.auth)
  const { mode } = useSelector(state => state.theme)

  useEffect(() => {
    document.body.className = mode
  }, [mode])

  return (
    <div className={mode}>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="posts">
            <Route index element={<PostsPage />} />
            <Route path="create-post" element={user ? <CreatePosts /> : <Navigate to="/" />} />
            <Route path="details/:id" element={<PostDetails />} />
            <Route path="categories/:category" element={<Category />} />
          </Route>
          <Route path="admin-dashboard">
            <Route index element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />} />
            <Route path="posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />} />
            <Route path="categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />} />
            <Route path="comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App