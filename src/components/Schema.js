import * as yup from 'yup';

export default yup.object().shape({
        name: yup
          .string()
          .required("Name is required")
          .min(3, "name must be at least 2 characters"),
        email: yup
          .string()
          .email("must be a valid email")
          .required("email is required"),
        phone: yup
        .string()
        .max(10, 'cannot exceed 10 numbers')
        .required('must enter valid phone number'),
      textarea: yup
        .string(),
        size: yup
        .string()
        .oneOf(['small', 'medium', 'large', 'xl']),
        sauce: yup
          .string()
        .required('must choose one'),
        
        pepperoni: yup
        .boolean(),
        // .oneOf([true]),
        pineapple: yup
        .boolean(),
        // .oneOf([true]),
        sausage: yup
        .boolean(),
        // .oneOf([true]),
        greenPeppers: yup
        .boolean(),
        // .oneOf([true]),
        mushrooms: yup
        .boolean(),
        // .oneOf([true]),
        jalepenos: yup
        .boolean(),
        // .oneOf([true]),
      });