import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Divider, Message, Select } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'moment/locale/en-gb';
import _ from 'lodash';

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

    onChange = (e, data) => {
        this.setState({ 'time': data.value });
    }

    clearMessage (){
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({message: {status: '', text: ''}})
        }, 4000)
    }

    renderButtons (){
        let schedule = this.props.user.schedule;

        if (!schedule) schedule = [12, 18];
        let timeOptions = [];
        if(schedule) {
            for (let i = +schedule[0]; i < +schedule[1]; i++) {
                timeOptions.push({key: i, value: i, text: `${i}:00`});
            }
        }
       
        return (
            <>
            {timeOptions.length ? <h3>Choose time</h3> : <h3>No available time</h3>}
            <Select placeholder='Select your time' options={timeOptions} onChange={this.onChange} disabled={!timeOptions.length}/>
            </>
        );
    }

    onSaveBooking (){
        const [day, month, year] = this.state.date.split('/');
        const { user } = this.props;
        const { time, date } = this.state;
        const bookingDate = `${day}-${month}-${year}`
        this.props.onSaveBooking(user._id, {date: bookingDate, time: time, user: this.props.signedInUser}).then(() => {
            this.setState({message: { status: 'success', text: 'You successfully booked ' + user.name + ' on ' + time + ':00  ' + date}});
            this.clearMessage();
        }).catch(err => {
            this.setState({message: {status: 'negative', text: 'Something went wrong. Please try again.'}});
            this.clearMessage();
        });
    }

    renderTable (){
        const disabledDates = this.props.user.bookings &&  this.props.user.bookings.disabledDates;
        const { date, time, message } = this.state;
        const { signedInUser } = this.props;
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
                {this.renderButtons()}
                <Divider />
                {_.isEmpty(signedInUser) && <p>Please <Link to="/signin">Sign In</Link> or <Link to="/signup">Sign Up</Link> to continue</p>}
                <Button disabled={_.isEmpty(signedInUser) || !date || !time ? true : false} onClick={() => this.onSaveBooking()}>Save Booking</Button>
            </>
        )
    }

    render (){
        return this.renderTable();
    }
}

export default BookingsTable;