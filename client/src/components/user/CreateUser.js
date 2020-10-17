import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Message, TextArea,  Divider } from 'semantic-ui-react'
import { createUser } from '../../actions'
import { connect } from 'react-redux';
import uuid from 'uuid';
import GoogleAuth from '../../GoogleAuth';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.id = uuid();
    }
    componentDidMount() {
        this.props.initialize(this.props.initialValues);
    }

    onSignUpClick = () => {

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

    renderInput = ({input, label, meta}) => {
        const classes = meta.error && meta.touched ? 'error' : '';
        return (
            <Form.Field>
                <label>{label}</label>
                <Form.Input className={classes} {...input} autoComplete='off'/>
                {this.renderError(meta)}
            </Form.Field>
        )
    }

    renderCheckbox = ({input, label}) => {
        return (
            <Form.Field>
                <Form.Checkbox label={label} {...input}/>
            </Form.Field>
        )
    }

    renderTextarea = ({input, label, placeholder}) => {
        return (
            <Form.Field>
                <label>{label}</label>
                <TextArea  {...input} placeholder={placeholder}/>
            </Form.Field>
        )
    }
    onSumbit = (formValues) => {
        this.props.createUser({...formValues, userId: this.id});
    }
    render(){
        return (
            <>
                <h2>Create your account</h2>
                <h3>{'We recommend to Sing up with Google account - '}<GoogleAuth text="Sign Up" size="tiny"/></h3>
                <Divider />
                <h3>Or you can create account using your Email</h3>
                <Form onSubmit={this.props.handleSubmit(this.onSumbit)}>
                    <Form.Group widths='4'>
                        <Field name='email' label='Email' component={this.renderInput}/>
                    </Form.Group>
                    <Form.Group widths='4'>
                        <Field name='password' label='Enter Password' component={this.renderInput} />
                    </Form.Group>
                    <Form.Button content='Sign Up' />
                </Form>
            </>
        )
    }
}

const validate = formValues => {
    const errors = {};
    
    if(!formValues.name) errors.name = 'You must enter a Full Name';
    if(!formValues.email) errors.email = 'You must enter a Email';
    if(!formValues.profession) errors.profession = 'You must enter a profession';
    if(!formValues.description) errors.description = 'You must enter a description';
    if(!formValues.avatarUrl) errors.avatarUrl = 'You must enter a avatar Url';

    return errors;
}



export default connect(null, { createUser })(reduxForm({
    validate,
    form: 'createUserForm'
})(CreateUser)); 