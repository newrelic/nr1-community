import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { NerdGraphQuery } from 'nr1';
import {timeRangeToNrql} from '../../utils/timeRangeToNrql';

import styles from './styles.scss';

const FunnelGraph = require('funnel-graph-js');
const cryptoRandomString = require('crypto-random-string');
const colors = require('nice-color-palettes');

function get_color_set() {
  let num = Math.floor(Math.random() * 100);
  num = num >= 0 ? num : 0;
  return [colors[num][2]];
}

export class Funnel extends React.Component {
  static propTypes = {
    accountId: PropTypes.number.isRequired,
    platformUrlState: PropTypes.object.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    funnel: PropTypes.shape({
      event: PropTypes.string.isRequired,
      measure: PropTypes.string.isRequired // what are we funneling?
    }).isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        nrqlWhere: PropTypes.string.isRequired // fragment of NRQL used ot construct the series of funnel queries
      })
    ),
    series: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        nrqlWhere: PropTypes.string.isRequired // fragment of NRQL used ot construct the series of funnel queries
      })
    )
  };

  static defaultProps = {
    width: 200,
    height: 575
  };

  constructor(props) {
    super(props);
    this.state = {
      componentContainer: `funnel-${cryptoRandomString({
        length: 12
      })}`
    };
    this.queryMap = {};
  }

  componentDidMount() {
    const { height, width } = this.props;
    const { componentContainer } = this.state;

    this._getData().then(data => {
      this.graph = new FunnelGraph({
        container: `.${componentContainer}`,
        gradientDirection: 'vertical',
        data: data,
        displayPercent: true,
        direction: 'vertical',
        width,
        height,
        subLabelValue: 'percent'
      });

      this.graph.draw();
    });
  }

  shouldComponentUpdate(nextProps) {
    const next = JSON.stringify({
      funnel: nextProps.funnel,
      series: nextProps.series,
      steps: nextProps.steps
    });
    const current = JSON.stringify({
      funnel: this.props.funnel,
      series: this.props.series,
      steps: this.props.steps
    });
    const nextRange = nextProps.platformUrlState
      ? nextProps.platformUrlState.timeRange.duration
      : null;
    const currentRange = this.props.platformUrlState
      ? this.props.platformUrlState.timeRange.duration
      : null;
    if (next !== current || nextRange !== currentRange) {
      this._getData().then(data => {
        this.graph.updateData(data);
      });
    }
    return true;
  }

  _buildGql() {
    const { accountId, series } = this.props;
    return `{
      actor {
        account(id: ${accountId}) {
          ${series.map(s => {
            return `${
              this.queryMap[s.label]
            }:nrql(query: "${this._constructFunnelNrql(s)}") {
              results
            }`;
          })}
        }
      }
    }`;
  }

  _constructFunnelNrql(series) {
    const { funnel, steps, platformUrlState } = this.props;
    const since  = timeRangeToNrql(platformUrlState);
    return `FROM ${funnel.event} SELECT funnel(${funnel.measure} ${steps
      .map(step => `, WHERE ${step.nrqlWhere} as '${step.label}'`)
      .join(' ')}) WHERE ${series.nrqlWhere} ${since}`;
  }

  _buildQueryMap() {
    const { series } = this.props;
    this.queryMap = {};
    const alphaPrefix = 'A';
    series.forEach(s => {
      const queryIdentifier =
        alphaPrefix +
        cryptoRandomString({
          length: 12
        });
      this.queryMap[s.label] = queryIdentifier;
    });
  }

  _getData() {
    this._buildQueryMap();
    const query = this._buildGql();
    // eslint-disable-next-line no-console
    console.log('query', [NerdGraphQuery, query]);
    return NerdGraphQuery.query({ query }).then(({ data }) => {
      const { series, steps } = this.props;
      const results = {
        subLabels: series.map(s => s.label),
        labels: steps.map(step => step.label),
        colors: series.map(() => get_color_set()),
        values: []
      };
      // console.debug(data);
      series.forEach(s => {
        const _steps = get(
          data,
          `actor.account.${this.queryMap[s.label]}.results[0].steps`
        );
        if (results.values.length === 0) {
          _steps.forEach(step => {
            results.values.push([step]);
          });
        } else {
          _steps.forEach((step, i) => {
            results.values[i].push(step);
          });
        }
      });
      return results;
    });
  }

  render() {
    const { componentContainer } = this.state;
    return (
      <div className={componentContainer} ref={ref => (this._ref = ref)} />
    );
  }
}
