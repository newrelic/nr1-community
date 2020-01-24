import React from 'react';

// NR1
import { Grid, GridItem } from 'nr1';
import { camelCase } from 'lodash';

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

export default class AccountDropdownDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      headerRefs: undefined
    };

    this.setHeaderRef = this.setHeaderRef.bind(this);
    this.renderHeaders = this.renderHeaders.bind(this);
  }

  setHeaderRef(node) {
    const nodeText = camelCase(node.innerText);

    this.headerRefs = {
      ...this.headerRefs,
      [nodeText]: node
    };

    this.setState(() => ({
      headerRefs: this.headerRefs
    }));
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
    if (this.state.headerRefs !== undefined) {
      const headerRefsKeys = Object.keys(this.state.headerRefs);
      const headers = headerRefsKeys.map(header => {
        return this.state.headerRefs[header].innerText;
      });

      return headers.map((header, index) => (
        <li
          key={index}
          className={`secondary-nav-item ${
            this.state.headerRefs[headerRefsKeys[index]].nodeName === 'H3'
              ? 'child-header'
              : ''
          }`}
          onClick={() =>
            this.state.headerRefs[headerRefsKeys[index]].scrollIntoView({
              behavior: 'smooth'
            })
          }
        >
          {header}
        </li>
      ));
    }
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
          <h1 ref={this.setHeaderRef}>{page.title}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2 ref={this.setHeaderRef}>Examples</h2>
          <p>{meta.description}</p>

          {/* Code Samples */}
          <BasicExample headerRef={() => this.setHeaderRef} />
          <AdvancedExample headerRef={() => this.setHeaderRef} />
          <KitchenSinkExample headerRef={() => this.setHeaderRef} />

          {/* Installation/Usage */}
          <h2 ref={this.setHeaderRef}>Installation and Usage</h2>
          <InstallAndUse type="component" name="AccountDropdown" />

          {/* Props */}
          <h2 ref={this.setHeaderRef}>Properties</h2>
          <PropsTable meta={meta} />
        </GridItem>

        {/* Sidebar */}
        {this.renderSidebar()}
      </Grid>
    );
  }
}
