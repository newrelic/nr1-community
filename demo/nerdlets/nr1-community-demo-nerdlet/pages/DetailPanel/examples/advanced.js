import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, TabsItem } from 'nr1';
import { DetailPanel } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class DetailPanelAdvancedDemo extends React.Component {
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
    const scope = { DetailPanel, Tabs, TabsItem };
    const code = `
<DetailPanel
  title="Detail panel title"
  description="Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis."
  onClose={() => console.log('You clicked the close button')}
  onMinimize={() => console.log('You clicked the minimize button')}
>
  <Tabs>
      <TabsItem value="tab-1" label="Tab 1 label">
        Tab 1 content. Vestibulum id ligula porta felis euismod
        semper.
      </TabsItem>
      <TabsItem value="tab-2" label="Tab 2 label">
        Tab 2 content. Nulla vitae elit libero, a pharetra augue
        ligula.
      </TabsItem>
      <TabsItem value="tab-3" label="Tab 3 label">
        Tab 3 content. Integer posuere erat a ante venenatis dapibus.
      </TabsItem>
  </Tabs>
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
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
