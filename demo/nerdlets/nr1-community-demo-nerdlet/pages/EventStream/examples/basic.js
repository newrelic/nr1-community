import React from 'react';

import { NrqlQuery } from 'nr1';
import { AccountDropdown, EventStream } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class BasicExample extends React.Component {
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

    return (
      <div className="example-container">
        <h3>Basic</h3>
        <p>
          The simplest example involves passing the results on a NrqlQuery to the component as a data prop.
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
