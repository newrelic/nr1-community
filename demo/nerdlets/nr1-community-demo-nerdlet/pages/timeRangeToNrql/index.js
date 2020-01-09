import React from 'react';

import { timeRangeToNrql } from '@/../dist';

export default class EventStreamDemo extends React.Component {
  render() {
    const timeRange = {
      begin_time: 0,
      duration: 30,
      end_time: 3600
    };

    const nrql = timeRangeToNrql(timeRange);

    return (
      <>
        Turns: <pre>{JSON.stringify(timeRange)}</pre>
        <br />
        Into: <pre>{nrql}</pre>
      </>
    );
  }
}
