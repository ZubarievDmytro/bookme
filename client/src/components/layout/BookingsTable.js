import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Divider, Message } from 'semantic-ui-react';
import 'moment/locale/en-gb';
import { connect } from 'react-redux';
import { updateBookings } from '../../actions';
import uuid from 'uuid';

class BookingsTable extends React.Component {
    state = {
        date: '',
        time: '',
        message: {
            status: '',
            text: ''
        }
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    
    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    handleClick = (value) => {
        this.setState({ 'time': value });
    }

    clearMessage (){
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({message: {status: '', text: ''}})
        }, 4000)
    }

    renderButtons (){
        const { shedule } = this.props.user.bookings;
        let buttons = [];
        
        for (let i = +shedule[0]; i < +shedule[1]; i++) {
            buttons.push(<Button name="time" className={this.state.time === i ? 'grey' : ''} key={i} onClick={() => this.handleClick(i)}>{i}:00</Button>);
        }
        return buttons;
    }

    onSaveBooking (){
        const { user, signedUser } = this.props;
        let { date, time } = this.state;
        const id = uuid();
        let usersBookings = [...user.bookings.usersBookings, {
            id,
            date,
            time,
            userId: signedUser.userId
        }]
        let myBookings = [...signedUser.bookings.myBookings, {
            id,
            date,
            time,
            userId: user.userId
        }]
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

        this.props.updateBookings(userUpdated, currentUserUpdated).then(() => {
            this.setState({message: { status: 'success', text: 'You successfully booked ' + user.name + ' on ' + time + ':00  ' + date}});
            this.clearMessage();
        }).catch(err => {
            this.setState({message: {status: 'negative', text: 'Something went wrong. Please try again.'}});
            this.clearMessage();
        });
    }

    renderTable (){
        const { disabledDates } = this.props.user.bookings;
        const { date, time, message } = this.state;
        return (
            <>
                <Message
                    className={message.status}
                    content={message.text}
                    hidden={!message.text}
                />
                <DateInput
                    localization='en-gb'
                    inline
                    name="date"
                    minDate={new Date()}
                    disable={disabledDates}
                    placeholder="Date"
                    value={this.state.date}
                    onChange={this.handleChange}
                    firstDayOfWeek="1"
                    dateFormat='DD/MM/YYYY'
                />
                <h3>Choose time</h3>
                {this.renderButtons()}
                <Divider />
                {!this.props.isSignedIn && <p>Please Sign In to continue</p>}
                <Button disabled={!date || !time || !this.props.isSignedIn ? true : false} onClick={() => this.onSaveBooking()}>Save Booking</Button>
            </>
        )
    }

    render (){
        return this.renderTable();
    }
}

const mapStateToProps = state => {
    return {
        signedUser: state.users[state.auth.userId],
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { updateBookings })(BookingsTable);