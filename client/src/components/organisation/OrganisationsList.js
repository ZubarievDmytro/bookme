import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/';

class OrganisationsList extends React.Component {
    componentDidMount (){
        this.props.fetchUsers();
    }

    renderUsers () {
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
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Dentist</Card.Meta>
                        <Card.Description>
                            Steve has his own practice for 5 years.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button basic color="green" floated='right' as={Link} to={`/users/${user.userId}`} >
                            Book me
                        </Button>
                    </Card.Content>
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
        users: Object.values(state.users)
    }
}

export default connect(mapStateToProps, { fetchUsers })(OrganisationsList);