import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import del from "rollup-plugin-delete";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        entryFileNames: "[name].cjs.js",
      },
    ],
    plugins: [
      del({
        targets: ["dist/**/*"],
      }),
      nodeResolve({ mainFields: ["jsnext:main"] }),
      commonjs({
        exclude: "node_modules/**",
      }),
      json(),
      typescript({
        typescript: require("typescript"),
      }),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "esm",
      entryFileNames: "[name].esm.js",
    },
    plugins: [
      nodeResolve({ mainFields: ["jsnext:main"] }),
      commonjs({
        exclude: "node_modules/**",
      }),
      json(),
      typescript({
        typescript: require("typescript"),
      }),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },
];
