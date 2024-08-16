import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/modernnotify.js',
    output: [
      {
        file: 'dist/modernnotify.js',
        format: 'umd',
        name: 'ModernNotify',
        exports: 'default'
      },
      {
        file: 'dist/modernnotify.min.js',
        format: 'umd',
        name: 'ModernNotify',
        exports: 'default',
        plugins: [terser()]
      }
    ],
    plugins: [resolve(), commonjs()]
  },
  {
    input: 'src/modernnotify.js',
    output: {
      file: 'dist/modernnotify.esm.js',
      format: 'es'
    },
    plugins: [resolve(), commonjs()]
  }
];