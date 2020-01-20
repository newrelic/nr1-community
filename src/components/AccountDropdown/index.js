import React from 'react';
import PropTypes from 'prop-types';
import {
  AccountsQuery,
  Dropdown,
  DropdownItem,
  Icon,
  navigation,
  Spinner,
  Tooltip,
  UserStorageQuery,
  UserStorageMutation
} from 'nr1';

import accountsWithData from './reporting-event-types';
import findRelatedAccountsWith from './find-related-accounts-with';

const collection = 'nr1-community:AccountDropdown';
const documentId = 'default-account';

export class AccountDropdown extends React.Component {
  static propTypes = {
    afterAccountsLoaded: PropTypes.func,
    beforeAccountsLoaded: PropTypes.func,
    className: PropTypes.string,
    onSelect: PropTypes.func,
    onError: PropTypes.func,
    urlState: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.string,
    withReportingEventTypes: PropTypes.object,
    label: PropTypes.string
  };

  static defaultProps = {
    title: 'Select account...',
    label: 'Account'
  };

  constructor(props) {
    super(props);

    this.state = {
      accounts: null,
      defaultAccount: undefined,
      selected: null,
      loadingErrors: []
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

  /*
   * 3 scenarios
   *   - All Accounts
   *   - Accounts with reportingEvents
   *   - Accounts with specific NRQL where clause in a given timeRange
   */
  async loadAccounts() {
    const { withReportingEventTypes } = this.props;

    // All Accounts
    if (!withReportingEventTypes) {
      await this.loadAccountsWithAccountsQuery();
    }

    // reportingEvents and/or more specifically filtered by a given where/timeRange
    if (withReportingEventTypes) {
      const { eventTypes, where, timeRange } = withReportingEventTypes;

      if (!where && !timeRange) {
        await this.loadAccountsWithReportingEventTypes({ eventTypes });
      } else {
        await this.loadAccountsWith({ withReportingEventTypes });
      }
    }
  }

  handleLoadAccountsResponse({ accounts, errors }) {
    const {
      onError = false,
      beforeAccountsLoaded = false,
      afterAccountsLoaded = false
    } = this.props;

    if (errors) {
      if (onError) {
        onError({ errors });
        this.setState({
          loadingErrors: errors
        });
      }
    }

    // Allows for additional custom filtering after we've fetched data
    if (beforeAccountsLoaded) {
      accounts = beforeAccountsLoaded(accounts);
    }

    this.setState({
      accounts
    });

    if (afterAccountsLoaded) {
      afterAccountsLoaded(accounts);
    }
  }

  async loadAccountsWith({ withReportingEventTypes }) {
    const { accounts = [], errors } = await findRelatedAccountsWith(
      withReportingEventTypes
    );
    this.handleLoadAccountsResponse({ accounts, errors });
  }

  async loadAccountsWithReportingEventTypes({ eventTypes }) {
    const { accounts = [], errors } = await accountsWithData({
      eventTypes
    });
    this.handleLoadAccountsResponse({ accounts, errors });
  }

  async loadAccountsWithAccountsQuery() {
    const { data: accounts = [], errors } = await AccountsQuery.query();
    this.handleLoadAccountsResponse({ accounts, errors });
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

  renderErrors() {
    const { loadingErrors } = this.state;

    if (loadingErrors) {
      return (
        <Tooltip text={JSON.stringify(loadingErrors)}>
          <Icon type={Icon.TYPE.INTERFACE__STATE__CRITICAL} />
        </Tooltip>
      );
    }
    return null;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { className, style, title, label } = this.props;
    const { accounts, defaultAccount, loadingErrors, selected } = this.state;

    if (!accounts || defaultAccount === undefined) {
      return <Spinner />;
    }

    const items = accounts.map(account => (
      <DropdownItem key={account.id} onClick={() => this.select(account)}>
        {account.name}
      </DropdownItem>
    ));
    const empty = <DropdownItem>No accounts found...</DropdownItem>;
    const accountItems = items.length > 0 ? items : empty;

    return (
      <>
        {loadingErrors.length > 0 && this.renderErrors()}
        <Dropdown
          title={(selected || {}).name || title}
          className={className}
          style={style}
          label={label}
        >
          {accountItems}
        </Dropdown>
      </>
    );
  }
}
