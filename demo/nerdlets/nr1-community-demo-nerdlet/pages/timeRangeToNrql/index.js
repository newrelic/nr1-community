import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Grid, GridItem } from 'nr1';

import withVisibilityHoc from '../../shared/withVisibilityHoc';
import codeRenderer from '../../shared/code-renderer';
import markdown from '@/utils/timeRangeToNrql/README.md';

import BasicExample from './examples/basic';

const page = {
  title: 'timeRangeToNRQL',
  subtitle:
    'Converts the 3 data points from the New Relic One time picker (begin time, end time, and duration) to NRQL.',
  examples: 'Examples',
  examplesText:
    "When the New Relic One platform timepicker is used, 3 data points are provided inside of it's `timeRange` which are human readable but is not valid NQRL. This utility converts those 3 data points to a string that can be used in a NRQL query."
};

const {
  heading: Heading
} = require('@/../demo/node_modules/react-markdown/lib/renderers');

export default class EmptyStateDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Local state, ex - if we use tabs for each code sample
    };
    this.visibilityHandler = this.visibilityHandler.bind(this);
  }

  visibilityHandler({ isVisible, props }) {
    if (isVisible) {
      console.log('Capturing event from visibility renderer');
      console.log(JSON.stringify(props));
    }
  }

  render() {
    return (
      <Grid>
        <GridItem columnSpan={9}>
          <h1>{page.title}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2>Example</h2>
          <p>{page.examplesText}</p>

          {/* Code Samples */}
          <BasicExample />

          {/* Markdown from /components/<component-name>/README.md */}
          <h2>Description</h2>
          <ReactMarkdown
            source={markdown}
            escapeHtml
            renderers={{
              inlineCode: codeRenderer,
              code: codeRenderer,
              heading: withVisibilityHoc(Heading, this.visibilityHandler)
            }}
          />
        </GridItem>
      </Grid>
    );
  }
}
