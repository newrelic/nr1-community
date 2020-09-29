import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { NerdGraphMutation } from 'nr1';
import get from 'lodash.get';

const MUTATION_TYPES = {
  DELETE_SECRET: 'delete-secret',
  WRITE_SECRET: 'write-secret'
};

const MUTATION_DELETE_SECRET = `
  mutation userSecretDelete($name: String!) {
    actor {
      nerdvault {
        result: userSecretDelete(name: $name) {
          deletedAt
        }
      }
    }
  }
`;

const MUTATION_WRITE_SECRET = `
  mutation userSecretWrite($name: String!) {
    actor {
      nerdvault {
        result: userSecretWrite(name: $name) {
          updatedAt
        }
      }
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
  const { secret } = this.props;

  return {
    mutation: getMutation(props),
    variables: {
      secret
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
  static query(props) {
    return NerdGraphMutation.mutate(getMutationOptions(props));
  }

  static propTypes = {
    children: PropTypes.element,
    actionType: PropTypes.oneOf(Object.values(UserSecretsMutation.ACTION_TYPE))
      .isRequired,
    secret: PropTypes.string.isRequired,
    fetchPolicyType: PropTypes.string
  };

  static defaultProps = {
    //
  };

  static ACTION_TYPE = MUTATION_TYPES;

  render() {
    const { children } = this.props;
    const mutationOptions = getMutationOptions(this.props);

    return (
      <NerdGraphMutation {...mutationOptions}>
        {proxyResponse(children)}
      </NerdGraphMutation>
    );
  }
}
