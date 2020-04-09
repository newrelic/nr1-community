export { GenericError } from './GenericError';

import React from 'react';
import PropTypes from 'prop-types';

export class EmptyState extends React.Component {
  static propTypes = {
    heading: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }


  render() {
    const { } = this.props;

    return (
        <div className={[styles['ng-error-container'], open].join(' ')}>
        <div className={styles['ng-error-body-header']} onClick={this.onClick}>
          {/* TO DO - Display a count of graphql Errors? */}
          <Icon type={Icon.TYPE.INTERFACE__STATE__CRITICAL} color="#bf0015" />
          <h5 className={styles['ng-error-title']}>{message}</h5>
          {showDetails && (
            <a href="#" className={styles['ng-error-details-button']}>
              {expanded ? 'Hide details' : 'View details'}
            </a>
          )}
        </div>
        {showDetails && (
          <div className={styles['ng-error-details']}>
            {errorDetails({ error })}
          </div>
        )}
      </div>
    );
  }
}
