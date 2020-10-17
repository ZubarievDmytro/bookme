import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import uuid from 'uuid';
import { clearAuthError } from '../../actions'

class AuthForm extends Component {
    constructor(props) {
        super(props);

        this.id = uuid();
    }

    componentDidMount() {
        this.props.clearAuthError();
    }
    
    
    renderError({error, touched}) {
        if(touched && error) {
            return (
                <Message negative>
                    <Message.Header>{error}</Message.Header>
                </Message>
            )
        }
    }

    renderInput = ({input, label, meta, type='text'}) => {
        const classes = meta.error && meta.touched ? 'error' : '';
        return (
            <Form.Field>
                <label>{label}</label>
                <Form.Input className={classes} {...input} type={type} autoComplete='off'/>
                {this.renderError(meta)}
            </Form.Field>
        )
    }

    onSumbit = () => {
        this.props.onSubmit();
    }

    render(){
        return (
            <>
                <Form onSubmit={this.props.handleSubmit(this.onSumbit)}>
                    <Form.Group widths='4'>
                        <Field name='email' label='Email' component={this.renderInput}/>
                    </Form.Group>
                    <Form.Group widths='4'>
                        <Field name='password' label='Password' type="password" component={this.renderInput} />
                    </Form.Group>
                    {this.props.errorText && 
                        <Message negative size="tiny" compact>
                            <Message.Header>{this.props.errorText}</Message.Header>
                        </Message>
                    }
                    <Form.Button content={this.props.buttonText} />
                </Form>
            </>
        )
    }
}

const validate = formValues => {
    const errors = {};
    
    if(!formValues.email) errors.email = 'You must enter a Email';
    if(!formValues.password) errors.password = 'You must enter a password';

    return errors;
}

export default connect(null, { clearAuthError })(reduxForm({
    validate,
    form: 'authUserForm'
})(AuthForm)); 