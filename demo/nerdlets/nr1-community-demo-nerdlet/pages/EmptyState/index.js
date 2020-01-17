import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Grid, GridItem } from 'nr1';

import BootstrapTable from 'react-bootstrap-table-next';

import withVisibilityHoc from '../../shared/withVisibilityHoc';
import codeRenderer from '../../shared/code-renderer';
import meta from '@/components/EmptyState/meta.json';
import markdown from '@/components/EmptyState/README.md';

import BasicExample from './examples/basic';

const page = {
  title: 'Empty State',
  subtitle:
    "Tells users that there's no content to display—and what they can do next",
  examples: 'Examples',
  examplesText:
    "An empty state is used to tell users that there is no content to display and explain what action they can take in order to make produce/find the content they're looking for. The empty state call to action button should be action-oriented to encourage users to take the step required to produce and or find the content they're looking for."
};

const {
  heading: Heading
} = require('@/../demo/node_modules/react-markdown/lib/renderers');

export default class EmptyStateDemo extends React.Component {
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
      <Grid>
        <GridItem columnSpan={9}>
          <h1>{page.title}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2>Examples</h2>
          <p>{page.examplesText}</p>

          {/* Code Samples */}
          <BasicExample />

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
      </Grid>
    );
  }
}
