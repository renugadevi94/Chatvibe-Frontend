import React, { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../components/textField/TextField";
import * as Yup from "yup";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";

const Forgot = () => {
  const { handleForgot, isLoading } = useContext(DataContext);

  const validate = Yup.object({
    email: Yup.string().email("Email is Invalid").required("Required"),
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
                email: "",
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                handleForgot(values);
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
                      Forgot Password
                    </h2>
                    <TextField
                      label='Email'
                      name='email'
                      id='email'
                      type='email'
                      placeholder='Enter Your Email'
                    />
                    <div className='text-center mt-3'>
                      <button
                        className='text-white button rounded'
                        type='submit'
                      >
                        {isLoading ? (
                          <span className='spinner-border spinner-border-sm text-warning'></span>
                        ) : (
                          <span>Forgot Password</span>
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

export default Forgot;