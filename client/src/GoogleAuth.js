import React from 'react'
import { Loader, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, signOut, fetchUsers, createUser } from './actions';
class GoogleAuth extends React.Component {
    componentDidMount() {
        //this.props.fetchUsers();

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
                    "title": name,
                    avatarUrl: userInfo.getBasicProfile().getImageUrl(),
                    email: userInfo.getBasicProfile().getEmail(),
                }
                this.props.createUser(userData);
            }
            this.props.signIn(id);
        } else {
            this.props.signOut();
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
            return <Loader active inline size={'small'}/>
        } else if(this.props.isSignedIn) {
            return <Button color='red' onClick={this.onSignOutClick}>Sign Out</Button>
        } else {
        return <Button onClick={this.onSignInClick} size={this.props.size}>{this.props.text}</Button>
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

export default connect(mapStateToProps, { signIn, signOut, fetchUsers, createUser })(GoogleAuth);