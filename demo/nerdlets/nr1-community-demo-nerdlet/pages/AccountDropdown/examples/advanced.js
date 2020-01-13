import React from 'react';
import Highlight from 'react-highlight';

import { AccountDropdown } from '@/../dist';

export default class AccountDropdownAdvancedDemo extends React.Component {
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
      <Highlight className="javascript">
        {`
  <AccountDropdown
    title={
      this.state.selectedAccount !== null
        ? this.state.selectedAccount.name
        : 'Select an Account'
    }
    onSelect={this.onSelectHandler}
    withReportingEventTypes={{
      eventTypes: ['PageAction', 'PageView']
    }}
  />
        `}
      </Highlight>
    );
  }

  render() {
    return (
      <div className="example-container">
        <h3>With Reporting Event Types</h3>
        <p>Nulla quis tortor orci. Etiam at risus et justo dignissim.</p>
        <div className="example-container-content">
          <div className="code-result-block">
            <AccountDropdown
              title={
                this.state.selectedAccount !== null
                  ? this.state.selectedAccount.name
                  : 'Select an Account'
              }
              onSelect={this.onSelectHandler}
              withReportingEventTypes={{
                eventTypes: ['PageAction', 'PageView']
              }}
            />
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
