import React from 'react'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserSearch from '../user/UserSearch';
import GoogleAuth from '../../GoogleAuth';
import { connect } from 'react-redux';

class MenuComponent extends React.Component {
    render(){
        return (
            <Menu>
                <Menu.Item 
                    as={Link} 
                    to='/' 
                    name="home" 
                />
                {this.props.isSignedIn && <Menu.Item as={Link} to='/dashboard' name="dashboard" />}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <UserSearch />
                    </Menu.Item>
                    <GoogleAuth />
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(MenuComponent);