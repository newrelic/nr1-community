import React from 'react';

import { AccountDropdown } from '../../../../dist';

export default class AccountDropdownDemo extends React.Component {
  render() {
    return <AccountDropdown onSelect={account => console.log(account)} />;
  }
}
