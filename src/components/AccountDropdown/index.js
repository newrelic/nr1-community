import React from 'react';
import PropTypes from 'prop-types';
import {
  navigation,
  UserStorageQuery,
  UserStorageMutation,
  AccountsQuery,
  Dropdown,
  DropdownItem,
  Spinner
} from 'nr1';

import accountsWithData from './reporting-event-types';
import findRelatedAccountsWith from './find-related-accounts-with';

import styles from './styles.scss';

const collection = 'nr1-community:AccountDropdown';
const documentId = 'default-account';

export class AccountDropdown extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    urlState: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    withReportingEventTypes: PropTypes.object
  };

  static defaultProps = {
    title: 'Select account...'
  };

  constructor(props) {
    super(props);

    this.state = {
      accounts: null,
      defaultAccount: undefined,
      selected: null
    };

    this.select = this.select.bind(this);
  }

  async componentDidMount() {
    await Promise.all([this.loadAccounts(), this.loadDefaultAccount()]);

    this.setState(state => {
      if (this.props.urlState && this.props.urlState.account) {
        const account = this.state.accounts.find(
          account => account.id === this.props.urlState.account
        );
        if (account) {
          return {
            selectedFromUrlState: true,
            selected: account
          };
        }
      }

      if (state.selected === null && state.defaultAccount && state.accounts) {
        const account = this.state.accounts.find(
          account => account.id === this.state.defaultAccount
        );
        if (account) {
          return {
            selected: account
          };
        }
      }

      return null;
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevAccount = prevState.selected;
    const account = this.state.selected;

    if (account && (!prevAccount || account.id !== prevAccount.id)) {
      this.props.onSelect(account);

      if (!this.state.selectedFromUrlState) {
        if (this.state.selected.id !== this.state.defaultAccount) {
          this.updateDefaultAccount(this.state.selected);
        }

        if (
          this.props.urlState &&
          this.state.selected.id !== this.props.urlState.account
        ) {
          navigation.setUrlState({
            account: this.state.selected.id
          });
        }
      }
    }
  }

  async loadDefaultAccount() {
    const result = await UserStorageQuery.query({ collection, documentId });
    const id =
      ((((result.data || {}).actor || {}).nerdStorage || {}).document || {})
        .id || null;
    this.setState(() => ({
      defaultAccount: id
    }));
  }

  async loadAccounts() {
    const { withReportingEventTypes } = this.props;
    let accounts = [];

    if (withReportingEventTypes) {
      const { eventTypes, where, timeRange } = withReportingEventTypes;

      if (!where && !timeRange) {
        accounts = await accountsWithData({ eventTypes });
      }

      accounts = await findRelatedAccountsWith(withReportingEventTypes);
    } else {
      // eslint-disable-next-line no-unused-vars
      const { loading, data, errors } = await AccountsQuery.query();

      if (!data) {
        // TO DO
      }

      if (errors) {
        // TO DO
      }

      accounts = data;
    }

    this.setState({
      accounts
    });
  }

  async updateDefaultAccount(account) {
    await UserStorageMutation.mutate({
      actionType: UserStorageMutation.ACTION_TYPE.WRITE_DOCUMENT,
      collection,
      documentId,
      document: { id: account.id }
    });

    this.setState({
      defaultAccount: account.id
    });
  }

  select(account) {
    this.setState(state => {
      if (!state.selected || state.selected.id !== account.id) {
        return {
          selectedFromUrlState: false,
          selected: account
        };
      }

      return {};
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { className, style, title } = this.props;
    const { accounts, defaultAccount, selected } = this.state;

    if (!accounts || defaultAccount === undefined) {
      return <Spinner />;
    }

    const items = accounts.map(account => (
      <DropdownItem key={account.id} onClick={() => this.select(account)}>
        {account.name}
      </DropdownItem>
    ));

    return (
      <Dropdown
        title={(selected || {}).name || title}
        className={styles.big}
        style={style}
      >
        {items}
      </Dropdown>
    );
  }
}
