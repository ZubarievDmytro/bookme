import React from 'react'
import { Menu, Loader, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { SignIn, SignOut, fetchUsers, createUser } from './actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '933713769986-sc19lpemkpj7p3kmq4l4d1knekrr1q7i.apps.googleusercontent.com',
                scope: 'profile email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            const userInfo = this.auth.currentUser.get();
            const id = userInfo.getId();
            let user = this.props.users.filter(user => user.userId === id);
            
            if (!user[0]) {
                const name = userInfo.getBasicProfile().getName();
                const userData = {
                    id,
                    name,
                    "userId": id,
                    "title": name
                }
                this.props.createUser(userData);
            }
            this.props.SignIn(id);
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
        users: Object.values(state.users)
    }
}

export default connect(mapStateToProps, { SignIn, SignOut, fetchUsers, createUser })(GoogleAuth);