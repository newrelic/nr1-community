import React from 'react';
import PropTypes from 'prop-types';

import { NrqlQuery } from 'nr1';
import { AccountDropdown, EventStream } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class EventStreamKitchenSinkDemo extends React.Component {
  static propTypes = {
    header: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: null,
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

  renderHighlight() {
    const { selectedAccount, enableLiveEditing } = this.state;
    const scope = {
      NrqlQuery,
      EventStream,
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
        <EventStream data={events} />
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
    const { selectedAccount } = this.state;
    const { header } = this.props;

    return (
      <div className="example-container">
        <h3 id={header.id}>{header.text}</h3>
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
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
