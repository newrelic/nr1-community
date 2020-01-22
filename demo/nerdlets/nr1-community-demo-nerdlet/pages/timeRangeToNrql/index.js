import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import InstallAndUse from '../../shared/components/InstallAndUse';
import BasicExample from './examples/basic';

// Page data
import meta from '@/utils/timeRangeToNrql/meta.json';

const page = {
  title: 'timeRangeToNRQL',
  subtitle:
    'Converts the 3 data points from the New Relic One time picker (begin time, end time, and duration) to NRQL.'
};

export default class EmptyStateDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false
    };
  }

  renderSidebar() {
    const { showSidebar } = this.state;

    if (!showSidebar) {
      return null;
    }

    return <GridItem columnSpan={3} className="secondary-grid-item" />;
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
          <h1>{page.title}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2>Example</h2>
          <p>{meta.description}</p>

          {/* Code Samples */}
          <BasicExample />

          {/* Installation/Usage */}
          <h2>Installation and Usage</h2>
          <InstallAndUse type="util" name="timeRangeToNrql" />

          {/* Props */}
          <h2>Properties</h2>
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
        {this.renderSidebar}
      </Grid>
    );
  }
}
