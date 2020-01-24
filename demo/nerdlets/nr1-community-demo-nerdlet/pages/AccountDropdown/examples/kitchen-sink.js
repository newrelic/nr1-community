import React from 'react';
import Highlight from 'react-highlight';
import PropTypes from 'prop-types';

import { AccountDropdown } from '@/../dist';

export default class AccountDropdownKitchenSinkDemo extends React.Component {
  static propTypes = {
    header: PropTypes.object
  };

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
        {`<AccountDropdown
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
/>`}
      </Highlight>
    );
  }

  render() {
    const { header } = this.props;
    return (
      <div className="example-container">
        <h3 id={header.id}>{header.text}</h3>
        <p>
          Ut in nulla enim. Phasellus molestie magna non est bibendum non
          venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit
          odio. Proin quis tortor orci.
        </p>
        <div className="example-container-content">
          <div className="code-result-block">
            <AccountDropdown
              title={
                this.state.selectedAccount !== null
                  ? this.state.selectedAccount.name
                  : 'Select an Account'
              }
              label="Custom label"
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
        </div>
      </div>
    );
  }
}
