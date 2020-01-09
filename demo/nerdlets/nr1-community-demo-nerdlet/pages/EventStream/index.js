/* eslint-disable no-console */
import React from 'react';

import { NrqlQuery } from 'nr1';
import { EventStream } from '@/../dist';

export default class EventStreamDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 1606862,
      eventType: 'PageAction',
      sessions: [],
      sessionGuid: null
    };
  }

  async componentDidMount() {
    await this.fetchSession();
  }

  async fetchSession() {
    const { accountId } = this.state;

    const nrql =
      'SELECT count(actionName) FROM PageAction SINCE 60 MINUTES AGO FACET session limit 25';

    const results = await NrqlQuery.query({
      accountId: accountId,
      query: nrql,
      formatType: NrqlQuery.FORMAT_TYPE.RAW
    });

    const facets = results.data.raw.facets;
    this.setState({
      sessions: facets,
      sessionGuid: facets[0].name
    });
  }

  render() {
    const { accountId, eventType, sessions, sessionGuid } = this.state;
    console.debug(sessions);
    return (
      <EventStream
        accountId={accountId}
        eventType={eventType}
        session={sessionGuid}
        durationInMinutes={60}
      />
    );
  }
}
