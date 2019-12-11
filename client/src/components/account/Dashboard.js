import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Grid, Loader } from 'semantic-ui-react';
import Bookings from '../layout/Bookings';

class Dashboard extends React.Component {
    state = {
        image: 'loading'
    }
    handleImageLoad () {
        this.setState({image: 'loaded'})
    }
    renderContent (){
        
        const { isSignedIn, user } = this.props;

        if (this.props.isSignedIn === '') return <Loader active size={'large'}/>;
        if (isSignedIn === false) return 'You aren\'t signed in';
        
        if (isSignedIn && user != null) {
            return (
                <Grid columns='two' divided>
                    <Grid.Column width={5}>
                        <Card>
                            
                            {this.state.image === 'loading' && <div style={{'margin': '10px 0'}}><Loader active inline='centered' size={'medium'}/></div>}
                           
                            <Image src={user.avatarUrl} wrapped ui={false} onLoad={() => this.handleImageLoad()} />
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
        user: state.users[state.auth.userId]
    }
}

export default connect(mapStateToProps, null)(Dashboard);