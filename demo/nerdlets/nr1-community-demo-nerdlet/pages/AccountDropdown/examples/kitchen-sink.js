import React from 'react';
import Highlight from 'react-highlight';

import { Card, CardHeader, CardBody } from 'nr1';
import { AccountDropdown } from '@/../dist';

export default class AccountDropdownKitchenSinkDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: null
    };
    this.onSelectHandler = this.onSelectHandler.bind(this);
  }

  onSelectHandler(account) {
    this.setState({ selectedAccount: account });
  }

  renderHighlight() {
    return (
      <Highlight language="javascript">
        {`
    <AccountDropdown
      title={
        this.state.selectedAccount !== null
          ? this.state.selectedAccount.name
          : 'Select an Account'
      }
      onSelect={this.onSelectHandler}
      withReportingEventTypes={{
        eventTypes: ['PageAction', 'PageView'],
        where: ["actionName = 'SubmitLogin'"],
        timeRange: {
          begin_time: 0,
          duration: 3600000, // 1 hour in milliseconds
          end_time: 0
        }
      }}
    />
          `}
      </Highlight>
    );
  }

  render() {
    return (
      <>
        <Card>
          <CardHeader
            title="With Reporting Event Types, where clause, and timeRange"
            className="no-padding-bottom"
          />
          <CardBody>
            <div className="code-result-block">
              <AccountDropdown
                title={
                  this.state.selectedAccount !== null
                    ? this.state.selectedAccount.name
                    : 'Select an Account'
                }
                onSelect={this.onSelectHandler}
                withReportingEventTypes={{
                  eventTypes: ['PageAction', 'PageView'],
                  where: ["actionName = 'SubmitLogin'"],
                  timeRange: {
                    begin_time: 0,
                    duration: 3600000, // 1 hour in milliseconds
                    end_time: 0
                  }
                }}
              />
            </div>
            {this.renderHighlight()}
          </CardBody>
        </Card>
      </>
    );
  }
}
