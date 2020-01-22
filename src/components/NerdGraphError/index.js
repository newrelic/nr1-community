import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Button } from 'nr1';

import styles from './styles.scss';

export class NerdGraphError extends React.Component {
  static propTypes = {
    error: PropTypes.object
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
    const { error } = this.props;

    const { expanded } = this.state;
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
              </div>
              <div className={styles['ng-error-item-title']}>{message}</div>
              <Button
                className={styles['ng-error-item-dropdown-arrow']}
                type={Button.TYPE.PLAIN_NEUTRAL}
                iconType={
                  Button.ICON_TYPE
                    .INTERFACE__CHEVRON__CHEVRON_BOTTOM__V_ALTERNATE
                }
              />
            </div>
            <div className={styles['ng-error-item-contents-container']}>
              <ul className={styles['ng-error-item-contents']}>
                <li className={styles['ng-error-item-contents-item']}>
                  <span className={styles.key}>Stack</span>
                  <span className={styles.value}>{JSON.stringify(stack)}</span>
                </li>
                {graphQLErrors.length > 0 &&
                  graphQLErrors.map((gqlError, i) => {
                    if (gqlError) {
                      return (
                        <li
                          key={i}
                          className={styles['ng-error-item-contents-item']}
                        >
                          <span className={styles.key}>
                            {`GraphQl Error ${i + 1}`}
                          </span>
                          <span className={styles.value}>
                            {gqlError.message}
                          </span>
                        </li>
                      );
                    }
                    return null;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
