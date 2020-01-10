import React from 'react';

import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown';

import { BlockText, Card, CardHeader, CardBody } from 'nr1';
import { AccountDropdown } from '@/../dist';

import codeRenderer from '../../shared/code-renderer';
import meta from '@/components/AccountDropdown/meta.json';
import markdown from '@/components/AccountDropdown/README.md';

const page = {
  title: 'Account Dropdown',
  subtitle: 'A common interface for choosing an account',
  examples: 'Examples',
  examplesText:
    'This component provides a common interface for choosing an account with a callback (onSelect allows for integration in to the rest of your application).'
};

export default class AccountDropdownDemo extends React.Component {
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

  renderBasicCode() {
    return (
      <Highlight language="javascript">
        {`
  <AccountDropdown
    title="Account"
    onSelect={this.onSelectHandler}
  </AccountDropdown>
              `}
      </Highlight>
    );
  }

  renderWithReportingEventTypes() {
    return (
      <Highlight language="javascript">
        {`
  <AccountDropdown
    title={this.state.selectedAccount || 'Select an Account'}
    onSelect={this.onSelectHandler}
    withReportingEventTypes={{
      eventTypes: ['PageAction', 'PageView']
    }}
  />
        `}
      </Highlight>
    );
  }

  renderKitchenSink() {
    return (
      <Highlight language="javascript">
        {`
    <AccountDropdown
      title={this.state.selectedAccount || 'Select an Account'}
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
        <h2>{page.title}</h2>
        <h3>{page.subtitle}</h3>
        <BlockText>{page.examplesText}</BlockText>
        <Card>
          <CardHeader title="Basic" className="no-padding-bottom" />
          <CardBody>
            <div className="code-result-block">
              <AccountDropdown
                title={this.state.selectedAccount || 'Select an Account'}
                onSelect={this.onSelectHandler}
              />
            </div>
            {this.renderBasicCode()}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="With Reporting Event Types"
            className="no-padding-bottom"
          />
          <CardBody>
            <div className="code-result-block">
              <AccountDropdown
                title={this.state.selectedAccount || 'Select an Account'}
                onSelect={this.onSelectHandler}
                withReportingEventTypes={{
                  eventTypes: ['PageAction', 'PageView']
                }}
              />
            </div>
            {this.renderWithReportingEventTypes()}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="With Reporting Event Types, where clause, and timeRange"
            className="no-padding-bottom"
          />
          <CardBody>
            <div className="code-result-block">
              <AccountDropdown
                title={this.state.selectedAccount || 'Select an Account'}
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
            {this.renderKitchenSink()}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Documentation" subtitle="" />
          <CardBody>
            <ReactMarkdown
              source={markdown}
              escapeHtml
              renderers={{
                inlineCode: codeRenderer,
                code: codeRenderer
              }}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Component Props Reference" subtitle="" />
          <CardBody>
            <ul>
              {meta.props.map((prop, index) => {
                return <li key={index}>{prop.name}</li>;
              })}
            </ul>
          </CardBody>
        </Card>
      </>
    );
  }
}
