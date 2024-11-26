import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // variables and functions

  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [head, setHead] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);

  const [config, setConfig] = useState({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  // handle signin

  const fetchProfile = async () => {
    try {
      const response = await api.get("/api/users/profile");
      setUsername(response.data.username);
      setId(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setLoggedUser(user.formatUser);
      setToken(user.token);
      setConfig({
        headers: {
          authorization: `bearer ${user.token}`,
        },
      });
    }
    api
      .get("/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSignIn = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/api/users/login", data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedUser(response.data.formatUser);
      setToken(response.data.token);
      setConfig({
        headers: {
          authorization: `bearer ${response.data.token}`,
        },
      });
      setIsLoading(false);
      navigate("/chat");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle signout

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/users/logout");
      toast.success(response.data.message);
      setWs(null);
      setToken(null);
      setLoggedUser(null);
      setUsername(null);
      setId(null);
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  // handle sign up

  const handleSignUp = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/api/users/register", data);
      toast.success(response.data.message);
      toast.success("Check your Mail & Activate");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setIsLoading(false);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      setIsLoading(false);
    }
  };

  // handle profile update

  const handleProfileUpdate = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch("/api/users/updateuser", data, config);
      const formatUser = response.data;
      const updatedData = { token, formatUser };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
      setLoggedUser(updatedData.formatUser);
      toast.success("Profile Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle profile picture update

  const handlePictureUpdate = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        "/api/users/updateuserphoto",
        data,
        config
      );
      const formatUser = response.data;
      const updatedData = { token, formatUser };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
      setLoggedUser(updatedData.formatUser);
      toast.success("Picture Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle password update

  const handlePasswordUpdate = async (data) => {
    setIsLoading(true);
    const passwordData = data;
    passwordData.email = loggedUser.email;

    try {
      await api.patch("/api/users/changepassword", passwordData, config);
      toast.success("password Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle account confirming

  const handleConfirm = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      await api.patch(`/api/users/confirm/${resetToken}`);
      toast.success("Account confirmed Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle forgot password

  const handleForgot = async (data) => {
    setIsLoading(true);

    try {
      await api.post("/api/users/forgotpassword", data);
      toast.success("Reset link send to your mail");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle password reset

  const handleReset = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        `/api/users/resetpassword/${resetToken}`,
        data
      );
      setResetToken("");
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  //handle heading

  const handleHead = (data) => {
    setHead(data);
    setToggle(false);
    localStorage.setItem("head", data);
  };

  return (
    <DataContext.Provider
      value={{
        head,
        setHead,
        loggedUser,
        setLoggedUser,
        token,
        setToken,
        resetToken,
        setResetToken,
        isLoading,
        setIsLoading,
        navigate,
        config,
        setConfig,
        handleSignIn,
        handleLogout,
        handleSignUp,
        handleProfileUpdate,
        handlePictureUpdate,
        handlePasswordUpdate,
        handleConfirm,
        handleForgot,
        handleReset,
        handleHead,
        username,
        setUsername,
        id,
        setId,
        ws,
        setWs,
        fetchProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;


