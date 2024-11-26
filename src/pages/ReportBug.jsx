import React, { useContext, useRef } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../components/textField/TextField";
import TextAreaField from "../components/textField/TextAreaField";
import * as Yup from "yup";
import "./reportbug.css";
import { FaPhoneAlt, FaMailBulk, FaGithub } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import DataContext from "../context/DataContext";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";

const ReportBug = () => {
  const SERVICE = import.meta.env.VITE_SERVICE;
  const TEMPLETE = import.meta.env.VITE_TEMPLETE;
  const PUBLIC = import.meta.env.VITE_PUBLIC;

  const { isLoading } = useContext(DataContext);

  const form = useRef();

  const validate = Yup.object({
    from_name: Yup.string()
      .max(15, "should be less than 15 Characters")
      .min(3, "should be more than 3 Characters")
      .required("Required"),
    from_email: Yup.string().email("Email is Invalid").required("Required"),
    from_subject: Yup.string()
      .max(25, "should be less than 15 Characters")
      .min(6, "should be more than 6 Characters")
      .required("Required"),
    message: Yup.string()
      .max(100, "should be less than 100 Characters")
      .min(10, "should be more than 10 Characters")
      .required("Required"),
  });

  const sendEmail = () => {
    emailjs.sendForm(SERVICE, TEMPLETE, form.current, PUBLIC).then(
      (result) => {
        toast.success("Thanks for contacting us!");
      },
      (error) => {
        toast.error("Server error Please try again later!");
        console.log(error);
      }
    );
  };

  return (
    <section className='report'>
      <div className='app__logo p-3 display-5'>
        <Link
          to={"/chat"}
          className=' text-white text-decoration-none'
        >
          <FaRocketchat /> ChatBuddy
        </Link>
      </div>
      <div className='container__box contact__container'>
        <div className='box p-3 rounded text-white'>
          <h2>Our Contact Information</h2>
          <p>Fill the form or contact us via other channels listed below</p>
          <div className='info'>
            <span>
              <FaPhoneAlt /> +91-7639718893
            </span>
            <span>
              <FaMailBulk />
              usraising@gmail.com
            </span>
            <span>
              <BiCurrentLocation />
              Chennai, Tamil Nadu, India
            </span>
            <span>
              <FaGithub />
              <a
                href='https://github.com/Suriya-K7'
                target='_blank'
                className='text-white'
              >
                Suriya-K7
              </a>
            </span>
          </div>
        </div>
        <div className='mt-2 update__profile'>
          <Formik
            initialValues={{
              from_name: "",
              from_email: "",
              from_subject: "",
              message: "",
            }}
            validationSchema={validate}
            onSubmit={(values, { resetForm }) => {
              sendEmail(values);
              resetForm({ values: "" });
            }}
          >
            {(formik) => (
              <Form ref={form}>
                <div className='detailCards'>
                  <h3 style={{ color: "var(--theme" }}>Report Bug :</h3>
                  <TextField
                    label='Name'
                    name='from_name'
                    id='from_name'
                    type='text'
                    placeholder='Enter Your Name '
                  />
                  <TextField
                    label='Email'
                    name='from_email'
                    id='from_email'
                    type='email'
                    placeholder='Enter Your Email '
                  />
                  <TextField
                    label='Subject'
                    name='from_subject'
                    id='from_subject'
                    type='text'
                    placeholder='Enter Subject '
                  />
                  <TextAreaField
                    label='Message'
                    name='message'
                    id='message'
                    type='text'
                    placeholder='Enter Message'
                  />
                  <div className='text-center mt-3'>
                    <button
                      className='text-white button rounded'
                      type='submit'
                    >
                      {isLoading ? (
                        <span className='spinner-border spinner-border-sm text-warning'></span>
                      ) : (
                        "Send Mail"
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className='text-center mt-3'>
            <Link
              to={"/chat"}
              className='text-white p-2 button noline bg-success rounded'
            >
              Go Back To Chat
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
    </section>
  );
};

export default ReportBug;