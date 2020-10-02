import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { NerdGraphQuery } from 'nr1';
import get from 'lodash.get';

// Singular
const QUERY_SECRET = `
  query userSecret ($name: String!) {
    actor {
      nerdStorageVault {
        secret(name: $name) {
          name
          value
          createdAt
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
          name
          createdAt
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

const proxyResponse = children => (loading, error, data) =>
  children({
    loading,
    data: get(data, 'actor.nerdVault.nerdVaultSecrets'),
    error
  });

export class UserSecretsQuery extends PureComponent {
  static query(props) {
    const options = this.getQueryOptions(props);
    return NerdGraphQuery.query(...options);
  }

  static propTypes = {
    children: PropTypes.element,
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
        {proxyResponse(children)}
      </NerdGraphQuery>
    );
  }
}
