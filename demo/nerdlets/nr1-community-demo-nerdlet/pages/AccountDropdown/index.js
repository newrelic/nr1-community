import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';

// Local components
import PropsTable from '../../shared/components/PropsTable';
import BasicExample from './examples/basic';
import AdvancedExample from './examples/advanced';
import KitchenSinkExample from './examples/kitchen-sink';

// Page data
import meta from '@/components/AccountDropdown/meta.json';

const page = {
  title: 'Account Dropdown',
  subtitle: 'A common interface for choosing an account'
};

export default class AccountDropdownDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Local state, ex - if we use tabs for each code sample
    };
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
          <AdvancedExample />
          <KitchenSinkExample />

          {/* Props */}
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
        <GridItem columnSpan={3} className="secondary-grid-item">
          <div className="secondary-nav-container">
            <h6 className="secondary-nav-container-header">On this page</h6>
            <ul className="secondary-nav">
              <li className="secondary-nav-item active">
                <a href="#">Examples</a>
                <ul className="secondary-nav-level-2">
                  <li className="secondary-nav-item secondary-nav-level-2-item">
                    <a href="#">Basic</a>
                  </li>
                  <li className="secondary-nav-item secondary-nav-level-2-item">
                    <a href="#">With Reporting Event Types</a>
                  </li>
                  <li className="secondary-nav-item secondary-nav-level-2-item">
                    <a href="#">
                      With Reporting Event Types, where clause, and timeRange
                    </a>
                  </li>
                </ul>
              </li>
              <li className="secondary-nav-item">
                <a href="#">Description</a>
              </li>
              <li className="secondary-nav-item">
                <a href="#">Installation</a>
              </li>
              <li className="secondary-nav-item">
                <a href="#">Usage</a>
              </li>
              <li className="secondary-nav-item">
                <a href="#">Properties</a>
              </li>
            </ul>
          </div>
        </GridItem>
      </Grid>
    );
  }
}
