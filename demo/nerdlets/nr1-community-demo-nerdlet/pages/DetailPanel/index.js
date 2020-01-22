import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import BasicExample from './examples/basic';
import AdvancedExample from './examples/advanced';

// Page data
import meta from '@/components/DetailPanel/meta.json';

const page = {
  title: 'Detail Panel',
  subtitle: 'Provide additional info about a specific visualization.'
};

export default class DetailPanelDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Local state, ex - if we use tabs for each code sample
    };
  }

  render() {
    return (
      <Grid>
        <GridItem columnSpan={9} collapseGapAfter className="primary-grid-item">
          <h1>{page.title}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2>Examples</h2>
          <p>{meta.description}</p>

          {/* Code Samples */}
          <BasicExample />
          <AdvancedExample />

          {/* Props */}
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
      </Grid>
    );
  }
}
