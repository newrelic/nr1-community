import React from 'react';
import PropTypes from 'prop-types';

import { DetailPanel } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class DetailPanelBasicDemo extends React.Component {
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
    const scope = { DetailPanel };

    const code = `
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
          <div
            className="code-result-block"
            style={{
              padding: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              minHeight: `400px`
            }}
          >
            {this.renderHighlight()}
          </div>
        </div>
      </div>
    );
  }
}
