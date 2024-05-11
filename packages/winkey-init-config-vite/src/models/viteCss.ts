import * as PostCSS from 'postcss'

export declare interface CSSModulesOptions {
  getJSON?: (cssFileName: string, json: Record<string, string>, outputFileName: string) => void;
  scopeBehaviour?: 'global' | 'local';
  globalModulePaths?: RegExp[];
  generateScopedName?: string | ((name: string, filename: string, css: string) => string);
  hashPrefix?: string;
  /**
   * default: null
   */
  localsConvention?: 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly' | null;
}

export declare interface CSSOptions {
  /**
   * https://github.com/css-modules/postcss-modules
   */
  modules?: CSSModulesOptions | false;
  preprocessorOptions?: Record<string, any>;
  postcss?: string | (PostCSS.ProcessOptions & {
      plugins?: PostCSS.AcceptedPlugin[];
  });
  /**
   * Enables css sourcemaps during dev
   * @default false
   * @experimental
   */
  devSourcemap?: boolean;
}