import { NerdGraphQuery } from 'nr1';

/**
 * For building account pickers, etc. Get the list of all visible accounts that have
 * data for the given event type. For examlpe, if you send `SystemSample` you'll get
 * a list of all accounts with Infratructure installed.  Clean up those account menus!
 */
export default async function accountsWithData({ eventTypes }) {
  if (!Array.isArray(eventTypes)) {
    throw new Error('reportingEventTypes expects an array');
  }

  const eventTypesGql = `"${eventTypes.join('", "')}"`;
  const gql = `{actor {accounts {name id reportingEventTypes(filter:[${eventTypesGql}])}}}`;

  // console.debug(gql);

  const result = await NerdGraphQuery.query({ query: gql });
  const data = result.data.actor.accounts;
  const errors = result.errors;

  if (errors) {
    // eslint-disable-next-line no-console
    console.warn(
      "Can't get reporting event types because NRDB is grumpy at NerdGraph.",
      errors
    );

    // eslint-disable-next-line no-console
    console.warn(JSON.stringify(result.errors.slice(0, 5), null, 2));

    /**
     * Filter out errors tied to the lack of reportingEventTypes since we filter
     * the results below on the presence of reportingEventTypes
     */
    const filteredErrors = errors.filter(
      e => e.message === 'Failed to retrieve event types'
    );

    // Simulate a total failure to retrieve if we have any errors
    if (filteredErrors.length > 1) {
      return [];
    }
  }

  const filteredAccounts = data.filter(a => a.reportingEventTypes.length > 0);

  return { accounts: filteredAccounts, errors };
}
