import React from 'react'
import { Menu, Loader, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { SignIn, SignOut, fetchUsers } from './actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '933713769986-sc19lpemkpj7p3kmq4l4d1knekrr1q7i.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            const user = this.props.users.filter(user => user.userId === this.auth.currentUser.get().getId());
            this.props.SignIn(user[0]);
        } else {
            this.props.SignOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === 'loading') {
            return <Menu.Item><Loader active inline size={'small'}/></Menu.Item>
        } else if(this.props.isSignedIn) {
            return <Menu.Item color='red' onClick={this.onSignOutClick}><Button color="red">Sign Out</Button></Menu.Item>
        } else {
            return <Menu.Item onClick={this.onSignInClick}><Button color="grey">Sign In</Button></Menu.Item>
        }
    }
    
    render (){
        return this.renderAuthButton(); 
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        user: state.auth.user,
        users: Object.values(state.users)
    }
}

export default connect(mapStateToProps, { SignIn, SignOut, fetchUsers })(GoogleAuth);