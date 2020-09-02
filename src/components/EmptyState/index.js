import React from 'react';
import PropTypes from 'prop-types';
import { Stack, StackItem, Button } from 'nr1';
import styles from './style.scss';

export class EmptyState extends React.Component {
  static propTypes = {
    heading: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    buttonOnClick: PropTypes.func,
    buttonUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    featuredImage: PropTypes.string,
    footer: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.componentPropType = this.componentPropType.bind(this);
  }

  handleButtonClick() {
    const { buttonOnClick } = this.props;
    if (buttonOnClick !== undefined) {
      return buttonOnClick();
    } else {
      console.log('You clicked the empty state button!');
    }
  }

  componentPropType(prop) {
    if (typeof prop === 'string') {
      return prop;
    } 
    else if (typeof prop === 'function') {
      return prop();
    }
  }

  render() {
    const {
      heading,
      description,
      buttonText,
      buttonUrl,
      className,
      featuredImage,
      footer
    } = this.props;

    return (
      <>
        <Stack
          className={`${styles['empty-state']} ${this.componentPropType(className)}`}
          verticalType={Stack.VERTICAL_TYPE.CENTER}
          horizontalType={Stack.HORIZONTAL_TYPE.CENTER}
          directionType={Stack.DIRECTION_TYPE.VERTICAL}
          gapType={Stack.GAP_TYPE.NONE}
        >
          {featuredImage && (
            <StackItem>
              <img src={featuredImage} className={styles['empty-state-img']} />
            </StackItem>
          )}
          <StackItem>
            <h4 className={styles['empty-state-header']}>
              {this.componentPropType(heading) || 'Lorem ipsum dolor'}
            </h4>
          </StackItem>
          <StackItem className={description === '' ? styles.hidden : ''}>
            <p className={styles['empty-state-description']}>
              {this.componentPropType(description) ||
                'Morbi malesuada nulla nec purus convallis consequat. Vivamus id mollis quam. Morbi ac commodo nulla. In condimentum orci id nisl volutpat bibendum. Quisque commodo hendrerit lorem quis egestas. Maecenas quis tortor arcu. Vivamus rutrum nunc non neque consectetur quis placerat neque lobortis.'}
            </p>
          </StackItem>
          {footer ? (
            <StackItem>{footer()}</StackItem>
          ) : (
            <StackItem className={buttonText === '' ? styles.hidden : ''}>
              <Button onClick={this.handleButtonClick} to={this.componentPropType(buttonUrl)}>
                {this.componentPropType(buttonText) || 'Call to action'}
              </Button>
            </StackItem>
          )}
        </Stack>
      </>
    );
  }
}
