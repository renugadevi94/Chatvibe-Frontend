
import React, { useEffect } from "react";
//import "./reset.css";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../components/textField/TextField";
import * as Yup from "yup";
import { FaRocketchat } from "react-icons/fa";

const Reset = () => {
  const { handleReset, setResetToken, isLoading } = useContext(DataContext);

  const { id } = useParams();

  useEffect(() => {
    setResetToken(id);
  });

  const validate = Yup.object({
    password: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Must Match")
      .required("Required"),
  });

  return (
    <section className='login'>
      <div className=' p-5'>
        <div className='container d-flex justify-content-center'>
          <div className='register__form'>
            <h1
              style={{ color: "var(--theme)" }}
              className='text-center'
            >
              <FaRocketchat /> Chat Buddy
            </h1>
            <Formik
              initialValues={{
                password: "",
                cPassword: "",
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                handleReset(values);
                resetForm({ values: "" });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className='detailCards'>
                    <h2
                      style={{ color: "var(--theme" }}
                      className='text-center'
                    >
                      Reset Password
                    </h2>
                    <TextField
                      label='Password'
                      name='password'
                      id='password'
                      type='password'
                      placeholder='Enter Your Password'
                    />
                    <TextField
                      label='Password'
                      name='cPassword'
                      id='cPassword'
                      type='password'
                      placeholder='Confirm Your Password'
                    />
                    <div className='text-center mt-3'>
                      <button
                        className='text-white button rounded'
                        type='submit'
                      >
                        {isLoading ? (
                          <span className='spinner-border spinner-border-sm text-warning'></span>
                        ) : (
                          <span>Reset Password</span>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className='text-center'>
              <Link
                to={"/login"}
                className='text-white btn btn-success button rounded mt-3'
              >
                Go Back To Login
              </Link>
            </div>
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
      </div>
    </section>
  );
};

export default Reset;
