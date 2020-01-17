import React from 'react';
import Highlight from 'react-highlight';

import { Icon, NrqlQuery } from 'nr1';
import { AccountDropdown, EventStream } from '@/../dist';

export default class EventStreamBasicDemo extends React.Component {
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
        {`
  
        `}
      </Highlight>
    );
  }

  render() {
    const { selectedAccount } = this.state;

    return (
      <div className="example-container">
        <h3>Basic</h3>
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
          <div className="code-result-block">{/*  */}</div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
