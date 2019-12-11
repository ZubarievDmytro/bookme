import React from 'react';
import _ from 'lodash';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserForm from '../user/UserForm';
import { updateUser } from '../../actions'

class DashboardEdit extends React.Component {
    state = { user: null }

    onSubmit = formValues => {
        this.props.updateUser(formValues, this.props.match.params.id);
    }

    renderForm (){
        const { user } = this.props;
        if (_.isEmpty(user)) return null;
        if (this.props.isSignedIn === '') return <Loader active size={'large'}/>;
        if (this.props.isSignedIn === false) return 'You aren\'t signed in';
        return (
            <Grid columns='two' divided>
                <Grid.Column width={8}>      
                    <UserForm 
                        onSubmit={this.onSubmit} 
                        initialValues={_.pick(user, 'avatarUrl', 'description', 'name',  'profession')}
                    />
                </Grid.Column>
            </Grid>
        )
    }

    render (){
        return (
            <div>
                <h1>Update Your profile</h1>
                {this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        user: state.users[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { updateUser })(DashboardEdit); 