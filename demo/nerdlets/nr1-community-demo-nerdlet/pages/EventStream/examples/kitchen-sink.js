import React from 'react';
import Highlight from 'react-highlight';

import { Icon, NrqlQuery, Tabs, TabsItem } from 'nr1';
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

  afterAccountsLoaded(accounts) {
    this.setState({ selectedAccount: accounts[0] });
  }

  renderStylesHighlight() {
    return (
      <Highlight className="sass">
        {`.timeline-item-contents {
  height: 300px;
  overflow: scroll;
}

.timeline-item-contents-item {
  min-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #edeeee;
  padding: 0 8px;

  .key {
    margin-right: 8px;
    font-weight: 600;
    color: #464e4e;
  }

  .value {
    text-align: right;
    color: #464e4e;
    overflow-wrap: break-word;
    word-break: break-all;
    max-width: 80%;
    padding: 8px 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f4f5f5;
    cursor: default;
  }
}    
`}
      </Highlight>
    );
  }

  renderHighlight() {
    return (
      <>
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
            // Use data to determine icon color/type/background etc.
            console.log(data);

            return {
              icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
              color: '#9C5400'
            };
          }}
          eventContent={({ event }) => {
            let timeline = Object.keys(event);
            timeline = timeline.sort();

            return (
              <ul className="timeline-item-contents">
                {timeline.map((attr, i) => {
                  if (event[attr]) {
                    return (
                      <li
                        key={i}
                        className="timeline-item-contents-item"
                      >
                        <span className="key">{attr}</span>
                        <span className="value">
                          {event[attr]}
                        </span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            );
          }}
        />
      );
    }
    return null;
  }}
</NrqlQuery>`}
        </Highlight>
      </>
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
          <Tabs defaultValue="code">
            <TabsItem value="code" label="Code">
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
                              // Use data to determine icon color/type/background etc.
                              console.log(data);

                              return {
                                icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
                                color: '#9C5400'
                              };
                            }}
                            eventContent={({ event }) => {
                              let timeline = Object.keys(event);
                              timeline = timeline.sort();

                              return (
                                <ul className="timeline-item-contents">
                                  {timeline.map((attr, i) => {
                                    if (event[attr]) {
                                      return (
                                        <li
                                          key={i}
                                          className="timeline-item-contents-item"
                                        >
                                          <span className="key">{attr}</span>
                                          <span className="value">
                                            {event[attr]}
                                          </span>
                                        </li>
                                      );
                                    }
                                    return null;
                                  })}
                                </ul>
                              );
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
            </TabsItem>
            <TabsItem value="sass" label="Styles">
              {this.renderStylesHighlight()}
            </TabsItem>
          </Tabs>
        </div>
      </div>
    );
  }
}
