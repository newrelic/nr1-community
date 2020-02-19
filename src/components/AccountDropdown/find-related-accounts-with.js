import { NrqlQuery } from 'nr1';
import accountsWithData from './reporting-event-types';
import { timeRangeToNrql } from '../../utils';

/**
 * look across all the accounts the user has access to, scoped to the provided
 * event type, and find any accounts that have a match on the provided where clause.
 * Useful for connecting entities/guids etc across account boundaries.
 *
 * As an optimization, we only query accounts that have event data of the provided type.
 * Beware that for customers with lots of accounts and a common event type (e.g. Transaction)
 * this could take a while. By default we use a short time window to keep queries light.
 *
 * Run account queries in parallel (limited by the browser's capacity for parallel requests)
 * and return the array of accounts, each with a hit count in descending order.
 */
export default async function findRelatedAccountsWith({
  eventTypes,
  where,
  timeWindow
}) {
  timeWindow = timeWindow || {
    begin_time: 0,
    duration: 120000, // 'SINCE 2 minutes ago' in milliseconds;
    end_time: 0
  };

  const timeRangeNrql = timeRangeToNrql({ timeRange: timeWindow });
  const { data: accounts = [], errors } = await accountsWithData({
    eventTypes
  });

  if (errors) {
    return { data: accounts, errors };
  }

  const nrql = `SELECT count(*) FROM ${eventTypes.join(
    ','
  )} WHERE ${where} ${timeRangeNrql}`;

  const result = [];
  try {
    await Promise.all(
      accounts.map(async account => {
        const results = await NrqlQuery.query({
          accountId: account.id,
          query: nrql,
          formatType: NrqlQuery.FORMAT_TYPE.RAW
        });

        const data = results.data.raw.results;
        const hitCount = data[0].count;
        if (hitCount > 0) {
          const accountWithHitCount = { ...account, hitCount };
          result.push(accountWithHitCount);
        }
      })
    );

    result.sort((a, b) => b.hitCount - a.hitCount);

    return { accounts: result, errors: [] };
  } catch (e) {
    return { accounts: [], errors: [e] };
  }
}
