import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import 'moment/locale/en-gb';

const DateSelector = (props) => {
  const { date } = props;
  return (
    <DateInput
      localization="en-gb"
      inline
      name="date"
      minDate={new Date()}
      placeholder="Date"
      value={date}
      onChange={(event, { value }) => props.onChange(value)}
      firstDayOfWeek="1"
      dateFormat="DD/MM/YYYY"
    />
  );
};

export default DateSelector;
