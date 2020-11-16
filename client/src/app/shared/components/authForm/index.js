import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AuthForm from './authForm';
import { clearAuthError } from '../../../../actions';

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) errors.email = 'You must enter a Email';
  if (!formValues.password) errors.password = 'You must enter a password';

  return errors;
};

export default connect(null, { clearAuthError })(
  reduxForm({
    validate,
    form: 'authUserForm',
  })(AuthForm)
);
