import React from 'react';
import PropTypes from 'prop-types';
import Lowlight from 'react-lowlight';
import js from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import scss from 'highlight.js/lib/languages/scss';

Lowlight.registerLanguage('js', js);
Lowlight.registerLanguage('jsx', js);
Lowlight.registerLanguage('bash', bash);
Lowlight.registerLanguage('scss', scss);

export default class CodeBlock extends React.Component {
  // static displayName = 'CodeBlock';

  static propTypes = {
    value: PropTypes.string,
    language: PropTypes.string,
    inline: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Lowlight
        language={this.props.language || 'js'}
        value={this.props.value}
        inline={this.props.inline}
      />
    );
  }
}
