import React from 'react';
import Highlight from 'react-highlight';
import { Tabs, TabsItem } from 'nr1';

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
              `}
      </Highlight>
    );
  }

  render() {
    return (
      <div className="example-container">
        <h3>Using tabs and custom callbacks</h3>
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
              justifyContent: 'flex-end'
            }}
          >
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
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
