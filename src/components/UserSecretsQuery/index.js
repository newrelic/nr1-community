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
    variables: secret ? { key: secret } : {},
    fetchPolicyType
  };

  return options;
}

function getPath(props) {
  const { secret } = props;
  return secret
    ? 'actor.nerdStorageVault.secret'
    : 'actor.nerdStorageVault.secrets';
}

const proxyChildren = (children, path) => ({ loading, error, data }) => {
  return children({
    loading,
    data: get(data, path, data),
    error
  });
};

const proxyQueryResult = path => ({ loading, error, data }) => ({
  loading,
  data: get(data, path, data),
  error
});

export class UserSecretsQuery extends PureComponent {
  static query(props = {}) {
    const options = getQueryOptions(props);
    return NerdGraphQuery.query(options).then(proxyQueryResult(getPath(props)));
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
        {proxyChildren(children, getPath(this.props))}
      </NerdGraphQuery>
    );
  }
}
