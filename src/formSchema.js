import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, 'The name must be at least two characters long')
    .required('Name is a required field'),
  size: yup.string().ensure().required('Picking a pizza size is required'),
  instructions: yup.string().trim(),
});

export default schema;
