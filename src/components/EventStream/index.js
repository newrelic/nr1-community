import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Stack, StackItem } from 'nr1';
import { format as dateFormat } from 'date-fns';
import EventCategories from './categories';

import styles from './styles.scss';

export class EventStream extends React.Component {
  static propTypes = {
    eventType: PropTypes.string,
    displayAttributes: PropTypes.bool,
    events: PropTypes.array
  };

  static defaultProps = {
    displayAttributes: true
  };

  constructor(props) {
    super(props);
    this.state = {
      expandedTimelineItem: null
    };
    this.handleTimelineItemClick = this.handleTimelineItemClick.bind(this);
  }

  handleTimelineItemClick(e) {
    e.preventDefault();
    const timelineItemId = e.currentTarget.getAttribute(
      'data-timeline-item-id'
    );
    console.debug(timelineItemId);
    if (timelineItemId === this.state.expandedTimelineItem) {
      this.setState(() => ({
        expandedTimelineItem: null
      }));
    } else {
      this.setState(() => ({
        expandedTimelineItem: timelineItemId
      }));
    }
  }

  _buildStreamTimeline(event) {
    const { displayAttributes } = this.props;

    if (!displayAttributes) {
      return null;
    }

    let timeline = Object.keys(event);
    timeline = timeline.sort();

    return timeline.map((attr, i) => {
      if (event[attr]) {
        return (
          <li key={i} className={styles['timeline-item-contents-item']}>
            <span className={styles.key}>{attr}</span>
            <span className={styles.value}>{event[attr]}</span>
          </li>
        );
      }
      return null;
    });
  }

  _buildStream({ eventType, events }) {
    const { expandedTimelineItem } = this.state;
    return events.map((event, index) => {
      const sessionCategory = EventCategories.setCategory(eventType, event);
      const date = new Date(event.timestamp);
      const open =
        parseInt(expandedTimelineItem, 10) === index
          ? styles['timeline-item-expanded']
          : '';
      const streamTimeline = this._buildStreamTimeline(event);

      const getWrapperClasses = function() {
        const classes = [styles['timeline-item'], open];

        if (sessionCategory.class) {
          classes.push(sessionCategory.class);
        }
        return classes.join(' ', classes);
      };

      return (
        <div
          key={index}
          data-timeline-item-id={index}
          onClick={this.handleTimelineItemClick}
          className={getWrapperClasses(sessionCategory.class)}
        >
          <div className={styles['timeline-item-timestamp']}>
            <span className={styles['timeline-timestamp-date']}>
              {dateFormat(date, 'MM/dd/yyyy')}
            </span>
            <span className={styles['timeline-timestamp-time']}>
              {dateFormat(date, 'h:mm:ss a')}
            </span>
          </div>
          <div className={styles['timeline-item-dot']} />
          <div className={styles['timeline-item-body']}>
            <div className={styles['timeline-item-body-header']}>
              <div className={styles['timeline-item-symbol']}>
                <Icon
                  className={styles['timeline-item-symbol-icon']}
                  type={sessionCategory.icon}
                  color={sessionCategory.color}
                />
              </div>
              <div className={styles['timeline-item-title']}>
                {sessionCategory.label}
              </div>
              <Button
                className={styles['timeline-item-dropdown-arrow']}
                type={Button.TYPE.PLAIN_NEUTRAL}
                iconType={
                  Button.ICON_TYPE
                    .INTERFACE__CHEVRON__CHEVRON_BOTTOM__V_ALTERNATE
                }
              />
            </div>
            <div className={styles['timeline-item-contents-container']}>
              <ul className={styles['timeline-item-contents']}>
                {streamTimeline}
              </ul>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { eventType, events } = this.props;
    const hasEvents = events.length > 0;
    const stream = this._buildStream({ eventType, events });

    return (
      <div className={styles['eventStreamSectionBase sessionSectionBase']}>
        {hasEvents && (
          <div className={styles['timeline-container']}>{stream}</div>
        )}

        {!hasEvents && (
          <Stack
            fullWidth
            fullHeight
            className={styles['emptyState eventStreamEmptyState']}
            directionType={Stack.DIRECTION_TYPE.VERTICAL}
            horizontalType={Stack.HORIZONTAL_TYPE.CENTER}
            verticalType={Stack.VERTICAL_TYPE.CENTER}
          >
            <StackItem>
              <p className={styles.emptyStateDescription}>No events provided</p>
            </StackItem>
          </Stack>
        )}
      </div>
    );
  }
}
