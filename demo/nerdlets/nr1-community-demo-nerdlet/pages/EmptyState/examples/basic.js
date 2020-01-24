import React from 'react';
import PropTypes from 'prop-types';

import { EmptyState } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class EmptyStateBasicDemo extends React.Component {
  static propTypes = {
    header: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      enableLiveEditing: false
    };
  }

  renderHighlight() {
    const { enableLiveEditing } = this.state;
    const scope = { EmptyState };
    const code = `
<EmptyState
  heading="No content available"
  description="This is why there's no content available and what you can do you take the next step. For instance, you could direct users to another navigation path."
  buttonText="Take this action"
  buttonOnClick={() => {
    console.log('You clicked the empty state buttun!');
  }}
/>
    `;
    return (
      <CodeHighlight
        scope={scope}
        language="jsx"
        code={code}
        use="react-live"
        enableLiveEditing={enableLiveEditing}
      />
    );
  }

  render() {
    const { header } = this.props;

    return (
      <div className="example-container">
        <h3 id={header.id}>{header.text}</h3>
        <p>
          You can customize the heading, description, and button text as well as
          provide a callback for when the button is clicked. If you want omit
          the button or description, just provide an empty string as their value
          (e.g. <code className="lowlight">button=""</code>).
        </p>
        <div className="example-container-content">
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
