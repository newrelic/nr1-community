import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'nr1';
import styles from './styles.scss';

class Header extends React.Component {
  render() {
    const { onClose, title, description, defaultOnClose } = this.props;

    return (
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles['visibility-controls']}>
          <Button
            size="small"
            type={Button.TYPE.PLAIN}
            onClick={onClose === undefined && defaultOnClose}
            className={styles['close-button']}
            iconType={Button.ICON_TYPE.INTERFACE__SIGN__TIMES__V_ALTERNATE}
          />
          <span
            className={styles['minimize-button']}
            onClick={() => this.toggleDetailPanel()}
          >
            <Icon
              type={Icon.TYPE.INTERFACE__CHEVRON__CHEVRON_RIGHT__WEIGHT_BOLD}
              color="#000E0E"
              sizeType={Icon.SIZE_TYPE.SMALL}
              className={styles['minimize-button-icon']}
            />
          </span>
        </div>
      </header>
    );
  }
}

export class DetailPanel extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    title: 'Detail panel title',
    description: 'Nulla quis tortor orci. Etiam at risus et justo dignissim.'
  };

  constructor(props) {
    super(props);

    this.state = {
      closed: false,
      minimized: false
    };

    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  toggleDetailPanel() {
    console.log('close this');
  }

  handleCloseButton() {
    this.setState({ closed: true });
  }

  render() {
    const { children } = this.props;
    const { closed } = this.state;

    return (
      <div className={closed ? styles['container-closed'] : styles.container}>
        <Header {...this.props} defaultOnClose={this.handleCloseButton} />
        <div className={styles['children-container']}>{children}</div>
      </div>
    );
  }
}
