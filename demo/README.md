# New Relic One Community Demo

The New Relic One Community demo combines:

- Markdown [docs](../docs)
- Code samples
- Prop references

into one easily searchable guide.

## Getting Started

You'll need a New Relic account.

This library relies on New Relic One's programmability [client-side SDK](https://developer.newrelic.com/client-side-sdk/index.html), for demo purposes it needs to run inside of a Nerdpack, running on a New Relic account.

If you're new to New Relic, and you need an account, you can follow instructions on [developer.newrelic.com](https://developer.newrelic.com/) to get access to New Relic's Developer Edition.

### Running Demo

```sh
git clone https://github.com/newrelic/nr1-community
npm install
npm run build
cd demo
nr1 nerdpack:uuid -gf # Only needed the first time
nr1 nerdpack:serve
```

Note: You could also deploy this Nerdpack to your account.
