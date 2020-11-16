import React from 'react';
import 'moment/locale/en-gb';
import { Select } from 'semantic-ui-react';

const TimeSelector = (props) => {
  let {
    user: { schedule },
  } = props;

  if (!schedule) schedule = [12, 18];

  const timeOptions = [];

  for (let i = +schedule[0]; i < +schedule[1]; i += 1) {
    timeOptions.push({ key: i, value: i, text: `${i}:00` });
  }

  return (
    <>
      {timeOptions.length ? <h3>Choose time</h3> : <h3>No available time</h3>}
      <Select
        placeholder="Select your time"
        options={timeOptions}
        onChange={(e, data) => props.onChange(data.value)}
        disabled={!timeOptions.length}
      />
    </>
  );
};

export default TimeSelector;
