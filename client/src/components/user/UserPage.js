import React from 'react'
import { connect } from 'react-redux';
import { Card, Image, Grid, Loader } from 'semantic-ui-react';
import BookingsTable from '../layout/BookingsTable';

class UserPage extends React.Component {
    renderUser (){
        const user = this.props.users[this.props.match.params.id];
        if (user && this.props.match.params.id === user.userId){
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
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <BookingsTable user={user} />
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
        return this.renderUser ();
    }
}

const mapStateToProps = state => {
    return {
        users: state.users && state.users.usersList
    }
}

export default connect(mapStateToProps, null)(UserPage);