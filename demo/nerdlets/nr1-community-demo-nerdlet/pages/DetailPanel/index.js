import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Grid, GridItem } from 'nr1';

import withVisibilityHoc from '../../shared/withVisibilityHoc';
import codeRenderer from '../../shared/code-renderer';
import PropsTable from '../../shared/components/PropsTable';

import meta from '@/components/DetailPanel/meta.json';
import markdown from '@/components/DetailPanel/README.md';

import BasicExample from './examples/basic';
import AdvancedExample from './examples/advanced';

const page = {
  title: 'Detail Panel',
  subtitle: 'Provide additional info about a specific visualization.',
  examples: 'Examples',
  examplesText:
    'Detail panels are a way to provide additional detailed information about a specific visualization (tables, chart, map, etc.) on the current screen.'
};

const {
  heading: Heading
} = require('@/../demo/node_modules/react-markdown/lib/renderers');

export default class DetailPanelDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Local state, ex - if we use tabs for each code sample
    };
    this.visibilityHandler = this.visibilityHandler.bind(this);
  }

  visibilityHandler({ isVisible, props }) {
    if (isVisible) {
      // console.log('Capturing event from visibility renderer');
      // console.log(JSON.stringify(props));
    }
  }

  render() {
    return (
      <Grid>
        <GridItem columnSpan={9} collapseGapAfter className="primary-grid-item">
          <h1>{page.title}</h1>
          <p className="lead-paragraph">{page.subtitle}</p>

          <hr />

          <h2>Examples</h2>
          <p>{page.examplesText}</p>

          {/* Code Samples */}
          <BasicExample />
          <AdvancedExample />

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

          {/* Rendering of data (mostly props definitions) from /components/<component-name>/meta.json */}
          <PropsTable meta={meta} />
        </GridItem>
      </Grid>
    );
  }
}
