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
  <DetailPanel
    title="Detail panel title"
    description="Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis."
  >
    Morbi malesuada nulla nec purus convallis consequat. Vivamus id
    mollis quam. Morbi ac commodo nulla. In condimentum orci id nisl
    volutpat bibendum. Quisque commodo hendrerit lorem quis egestas.
    Maecenas quis tortor arcu. Vivamus rutrum nunc non neque
    consectetur quis placerat neque lobortis.
  </DetailPanel>
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
          <div
            className="code-result-block"
            style={{
              padding: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              minHeight: `400px`
            }}
          >
            <DetailPanel
              title="Detail panel title"
              description="Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis."
            >
              Morbi malesuada nulla nec purus convallis consequat. Vivamus id
              mollis quam. Morbi ac commodo nulla. In condimentum orci id nisl
              volutpat bibendum. Quisque commodo hendrerit lorem quis egestas.
              Maecenas quis tortor arcu. Vivamus rutrum nunc non neque
              consectetur quis placerat neque lobortis.
            </DetailPanel>
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
