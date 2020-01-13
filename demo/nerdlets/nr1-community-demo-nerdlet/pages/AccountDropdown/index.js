import React from 'react';
import ReactMarkdown from 'react-markdown';

import BootstrapTable from 'react-bootstrap-table-next';

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

export default class AccountDropdownDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Local state, ex - if we use tabs for each code sample
    };
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
      <>
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
            code: codeRenderer
          }}
        />

        {/* Rendering of data (mostly props definitions) from /components/<component-name>/meta.json */}
        <h2>Properties</h2>
        <BootstrapTable
          keyField="name"
          data={this.propsTableData()}
          columns={this.propsColumns()}
        />
      </>
    );
  }
}
