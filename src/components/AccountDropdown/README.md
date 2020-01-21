# AccountDropdown

## Description

Applications (Nerdpacks) developed in New Relic One are limited (for security purposes) to data in the account they are installed (subscribed) to and hierarchically to any child accounts.

Often the goal is to limit the view by a given account to ensure accurate context.

This component provides a common interface for choosing an account with a callback (`onSelect`) that allows for integration into the rest of your application.

## Installation

1. Install nr1-community

  ```bash
  npm i @newrelic/nr1-community
  ```

2. Add the styles for the component to the top of your stylesheet (probably named `styles.scss`):

  ```scss
  @import '~@newrelic/nr1-community/dist/index.css';
  ```

## Usage

```jsx
import { AccountDropdown } from '@newrelic/nr1-community';

export default class FooComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: null
    };
    this.onSelectHandler = this.onSelectHandler.bind(this);
  }

  onSelect(account) {
    this.setState({ selectedAccount: account });
  }

  render () {
    return <AccountDropdown
      title={this.state.selectedAccount.name || 'Select an Account'}
      onSelect={onSelect}
    ></AccountDropdown>
  }
}
```
