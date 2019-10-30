import React from 'react'
import _ from 'lodash';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Bookings extends React.Component {
    componentDidMount() {
        //this.props.fetchBookings(this.props.userId);
    }
    
    onDeleteClick (id){
        //this.props.updateUser(this.props.bookings, this.props.userId, bookId);
    }

    renderTime (time, id){
        return (
            <p>{time} <Icon onClick={() => this.onDeleteClick(id)} floated="right" color="red" name="window close outline"/></p>
        )
    }

    renderContent(){
        const bookings = this.props.bookings.map(book => {
            return (
                <Card key={book.id}>
                    <Card.Content>
                        <Card.Header>{book.userName}</Card.Header>
                        <Card.Meta>{book.date}</Card.Meta>
                        <Card.Description>
                            {this.renderTime(book.time, book.id)}
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        });
        return (
            <Card.Group>{bookings}</Card.Group>
        )
    }
    render (){
        return (
            <div>
                <h2>{this.props.title}</h2>
                {this.renderContent()}
                <br/>
            </div>
        )
    }
}

export default connect(null, null)(Bookings);