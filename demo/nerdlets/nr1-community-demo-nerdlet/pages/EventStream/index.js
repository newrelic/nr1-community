import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import BasicExample from './examples/basic';
import KitchenSinkExample from './examples/kitchen-sink';

// Page data
import meta from '@/components/EventStream/meta.json';

const page = {
  title: 'Event Stream',
  subtitle: '',
  examples: 'Examples',
  examplesText: 'Lorem Ipsum Awesome'
};

export default class EventStreamDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    //
  }

  propsTableData() {
    return meta.props.map(prop => {
      return {
        name: prop.name,
        type: prop.type,
        default: prop.default,
        description: prop.description
      };
    });
  }

  propsColumns() {
    const columns = [];

    Object.keys(meta.props[0]).map((key, index) => {
      return (columns[index] = {
        dataField: key,
        text: key,
        sort: true
      });
    });

    columns[0].classes = 'prop-name-column';
    columns[0].formatter = this.tablePropNameFormatter;
    return columns;
  }

  render() {
    return (
      <Grid spacingType={[Grid.SPACING_TYPE.OMIT, Grid.SPACING_TYPE.NONE]}>
        <GridItem columnSpan={9} collapseGapAfter className="primary-grid-item">
          <h1>{page.title}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2>Examples</h2>
          <p>{meta.description}</p>

          {/* Code Samples */}
          <BasicExample />
          <KitchenSinkExample />

          {/* Props */}
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
      </Grid>
    );
  }
}
