import path from "path";
import react from "@vitejs/plugin-react";
import StylelintPlugin from "vite-plugin-stylelint";
import eslintPlugin from "vite-plugin-eslint";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";
import typescript from "@rollup/plugin-typescript";
import { CSSOptions } from "./models/viteCss";
import { ConfigEnv } from "./models/viteConfig";
import { cwd } from "./js/consts";
import { loadEnv } from "./js/vite";
import { WinkeyProjectConfig, ViteConfigStruct } from "./index";

export const initComponent = (
  localConfig: WinkeyProjectConfig,
  viteConfig?: ViteConfigStruct
) => {
  /** 包名 */
  const pkgName = localConfig.name || "demo";
  /** alias 基础路径 */
  const ALIAS_ROOT_PATH =
    (
      localConfig?.alias as {
        srcRoot: string;
      }
    ).srcRoot || "./src/";
  /** 输出目录 */
  const OUTDIR_PATH = localConfig?.outDir || "./dist/";

  const config: any = {
    base: "/",
    /** 根目录 */
    root: localConfig.root || "./",
    // /** 存储缓存文件的目录。 */
    cacheDir: localConfig.cacheDir || "node_modules/.vite",
    clearScreen: localConfig.clearScreen || false,
    /** 出口文件 */
    build: {
      lib: {
        entry: path.resolve(cwd, "src/components/index.tsx"),
        name: pkgName,
        fileName: pkgName,
      },
      cssTarget: "chrome61",
      outDir: path.join(cwd, OUTDIR_PATH),
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [
          "react",
          "react-dom",
          ...(localConfig?.build?.rollupOptions?.external || []),
        ],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            react: "react",
            "react-dom": "react-dom",
          },
        },
      },
    },
    /** 开发配置 */
    server: {
      host: "0.0.0.0",
      port: localConfig.server?.port || 5000,
    },
    /** 路径设置 */
    resolve: {
      alias: Array.isArray(localConfig?.alias)
        ? localConfig.alias
        : [
            {
              find: "~@",
              replacement: path.join(ALIAS_ROOT_PATH + "components/"),
            },
            {
              find: "~",
              replacement: path.join(ALIAS_ROOT_PATH),
            },
          ],
    },
    /** 导入 .css 文件将会把内容插入到 <style> 标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的、作为其模块默认导出的 CSS。 */
    css: {
      modules: localConfig.cssModules
        ? {
            // css模块化 文件以.module.[css|less|scss]结尾
            generateScopedName: "[name]__[local]___[hash:base64:5]",
            hashPrefix: "winkey",
          }
        : false,
      /** 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键 */
      preprocessorOptions: {
        less: {
          /** 支持内敛JavaScript */
          javascriptEnabled: true,
        },
        scss: {
          /** 支持内敛JavaScript */
          javascriptEnabled: true,
        },
      },
    },
    /** 插件 */
    plugins: [
      eslintPlugin({
        include: ["src/**/*.ts", "src/**/*.tsx", "src/*.ts", "src/*.tsx"],
      }),
      react({
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { version: "legacy" }],
            ["@babel/plugin-transform-class-properties", { loose: true }],
          ],
        },
      }),
      tsconfigPaths(),
      StylelintPlugin({
        fix: true,
        quiet: true,
      }),
    ],
  };

  /** 合并plugin */
  config.plugins = Object.assign(
    config.plugins as any[],
    localConfig.plugins || []
  );
  /** 合并css */
  config.css = Object.assign(config.css as CSSOptions, localConfig.css || {});

  const { mode, command } = viteConfig as ConfigEnv;
  const env = loadEnv(mode, process.cwd());
  const isBuild = command === "build";

  if (isBuild) {
    // 压缩 Html 插件
    config.define = {
      "process.env.NODE_ENV": '"production"',
    };

    config.plugins = [
      ...config.plugins,
      typescript({
        target: "es5",
        rootDir: path.resolve(cwd, "src/components"),
        declaration: true,
        declarationDir: path.resolve(cwd, "dist"),
        exclude: [
          path.resolve("node_modules/**"),
          path.resolve("winkey.config.ts"),
        ],
        allowSyntheticDefaultImports: true,
      }),
    ];
  }

  config.plugins = [
    ...config.plugins,
    createHtmlPlugin({
      inject: {
        data: {
          ...env,
          devServerToolScript:
            localConfig.winkeyTool && !isBuild
              ? `<script type="module" src="/winkey_tool/js/index.js"></script>`
              : "",
          devServerToolDom:
            localConfig.winkeyTool && !isBuild
              ? `<div id="winkey_tool"></div>`
              : "",
          devServerToolCss:
            localConfig.winkeyTool && !isBuild
              ? `<link href="/winkey_tool/css/index.css" rel="stylesheet" >`
              : "",
        },
      },
    }),
  ];

  return config;
};
