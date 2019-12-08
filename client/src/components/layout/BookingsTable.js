import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Divider } from 'semantic-ui-react';
import 'moment/locale/en-gb';
import { connect } from 'react-redux';
import { updateBookings } from '../../actions';
import uuid from 'uuid';

class BookingsTable extends React.Component {
    state = {
        date: '',
        time: ''
    };

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    handleClick = (value) => {
        this.setState({ 'time': value });
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

        this.props.updateBookings(userUpdated, currentUserUpdated);
    }

    renderTable (){
        const { disabledDates } = this.props.user.bookings;
        const { date, time } = this.state;
        return (
            <>
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
        signedUser: state.users && state.users.usersList[state.auth.user && state.auth.user.userId],
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { updateBookings })(BookingsTable);