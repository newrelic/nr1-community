import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import pkg from './package.json';

const glob = require('glob');

/*
 * Generate an instance for each "config"
 */
function getPlugins() {
  return [
    external(),
    postcss({
      extract: true,
      modules: {
        // https://github.com/webpack/loader-utils#interpolatename
        generateScopedName: '[name]__[local]___[hash:base64:5]'
        // generateScopedName: function(name, filename, css) {
        //   // const i = css.indexOf(`.${name}`);
        //   // const line = css.substr(0, i).split(/[\r\n]/).length;

        //   // console.debug(`Filename: ${filename}`);
        //   // const path = require('path');
        //   // const file = path.basename(filename, '.css');

        //   // return `_${file}_${line}_${name}`;
        //   // return `${line}_${name}`;
        //   return `${name}`;
        // }
      },
      use: ['sass']
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    resolve(),
    commonjs()
  ];
}

/*
 * Base Config
 */
const baseConfig = {
  input: 'lib/index.js',
  // input: [
  //   'lib/components/account-dropdown/index.js',
  //   'lib/components/event-stream/index.js'
  // ],
  // experimentalCodeSplitting: true,
  output: [
    {
      file: pkg.main,
      // dir: 'dist',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      // dir: 'dist',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      extract: true,
      modules: true,
      use: ['sass']
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    resolve(),
    commonjs()
  ]
};

const allConfigs = [];
allConfigs.push(baseConfig);

/*
 * Build a rollup config for every component
 *
 * https://github.com/egoist/rollup-plugin-postcss/issues/160
 *
 * Generate a CSS output for each component so we can selectively pull in per-component styles
 *
 * The downside to this approach is the JS code is output twice. Once because we're exporting it
 * for easy import, and once for the css file generation.
 *
 * rollup-plugin-postcss is only good at consolidating css output, and does not seem actively maintained
 * We would need to fork it, and allow for per css input file output
 */

const modularStyles = false; // Leaving here for future evaluation, but not currently in use

if (modularStyles) {
  const componentEntryPoints = glob.sync('./lib/components/*/index.js');
  componentEntryPoints.forEach(entryPoint => {
    const outputs = baseConfig.output;
    const plugins = getPlugins();
    const outputPath = entryPoint
      .replace('lib/', 'dist/')
      .replace('/index.js', '');

    const config = {
      ...baseConfig,
      input: entryPoint,
      output: outputs.map(outputDest => {
        return { ...outputDest, file: outputPath };
      }),
      plugins
    };

    allConfigs.push(config);
  });
}

export default allConfigs;
