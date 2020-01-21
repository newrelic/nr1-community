import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Tabs, TabsItem } from 'nr1';
// import styles from './style.scss';

class Header extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  toggleDetailPanel() {
    console.log('close this');
  }

  render() {
    const { onClose, title } = this.props;

    return (
      <div className="header">
        <Button
          size="small"
          type={Button.TYPE.PLAIN}
          onClick={onClose}
          className="close-button"
          iconType={Button.ICON_TYPE.INTERFACE__SIGN__TIMES__V_ALTERNATE}
        />
        <h3>{title}</h3>
        <span
          className="minimize-button"
          onClick={() => this.toggleDetailPanel()}
        >
          <Icon
            type={Icon.TYPE.INTERFACE__CHEVRON__CHEVRON_RIGHT__WEIGHT_BOLD}
            color="#000E0E"
            sizeType={Icon.SIZE_TYPE.SMALL}
          />
        </span>
      </div>
    );
  }
}

export class DetailPanel extends React.Component {
  render() {
    return (
      <div className="detail-panel-container">
        <Header {...this.props} />
        <Tabs>
          <TabsItem value="summary" label="Tags">
            hi there
          </TabsItem>
          <TabsItem
            className="process-table-tab"
            value="processes"
            label="Processes"
          >
            hi there
          </TabsItem>
          <TabsItem className="charts-tab" value="charts" label="Charts">
            hi there
          </TabsItem>
        </Tabs>
      </div>
    );
  }
}
