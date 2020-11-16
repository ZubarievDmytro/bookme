import React, { useState } from 'react';
import { SelectField } from 'react-semantic-redux-form';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

const ScheduleSelector = () => {
  const [to, setTo] = useState(23);
  const [from, setFrom] = useState(0);

  const calculateHours = (key) => {
    const hours = [];
    let fromVal;
    let toVal;

    if (key === 'from') {
      fromVal = 0;
      toVal = to;
    } else {
      fromVal = from + 1;
      toVal = 23;
    }

    for (let i = fromVal; i < toVal; i += 1) {
      let prefix = '';

      if (i < 10) prefix = '0';
      hours.push({
        key: i,
        value: i,
        text: `${prefix}${i}:00`,
      });
    }

    return hours;
  };

  const onSelectChange = (value, key) => {
    if (key === 'from') {
      setFrom(value);
      return;
    }
    setTo(value);
  };

  return (
    <>
      <h4>Select your schedule</h4>
      <Form.Group widths="equal">
        <Field
          component={SelectField}
          name="from"
          label="From"
          options={calculateHours('from')}
          onChange={(value) => onSelectChange(value, 'from')}
          placeholder="From"
        />
        <Field
          component={SelectField}
          name="to"
          label="To"
          options={calculateHours('to')}
          onChange={(value) => onSelectChange(value, 'to')}
          placeholder="To"
        />
      </Form.Group>
    </>
  );
};

export default ScheduleSelector;
