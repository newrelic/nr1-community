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
 * Build a rollup config for every component and utility function
 *
 * https://github.com/egoist/rollup-plugin-postcss/issues/160
 */

/*
 * Generate an instance for each "config"
 */
function getPlugins() {
  return [
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
  ];
}

/*
 * Base Config
 */
const baseConfig = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: getPlugins()
};

const allConfigs = [];
allConfigs.push(baseConfig);

/*
 * Generate a CSS output for each components so we can selectively pull in just the styles used
 * The JS code output from this is not utilized...
 */
const componentEntryPoints = glob.sync('./src/components/*/index.js');
componentEntryPoints.forEach(entryPoint => {
  const outputs = baseConfig.output;
  const plugins = getPlugins();
  const outputPath = entryPoint
    .replace('src/', 'dist/')
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

export default allConfigs;
