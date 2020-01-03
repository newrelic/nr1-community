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
}

export default allConfigs;
