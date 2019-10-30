import React from 'react'
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Grid, Loader } from 'semantic-ui-react';
import Bookings from '../layout/Bookings';
import _ from 'lodash';

class Dashboard extends React.Component {
    state = {
        status: 'loading',
        user: null
    }

    componentDidMount = async () => {
       this.loadUser();
    }
    
    componentDidUpdate = async () => {
        this.loadUser();

        if (!this.props.isSignedIn && this.state.user != null) this.setState({user: null});
    }

    loadUser = async () => {
        if(this.props.userId && this.state.user == null) {
            const user = await fetchUser(this.props.userId);
            this.setState({status: 'loaded', user});
        }
    }
    
    renderContent (){
        if (this.props.isSignedIn === false) return 'You aren\'t signed in';
        const { user } = this.state;
        if (this.props.isSignedIn && user != null) {
            return (
                <Grid columns='two' divided>
                    <Grid.Column width={5}>
                        <Card>
                            <Image src={user.avatarUrl} wrapped ui={false} />
                            <Card.Content>
                            <Card.Header>{user.name}</Card.Header>
                            <Card.Description>
                                {user.description}
                            </Card.Description>
                            </Card.Content>
                        </Card>
                        <Button as={Link} to="/dashboard/edit">Edit profile information</Button>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Bookings bookings={user.bookings.myBookings} title="My Bookings"/>
                        <Bookings bookings={user.bookings.usersBookings} title="Users booked me"/>
                    </Grid.Column>
                </Grid>
            )
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
  
    return {
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(Dashboard);