export declare enum LogType {
    /** 警告 */
    Warn = "warn",
    /** 信息 */
    Info = "info",
    /** 错误 */
    Error = "error",
    /** 添加 */
    Add = "add",
    /** 更新 */
    Update = "update",
    /** 命令 */
    Cmd = "cmd",
    /** 成功 */
    Success = "success",
    /** 等待 */
    Wait = "wait",
    /** 提示 */
    Tip = "tip",
    /** 正确 */
    Correct = "corret",
    /** 开始 */
    Start = "start",
    /** 删除 */
    Delete = "delete",
    /** 完成 */
    Finish = "finsh"
}
export declare const logger: (type: LogType, text: string) => void;
