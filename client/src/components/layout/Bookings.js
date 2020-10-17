import React from 'react'
import { Card, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteBooking } from '../../actions';
import UserModal from '../user/UserModal'
class Bookings extends React.Component {   
    state = {
        message: {
            status: '',
            text: ''
        },
        open: false,
        text: 'booking',
        book: null
    }
    
    clearMessage (){
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({message: {status: '', text: ''}})
        }, 4000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    

    onDeleteClick = (book) => {
        this.setState({
            open: true,
            book
        })
    }

    onModalClick = status => {
        const { book } = this.state;
        if (status === 'yes') {
            this.setState({
                open: false,
                book: null
            })
            this.props.deleteBooking(book, this.props.token).then(() => {
                this.setState({message: { status: 'success', text: 'You successfully removed ' + book.user.name + ' on ' + book.time + ':00  ' + book.date}});
                this.clearMessage();
            }).catch(err => {
                this.setState({message: {status: 'negative', text: 'Something went wrong. Please try again.'}});
                this.clearMessage();
            });
        } else {
            this.setState({
                open: false,
                book: null
            })
        }
    }

    renderTime (book, bookingType){
        const formatedTime = book.time + ':00 - ' + (+book.time + 1) + ':00';
        return (
            <p>{formatedTime} {bookingType === 'fetchedBookings' && <Icon onClick={() => this.onDeleteClick(book)} floated="right" color="red" name="window close outline"/>}</p>
        )
    }

    renderContent(bookingType){
        let { bookings, fetchedBookings } = this.props;
        if(bookingType === 'fetchedBookings') bookings = fetchedBookings.length ? fetchedBookings : [];
       
        bookings = bookings.length && bookings.map(book => {
            let userName = book.name;
            if(bookingType === 'fetchedBookings') userName = book.user.name;
            
            let date = book.date;
            return (
                <Card key={book._id}>
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
        if (!bookings.length) {bookings = <Card><Card.Content>No bookings yet</Card.Content></Card>};

        return (
            <Card.Group itemsPerRow={3}>{bookings}</Card.Group>
        )
    }
    render (){
        let { message } = this.state;
        return (
            <div>
                <Message
                    className={message.status}
                    content={message.text}
                    hidden={!message.text}
                />
                <h3>My Bookings</h3>
                {this.renderContent('fetchedBookings')}
                <h3>Users booked me</h3>
                {this.renderContent('bookings')}
                <UserModal open={this.state.open} text="booking" onModalClick={this.onModalClick}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signedUser: state.users[state.auth.userId],
        users: Object.values(state.users),
        bookings: state.users.signedInUser.bookings || [],
        fetchedBookings: state.users.fetchedBookings,
        token: state.auth.token
    }
    
}
export default connect(mapStateToProps, { deleteBooking })(Bookings);