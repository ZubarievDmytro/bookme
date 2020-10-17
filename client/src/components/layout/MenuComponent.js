import React from 'react'
import { Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserSearch from '../user/UserSearch';
import { signOut, fetchUsers, clearSignedInUser } from '../../actions';
import { connect } from 'react-redux';

class MenuComponent extends React.Component {
    onSignOutClick = () => {
        this.props.signOut();
        this.props.clearSignedInUser();
    }

    renderButtons = () => {
        if( !this.props.isSignedIn ) {
            return (
                <>
                    <Button as={Link} to='/signin' name="Sign in">Sign in</Button>
                    <Button.Or />
                    <Button as={Link} to='/signup' name="Sign up">Sign up</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button color="red" name="Sign Out" onClick={this.onSignOutClick}>Sign Out</Button>
                </>
            )
        }
    }

    render(){
        return (
            <Menu>
                <Menu.Item 
                    as={Link} 
                    to='/' 
                    name="home" 
                />
                {this.props.userId && <Menu.Item as={Link} to='/dashboard' name="dashboard" />}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <UserSearch users={this.props.users} fetchUsers={this.props.fetchUsers}/>
                    </Menu.Item>
                    <Menu.Item>
                        <Button.Group>
                            {this.renderButtons()}
                        </Button.Group>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.token,
        userId: state.auth.userId,
        users: Object.values(state.users.usersList)
    }
}

export default connect(mapStateToProps, { signOut, fetchUsers, clearSignedInUser })(MenuComponent);