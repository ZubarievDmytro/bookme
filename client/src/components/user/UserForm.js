import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Message } from 'semantic-ui-react'
import { CheckboxField } from 'react-semantic-redux-form';
import ScheduleSelector from '../layout/ScheduleSelector'
class UserForm extends Component {
    componentDidMount() {
        this.props.initialize(this.props.initialValues);
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

    onSumbit = (formProps) => {
        this.props.onSubmit(formProps);
    }
    render(){
       
        return (
            <Form onSubmit={this.props.handleSubmit(this.onSumbit)}>
                <Field name='name' label='Full Name' component={this.renderInput}/>
                <Field name='profession' label='Job Title' component={this.renderInput} />
                <Field name='description' label='Description' component={this.renderInput} />
                <Field name='avatarUrl' label='Avatar URL' component={this.renderInput} />
                <ScheduleSelector />
                <Field value='' name="visible" label='Make me visible' component={CheckboxField}/>
                <Form.Button content='Save Information' />
            </Form>
        )
    }
}

const validate = formValues => {
    const errors = {};
    
    if(!formValues.name) errors.name = 'You must enter a Full Name';
    if(!formValues.profession) errors.profession = 'You must enter a profession';

    return errors;
}

export default reduxForm({
    validate,
    form: 'userForm'
})(UserForm);