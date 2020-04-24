import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'nr1';

import styles from './styles.scss';

export class GenericError extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    hideIcon: PropTypes.bool,
    errorDescription: PropTypes.string
  };

  static defaultProps = {
    error: 'Error:',
    errorDescription: '',
    hideIcon: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { error, hideIcon, errorDescription } = this.props;

    return (
      <div className={[styles['ng-error-container'], open].join(' ')}>
        <div className={styles['ng-error-body-header']} onClick={this.onClick}>
          {!hideIcon && (
            <Icon type={Icon.TYPE.INTERFACE__STATE__CRITICAL} color="#bf0015" />
          )}
          <h5 className={`${styles['ng-error-title']} ${hideIcon ? styles['ng-no-icon'] : ''}`}>{error}:</h5>
          <p className={styles['ng-error-description']}>{errorDescription}</p>
        </div>
      </div>
    );
  }
}
