import React from 'react';
import Highlight from 'react-highlight';

import { Card, CardHeader, CardBody } from 'nr1';
import { AccountDropdown } from '@/../dist';

export default class AccountDropdownBasicDemo extends React.Component {
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
  </AccountDropdown>
              `}
      </Highlight>
    );
  }

  render() {
    return (
      <>
        <Card>
          <CardHeader title="Basic" className="no-padding-bottom" />
          <CardBody>
            <div className="code-result-block">
              <AccountDropdown
                title={
                  this.state.selectedAccount !== null
                    ? this.state.selectedAccount.name
                    : 'Select an Account'
                }
                onSelect={this.onSelectHandler}
              />
            </div>
            {this.renderHighlight()}
          </CardBody>
        </Card>
      </>
    );
  }
}
