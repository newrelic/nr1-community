# nr1-community

![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/newrelic/nr1-community?include_prereleases&sort=semver) [![Snyk](https://snyk.io/test/github/newrelic/nr1-community/badge.svg)](https://snyk.io/test/github/newrelic/nr1-community)

A community-driven library of useful components for building on New Relic One's programmability platform.

This library is built on top of and requires the 'nr1' core library available to Nerdpacks as part of running inside of the New Relic One platform, documentation on this underlying library can be found on [our developer site](https://developer.newrelic.com/client-side-sdk/index.html)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Links](#links)
- [Usage](#usage)
- [Components](#components)
- [Utilities](#utilities)
- [Local Development](#local-development)
- [How do I add my component?](#how-do-i-add-my-component)
- [Related work](#related-work)
  - [New Relic One SDK](#new-relic-one-sdk)
  - [NewRelic Developer Site](#newrelic-developer-site)
  - [Boilerplate Nerdpack Layouts](#boilerplate-nerdpack-layouts)
- [Open Source License](#open-source-license)
- [Support](#support)
  - [Community](#community)
  - [Issues / Enhancement Requests](#issues--enhancement-requests)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Links

- 📘[New Relic One's core components](https://developer.newrelic.com/client-side-sdk/index.html)
- 🔨[Change Log](docs/CHANGELOG.md)
- 📓[Demo](demo/README.md)

## Usage

Install in your project:

```bash
npm install --save @newrelic/nr1-community
```

Import the component/utils into your nerdlet:

```js
import { AccountDropdown, timeRangeToNrql } from 'nr1-community';
```

Import styles into your styles.scss (or similar):

```sass
@import '~nr1-community/dist/index.css';
```

## Components

For complete documentation and a demo, please visit [Demo](demo/README.md) and follow the instructions for viewing.

- [AccountDropdown](src/components/AccountDropdown/README.md)

![Screenshot #1](screenshots/screenshot_AccountDropdown.png)

- [EventStream](src/components/EventStream/README.md)

![Screenshot #2](screenshots/screenshot_EventStream.png)

- [Funnel](src/components/Funnel/README.md)

![Screenshot #1](screenshots/screenshot_Funnel.png)

## Utilities

- [timeRangeToNrql](src/utils/timeRangeToNrql/README.md)
- [bytesToSize](src/utils/bytesToSize/README.md)

## Local Development

1. Open two terminals
1. In one, start up the demo site ([Demo Instructions](demo/README.md))
1. In the other, navigate to the root of this repository and run `npm run start`

Our bundler will watch for changes in /src and auto-build the library. The Demo Nerdpack will see these changes and perform its own live-reloading referencing the local copy of the library.

## How do I add my component?

1. Fork this repository
1. Create a new folder under `/components` or `/utils` with the name of your component (subject to review) and an `index.js`
1. Create a README.md that will serve as the primary documentation of your contribution
1. Create a meta.json and define the props your component requires/accepts
1. Create a new "page" (folder) in our demo Nerdpack under `/demo/nerdlets/nr1-community-demo-nerdlet/pages`. See existing components for examples.

## Related work

### New Relic One SDK

[https://developer.newrelic.com/client-side-sdk/index.html](https://developer.newrelic.com/client-side-sdk/index.html)

### NewRelic Developer Site

[https://developer.newrelic.com](https://developer.newrelic.com)

### Boilerplate Nerdpack Layouts

- [Standard](https://github.com/newrelic/nr1-nerdpack-layout-standard)
- [Double Sidebar](https://github.com/newrelic/nr1-nerdpack-layout-double-sidebar)
- [4x2 Grid](https://github.com/newrelic/nr1-nerdpack-layout-4x2-grid)
- [4 Column](https://github.com/newrelic/nr1-nerdpack-layout-4-column)
- [3 Column](https://github.com/newrelic/nr1-nerdpack-layout-3-column)
- [T-bone](https://github.com/newrelic/nr1-nerdpack-layout-t-bone)
- [2x2 Grid](https://github.com/newrelic/nr1-nerdpack-layout-2x2-grid)
- [3x2 Grid](https://github.com/newrelic/nr1-nerdpack-layout-3x2-grid)

All of these and more can be found on our public Github - [Layout template Nerdpacks](https://github.com/newrelic?utf8=%E2%9C%93&q=nr1-nerdpack-layout&type=&language=)

## Open Source License

This project is distributed under the [Apache 2 license](LICENSE).

## Support

New Relic has open-sourced this project. This project is provided AS-IS WITHOUT WARRANTY OR DEDICATED SUPPORT. Issues and contributions should be reported to the project here on GitHub.

We encourage you to bring your experiences and questions to the [Explorers Hub](https://discuss.newrelic.com) where our community members collaborate on solutions and new ideas.

### Community

New Relic hosts and moderates an online forum where customers can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorers Hub. You can find this project's topic/threads here:

https://discuss.newrelic.com/t/

### Issues / Enhancement Requests

Issues and enhancement requests can be submitted in the [Issues tab of this repository](../../issues). Please search for and review the existing open issues before submitting a new issue.

## Contributing

Contributions are welcome (and if you submit a Enhancement Request, expect to be invited to contribute it yourself :grin:). Please review our [Contributors Guide](CONTRIBUTING.md).

Keep in mind that when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. If you'd like to execute our corporate CLA, or if you have any questions, please drop us an email at opensource+nr1-community@newrelic.com.
