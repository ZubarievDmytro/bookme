import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react'
import AuthForm from './AuthForm';
import { connect } from 'react-redux';
import { signUp } from '../../actions'

class SignUp extends Component {
    onSubmit = () => {
        this.props.signUp(this.props.auth.values);
    }

    render(){
        return (
            <>
                <h2>Create your account</h2>
                {/* <h3>{'We recommend to Sing up with Google account - '}<GoogleAuth text="Sign Up with Google" size="tiny"/></h3> */}
                <Divider />
                <h3>You can create account using your Email</h3>
                <AuthForm type="signup" onSubmit={this.onSubmit} errorText={this.props.error} buttonText="Sign Up"/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.form.authUserForm,
        error: state.auth.error
    }
}


export default connect(mapStateToProps, { signUp })(SignUp); 