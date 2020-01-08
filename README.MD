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
- [Related work](#related-work)
- [Open Source License](#open-source-license)
- [Support](#support)
  - [Community](#community)
  - [Issues / Enhancement Requests](#issues--enhancement-requests)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Links

- 📘[New Relic One's core components](https://developer.newrelic.com/client-side-sdk/index.html)
- 🔨[Change Log](docs/CHANGELOG.md)
- [Demo](demo/README.md)

## Usage

Install in your project:
```bash
npm install --save @newrelic/nr1-community
```

Import into your nerdlet:
```js
import { AccountDropdown } from 'nr1-community';
```

## Components

For complete documentation and a demo, please visit [Demo](demo/README.md) and follow the instructions for viewing.

- AccountDropdown

![Screenshot #1](screenshots/screenshot_01.png)

- EventStream

![Screenshot #2](screenshots/screenshot_02.png)

## Related work

Boilerplate [Layout template Nerdpacks](https://github.com/newrelic?utf8=%E2%9C%93&q=nr1-nerdpack-layout&type=&language=)

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
