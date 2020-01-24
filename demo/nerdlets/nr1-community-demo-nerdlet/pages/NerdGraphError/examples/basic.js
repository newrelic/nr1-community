import React from 'react';

import { NerdGraphQuery } from 'nr1';
import { NerdGraphError } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class NerdGraphErrorBasicDemo extends React.Component {
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
      NerdGraphError
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
          return <NerdGraphError error={error} />;
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
    return (
      <div className="example-container">
        <h3>Basic</h3>
        <p>
          Demonstrate the default behavior of displaying captured errors in an Apollo-based GraphQL error.
        </p>

        <div className="example-container-content">
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}
