import React from 'react';

// NR1
import { Grid, GridItem, Button } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import InstallAndUse from '../../shared/components/InstallAndUse';
import BasicExample from './examples/basic';
import KitchenSinkExample from './examples/kitchen-sink';

// Page data
import meta from '@/components/EventStream/meta.json';

const page = {
  title: 'Event Stream',
  subtitle:
    'A component to list a series of timestamped events in both a summary and detail format.'
};

const pageHeaders = {
  title: {
    text: 'Event Stream',
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
  kitchenSinkExample: {
    text: 'Kitchen sink',
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

export default class EventStreamDemo extends React.Component {
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
        <Button
          className="readme-link"
          to="https://github.com/newrelic/nr1-community/blob/master/src/components/DetailPanel/README.md"
        >
          View {pageHeaders.title.text} README
        </Button>
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
          <KitchenSinkExample header={pageHeaders.kitchenSinkExample} />

          {/* Installation/Usage */}
          <h2 id={pageHeaders.installationAndUsage.id}>
            {pageHeaders.installationAndUsage.text}
          </h2>
          <InstallAndUse type="component" name="EventStream" />

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
