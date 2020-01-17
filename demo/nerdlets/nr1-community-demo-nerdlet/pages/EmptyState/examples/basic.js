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
  <EmptyState
    heading="No content available"
    description="This is why there's no content available and what you can do you take the next step. Nulla quis tortor orci. Etiam at risus et justo dignissim."
    buttonText="Take this action"
    buttonOnClick={() =>
      console.log('You clicked the empty state buttun!')
    }
  />
              `}
      </Highlight>
    );
  }

  render() {
    return (
      <div className="example-container">
        <h3>Basic</h3>
        <p>
          You can customize the heading, description, and button text as well as
          provide a callback for when the button is clicked. If you want omit
          the button or description, just provide an empty string as their value
          (e.g. <code className="lowlight">button=""</code>).
        </p>
        <div className="example-container-content">
          <div className="code-result-block">
            <EmptyState
              heading="No content available"
              description="This is why there's no content available and what you can do you take the next step. Nulla quis tortor orci. Etiam at risus et justo dignissim."
              buttonText="Take this action"
              buttonOnClick={() =>
                console.log('You clicked the empty state buttun!')
              }
            />
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
