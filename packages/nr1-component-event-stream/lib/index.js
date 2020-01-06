import React from 'react';
import PropTypes from 'prop-types';
import { NrqlQuery, Spinner, Button, Icon, Stack, StackItem } from 'nr1';
// import Moment from 'react-moment';
import EventCategories from './categories';

import styles from './styles.scss';

export class EventStream extends React.Component {
  static propTypes = {
    accountId: PropTypes.number,
    session: PropTypes.object,
    eventType: PropTypes.string,
    durationInMinutes: PropTypes.number
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
    let timeline = Object.keys(event);
    timeline = timeline.sort();
    const data = [];
    // console.log(timeline)
    timeline.forEach((attr, i) => {
      if (event[attr]) {
        data.push(
          <li key={i} className={styles['timeline-item-contents-item']}>
            <span className={styles.key}>{attr}</span>
            <span className={styles.value}>{event[attr]}</span>
          </li>
        );
      }
    });
    return data;
  }

  _buildStream(pageAction, data) {
    const sessionEvents = [];
    data[0].data.forEach((event, i) => {
      const sessionCategory = EventCategories.setCategory(pageAction, event);
      // const date = new Date(event.timestamp);
      const open =
        this.state.expandedTimelineItem === i ? 'timeline-item-expanded' : '';
      const streamTimeline = this._buildStreamTimeline(event);

      sessionEvents.push(
        <div
          key={i}
          data-timeline-item-id={i}
          onClick={this.handleTimelineItemClick}
          className={`timeline-item ${sessionCategory.class} ${open}`}
        >
          <div className={styles['timeline-item-timestamp']}>
            <span className={styles['timeline-timestamp-date']}>
              {/* <Moment format="MM/DD/YYYY" date={date} /> */}
            </span>
            <span className={styles['timeline-timestamp-time']}>
              {/* <Moment format="h:mm:ss a" date={date} /> */}
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
    return sessionEvents;
  }

  render() {
    const { accountId, session, eventType, durationInMinutes } = this.props;
    const query = `SELECT * from ${eventType} WHERE session = '${session}' ORDER BY timestamp ASC LIMIT 1000 since ${durationInMinutes} minutes ago`;

    return (
      <div className={styles['eventStreamSectionBase sessionSectionBase']}>
        {session ? (
          <NrqlQuery accountId={accountId} query={query}>
            {({ data, error, loading }) => {
              if (loading) return <Spinner />;
              if (error) return 'ERROR';

              const stream = this._buildStream(eventType, data);
              return (
                <div className={styles['timeline-container']}>{stream}</div>
              );
            }}
          </NrqlQuery>
        ) : (
          <Stack
            fullWidth
            fullHeight
            className={styles['emptyState eventStreamEmptyState']}
            directionType={Stack.DIRECTION_TYPE.VERTICAL}
            horizontalType={Stack.HORIZONTAL_TYPE.CENTER}
            verticalType={Stack.VERTICAL_TYPE.CENTER}
          >
            <StackItem>
              <p className={styles.emptyStateHeader}>
                Select a session to review a timeline
              </p>
            </StackItem>
            <StackItem>
              <p className={styles.emptyStateDescription}>
                When you select a session (in the column on the left) you will
                be able to review a visual timeline for it here.
              </p>
            </StackItem>
          </Stack>
        )}
      </div>
    );
  }
}
