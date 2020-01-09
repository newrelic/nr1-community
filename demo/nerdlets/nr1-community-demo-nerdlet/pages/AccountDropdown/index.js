/* eslint-disable no-console */
import React from 'react';

import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown';

import { Card, CardHeader, CardBody } from 'nr1';
import { AccountDropdown } from '@/../dist';
import meta from '@/components/AccountDropdown/meta.json';
import markdown from '@/components/AccountDropdown/README.md';

export default class AccountDropdownDemo extends React.Component {
  render() {
    return (
      <>
        <Card>
          <CardHeader title="Code" subtitle="Simple" />
          <CardBody>
            <Highlight language="javascript">
              {`
                <AccountDropdown
                  onSelect={account => console.log(account)}
                </AccountDropdown>
              `}
            </Highlight>

            <h2>Result:</h2>
            <AccountDropdown onSelect={account => console.log(account)} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Code" subtitle="Filtered By" />
          <CardBody>
            <Highlight language="javascript">
              {`
                const filterNrql = \`FROM PageAction SELECT name SINCE 30 minutes ago\`;
                <AccountDropdown
                  onSelect={account => console.log(account)}
                  filterByNrql={filterNrql}
                </AccountDropdown>
              `}
            </Highlight>

            <h2>Result:</h2>
            <AccountDropdown onSelect={account => console.log(account)} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Documentation" subtitle="" />
          <CardBody>
            <ReactMarkdown source={markdown} />
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
