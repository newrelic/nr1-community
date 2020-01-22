/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';

import Highlight from 'react-highlight';

const InstallAndUse = ({ type, name }) => {
  const hasStyles = type === 'component';
  const importStatement = `import { ${name} } from '@newrelic/nr1-community';`;

  return (
    <>
      <h3>Install</h3>
      <Highlight className="bash">{`npm i @newrelic/nr1-community`}</Highlight>

      <h3>Import</h3>
      <Highlight className="jsx">{importStatement}</Highlight>

      {hasStyles && (
        <>
          <h3>Import Styles</h3>
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
