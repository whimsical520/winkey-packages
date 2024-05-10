/** 异步创建 */
export declare function makeAsync(fn: any, isMocha?: any): (next: any) => void;
/** 异步等待 */
export declare function makeAwait(fn: any): Promise<unknown>;
export declare const mkdirSync: (toFile: any) => Promise<any[]>;
export declare const copyFiles: (fromPath: any, toPath?: any, filter?: any) => Promise<unknown>;
export declare const readFilePaths: (fromPath: any, filter?: any, reverse?: any) => Promise<unknown>;
