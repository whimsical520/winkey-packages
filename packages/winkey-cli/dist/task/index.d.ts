import { installAction } from './install';
declare const _default: {
    initAction: (_: any, cmder: import("../model/action").ActionSturct) => Promise<void>;
    buildAction: (_: any, cmder: import("../model/action").ActionSturct) => Promise<void>;
    listAction: (val: import("./list").listActionOptions) => Promise<void>;
    devAction: (_: any, cmder: import("../model/action").ActionSturct) => Promise<void>;
    updateAction: (_: any, cmder?: import("../model/action").ActionSturct) => Promise<void>;
    installAction: typeof installAction;
};
export default _default;
