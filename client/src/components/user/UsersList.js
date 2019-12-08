import React from 'react'
import { Card, Button, Image, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions';

class UsersList extends React.Component {
    componentDidMount (){
        this.props.fetchUsers();
    }

    renderUsers () {
        if (!this.props.users.length) return (<Loader active size={'large'}/>);

        return this.props.users.map(user => {
            return (
                <Card key={user.id}>
                    <Card.Content>
                        <Image
                        circular
                        floated='right'
                        size='mini'
                        src={user.avatarUrl}
                        />
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Meta>{user.profession}</Card.Meta>
                        <Card.Description>
                            {user.description}
                        </Card.Description>
                    </Card.Content>
                    {this.props.isSignedIn && this.props.userId !== user.userId &&
                        <Card.Content extra>
                            <Button basic color="green" floated='right' as={Link} to={`/users/${user.userId}`} >
                                Book me
                            </Button>
                        </Card.Content>
                    }
                </Card>
            )
        })
    }
    
    render (){
        return (
            <Card.Group itemsPerRow={3}>
                {this.renderUsers()}
            </Card.Group>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: Object.values(state.users),
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.user && state.auth.user.userId
    }
}

export default connect(mapStateToProps, { fetchUsers })(UsersList);