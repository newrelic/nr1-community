import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import pkg from './package.json';

/*
 * Base Config
 */
const baseConfig = {
  input: 'lib/index.js',
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
  plugins: [
    external(),
    postcss({
      extract: true,
      modules: true,
      use: ['sass'],
      generateScopedName: function(name, filename, css) {
        const i = css.indexOf(`.${name}`);
        const line = css.substr(0, i).split(/[\r\n]/).length;

        // const path = require('path');
        // const file = path.basename(filename, '.css');

        // return `_${file}_${line}_${name}`;
        return `_${line}_${name}`;
      }
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

export default baseConfig;
