import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Button } from 'nr1';

import styles from './styles.scss';

const _defaultDetails = function({ error }) {
  // eslint-disable-next-line no-unused-vars
  const { graphQLErrors, message, stack } = error;
  return (
    <ul className={styles['ng-error-item-contents']}>
      <li className={styles['ng-error-item-contents-item']}>
        <span className={styles.key}>Stack</span>
        <span className={styles.value}>{JSON.stringify(stack)}</span>
      </li>
      {graphQLErrors.length > 0 &&
        graphQLErrors.map((gqlError, i) => {
          if (gqlError) {
            return (
              <li key={i} className={styles['ng-error-item-contents-item']}>
                <span className={styles.key}>{`GraphQL Error ${i + 1}`}</span>
                <span className={styles.value}>{gqlError.message}</span>
              </li>
            );
          }
          return null;
        })}
    </ul>
  );
};
_defaultDetails.propTypes = {
  error: PropTypes.object
};

export class NerdGraphError extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    showDetails: PropTypes.bool,
    errorDetails: PropTypes.func
  };

  static defaultProps = {
    showDetails: true,
    errorDetails: _defaultDetails
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const { error, showDetails, errorDetails } = this.props;
    const { expanded } = this.state;

    // eslint-disable-next-line no-unused-vars
    const { graphQLErrors, message, stack } = error;

    const open = expanded ? styles['ng-error-item-expanded'] : '';

    return (
      <div className={styles['ng-error-container']}>
        <div
          className={[styles['ng-error-item'], open].join(' ')}
          onClick={this.onClick}
        >
          <div className={styles['ng-error-body']}>
            <div className={styles['ng-item-body-header']}>
              <div className={styles['ng-error-item-symbol']}>
                <Icon
                  className={styles['ng-error-item-symbol-icon']}
                  type={Button.ICON_TYPE.INTERFACE__STATE__CRITICAL}
                  color="#ff0000"
                />
                {/* TO DO - Display a count of graphql Errors? */}
              </div>
              <div className={styles['ng-error-item-title']}>{message}</div>
              {showDetails && (
                <Button
                  className={styles['ng-error-item-dropdown-arrow']}
                  type={Button.TYPE.PLAIN_NEUTRAL}
                  iconType={
                    Button.ICON_TYPE
                      .INTERFACE__CHEVRON__CHEVRON_BOTTOM__V_ALTERNATE
                  }
                />
              )}
            </div>
            {showDetails && (
              <div className={styles['ng-error-item-contents-container']}>
                {errorDetails({ error })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
