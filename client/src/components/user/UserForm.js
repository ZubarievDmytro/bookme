import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import { CheckboxField } from 'react-semantic-redux-form';
import ScheduleSelector from '../layout/ScheduleSelector';

class UserForm extends Component {
  componentDidMount() {
    const { initialValues, initialize } = this.props;
    initialize(initialValues);
  }

  renderInput = ({ input, label, meta }) => {
    const classes = meta.error && meta.touched ? 'error' : '';
    const { name, value, onBlur: onBlurProp, onChange: onChangeProp } = input;
    return (
      <Form.Field>
        <Form.Input
          label={label}
          id={label}
          name={name}
          className={classes}
          onBlur={(e) => onBlurProp(e)}
          onChange={(e) => onChangeProp(e)}
          value={value}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </Form.Field>
    );
  };

  onSumbit = (formProps) => {
    const { onSubmit } = this.props;
    onSubmit(formProps);
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      );
    }
    return null;
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSumbit)}>
        <Field name="name" label="Full Name" component={this.renderInput} />
        <Field
          name="profession"
          label="Job Title"
          component={this.renderInput}
        />
        <Field
          name="description"
          label="Description"
          component={this.renderInput}
        />
        <Field
          name="avatarUrl"
          label="Avatar URL"
          component={this.renderInput}
        />
        <ScheduleSelector />
        <Field
          value=""
          name="visible"
          label="Make me visible"
          component={CheckboxField}
        />
        <Form.Button content="Save Information" />
      </Form>
    );
  }
}

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
