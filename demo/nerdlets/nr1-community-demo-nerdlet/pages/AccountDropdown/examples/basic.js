import React from 'react';
import Highlight from 'react-highlight';

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
      <Highlight className="javascript">
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
      <div className="example-container">
        <h3>Basic</h3>
        <p>
          Morbi malesuada nulla nec purus convallis consequat. Vivamus id mollis
          quam. Morbi ac commodo nulla. In condimentum orci id nisl volutpat
          bibendum. Quisque commodo hendrerit lorem quis egestas. Maecenas quis
          tortor arcu. Vivamus rutrum nunc non neque consectetur quis placerat
          neque lobortis.
        </p>
        <div className="example-container-content">
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
        </div>
      </div>
    );
  }
}
