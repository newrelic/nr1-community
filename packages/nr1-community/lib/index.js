import { AccountDropdown } from '@newrelic/nr1-component-account-dropdown';
import { EventStream } from '@newrelic/nr1-component-event-stream';

/*
 * Creates one stylesheet with everything in it. Import into nerdpack with:
 * @import ~node_modules/@newrelic/nr1-community/dist/index.css;
 *
 * Alternatively, a single style sheet for a single component can be installed in a nerdpack with:
 *
 * In styles.scss:
 * @import ~node_modules/@newrelic/<package name of component>/dist/index.css;
 */
// eslint-disable-next-line no-unused-vars
import styles from './styles.scss';

export { AccountDropdown, EventStream };
