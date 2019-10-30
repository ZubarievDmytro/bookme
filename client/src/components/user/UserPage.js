import React from 'react'
import { connect } from 'react-redux';
import { Card, Image, Grid, Loader } from 'semantic-ui-react';
import { fetchUser } from '../../actions';

class UserPage extends React.Component {
    state = {
        user: null
    }

    componentDidMount = async () => {
        const user = await fetchUser(this.props.match.params.id);

        this.setState({user});
    }

    renderUser (){
        const { user } = this.state;
        
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
                        Booking Table
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

export default connect(null, null)(UserPage);