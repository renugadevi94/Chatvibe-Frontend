
import React from "react";
import { useField, ErrorMessage } from "formik";

const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='form-group mb-3 '>
      <label
        htmlFor={field.name}
        className='label__style mb-0'
      >
        {label}
      </label>
      <div>
        <textarea
          className={`form-control formInputs textarea w-100 shadow-none 
                        ${meta.touched && meta.error && "is-invalid"}`}
          autoComplete='off'
          {...field}
          {...props}
        ></textarea>
      </div>
      <ErrorMessage
        component='p'
        name={field.name}
        className='errorMessage-request'
      />
    </div>
  );
};

export default TextAreaField;
