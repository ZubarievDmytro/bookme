import React from 'react'
import { connect } from 'react-redux';
import { Card, Image, Grid, Loader } from 'semantic-ui-react';
import { fetchUserById, saveBooking } from '../../actions'
import BookingsTable from '../layout/BookingsTable';

class UserPage extends React.Component {
    constructor(props){
        super(props);

        this.placeholderInfo = {
            avatarUrl: 'https://simpleicon.com/wp-content/uploads/account.png',

        };
    }

    componentDidMount() {
        if (this.props.user === undefined) this.props.fetchUserById(this.props.match.params.id);
    }
    
    renderUser (){
        const user = this.props.user || this.props.fetchedUser;
       
        if (user && this.props.match.params.id === user._id){
            return (
                <Grid columns='two' divided>
                    <Grid.Column width={5}>
                        <Card>
                            <Image src={user.avatarUrl || this.placeholderInfo.avatarUrl} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{user.name}</Card.Header>
                                <Card.Description>
                                    {user.description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <BookingsTable 
                            user={user} 
                            signedInUser={this.props.signedInUser} 
                            onSaveBooking={(userId, bookingInfo) => this.props.saveBooking(userId, bookingInfo)}
                        />
                    </Grid.Column>
                </Grid>
            )
        } else {
            return (
                <Loader active size={'large'}/>
            )
        }
    }
    
    render (){
        return this.renderUser();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        fetchedUser: state.users.fetchedUser,
        signedInUser: state.users.signedInUser,
        user: state.users.usersList[ownProps.match.params.id],
    }
}

export default connect(mapStateToProps, { fetchUserById, saveBooking })(UserPage);