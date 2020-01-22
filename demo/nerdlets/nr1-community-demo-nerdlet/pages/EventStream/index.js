import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import InstallAndUse from '../../shared/components/InstallAndUse';
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
    this.state = {
      showSidebar: false
    };
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

          <h2>Examples</h2>
          <p>{meta.description}</p>

          {/* Code Samples */}
          <BasicExample />
          <KitchenSinkExample />

          {/* Installation/Usage */}
          <h2>Installation and Usage</h2>
          <InstallAndUse type="component" name="EventStream" />

          {/* Props */}
          <h2>Properties</h2>
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
        {this.renderSidebar()}
      </Grid>
    );
  }
}
