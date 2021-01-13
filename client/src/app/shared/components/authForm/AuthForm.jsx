import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import uuid from 'uuid';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.id = uuid();
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
    const { onSubmit } = this.props;
    onSubmit();
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
    const { handleSubmit, errorText, buttonText } = this.props;
    return (
      <>
        <Form onSubmit={handleSubmit(this.onSumbit)}>
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

export default AuthForm;
