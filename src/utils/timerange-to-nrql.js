const MINUTE = 60000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export default function timePickerNrql(props) {
  if (!props || !props.launcherUrlState) return 'SINCE 30 minutes ago';
  const { timeRange } = props.launcherUrlState;
  if (!timeRange) {
    return 'SINCE 30 minutes ago';
  }
  if (timeRange.beginTime && timeRange.endTime) {
    return `SINCE ${timeRange.beginTime} UNTIL ${timeRange.endTime}`;
  } else if (timeRange.duration <= HOUR) {
    return `SINCE ${timeRange.duration / MINUTE} MINUTES AGO`;
  } else if (timeRange.duration <= DAY) {
    return `SINCE ${timeRange.duration / HOUR} HOURS AGO`;
  } else {
    return `SINCE ${timeRange.duration / DAY} DAYS AGO`;
  }
}
