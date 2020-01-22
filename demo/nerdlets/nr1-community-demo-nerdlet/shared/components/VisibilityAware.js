import React from 'react';
import PropTypes from 'prop-types';
import ReactVisibilitySensor from 'react-visibility-sensor';

export default class VisibilityAware extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    onChangeData: PropTypes.object,
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = {
      //
    };
    this.onChange = this.props.onChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(isVisible) {
    this.onChange({
      isVisible,
      data: this.props.onChangeData
    });
  }

  render() {
    return (
      <ReactVisibilitySensor onChange={this._onChange}>
        {this.props.children}
      </ReactVisibilitySensor>
    );
  }
}
