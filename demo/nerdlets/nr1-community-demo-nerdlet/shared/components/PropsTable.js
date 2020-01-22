import React from 'react';
import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap-table-next';

export default class PropsTable extends React.Component {
  static propTypes = {
    meta: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }

  componentDidMount() {
    this.propsTableData();
  }

  propsTableData() {
    const { meta } = this.props;

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
    const { meta } = this.props;
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
    return (
      <>
        <BootstrapTable
          keyField="name"
          data={this.propsTableData()}
          columns={this.propsColumns()}
        />
      </>
    );
  }
}
