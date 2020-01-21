import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Grid, GridItem } from 'nr1';

import BootstrapTable from 'react-bootstrap-table-next';

import withVisibilityHoc from '../../shared/withVisibilityHoc';
import codeRenderer from '../../shared/code-renderer';
import meta from '@/components/AccountDropdown/meta.json';
import markdown from '@/components/AccountDropdown/README.md';

import BasicExample from './examples/basic';
import AdvancedExample from './examples/advanced';
import KitchenSinkExample from './examples/kitchen-sink';

const page = {
  title: 'Account Dropdown',
  subtitle: 'A common interface for choosing an account',
  examples: 'Examples',
  examplesText:
    'This component provides a common interface for choosing an account with a callback (onSelect allows for integration in to the rest of your application).'
};

const {
  heading: Heading
} = require('@/../demo/node_modules/react-markdown/lib/renderers');

export default class AccountDropdownDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Local state, ex - if we use tabs for each code sample
    };
    this.visibilityHandler = this.visibilityHandler.bind(this);
  }

  visibilityHandler({ isVisible, props }) {
    if (isVisible) {
      console.log('Capturing event from visibility renderer');
      console.log(JSON.stringify(props));
    }
  }

  propsTableData() {
    let tableData = [];

    return (tableData = meta.props.map(prop => {
      return {
        name: prop.name,
        type: prop.type,
        default: prop.default,
        description: prop.description
      };
    }));
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

  tablePropNameFormatter(cell) {
    return <code className="lowlight">{cell}</code>;
  }

  render() {
    this.propsTableData();

    return (
      <Grid spacingType={[Grid.SPACING_TYPE.OMIT, Grid.SPACING_TYPE.NONE]}>
        <GridItem columnSpan={9} collapseGapAfter className="primary-grid-item">
          <h1>{page.title}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2>Examples</h2>
          <p>{page.examplesText}</p>

          {/* Code Samples */}
          <BasicExample />
          <AdvancedExample />
          <KitchenSinkExample />

          {/* Markdown from /components/<component-name>/README.md */}
          <h2>Description</h2>
          <ReactMarkdown
            source={markdown}
            escapeHtml
            renderers={{
              inlineCode: codeRenderer,
              code: codeRenderer,
              heading: withVisibilityHoc(Heading, this.visibilityHandler)
            }}
          />

          {/* Rendering of data (mostly props definitions) from /components/<component-name>/meta.json */}
          <h2>Properties</h2>
          <BootstrapTable
            keyField="name"
            data={this.propsTableData()}
            columns={this.propsColumns()}
          />
        </GridItem>
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
