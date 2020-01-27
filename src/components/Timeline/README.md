# Timeline

## Description

Timeline is a vertically oriented timeline showing a series of events in a summary but with a drilldown for additional detail.

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

import { Timeline } from '@newrelic/nr1-community';

<NrqlQuery
  accountId={"your account id"}
  query="SELECT * FROM PageAction SINCE 60 MINUTES AGO limit 7"
>
  {({ data }) => {
    if (data) {
      const events = data[0].data;

      return <Timeline data={events} />;
    }
    return null;
  }}
</NrqlQuery>
```

> Note:
> Launch the /demo Nerdpack to see more advanced examples and full documentation
