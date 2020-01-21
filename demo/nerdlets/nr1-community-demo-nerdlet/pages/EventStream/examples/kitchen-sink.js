import React from 'react';
import Highlight from 'react-highlight';

import { Icon, NrqlQuery } from 'nr1';
import { AccountDropdown, EventStream } from '@/../dist';

/*
 TO DO's:
  - Sample custom eventContent function
    eventContent={({ event }) => {
      let timeline = Object.keys(event);
      timeline = timeline.sort();

      return timeline.map((attr, i) => {
        if (event[attr]) {
          return (
            <li key={i}>
              <span>{attr}</span>
              <span>{event[attr]}</span>
            </li>
          );
        }
        return null;
      });
    }}
  - 
*/

export default class EventStreamKitchenSinkDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: null
    };
    this.onAccountSelectHandler = this.onAccountSelectHandler.bind(this);
  }

  onAccountSelectHandler(account) {
    this.setState({ selectedAccount: account });
  }

  afterAccountsLoaded(accounts) {
    this.setState({ selectedAccount: accounts[0] });
  }

  renderHighlight() {
    return (
      <Highlight className="javascript">
        {`<NrqlQuery
            accountId={selectedAccount.id}
            query="SELECT * FROM PageAction SINCE 60 MINUTES AGO limit 7"
          >
            {({ data }) => {
              if (data) {
                const events = data[0].data; // Get data from NRQL query

                return (
                  <EventStream
                    data={events}
                    timestampField="timestamp"
                    dateFormat="MM/dd/yyyy"
                    timestampFormat="h:mm:ss a"
                    labelField="actionName"
                    labelFormatter={field => field.toUpperCase()}
                    iconType={data => {
                      // Use data to determine color/background etc.
                      console.log(data);

                      return {
                        icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
                        color: '#9C5400'
                        // backgroundColor: '' // Default to white
                      };
                    }}
                  />
                );
              }
              return null;
            }}
          </NrqlQuery>`}
      </Highlight>
    );
  }

  render() {
    const { selectedAccount } = this.state;

    return (
      <div className="example-container">
        <h3>Kitchen Sink</h3>
        <p>
          Morbi malesuada nulla nec purus convallis consequat. Vivamus id mollis
          quam. Morbi ac commodo nulla. In condimentum orci id nisl volutpat
          bibendum.
        </p>

        <AccountDropdown
          title={
            selectedAccount !== null
              ? selectedAccount.name
              : 'Select an Account'
          }
          onSelect={this.onAccountSelectHandler}
          afterAccountsLoaded={accounts => this.afterAccountsLoaded(accounts)}
        />

        <div className="example-container-content">
          <div className="code-result-block">
            {selectedAccount && (
              <NrqlQuery
                accountId={selectedAccount.id}
                query="SELECT * FROM PageAction SINCE 60 MINUTES AGO limit 7"
              >
                {({ data }) => {
                  if (data) {
                    const events = data[0].data; // Get data from NRQL query

                    return (
                      <EventStream
                        data={events}
                        timestampField="timestamp"
                        dateFormat="MM/dd/yyyy"
                        timestampFormat="h:mm:ss a"
                        labelField="actionName"
                        labelFormatter={field => field.toUpperCase()}
                        iconType={data => {
                          // Use data to determine color/background etc.
                          console.log(data);

                          return {
                            icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
                            color: '#9C5400'
                            // backgroundColor: '' // Default to white
                          };
                        }}
                      />
                    );
                  }
                  return null;
                }}
              </NrqlQuery>
            )}
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
