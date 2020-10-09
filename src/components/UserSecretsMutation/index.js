import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { NerdGraphMutation } from 'nr1';
import get from 'lodash.get';

const MUTATION_TYPES = {
  DELETE_SECRET: 'delete-secret',
  WRITE_SECRET: 'write-secret'
};

const MUTATION_DELETE_SECRET = `
  mutation DeleteUserSecret($key: String!) {
    nerdStorageVaultDeleteSecret(key: $key, scope: {actor: CURRENT_USER}) {
      errors {
        message
      }
      status
    }
  }
`;

const MUTATION_WRITE_SECRET = `
  mutation StoreUserSecret($key: String!, $value: SecureValue!) {
    nerdStorageVaultWriteSecret(key: $key, value: $value, scope: {actor: CURRENT_USER}) {
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
  const { key, value } = props;

  return {
    mutation: getMutation(props),
    variables: {
      key,
      value
    }
  };
}

// {"data":{"nerdStorageVaultWriteSecret":{"__typename":"NerdStorageVaultResult","status":"SUCCESS"}}}
// {"data":{"nerdStorageVaultDeleteSecret":{"__typename":"NerdStorageVaultResult","errors":null,"status":"SUCCESS"}}}
const proxyResponse = (children, actionType) => (loading, error, data) => {
  const path =
    actionType === UserSecretsMutation.ACTION_TYPE.WRITE_SECRET
      ? 'nerdStorageVaultWriteSecret.status'
      : 'nerdStorageVaultDeleteSecret.status';

  return children({
    loading,
    data: get(data, path),
    error
  });
};

export class UserSecretsMutation extends PureComponent {
  static async mutate(props) {
    return NerdGraphMutation.mutate(getMutationOptions({ ...props }));
  }

  static propTypes = {
    children: PropTypes.element,
    actionType: PropTypes.oneOf(Object.values(MUTATION_TYPES)).isRequired,
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    fetchPolicyType: PropTypes.string
  };

  static ACTION_TYPE = MUTATION_TYPES;

  render() {
    const { actionType, children } = this.props;
    const mutationOptions = getMutationOptions(this.props);

    return (
      <NerdGraphMutation {...mutationOptions}>
        {proxyResponse(children, actionType)}
      </NerdGraphMutation>
    );
  }
}
