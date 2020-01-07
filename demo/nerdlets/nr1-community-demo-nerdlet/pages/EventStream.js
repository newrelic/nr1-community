import React from 'react';

import { EventStream } from '../../../../dist';

export default class EventStreamDemo extends React.Component {
  render() {
    return <EventStream onSelect={account => console.log(account)} />;
  }
}
