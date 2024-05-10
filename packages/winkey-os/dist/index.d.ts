interface BaseOSStruct {
    cmd?: string;
    targetPath?: string;
    logger?: Function;
    newWindow?: boolean;
    showOutput?: boolean;
}
export declare const runCMD: (obj: BaseOSStruct) => Promise<unknown>;
export declare const runSpawn: (obj: BaseOSStruct & {
    type?: 'inherit' | 'pipe';
}) => Promise<unknown>;
export declare const openBrowser: (address: string) => Promise<unknown>;
export {};
