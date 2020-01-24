import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import InstallAndUse from '../../shared/components/InstallAndUse';
import BasicExample from './examples/basic';
import AdvancedExample from './examples/advanced';

// Page data
import meta from '@/components/DetailPanel/meta.json';

const page = {
  title: 'Detail Panel',
  subtitle: 'Provide additional info about a specific visualization.'
};

const pageHeaders = {
  title: {
    text: 'Detail Panel',
    id: 'title',
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
    text: 'Using tabs and custom callbacks',
    id: 'advanced-example',
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

export default class DetailPanelDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true
    };
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

          {/* Installation/Usage */}
          <h2 id={pageHeaders.installationAndUsage.id}>
            {pageHeaders.installationAndUsage.id}
          </h2>
          <InstallAndUse type="component" name="DetailPanel" />

          {/* Props */}
          <h2 id={pageHeaders.properties.id}>{pageHeaders.properties.id}</h2>
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
        {this.renderSidebar()}
      </Grid>
    );
  }
}
