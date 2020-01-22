import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import BasicExample from './examples/basic';

// Page data
import meta from '@/components/EmptyState/meta.json';

const page = {
  title: 'Empty State',
  subtitle:
    "Tells users that there's no content to display—and what they can do next"
};

export default class EmptyStateDemo extends React.Component {
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

          {/* Props */}
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
      </Grid>
    );
  }
}
