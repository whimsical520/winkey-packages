import path from "path";
import qiankun from "vite-plugin-qiankun";
import eslintPlugin from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";
import StylelintPlugin from "vite-plugin-stylelint";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import modifyDistPath from "./plugins/modifyDistPath";
import { cwd } from "./js/consts";
import { loadEnv } from "./js/vite";
import { CSSOptions } from "./models/viteCss";
import { ConfigEnv } from "./models/viteConfig";
import { WinkeyProjectConfig, ViteConfigStruct } from "./index";

const IMAGES_REGEXP = ["png", "jpg", "jpge", "gif", "svga"];

export const initProject = (
  localConfig: WinkeyProjectConfig,
  viteConfig?: ViteConfigStruct
) => {
  /** 基础路径 */
  const BASE_PROJECT_PATH = localConfig?.dest?.basePath || "./";
  /** css文件路径 */
  const CSS_PATH = localConfig?.dest?.cssPath || "css";
  /** js文件路径 */
  const JS_PATH = localConfig?.dest?.jsPath || "js";
  /** html文件路径 */
  const HTML_PATH = localConfig?.dest?.htmlPath || "html";
  /** 图片文件路径 */
  const IMG_PATH = localConfig?.dest?.imagesPath || "images";
  /** alias 基础路径 */
  const ALIAS_ROOT_PATH =
    (
      localConfig?.alias as {
        srcRoot: string;
      }
    ).srcRoot || "./src/";

  const customBuild =
    localConfig?.build?.custom === undefined
      ? true
      : localConfig?.build?.custom;
  /** 输出目录 */
  const OUTDIR_PATH = localConfig?.outDir || "./dist/";

  const config: any = {
    base: "/",
    /** 根目录 */
    root: localConfig.root || "./",
    // /** 存储缓存文件的目录。 */
    cacheDir: localConfig.cacheDir || "node_modules/.vite",
    clearScreen: localConfig.clearScreen || false,
    assetsInclude: localConfig.assetsInclude,
    /** 出口文件 */
    build: {
      outDir: path.join(cwd, OUTDIR_PATH),
      emptyOutDir: true,
      manifest: "rev-manifest.json",
      assetsInlineLimit: 4096,
      rollupOptions: {
        external: [...(localConfig?.build?.rollupOptions?.external || [])],
        output: {
          entryFileNames: customBuild
            ? BASE_PROJECT_PATH + "js/[name]-[hash].js"
            : null,
          assetFileNames: customBuild
            ? (val: any) => {
                const works: string[] | undefined = val.name?.split(".");

                if (works) {
                  const type = works[works.length - 1];

                  if (type === "css") {
                    return (
                      BASE_PROJECT_PATH + CSS_PATH + "/[name]-[hash].[ext]"
                    );
                  }

                  if (type === "js") {
                    return BASE_PROJECT_PATH + JS_PATH + "/[name]-[hash].[ext]";
                  }

                  if (IMAGES_REGEXP.includes(type)) {
                    return (
                      BASE_PROJECT_PATH + IMG_PATH + "/[name]-[hash].[ext]"
                    );
                  }
                }

                const ext = "assets";

                return BASE_PROJECT_PATH + ext + "/[name]-[hash].[ext]";
              }
            : null,
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
      legacy({
        targets: [
          "Android >= 39",
          "Chrome >= 39",
          "Safari >= 10.1",
          "iOS >= 10",
          "> 0.5%",
        ],
        polyfills: ["es.promise", "regenerator-runtime"],
      }),
      eslintPlugin({
        include: ["src/**/*.ts", "src/**/*.tsx", "src/*.ts", "src/*.tsx"],
      }),
      customBuild &&
        modifyDistPath({
          root: OUTDIR_PATH + BASE_PROJECT_PATH,
          outDir: OUTDIR_PATH,
          html: HTML_PATH,
          assets: "/assets",
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
      qiankun("react18", {
        useDevMode: true,
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
