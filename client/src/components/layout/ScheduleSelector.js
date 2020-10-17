import React, { Component } from 'react'
import { SelectField } from 'react-semantic-redux-form';
import { Form } from 'semantic-ui-react'
import { Field } from 'redux-form'

class ScheduleSelector extends Component {
    state = {
        from: '0',
        to: '23'
    }
    calculateHours = (key) => {
        let hours = [],
            from,
            to;
        if (key === 'from') {
            from = 0;
            to = this.state.to;
        } else {
            from = this.state.from + 1;
            to = 23;
        }
        for (let i = from; i < to; i++) {
            let prefix = '';

            if (i < 10) prefix = '0';
            hours.push({
                key: i,
                value: i,
                text: '' + prefix + i + ':00'
            })
        }
        return hours;
    }

    onSelectChange = (value, key) => {
        this.setState({
            [key]: value
        });
    }
    render (){
        return (
            <>
                <h4>Select your schedule</h4>
                <Form.Group widths='equal'>
                    <Field
                        component={SelectField}
                        name='from'
                        label="From"
                        options={this.calculateHours('from')}
                        onChange={(value) => this.onSelectChange(value, 'from')}
                        placeholder="From"
                    />
                    <Field
                        component={SelectField}
                        name='to'
                        label="To"
                        options={this.calculateHours('to')}
                        onChange={(value) => this.onSelectChange(value, 'to')}
                        placeholder="To"
                    />
                </Form.Group>
            </>
        )
    }
}

export default ScheduleSelector;