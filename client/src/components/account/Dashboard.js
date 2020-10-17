import React from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Card, Image, Button, Grid, Loader } from 'semantic-ui-react';
import { fetchSignedInUser, fetchBookingsByEmail } from '../../actions'
import Bookings from '../layout/Bookings'
class Dashboard extends React.Component {
    constructor(props){
        super(props);

        this.placeholderInfo = {
            name: 'Your name will be here',
            description: 'No description yet',
            avatarUrl: 'https://simpleicon.com/wp-content/uploads/account.png',

        };
    }
    state = {
        image: 'loading'
    }
    componentDidMount() {
        const { token, userId } = this.props; 
        if (!this.props.signedInUser) this.props.fetchSignedInUser(userId, token);
    }
    
    
    handleImageLoad () {
        this.setState({image: 'loaded'})
    }

    handleImageError () {
        this.setState({image: 'error'})
    }

    renderAvatar = (user) => {
        return (
            <>
                {this.state.image === 'loading' && <div style={{'margin': '10px 0'}}><Loader active inline='centered' size={'medium'}/></div>}
                                    
                <Image src={user.avatarUrl || this.placeholderInfo.avatarUrl} wrapped ui={false} onLoad={() => this.handleImageLoad()} />
            </>
        )
    }
    renderContent() {
        const { isSignedIn, user } = this.props;
        if (this.props.isSignedIn === '') return <Loader active size={'large'}/>;
        if (isSignedIn === false) return 'You aren\'t signed in';
        
        if (user) {
            return (
                <Grid columns='two' divided>
                    <Grid.Column width={5}>
                        <Card>
                            {this.renderAvatar(user)}
                            <Card.Content>
                            <Card.Header>{user.name || this.placeholderInfo.name}</Card.Header>
                            <Card.Description>
                                {user.description || this.placeholderInfo.description }
                            </Card.Description>
                            </Card.Content>
                        </Card>
                        <Button as={Link} to={`/dashboard/edit/${user._id}`}>Edit profile information</Button>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Bookings />
                    </Grid.Column>
                </Grid>
            )
        }
    }
    render (){
        return (
            <div>
                {!localStorage.getItem('token') && <Redirect to="/" />}
                <h1>Dashboard</h1>
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.users.signedInUser,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchSignedInUser, fetchBookingsByEmail })(Dashboard);