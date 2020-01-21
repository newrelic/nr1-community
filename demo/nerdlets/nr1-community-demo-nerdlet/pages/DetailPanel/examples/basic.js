import React from 'react';
import Highlight from 'react-highlight';

import { DetailPanel } from '@/../dist';

export default class DetailPanelBasicDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHighlight() {
    return (
      <Highlight className="javascript">
        {`
<DetailPanel title="hI there">hi there</DetailPanel>
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
            <DetailPanel title="hI there">hi there</DetailPanel>
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
