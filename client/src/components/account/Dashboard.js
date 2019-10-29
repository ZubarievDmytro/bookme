import React from 'react'
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Grid } from 'semantic-ui-react';
import Bookings from '../layout/Bookings';
import _ from 'lodash';

class Dashboard extends React.Component {
    componentDidMount () {
        this.props.fetchUsers();
    }
    
    renderContent (){
        const { currentUser } = this.props;
        if (this.props.isSignedIn && currentUser) {
            return (
                <Grid columns='two' divided>
                    <Grid.Column width={5}>
                        <Card>
                            <Image src={currentUser.avatarUrl} wrapped ui={false} />
                            <Card.Content>
                            <Card.Header>{currentUser.name}</Card.Header>
                            <Card.Description>
                                {currentUser.description}
                            </Card.Description>
                            </Card.Content>
                        </Card>
                        <Button as={Link} to="/dashboard/edit">Edit profile information</Button>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Bookings />
                    </Grid.Column>
                </Grid>
            )
        } else {
            return 'You aren\'t signed in'
        }
    }
    render (){
        return (
            <div>
                <h1>Dashboard</h1>
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const currentUser = Object.values(state.users).filter(user => user.userId == state.auth.userId)[0];
    return {
        userId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        currentUser
    }
}

export default connect(mapStateToProps, { fetchUsers })(Dashboard);