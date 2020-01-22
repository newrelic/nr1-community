import React from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';

export default function withVisibilityHoc(Renderer, handler) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        //
      };
      this.onChange = handler.bind(this);
      this._onChange = this._onChange.bind(this);
    }

    _onChange(isVisible) {
      this.onChange({
        defaultRenderer: Renderer,
        isVisible,
        props: this.props
      });
    }

    render() {
      return (
        <ReactVisibilitySensor onChange={this._onChange}>
          <Renderer {...this.props} />
        </ReactVisibilitySensor>
      );
    }
  };
}
