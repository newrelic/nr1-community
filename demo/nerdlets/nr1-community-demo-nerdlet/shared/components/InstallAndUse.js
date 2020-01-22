/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';

import Highlight from 'react-highlight';

const InstallAndUse = ({ type, name }) => {
  const hasStyles = type === 'component';
  const importStatement = `import { ${name} } from '@newrelic/nr1-community';`;

  return (
    <>
      Install
      <Highlight className="bash">{`npm i @newrelic/nr1-community`}</Highlight>
      Import
      <Highlight className="jsx">{importStatement}</Highlight>
      {hasStyles && (
        <>
          Import STyles
          <Highlight className="sass">
            {`@import '~@newrelic/nr1-community/dist/index.css';`}
          </Highlight>
        </>
      )}
    </>
  );
};

InstallAndUse.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string
};

export default InstallAndUse;
