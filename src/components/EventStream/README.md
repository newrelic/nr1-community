# EventStream

## Installation

1. Install nr1-community

  ```bash
    npm i @newrelic/nr1-community
  ```

2. Import styles

  Add:

  ```scss
  @import '~@newrelic/nr1-community/dist/index.css';
  ```

  to your `styles.scss`

## Usage

```jsx

const events = [{
  type: 'PageAction',
  timestamp: 1579284085
}]

<EventStream events={events} displayAttributes={true} />
```

