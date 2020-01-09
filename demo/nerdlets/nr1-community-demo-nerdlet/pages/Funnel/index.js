import React from 'react';

import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown';

import { Card, CardHeader, CardBody } from 'nr1';
import { Funnel } from '@/../dist';
import meta from '@/components/Funnel/meta.json';
import markdown from '@/components/Funnel/README.md';

const data = {
  accountId: 1606862,
  funnel: {
    event: 'PageView',
    measure: 'session'
  },
  series: [
    {
      label: 'All Users',
      nrqlWhere: "appName = 'WebPortal'"
    },
    {
      label: 'Columbus',
      nrqlWhere: "appName = 'WebPortal' and city = 'Columbus'"
    },
    {
      label: 'Internet Explorer',
      nrqlWhere: "appName = 'WebPortal' and userAgentName = 'IE'"
    }
  ],
  steps: [
    {
      label: 'Homepage',
      nrqlWhere:
        "pageUrl = 'http://webportal.telco.nrdemo.com/' OR pageUrl = 'http://webportal.telco.nrdemo.com/index.html'"
    },
    {
      label: 'Plans',
      nrqlWhere:
        "pageUrl like 'http://webportal.telco.nrdemo.com/browse/plans%'"
    },
    {
      label: 'Cart',
      nrqlWhere: "pageUrl = 'http://webportal.telco.nrdemo.com/shoppingcart'"
    },
    {
      label: 'Checkout',
      nrqlWhere: "pageUrl = 'http://webportal.telco.nrdemo.com/checkout'"
    }
  ]
};

export default class FunnelComponentDemo extends React.Component {
  render() {
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
      <>
        <Card>
          <CardHeader title="Code" subtitle="Simple" />
          <CardBody>
            <Funnel
              accountId={accountId}
              launcherUrlState={launcherUrlState}
              height={height}
              width={width}
              funnel={funnel}
              steps={steps}
              series={series}
            />
            <Highlight language="javascript">
              {`
                const filterNrql = \`FROM PageAction SELECT name SINCE 30 minutes ago\`;
                <Funnel
                </Funnel>
              `}
            </Highlight>
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
