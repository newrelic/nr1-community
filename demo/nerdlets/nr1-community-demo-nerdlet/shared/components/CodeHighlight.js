import React from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Highlight, { defaultProps } from 'prism-react-renderer';
// eslint-disable-next-line import/no-named-default
import { default as ReactHighlight } from 'react-highlight';

// import theme from 'prism-react-renderer/themes/duotoneDark';
import theme from './theme';

const Live = function({ code, scope }) {
  return (
    <LiveProvider theme={theme} code={code} scope={scope}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};
Live.propTypes = {
  code: PropTypes.string,
  scope: PropTypes.object
};

const PrismHighlight = function({ code, language }) {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
PrismHighlight.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string
};

const CodeHighlight = function({ use, code, language, scope }) {
  if (use === 'react-live') {
    return <Live scope={scope} code={code} language={language} />;
  }

  if (use === 'prism') {
    return <PrismHighlight code={code} language={language} />;
  }

  return <ReactHighlight className={language}>{code}</ReactHighlight>;
};
CodeHighlight.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string,
  use: PropTypes.string,
  scope: PropTypes.object
};

export default CodeHighlight;
