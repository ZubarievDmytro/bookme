import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateBookings } from '../../actions';

class Bookings extends React.Component {    
    onDeleteClick (book){
        const { users, signedUser } = this.props;
        
        let user = users.filter(user => user.userId === book.userId)[0];
        
        let usersBookings = [...user.bookings.usersBookings].filter(booking => booking.id !== book.id);
       
        let myBookings = [...signedUser.bookings.myBookings].filter(booking => booking.id !== book.id);
        const userUpdated = {
            ...user, bookings: {
                ...user.bookings,
                usersBookings
            }
        };
    
        const currentUserUpdated = {
            ...signedUser, bookings: {
                ...signedUser.bookings,
                myBookings
            }
        };

        this.props.updateBookings(userUpdated, currentUserUpdated);
    }

    renderTime (book, bookingType){
        return (
            <p>{book.time}:00 {bookingType === 'myBookings' && <Icon onClick={() => this.onDeleteClick(book)} floated="right" color="red" name="window close outline"/>}</p>
        )
    }

    renderContent(bookingType){
        
        let bookings = this.props.bookings[bookingType].map(book => {
            let userName = this.props.users.filter(user => user.userId === book.userId)[0].name;
            const date = book.date;
            return (
                <Card key={book.id}>
                    <Card.Content>
                        <Card.Header>{userName}</Card.Header>
                        <Card.Meta>{date}</Card.Meta>
                        <Card.Description>
                            {this.renderTime(book, bookingType)}
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        });

        if (!bookings.length > 0) {bookings = <Card><Card.Content>No bookings yet</Card.Content></Card>};

        return (
            <Card.Group itemsPerRow={3}>{bookings}</Card.Group>
        )
    }
    render (){
        return (
            <div>
                <h2>My Bookings</h2>
                {this.renderContent('myBookings')}
                <h2>Users booked me</h2>
                {this.renderContent('usersBookings')}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signedUser: state.users && state.users.usersList[state.auth.user && state.auth.user.userId],
        users: Object.values(state.users && state.users.usersList)
    }
    
}
export default connect(mapStateToProps, { updateBookings })(Bookings);