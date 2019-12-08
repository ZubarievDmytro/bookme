import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Grid } from 'semantic-ui-react';
import Bookings from '../layout/Bookings';

class Dashboard extends React.Component {
    renderContent (){
        const { isSignedIn, user } = this.props;
        if (isSignedIn === false) return 'You aren\'t signed in';
        
        if (isSignedIn && user != null) {
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
                        <Button as={Link} to={`/dashboard/edit/${user.id}`}>Edit profile information</Button>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Bookings bookings={user.bookings} user={user}/>
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
        user: state.auth.user && state.users[state.auth.user.userId]
    }
}

export default connect(mapStateToProps, null)(Dashboard);