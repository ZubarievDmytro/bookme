import { reduxForm } from 'redux-form';
import UserForm from './UserForm';

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) errors.name = 'You must enter a Full Name';
  if (!formValues.profession) errors.profession = 'You must enter a profession';

  return errors;
};

export default reduxForm({
  validate,
  form: 'userForm',
})(UserForm);
