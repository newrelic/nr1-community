import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { NerdGraphQuery, NerdGraphMutation } from 'nr1';
import get from 'lodash.get';

const USER_ID_QUERY = `
  query {
    actor {
      user {
        id
      }
    }
  }
`;

const MUTATION_TYPES = {
  DELETE_SECRET: 'delete-secret',
  WRITE_SECRET: 'write-secret'
};

// TO DO
// const MUTATION_DELETE_SECRET = `
//   mutation DeleteUserSecret($name: String!) {
//     nerdStorageVaultDeleteSecret(
//       scope: { actor: CURRENT_USER }
//       name: $name
//     ) {
//       status
//     }
//   }
// `;

const MUTATION_DELETE_SECRET = `
  mutation DeleteUserSecret($name: String!, $userId: ID!) {
    nerdStorageVaultDeleteSecret(
      scope: ACTOR
      scopeId: $userId
      name: $name
    ) {
      status
    }
  }
`;

// TO DO
// const MUTATION_WRITE_SECRET = `
//   mutation StoreUserSecret($name: String!, $value: SecureValue!) {
//     nerdStorageVaultWriteSecret(
//       scope: { actor: CURRENT_USER }
//       name: $name
//       value: $value
//     ) {
//       status
//     }
//   }
// `;

const MUTATION_WRITE_SECRET = `
  mutation StoreUserSecret($name: String!, $value: SecureValue!, $userId: ID!) {
    nerdStorageVaultWriteSecret(
      scope: ACTOR
      scopeId: $userId
      name: $name
      value: $value
    ) {
      status
    }
  }
`;

function getMutation({ actionType }) {
  if (actionType === MUTATION_TYPES.DELETE_SECRET) {
    return MUTATION_DELETE_SECRET;
  }
  return MUTATION_WRITE_SECRET;
}

function getMutationOptions(props) {
  const { name, value } = props;

  return {
    mutation: getMutation(props),
    variables: {
      name,
      value,
      userId: props.userId
    }
  };
}

const proxyResponse = children => (loading, error, data) =>
  children({
    loading,
    data: get(data, 'actor.nerdVault.result'),
    error
  });

export class UserSecretsMutation extends PureComponent {
  static async mutate(props) {
    const { data } = await NerdGraphQuery.query({
      query: USER_ID_QUERY
    });
    const userId = data.actor.user.id;
    return NerdGraphMutation.mutate(getMutationOptions({ ...props, userId }));
  }

  static propTypes = {
    children: PropTypes.element,
    actionType: PropTypes.oneOf(Object.values(MUTATION_TYPES)).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    fetchPolicyType: PropTypes.string
  };

  static ACTION_TYPE = MUTATION_TYPES;

  render() {
    const { children } = this.props;
    const mutationOptions = getMutationOptions(this.props);

    return (
      <NerdGraphQuery query={USER_ID_QUERY}>
        {({ data }) => {
          const userId = data.actor.user.id;
          mutationOptions.userId = userId;

          return (
            <NerdGraphMutation {...mutationOptions}>
              {proxyResponse(children)}
            </NerdGraphMutation>
          );
        }}
      </NerdGraphQuery>
    );
  }
}
