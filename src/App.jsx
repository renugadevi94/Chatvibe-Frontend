import { useContext, useState } from "react";
import Register from "./pages/Register";
import "./App.css";
import DataContext from "./context/DataContext";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Chat from "./pages/Chat";
import ReportBug from "./pages/ReportBug";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Logout from "./pages/Logout";
import Reset from "./pages/Reset";
import ConfirmUser from "./pages/ConfirmUser";
//import SupportDev from "./pages/supportDev/SupportDev";

function App() {
  const { loggedUser } = useContext(DataContext);
  return (
    <>
      <Routes>
        {!loggedUser && (
          <>
            <Route
              path='/'
              element={<Login />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/forgot'
              element={<Forgot />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/resetpassword/:id'
              element={<Reset />}
            />
            <Route
              path='/confirm/:id'
              element={<ConfirmUser />}
            />
            <Route
              path='/*'
              element={<Logout />}
            />
          </>
        )}
        {loggedUser && (
          <>
            <Route
              path='/'
              element={<Chat />}
            />
            <Route
              path='/chat'
              element={<Chat />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='/reportbug'
              element={<ReportBug />}
            />
            <Route
              path='/editProfile'
              element={<EditProfile />}
            />
            {/* <Route
              path='/supportdev'
              element={<SupportDev />}
            /> */}
            <Route
              path='/*'
              element={<Logout />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;