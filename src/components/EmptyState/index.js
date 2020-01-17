import React from 'react';
import PropTypes from 'prop-types';
import { Stack, StackItem, Button } from 'nr1';
import styles from './style.scss';

export class EmptyState extends React.Component {
  static propTypes = {
    heading: PropTypes.string,
    description: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { heading, description } = this.props;
    return (
      <>
        <Stack
          className={styles['empty-state']}
          verticalType={Stack.VERTICAL_TYPE.CENTER}
          horizontalType={Stack.HORIZONTAL_TYPE.CENTER}
          directionType={Stack.DIRECTION_TYPE.VERTICAL}
          gapType={Stack.GAP_TYPE.NONE}
        >
          <StackItem>
            <h4 className={styles['empty-state-header']}>
              {heading || 'Empty state title'}
            </h4>
          </StackItem>
          <StackItem
            className={description === ' ' ? styles['no-description'] : ''}
          >
            <p className={styles['empty-state-description']}>
              {description ||
                'Replace me with a description of the action the user should take in order populate/produce the content they would expect to see here. For example: "Select an account now in order to <the reason the user is here>. You should probably limit the size of this description a brief paragraph."'}
            </p>
          </StackItem>
          <StackItem>
            <Button>Call to action</Button>
          </StackItem>
        </Stack>
      </>
    );
  }
}
