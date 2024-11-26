import React, { useContext, useState } from "react";
import "./editprofile.css";
import DataContext from "../context/DataContext";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../components/textField/TextField";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { FaRocketchat } from "react-icons/fa";

const EditProfile = () => {
  const {
    handleProfileUpdate,
    handlePasswordUpdate,
    handlePictureUpdate,
    loggedUser,
    isLoading,
  } = useContext(DataContext);

  const [profileImage, setProfileImage] = useState();

  const validate = Yup.object({
    username: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
    phone: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(10, "Must be at least 10 Characters")
      .required("Required"),
  });

  const validate2 = Yup.object({
    oldpassword: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    password: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Must Match")
      .required("Required"),
  });

  const savePicture = async (e) => {
    e.preventDefault();
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
        image.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        // First save image to cloudinary
        const response = await fetch(`${import.meta.env.VITE_URL}`, {
          method: "post",
          body: image,
        });
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        // Save Profile
        const formData = {
          email: loggedUser.email,
          photo: imageURL,
        };
        handlePictureUpdate(formData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section className='profile'>
      <div className='app__logo p-3 display-5'>
        <Link
          to={"/chat"}
          className=' text-white text-decoration-none'
        >
          <FaRocketchat /> ChatBuddy
        </Link>
      </div>
      <div className='container mt-1 update__profile'>
        <Formik
          initialValues={{
            username: loggedUser.username,
            email: loggedUser.email,
            phone: loggedUser.phone,
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            handleProfileUpdate(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form>
              <div className='detailCards'>
                <h3 style={{ color: "var(--theme" }}>Update Profile :</h3>
                <TextField
                  label='UserName'
                  name='username'
                  id='username'
                  type='text'
                  placeholder='Enter User Name'
                />
                <TextField
                  label='Email'
                  name='email'
                  id='email'
                  type='email'
                  disabled
                />
                <TextField
                  label='Contact No'
                  name='phone'
                  id='phone'
                  type='text'
                  placeholder='Enter Contact No.'
                />
                <div className='text-center mt-3'>
                  <button
                    className='text-white button rounded'
                    type='submit'
                  >
                    {isLoading ? (
                      <span className='spinner-border spinner-border-sm text-warning'></span>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className='container mt-5 update__profile'>
        <form onSubmit={savePicture}>
          <div className='detailCards'>
            <h3 style={{ color: "var(--theme" }}>Update Picture :</h3>
            {profileImage && (
              <div className='profile__img text-center'>
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt=''
                />
              </div>
            )}
            <div className='form-group mb-3 '>
              <label
                htmlFor='photo'
                className='label__style mb-0'
              >
                Photo :
              </label>
              <div>
                <input
                  className={`form-control shadow-none `}
                  type='file'
                  id='photo'
                  name='photo'
                  multiple={false}
                  accept='image/*'
                  required
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className='text-center mt-3'>
              <button
                className='text-white button rounded'
                type='submit'
              >
                {isLoading ? (
                  <span className='spinner-border spinner-border-sm text-warning'></span>
                ) : (
                  "Update Picture"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='container mt-5 update__profile'>
        <Formik
          initialValues={{
            oldpassword: "",
            password: "",
            cPassword: "",
          }}
          validationSchema={validate2}
          onSubmit={(values, { resetForm }) => {
            handlePasswordUpdate(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form>
              <div className='detailCards'>
                <h3 style={{ color: "var(--theme" }}>Update Password :</h3>
                <TextField
                  label='Old Password'
                  name='oldpassword'
                  id='oldpassword'
                  type='password'
                  placeholder='Enter Old Password'
                />
                <TextField
                  label='Password'
                  name='password'
                  id='password'
                  type='password'
                  placeholder='Enter Password'
                />
                <TextField
                  label='Confirm Password'
                  name='cPassword'
                  id='cPassword'
                  type='password'
                  placeholder='Confirm Password'
                />
                <div className='text-center mt-3'>
                  <button
                    className='text-white button rounded'
                    type='submit'
                  >
                    {isLoading ? (
                      <span className='spinner-border spinner-border-sm text-warning'></span>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className='d-flex justify-content-center flex-column align-items-center gap-2 mt-4 '>
          <Link
            to='/chat'
            className='text-white button rounded noline'
          >
            Go back to Chat
          </Link>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </section>
  );
};

export default EditProfile;