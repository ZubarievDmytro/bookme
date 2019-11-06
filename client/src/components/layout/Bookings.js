import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Bookings extends React.Component {
    componentDidMount() {
        //this.props.fetchBookings(this.props.userId);
    }
    
    onDeleteClick (id, bookingType){
        alert(bookingType + ' - ' + id)
        //this.props.updateUser(this.props.bookings, this.props.userId, bookId);
    }

    renderTime (book, bookingType){
        return (
            <p>{book.time} <Icon onClick={() => this.onDeleteClick(book.id, bookingType)} floated="right" color="red" name="window close outline"/></p>
        )
    }

    getUserInfo (userId){
        return this.props.users.filter(user => user.userId === userId)[0];
    }

    renderContent(bookingType){
        const bookings = this.props.bookings[bookingType].map(book => {
            const user = this.getUserInfo(book.userId);
            return (
                <Card key={book.id}>
                    <Card.Content>
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Meta>{book.date}</Card.Meta>
                        <Card.Description>
                            {this.renderTime(book, bookingType)}
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
                <h2>Users booked me</h2>
                {this.renderContent('usersBookings')}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: Object.values(state.users.usersList)
    }
}
export default connect(mapStateToProps, null)(Bookings);