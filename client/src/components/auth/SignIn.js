import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react'
import AuthForm from './AuthForm';
import { connect } from 'react-redux';
import { signIn } from '../../actions'

class SignIn extends Component {
    onSubmit = () => {
        this.props.signIn(this.props.auth.values);
    }

    render(){
        return (
            <>
                <h2>Sign in to your account</h2>
                {/* <GoogleAuth text="Sign In with Google" size="tiny"/> */}
                <Divider />
                <AuthForm type="signin" errorText={this.props.error} onSubmit={this.onSubmit} buttonText="Sign In"/>
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

export default connect(mapStateToProps, { signIn })(SignIn); 