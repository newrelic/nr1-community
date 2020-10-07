import React from 'react';

// NR1
import { Grid, GridItem, Button } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import InstallAndUse from '../../shared/components/InstallAndUse';
import BasicExample from './examples/basic';
// import KitchenSinkExample from './examples/kitchen-sink';

// Page data
import { default as userSecretsQueryMeta } from '@/components/UserSecretsQuery/meta.json';
import { default as userSecretsMutationMeta } from '@/components/UserSecretsMutation/meta.json';

const page = {
  title: 'UserSecrets',
  subtitle: ''
};

const pageHeaders = {
  title: {
    text: 'UserSecrets',
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

export default class TimelineDemo extends React.Component {
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
          to="https://github.com/newrelic/nr1-community/blob/master/src/components/UserSecretsQuery/README.md"
        >
          View UserSecretsQuery README
        </Button>
        <Button
          className="readme-link"
          to="https://github.com/newrelic/nr1-community/blob/master/src/components/UserSecretsMutation/README.md"
        >
          View UserSecretsMutation README
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
          <h1 id={pageHeaders.title.id}>UserSecretsQuery</h1>
          <p className="lead-paragraph" />

          <hr />

          <h2 id={pageHeaders.examples.id}>{pageHeaders.examples.text}</h2>
          <p>{userSecretsQueryMeta.description}</p>

          {/* Code Samples */}
          <BasicExample header={pageHeaders.basicExample} />

          {/* Installation/Usage */}
          <h2 id={pageHeaders.installationAndUsage.id}>
            {pageHeaders.installationAndUsage.text}
          </h2>
          <InstallAndUse type="component" name="UserSecretsQuery" />

          {/* Props */}
          <h2 id={pageHeaders.properties.id}>{pageHeaders.properties.text}</h2>
          <PropsTable meta={userSecretsQueryMeta} />
        </GridItem>

        <GridItem
          columnSpan={showSidebar ? 9 : 12}
          collapseGapAfter
          className="primary-grid-item"
        >
          <h1 id={pageHeaders.title.id}>UserSecretsMutation</h1>
          <p className="lead-paragraph" />

          <hr />

          <h2 id={pageHeaders.examples.id}>{pageHeaders.examples.text}</h2>
          <p>{userSecretsMutationMeta.description}</p>

          {/* Code Samples */}
          <BasicExample header={pageHeaders.basicExample} />

          {/* Installation/Usage */}
          <h2 id={pageHeaders.installationAndUsage.id}>
            {pageHeaders.installationAndUsage.text}
          </h2>
          <InstallAndUse type="component" name="UserSecretsMutation" />

          {/* Props */}
          <h2 id={pageHeaders.properties.id}>{pageHeaders.properties.text}</h2>
          <PropsTable meta={userSecretsMutationMeta} />
        </GridItem>

        {/* Sidebar */}
        {this.renderSidebar()}
      </Grid>
    );
  }
}
