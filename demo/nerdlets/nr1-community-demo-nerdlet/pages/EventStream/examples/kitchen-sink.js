import React from 'react';
import Highlight from 'react-highlight';

import { Icon, NrqlQuery } from 'nr1';
import { AccountDropdown, EventStream } from '@/../dist';

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

  beforeAccountsLoaded(accounts) {
    this.setState({ selectedAccount: accounts[0] });
    return accounts;
  }

  // eslint-disable-next-line no-unused-vars
  afterAccountsLoaded(accounts) {
    //
  }

  renderHighlight() {
    return (
      <Highlight className="javascript">
        {`<NrqlQuery
      accountId={selectedAccount.id}
      query="SELECT * FROM PageAction SINCE 60 MINUTES AGO limit 25"
    >
      {({ data }) => {
        if (data) {
          const events = data[0].data; // Get data from NRQL query
          const iconTypeHandler = function({ eventType, event }) {
            const defaultOptions = {
              class: 'timeline-item-type-content',
              icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
              label: 'Content',
              color: '#9C5400'
            };

            if (
              eventType === 'PageAction' &&
              event.actionName.indexOf('CONTENT') > 0
            ) {
              return {
                class: 'timeline-item-type-content',
                icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
                label: 'Content',
                color: '#9C5400'
              };
            }

            return defaultOptions;
          };

          return (
            <EventStream
              eventType="PageAction"
              events={events}
              iconType={data => iconTypeHandler(data)}
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
          beforeAccountsLoaded={accounts => this.beforeAccountsLoaded(accounts)}
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
                    const iconTypeHandler = function({ eventType, event }) {
                      const defaultOptions = {
                        class: 'timeline-item-type-content',
                        icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
                        label: 'Content',
                        color: '#9C5400'
                      };

                      if (
                        eventType === 'PageAction' &&
                        event.actionName.indexOf('CONTENT') > 0
                      ) {
                        return {
                          class: 'timeline-item-type-content',
                          icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
                          label: 'Content',
                          color: '#9C5400'
                        };
                      }

                      return defaultOptions;
                    };

                    return (
                      <EventStream
                        eventType="PageAction"
                        events={events}
                        iconType={data => iconTypeHandler(data)}
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
