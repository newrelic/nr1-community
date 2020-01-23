import React from 'react';

import { Icon, NrqlQuery } from 'nr1';
import { AccountDropdown, EventStream } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class EventStreamKitchenSinkDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: null,
      activeCodeExampleTab: 1,
      enableLiveEditing: false
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
    const styles = `
      .timeline-item-contents {
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
    `;

    return <CodeHighlight code={styles} language="scss" use="prism" />;
  }

  renderHighlight() {
    const { selectedAccount, enableLiveEditing } = this.state;
    const scope = {
      NrqlQuery,
      EventStream,
      Icon,
      selectedAccount,
      onAccountSelectHandler: this.onAccountSelectHandler
    };

    const code = `
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
    `;

    return (
      <CodeHighlight
        scope={scope}
        code={code}
        language="jsx"
        use="react-live"
        enableLiveEditing={enableLiveEditing}
      />
    );
  }

  render() {
    const { selectedAccount, activeCodeExampleTab } = this.state;

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
          <div className="code-example-tabs-container">
            <div className="code-example-tabs-header">
              <div className="button-group">
                <button
                  type="button"
                  className={activeCodeExampleTab === 1 ? 'active' : ''}
                  onClick={() => this.setState({ activeCodeExampleTab: 1 })}
                >
                  JSX
                </button>
                <button
                  type="button"
                  className={activeCodeExampleTab === 2 ? 'active' : ''}
                  onClick={() => this.setState({ activeCodeExampleTab: 2 })}
                >
                  Styles
                </button>
              </div>
            </div>
            {activeCodeExampleTab === 1 && this.renderHighlight()}
            {activeCodeExampleTab === 2 && this.renderStylesHighlight()}
          </div>
        </div>
      </div>
    );
  }
}
