import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import InstallAndUse from '../../shared/components/InstallAndUse';
import BasicExample from './examples/basic';
import AdvancedExample from './examples/advanced';
import KitchenSinkExample from './examples/kitchen-sink';

// Page data
import meta from '@/components/AccountDropdown/meta.json';

const page = {
  title: 'Account Dropdown',
  subtitle: 'A common interface for choosing an account'
};

const pageHeaders = {
  title: {
    text: 'Account Dropdown',
    id: 'account-dropdown',
    hierarchy: 0
  },
  examples: {
    text: 'Examples',
    id: 'examples',
    hierarchy: 0
  },
  basicExample: {
    text: 'Basic',
    id: 'basic',
    hierarchy: 1
  },
  advancedExample: {
    text: 'With Reporting Event Types',
    id: 'advanced-example',
    hierarchy: 1
  },
  kitchenSinkExample: {
    text: 'With Reporting Event Types, where clause, and timeRange',
    id: 'kitchen-sink-example',
    hierarchy: 1
  },
  installationAndUsage: {
    text: 'Installation and Usage',
    id: 'installation-and-usage',
    hierarchy: 0
  },
  properties: {
    text: 'Properties',
    id: 'properties',
    hierarchy: 0
  }
};

export default class AccountDropdownDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true
    };

    this.renderHeaders = this.renderHeaders.bind(this);
  }

  renderSidebar() {
    const { showSidebar } = this.state;

    if (!showSidebar) {
      return null;
    }

    return (
      <GridItem columnSpan={3} className="secondary-grid-item">
        <div className="secondary-nav-container">
          <h6 className="secondary-nav-container-header">On this page</h6>
          <ul className="secondary-nav">{this.renderHeaders()}</ul>
        </div>
      </GridItem>
    );
  }

  renderHeaders() {
    const pageHeaderIds = Object.keys(pageHeaders);

    return pageHeaderIds.map(pageHeaderId => {
      const hierarchy = pageHeaders[pageHeaderId].hierarchy;
      const id = pageHeaders[pageHeaderId].id;
      const text = pageHeaders[pageHeaderId].text;

      return (
        <li
          key={pageHeaderId}
          className={`secondary-nav-item ${
            hierarchy === 1 ? 'child-header' : ''
          }`}
        >
          <a href={`#${id}`}>{text}</a>
        </li>
      );
    });
  }

  render() {
    const { showSidebar } = this.state;

    return (
      <Grid spacingType={[Grid.SPACING_TYPE.OMIT, Grid.SPACING_TYPE.NONE]}>
        <GridItem
          columnSpan={showSidebar ? 9 : 12}
          collapseGapAfter
          className="primary-grid-item"
        >
          <h1 id={pageHeaders.title.id}>{pageHeaders.title.text}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2 id={pageHeaders.examples.id}>{pageHeaders.examples.text}</h2>
          <p>{meta.description}</p>

          {/* Code Samples */}
          <BasicExample header={pageHeaders.basicExample} />
          <AdvancedExample header={pageHeaders.advancedExample} />
          <KitchenSinkExample header={pageHeaders.kitchenSinkExample} />

          {/* Installation/Usage */}
          <h2 id={pageHeaders.installationAndUsage.id}>
            {pageHeaders.installationAndUsage.text}
          </h2>
          <InstallAndUse type="component" name="AccountDropdown" />

          {/* Props */}
          <h2 id={pageHeaders.properties.id}>{pageHeaders.properties.text}</h2>
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
        {this.renderSidebar()}
      </Grid>
    );
  }
}
