# AccountDropdown

## Description

Applications (Nerdpacks) developed in New Relic One are limited (for security purposes) to data in the account they are installed (subscribed) to and hierarchically to any child accounts.

Often the goal is to limit the view by a given account to ensure accurate context.

This component provides a common interface for choosing an account with a callback (`onSelect`) that allows for integration into the rest of your application.

## Installation

1. Install nr1-community

```bash
  npm i nr1-community
```

2. Install peer dependencies

```bash
  npm i moment react-moment
```

3. Import styles

Add:

```scss
@import '~nr1-community/dist/components/AccountDropdown.css';
```

to your `styles.scss`

## Usage

```jsx
import { AccountDropdown } from 'nr1-community';

render () {
  <AccountDropdown></AccountDropdown>
}
```

## Props

```jsx
  onSelect: PropTypes.func,
  urlState: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string
```
