import React from 'react';
import Highlight from 'react-highlight';

// import { Icon, NrqlQuery, Tabs, TabsItem } from 'nr1';
import { AccountDropdown, Funnel } from '@/../dist';
import data from '../data';

export default class FunnelKitchenSinkDemo extends React.Component {
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
      <>
        <Highlight className="javascript" />
      </>
    );
  }

  render() {
    const { selectedAccount } = this.state;

    const { accountId, funnel, steps, series } = data;

    // This typically comes from PlatformContext
    const launcherUrlState = {
      timeRange: {
        begin_time: 0,
        duration: 1800000, // milliseconds for 30 min
        end_time: 0
      }
    };

    const height = 275;
    const width = 200;

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
              <Funnel
                accountId={accountId}
                launcherUrlState={launcherUrlState}
                height={height}
                width={width}
                funnel={funnel}
                steps={steps}
                series={series}
              />
            )}
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
