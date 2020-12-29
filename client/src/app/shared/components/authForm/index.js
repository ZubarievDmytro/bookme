import { reduxForm } from 'redux-form';
import AuthForm from './AuthForm';

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) errors.email = 'You must enter a Email';
  if (!formValues.password) errors.password = 'You must enter a password';

  return errors;
};

export default reduxForm({
  validate,
  form: 'authUserForm',
})(AuthForm);
