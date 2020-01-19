import React from 'react';
import Highlight from 'react-highlight';

import { timeRangeToNrql } from '@/../dist';

export default class EmptyStateBasicDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHighlight() {
    return (
      <Highlight className="javascript">
        {`
  const timeRange = {
    begin_time: 0,
    duration: 30,
    end_time: 3600
  };

  timeRangeToNrql(timeRange);
              `}
      </Highlight>
    );
  }

  render() {
    const timeRange = {
      begin_time: 0,
      duration: 30,
      end_time: 3600
    };

    return (
      <div className="example-container">
        <div className="example-container-content">
          <div className="code-result-block">
            <code className="lowlight">{timeRangeToNrql(timeRange)}</code>
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
