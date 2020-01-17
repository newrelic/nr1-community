/* eslint-disable no-console */
import React from 'react';

import { NrqlQuery } from 'nr1';
import { AccountDropdown, EventStream } from '@/../dist';

export default class EventStreamDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: null
    };
    this.onAccountSelectHandler = this.onAccountSelectHandler.bind(this);
  }

  async componentDidMount() {
    //
  }

  onAccountSelectHandler(account) {
    this.setState({ selectedAccount: account });
  }

  render() {
    const { selectedAccount } = this.state;
    const nrql = 'SELECT * FROM PageAction SINCE 60 MINUTES AGO limit 25';

    return (
      <>
        <AccountDropdown
          title={
            selectedAccount !== null
              ? selectedAccount.name
              : 'Select an Account'
          }
          onSelect={this.onAccountSelectHandler}
        />

        {selectedAccount && (
          <NrqlQuery accountId={selectedAccount.id} query={nrql}>
            {({ data }) => {
              if (data) {
                const events = data[0].data;
                return <EventStream events={events} eventType="PageAction" />;
              }
              return null;
            }}
          </NrqlQuery>
        )}
      </>
    );
  }
}
