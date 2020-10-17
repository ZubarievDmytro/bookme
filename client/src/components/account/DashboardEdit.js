import React from 'react';
import _ from 'lodash';
import { Grid, Loader, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserForm from '../user/UserForm';
import { updateUser, fetchSignedInUser, deleteUser } from '../../actions'
import { Redirect } from 'react-router-dom';
import UserModal from '../user/UserModal'

class DashboardEdit extends React.Component {
    state = {
        open: false,
        text: 'account'
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) this.props.fetchSignedInUser(this.props.userId, this.props.token);
    }
    
    onSubmit = formValues => {
        this.props.updateUser(formValues, this.props.match.params.id, this.props.token);
    }
    
    onDeleteClick = () => {
        this.setState({
            open: true
        })
    }

    onModalClick = status => {
        if (status === 'yes') {
            this.setState({
                open: false
            })
            this.props.deleteUser(this.props.match.params.id, this.props.token);
        } else {
            this.setState({
                open: false
            })
        }
    }

    renderForm (){
        const { user } = this.props;
        if (_.isEmpty(user)) return null;
        if (this.props.isSignedIn === '') return <Loader active size={'large'}/>;
        if (this.props.isSignedIn === false) return 'You aren\'t signed in';
        const {avatarUrl, description, name, profession, visible, schedule} = user;
        const initialValues = {
            avatarUrl,
            description,
            name,
            profession,
            visible,
            from: +schedule[0],
            to: +schedule[1]
        }
        return (
            <Grid columns='two' divided>
                <Grid.Column width={8}>      
                    <UserForm 
                        onSubmit={this.onSubmit} 
                        initialValues={initialValues}
                    />
                    <br/>
                    <Button content='Delete Account' negative size="tiny" onClick={this.onDeleteClick}/>
                </Grid.Column>
            </Grid>
        )
    }

    render (){
        return (
            <div>
                {!localStorage.getItem('token') && <Redirect to="/" />}
                <h1>Update Your profile</h1>
                {this.renderForm()}
                <UserModal open={this.state.open} text="account" onModalClick={this.onModalClick}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.signedInUser,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { updateUser, fetchSignedInUser, deleteUser })(DashboardEdit); 