import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
      entryFileNames: "[name].cjs.js",
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      del({
        targets: ["dist/**/*"],
      }),
      nodeResolve(),
      commonjs(),
      json(),
      copy({
        targets: [{ src: "src/seeds/*", dest: "dist/seeds" }],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
    // external: [...] // 外部引用的库，不要打包，用于处理 peerDependencies
  },
];
