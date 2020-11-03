import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { clearAuthError } from '../../actions';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.id = uuid();
  }

  componentDidMount() {
    const { clearAuthError: clearAuthErrorProp } = this.props;
    clearAuthErrorProp();
  }

  renderInput = ({ input, label, meta, type = 'text' }) => {
    const classes = meta.error && meta.touched ? 'error' : '';
    const { name, value, onBlur: onBlurProp, onChange: onChangeProp } = input;
    return (
      <Form.Field>
        <Form.Input
          id={label}
          label={label}
          className={classes}
          type={type}
          autoComplete="off"
          name={name}
          onBlur={(e) => onBlurProp(e)}
          onChange={(e) => onChangeProp(e)}
          value={value}
        />
        {this.renderError(meta)}
      </Form.Field>
    );
  };

  onSumbit = () => {
    const { onSubmit: onSubmitProp } = this.props;
    onSubmitProp();
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
    const {
      handleSubmit: handleSubmitProp,
      errorText,
      buttonText,
    } = this.props;
    return (
      <>
        <Form onSubmit={handleSubmitProp(this.onSumbit)}>
          <Form.Group widths="4">
            <Field name="email" label="Email" component={this.renderInput} />
          </Form.Group>
          <Form.Group widths="4">
            <Field
              name="password"
              label="Password"
              type="password"
              component={this.renderInput}
            />
          </Form.Group>
          {errorText && (
            <Message negative size="tiny" compact>
              <Message.Header>{errorText}</Message.Header>
            </Message>
          )}
          <Form.Button content={buttonText} />
        </Form>
      </>
    );
  }
}

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
