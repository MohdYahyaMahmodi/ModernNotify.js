import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/modernNotify.js',
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
    plugins: [
      typescript({ 
        tsconfig: './tsconfig.json',
        include: ['src/**/*'],
        exclude: ['**/*.d.ts']
      }),
      resolve(),
      commonjs()
    ]
  },
  {
    input: 'src/modernNotify.js',
    output: {
      file: 'dist/modernnotify.esm.js',
      format: 'es'
    },
    plugins: [
      typescript({ 
        tsconfig: './tsconfig.json',
        include: ['src/**/*'],
        exclude: ['**/*.d.ts']
      }),
      resolve(),
      commonjs()
    ]
  }
];