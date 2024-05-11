export declare interface ConfigEnv {
  command: "build" | "serve";
  mode: string;
  /**
   * @experimental
   */
  ssrBuild?: boolean;
}
