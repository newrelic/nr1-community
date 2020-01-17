import React from 'react';
import Highlight from 'react-highlight';

import { EmptyState } from '@/../dist';

export default class EmptyStateBasicDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHighlight() {
    return (
      <Highlight className="javascript">
        {`
  <EmptyState />
              `}
      </Highlight>
    );
  }

  render() {
    return (
      <div className="example-container">
        <h3>Basic</h3>
        <p>The basic, standard empty state. Nothing fancy here.</p>
        <div className="example-container-content">
          <div className="code-result-block">
            <EmptyState />
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
