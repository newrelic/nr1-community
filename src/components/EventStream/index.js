import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Stack, StackItem } from 'nr1';
import { format as dateFnsFormat } from 'date-fns';

import styles from './styles.scss';

// eslint-disable-next-line no-unused-vars
const _defaultIconType = function({ event }) {
  return {
    icon: Icon.TYPE.DOCUMENTS__DOCUMENTS__NOTES,
    color: '#9C5400',
    backgroundColor: '#FFFFFF'
  };
};

/*
 * Default renderer for each data item's body
 * A key/value map of all of the objects attributes
 * Customizable by passing in your own
 */
const _defaultEventContent = function({ event }) {
  let timeline = Object.keys(event);
  timeline = timeline.sort();

  return (
    <ul className={styles['timeline-item-contents']}>
      {timeline.map((attr, i) => {
        if (event[attr]) {
          return (
            <li key={i} className={styles['timeline-item-contents-item']}>
              <span className={styles.key}>{attr}:</span>
              <span className={styles.value}>{event[attr]}</span>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};
_defaultEventContent.propTypes = {
  event: PropTypes.object
};

export class EventStream extends React.Component {
  /*
   * timestampFormat and dateFormat support any of the date formats found:
   * https://date-fns.org/v2.9.0/docs/format
   */
  static propTypes = {
    data: PropTypes.array,
    timestampField: PropTypes.string,
    timestampFormat: PropTypes.string,
    dateFormat: PropTypes.string,
    labelField: PropTypes.string,
    labelFormatter: PropTypes.func,
    eventContent: PropTypes.func,
    iconType: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
      PropTypes.func
    ])
  };

  static defaultProps = {
    data: [],
    timestampField: 'timestamp',
    timestampFormat: 'h:mm:ss a',
    dateFormat: 'MM/dd/yyyy',
    labelField: 'actionName',
    eventContent: _defaultEventContent,
    iconType: _defaultIconType
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

  // TO DO - Icon backgroundColor
  _buildStream({ data }) {
    const {
      timestampField,
      timestampFormat,
      dateFormat,
      labelField,
      labelFormatter,
      eventContent,
      iconType
    } = this.props;
    const { expandedTimelineItem } = this.state;

    return data.map((event, index) => {
      const timestamp = event[timestampField]; // TO DO - Default? Error? What do we do if not found?
      let icon = false;
      if (iconType == null) {
        icon = _defaultIconType({ event });
      } else if (typeof iconType == "boolean") {
        if (iconType) {
          icon = _defaultIconType({ event });
        }
        //else remains false and we'll not display
      } else if (typeof iconType == "object") {
        //we passed in an icon
        icon = iconType;
      } else if (typeof iconType == "function") {
        icon = iconType({ event });
      }
      const date = new Date(timestamp);
      const open =
        parseInt(expandedTimelineItem, 10) === index
          ? styles['timeline-item-expanded']
          : '';

      const label = event[labelField]; // TO DO - Default? Error? What do we do if not found?
      const formattedLabel = labelFormatter ? labelFormatter(label) : label;
      const eventBody = eventContent({ event });

      // TO DO - With styles applied to :after psuedo elements for the background's of the Icons - how do we allow for customization?
      // const getIconBackgroundColor = function(icon) {
      //   return icon.backgroundColor
      //     ? { backgroundColor: icon.backgroundColor }
      //     : null;
      // };

      return (
        <div
          key={index}
          data-timeline-item-id={index}
          onClick={this.handleTimelineItemClick}
          className={[styles['timeline-item'], open].join(' ')}
        >
          <div className={styles['timeline-item-timestamp']}>
            <span className={styles['timeline-timestamp-date']}>
              {dateFnsFormat(date, dateFormat)}
            </span>
            <span className={styles['timeline-timestamp-time']}>
              {dateFnsFormat(date, timestampFormat)}
            </span>
          </div>
          <div className={styles['timeline-item-dot']} />
          <div className={styles['timeline-item-body']}>
            <div className={styles['timeline-item-body-header']}>
              {icon && <div
                className={styles['timeline-item-symbol']}
                // style={getIconBackgroundColor(icon)}
              >
                <Icon
                  className={styles['timeline-item-symbol-icon']}
                  type={icon.icon}
                  color={icon.color}
                />
              </div>}
              <div className={styles['timeline-item-title']}>
                {formattedLabel}
              </div>
              {eventContent && (
                <Button
                  className={styles['timeline-item-dropdown-arrow']}
                  type={Button.TYPE.PLAIN_NEUTRAL}
                  iconType={
                    Button.ICON_TYPE
                      .INTERFACE__CHEVRON__CHEVRON_BOTTOM__V_ALTERNATE
                  }
                />
              )}
            </div>
            {eventContent && (
              <div className={styles['timeline-item-contents-container']}>
                {eventBody}
              </div>
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    const { data } = this.props;
    const hasEvents = data.length > 0;
    const stream = this._buildStream({ data });

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
