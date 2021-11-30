import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import multiInput from 'rollup-plugin-multi-input';
import postcss from 'rollup-plugin-postcss';
import vuePlugin from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import ignoreImport from 'rollup-plugin-ignore-import';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.ts', '.tsx'];

const external = ['vue', '@babel/runtime'];
const input = 'src/index.ts';
const inputList = ['src/**/*.ts', 'src/**/*.tsx'];

const getPlugins = ({ isProd = false, isUmd = false, isEsm = false } = {}) => {
  const plugins = [
    nodeResolve({ extensions }),
    commonjs(),
    vuePlugin(),
    esbuild({
      target: 'esnext',
      minify: false,
      jsx: 'preserve',
    }),
    babel({ babelHelpers: 'runtime', extensions }),
  ];

  if (isProd) {
    plugins.push(
      terser({
        output: {
          ascii_only: true,
        },
      }),
    );
  }

  if (isUmd) {
    plugins.push(
      postcss({
        extract: isProd ? 'index.min.css' : 'index.css',
        minimize: isProd,
        sourceMap: true,
      }),
    );
  } else {
    plugins.push(
      postcss({
        extract: 'style/index.css',
      }),
      ignoreImport({
        extensions: ['.css'],
      }),
    );
  }

  if (isEsm) {
    plugins.push(replace({
      'var undefined$1 = undefined': 'import "./index.css"',
    }));
  }

  return plugins;
};

const esmConfig = {
  input: inputList,
  treeshake: false,
  external,
  plugins: [multiInput()].concat(getPlugins({ isEsm: true })),
  output: {
    dir: 'esm/',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

const cjsConfig = {
  input: inputList,
  external,
  plugins: [multiInput()].concat(getPlugins()),
  output: {
    dir: 'lib/',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

const umdConfig = {
  input,
  external,
  plugins: getPlugins({ isUmd: true }),
  output: {
    name: 'TDesignIconVueNext',
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue', lodash: '_' },
    sourcemap: true,
    file: 'dist/index.js',
  },
};

const umdMinConfig = {
  input,
  external,
  plugins: getPlugins({
    isProd: true,
    isUmd: true,
  }),
  output: {
    name: 'TDesignIconVueNext',
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue', lodash: '_' },
    sourcemap: true,
    file: 'dist/index.min.js',
  },
};

export default [esmConfig, cjsConfig, umdConfig, umdMinConfig];
