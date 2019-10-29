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

    renderContent(bookingType){
        const bookings = this.props.bookings[bookingType].map(book => {
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
                <h2>My Bookings</h2>
                {this.renderContent('myBookings')}
                <h2>People who booked me</h2>
                {this.renderContent('usersBookings')}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const bookings = Object.values(state.users, 'id').filter(item => item.userId === state.auth.userId)[0].bookings;
    return {
       userId: state.auth.userId,
       users: state.users,
       bookings: bookings
    }
}

export default connect(mapStateToProps, null)(Bookings);