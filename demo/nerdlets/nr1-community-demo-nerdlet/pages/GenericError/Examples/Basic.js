import React from 'react';
import PropTypes from 'prop-types';

import { NerdGraphQuery } from 'nr1';
import { GenericError } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class GenericErrorBasicDemo extends React.Component {
  static propTypes = {
    header: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      enableLiveEditing: false
    };
  }

  renderHighlight() {
    const { enableLiveEditing } = this.state;
    const scope = {
      NerdGraphQuery,
      GenericError
    };
    const code = `
() => { // Enclosed in an arrow function so we can show you query and variables
  const query = \`
    query($id: Int!) {
      actor {
          account(id: $id) {
              name
          }
      }
    }
  \`;

  const variables = {
    id: 1111111111111 // Not a real account id, triggers the error
  };

  return (
    <NerdGraphQuery query={query} variables={variables}>
      {({ loading, data, error }) => {
        if (error) {
          return <GenericError error={error} />;
        }
        return null;
      }}
    </NerdGraphQuery>
  );
}
    `;
    return (
      <CodeHighlight
        scope={scope}
        code={code}
        language="jsx"
        use="react-live"
        enableLiveEditing={enableLiveEditing}
      />
    );
  }

  render() {
    const { header } = this.props;

    return (
      <div className="example-container">
        <h3 id={header.id}>{header.text}</h3>
        <p>
          Demonstrate the default behavior of displaying captured errors.
        </p>

        <div className="example-container-content">
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
