import React, { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../components/textField/TextField";
import * as Yup from "yup";
import DataContext from "../context/DataContext";
import "./login.css";
import { Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";

const Login = () => {
  const { handleSignIn, isLoading } = useContext(DataContext);

  const validate = Yup.object({
    email: Yup.string().email("Email is Invalid").required("Required"),
    password: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
  });
  return (
    <section className='login'>
      <div className=''>
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
                password: "",
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                handleSignIn(values);
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
                      Login
                    </h2>
                    <TextField
                      label='Email'
                      name='email'
                      id='email'
                      type='email'
                      placeholder='Enter Your Email'
                    />
                    <TextField
                      label='Password'
                      name='password'
                      id='password'
                      type='password'
                      placeholder='Enter Password'
                    />
                    <div className='text-center mt-3'>
                      <button
                        className='text-white button rounded'
                        type='submit'
                      >
                        {isLoading ? (
                          <span className='spinner-border spinner-border-sm text-warning'></span>
                        ) : (
                          <span>Login</span>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className='d-flex login__btn justify-content-between'>
              <Link
                to={"/register"}
                className=' btn btn-success button rounded mt-3'
              >
                Not Registerd?
              </Link>
              <Link
                to={"/forgot"}
                className=' btn btn-success button rounded mt-3'
              >
                Forgot Password?
              </Link>
            </div>
            {/* <div className='text-center'>
              <button
                className='btn mt-2 btn btn-warning button rounded mt-3'
                data-bs-toggle='modal'
                data-bs-target='#myModal'
              >
                Demo Credentials
              </button>
            </div> */}
          </div>
        </div>
        {/* <div
          className='modal'
          id='myModal'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title'>Welcome to Chat Buddy</h4>
              </div>
              <div className='modal-body'>
                <span className='text-secondary text-justify'>
                  Chat Buddy app let Chat seamlessly with friends through text
                  and photos with our user-friendly messaging app.
                  <hr />
                  for Login use below ID or create new one: <br />
                  <span className='mx-5'> Email : demo@gmail.com</span> <br />
                  <span className='mx-5'> password : demo@123</span>
                </span>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-danger'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}
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

export default Login;