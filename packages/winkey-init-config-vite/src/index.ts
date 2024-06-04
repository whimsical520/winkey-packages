import { OutgoingHttpHeaders, Server } from "node:http";
import { CSSOptions } from "./models/viteCss";
import { WatchOptions } from "./models/viteWatch";
import { CorsOptions } from "./models/viteCors";
import { initProject } from "./init-project";
import { initComponent } from "./init-component";

export interface WinkeyProjectConfig {
  /** 根目录 */
  root?: string;
  /** 项目名称 */
  name?: string;
  /** 项目工具 */
  workflow: "vite";
  /** 项目环境 */
  platform?: "pc" | "mobile";
  /** 版本号 */
  version?: string;
  /** 是否是组件模块 */
  component?: boolean;
  /** 是否使用yarn */
  yarn?: boolean;
  /** 缓存文件夹 */
  cacheDir?: string;
  /** 是否采用qiankun配置 */
  qiankun?: "child";
  /** 打包配置 */
  dest?: {
    /** vite默认配置 */
    default?: boolean;
    /** 基础路径 */
    basePath?: string;
    /** js文件路径 */
    jsPath?: string;
    /** css文件路径 */
    cssPath?: string;
    /** html文件路径 */
    htmlPath?: string;
    /** 图片文件路径 */
    imagesPath?: string;
    /** manifast文件路径 */
    revPath?: string;
  };
  /** build配置 */
  build?: {
    custom?: boolean;
    rollupOptions?: {
      external?: string[];
    };
  };
  /** alias 配置 */
  alias?:
    | {
        /** 根目录 */
        srcRoot?: string;
      }
    | {
        find: string;
        replacement: string;
      }[];
  /** 服务端开发 */
  server?: {
    /** 本地开发端口号 */
    port?: number;
    /** 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。 */
    strictPort?: boolean;
    /** 需要一个合法可用的证书。 */
    https?: boolean;
    /** 在开发服务器启动时自动在浏览器中打开应用程序。 */
    open?: string | boolean;
    /** 为开发服务器配置 CORS。 */
    cors?: boolean | CorsOptions;
    /** 指定服务器响应的 header。 */
    headers?: OutgoingHttpHeaders;
    /** 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。 */
    hmr?:
      | boolean
      | {
          protocol?: string;
          host?: string;
          port?: number;
          path?: string;
          timeout?: number;
          overlay?: boolean;
          clientPort?: number;
          server?: Server;
        };
    /** 传递给 chokidar 的文件系统监听器选项。 */
    watch?: WatchOptions;
  };
  /** 是否启用样式模块化 */
  cssModules?: boolean;
  /** 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息 */
  clearScreen?: boolean;
  /** 小于此阈值的导入或引用资源将内联为 base64 编码 */
  limitSize?: number;
  /** 输出目录 */
  outDir?: string;
  /** 自定义插件 */
  plugins?: any[];
  /** 自定义css */
  css?: CSSOptions;
  /** 是否启动小助手 */
  winkeyTool?: boolean;
  /** @name 是否是lib模板 默认component包，不含react，lib模式，会把react打包进去 */
  lib?: boolean;
}
export interface ViteConfigStruct {
  mode: string;
  command: string;
  ssrBuilr: boolean;
}

export const initWinkeyConfig = (
  winkeyConfig: WinkeyProjectConfig,
  viteConfig?: ViteConfigStruct
) => {
  const localConfig = winkeyConfig;

  if (localConfig.component) {
    return initComponent(winkeyConfig, viteConfig);
  }

  return initProject(winkeyConfig, viteConfig);
};
