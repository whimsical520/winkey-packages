import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'
import del from 'rollup-plugin-delete'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      entryFileNames: '[name].cjs.js'
    },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      del({
        targets: ['dist/**/*']
      }),
      nodeResolve(),
      commonjs(),
      json(),
      copy({
        targets: [{ src: 'src/types/*', dest: 'dist/types' }]
      }),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  }
]
