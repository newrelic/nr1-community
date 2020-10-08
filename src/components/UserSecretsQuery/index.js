import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { NerdGraphQuery } from 'nr1';
import get from 'lodash.get';

// Singular
const QUERY_SECRET = `
  query userSecret ($key: String!) {
    actor {
      nerdStorageVault {
        secret(key: $key) {
          key
          value
        }
      }
    }
  }
`;

// Plural
const QUERY_SECRETS = `
  query userSecrets {
    actor {
      nerdStorageVault {
        secrets {
          key
          value
        }
      }
    }
  }
`;

function getQuery({ secret }) {
  if (secret) {
    return QUERY_SECRET;
  }
  return QUERY_SECRETS;
}

function getQueryOptions(props) {
  const { secret, fetchPolicyType } = props;
  const query = getQuery(props);

  const options = {
    query,
    variables: secret ? { secret } : {},
    fetchPolicyType
  };

  return options;
}

// {"data":{"actor":{"__typename":"Actor","nerdStorageVault":{"__typename":"NerdStorageVaultActorStitchedFields","secrets":[{"__typename":"NerdStorageVaultSecret","key":"foo","value":"password"}]}}}}
const proxyChildren = children => ({ loading, error, data }) => {
  return children({
    loading,
    data: get(data, 'actor.nerdStorageVault.secrets'),
    error
  });
};

const proxyQueryResult = ({ loading, error, data }) =>
  get(data, 'actor.nerdStorageVault.secrets');

export class UserSecretsQuery extends PureComponent {
  static query(props) {
    const options = this.getQueryOptions(props);
    return NerdGraphQuery.query(...options).then(proxyQueryResult);
  }

  static propTypes = {
    children: PropTypes.func,
    secret: PropTypes.string,
    fetchPolicyType: PropTypes.string
  };

  static defaultProps = {
    fetchPolicyType: NerdGraphQuery.defaultProps.fetchPolicyType
  };

  render() {
    const { children } = this.props;
    const queryOptions = getQueryOptions(this.props);

    return (
      <NerdGraphQuery {...queryOptions}>
        {proxyChildren(children)}
      </NerdGraphQuery>
    );
  }
}
