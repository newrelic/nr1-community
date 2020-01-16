# timeRangeToNrql

## Description

## Installation

1. Install @newrelic/nr1-community

  ```bash
    npm i @newrelic/nr1-community
  ```

## Usage

```jsx
import { timeRangeToNrql } from '@newrelic/nr1-community';

// Often provided by the PlatformState provider
const timeRange = {
  begin_time: 0,
  duration: 0,
  end_time: 0
};

timeRangeToNrql({ timeRange });
```
