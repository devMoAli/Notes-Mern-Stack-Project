import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/User/Login/Login";
import Register from "./Pages/User/Register/Register";
import Profile from "./Pages/User/Profile/Profile";
import ForgotPassword from "./Pages/User/ForgotPassword/ForgotPassword";
import NotFound from "./Pages/NotFound/NotFound";
import ResetPassword from "./Pages/User/ForgotPassword/ResetPassword";
import Home from "./Pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useSelector } from "react-redux";
import Notes from "./Components/Notes/Notes";
import NoteModal from "./Components/Navbar/AddNewNote/Modal/AddNewNoteModal";
import CategoriesPage from "./Pages/Categories/CategoriesPage";
import NoteDetailsPage from "./Pages/Notes/NoteDetailsPage";
import VerifyEmail from "./Pages/User/VerifyEmail/VerifyEmail";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          theme="colored"
          position="top-center"
          autoClose="3000"
          hideProgressBar="true"
          closeOnClick="true"
          pauseOnHover="true"
        />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPassword />}
          />

          <Route path="/profile/:id" element={<Profile />} />

          <Route path="notes">
            <Route index element={<Notes />} />
            <Route
              path="create-note"
              element={user ? <NoteModal /> : <Navigate to="/" />}
            />
            <Route path=":id" element={<NoteDetailsPage />} />
            <Route path="category/:category" element={<CategoriesPage />} />
          </Route>
          <Route
            path="/users/:userId/verify/:token"
            element={!user ? <VerifyEmail /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
