/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';

import Highlight from 'react-highlight';

const InstallAndUse = ({ type, name }) => {
  const hasStyles = type === 'component';
  const importStatement = `import { ${name} } from '@newrelic/nr1-community';`;

  return (
    <>
      <p>1. Install</p>
      <Highlight className="bash">{`npm i @newrelic/nr1-community`}</Highlight>

      <p>2. Import</p>
      <Highlight className="jsx">{importStatement}</Highlight>

      {hasStyles && (
        <>
          <p>3. Import Styles</p>
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
