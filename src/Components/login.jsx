import React from "react";
// import { observer } from "mobx-react";
// import { observable } from "mobx";
// import auth from "Services/Auth";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

class Login extends React.Component {

    validationSchema = Yup.object().shape({
     email: Yup.string()
       .email('E-mail is not valid!')
       .required('E-mail is required!'),
     password: Yup.string()
       .min(6, 'Password has to be longer than 6 characters!')
       .required('Password is required!')
   })
 
   render() {
     return(
       <div >
         <Formik
       validationSchema={this.validationSchema} 
           initialValues={{ email: '', password: '' }}
           // validate={values => {
           //   let errors = {};
           //   if (!values.email) {
           //     errors.email = 'Required';
           //   } else if (
           //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
           //   ) {
           //     errors.email = 'Invalid email address';
           //   }
           //   return errors;
           // }}
           onSubmit={(values, { setSubmitting }) => {
             setTimeout(() => {
               alert(JSON.stringify(values, null, 2));
               setSubmitting(false);
             }, 400);
           }}
         >
           {({ isSubmitting }) => (
             <Form>
               <Field type="email" name="email" />
               <ErrorMessage name="email" component="div" />
               <Field type="password" name="password" />
               <ErrorMessage name="password" component="div" />
               <button type="submit" disabled={isSubmitting}>
                 Submit
           </button>
             </Form>
           )}
         </Formik>
       </div>
     );
   };
 }
 
 export default Login;