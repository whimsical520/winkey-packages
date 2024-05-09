import LogSpinner from './spinner'

export enum LogType {
  /** 警告 */
  Warn = 'warn',
  /** 信息 */
  Info = 'info',
  /** 错误 */
  Error = 'error',
  /** 添加 */
  Add = 'add',
  /** 更新 */
  Update = 'update',
  /** 命令 */
  Cmd = 'cmd',
  /** 成功 */
  Success = 'success',
  /** 等待 */
  Wait = 'wait',
  /** 提示 */
  Tip = 'tip',
  /** 正确 */
  Correct = 'corret',
  /** 开始 */
  Start = 'start',
  /** 删除 */
  Delete = 'delete',
  /** 完成 */
  Finish = 'finsh'
}

const logSpinner = new LogSpinner()

export const logger = (type: LogType, text: string) => {
  switch (type) {
    case LogType.Start:
      logSpinner.startSpinner(text)
      break
    case LogType.Add:
      logSpinner.addSpinner(text)
      break
    case LogType.Cmd:
      logSpinner.cmdSpinner(text)
      break
    case LogType.Error:
      logSpinner.failSpinner(text)
      break
    case LogType.Info:
      logSpinner.infoSpinner(text)
      break
    case LogType.Success:
      logSpinner.succeedSpiner(text)
      break
    case LogType.Update:
      logSpinner.updateSpinner(text)
      break
    case LogType.Warn:
      logSpinner.warnSpinner(text)
      break
    case LogType.Wait:
      logSpinner.waitSpinner(text)
      break
    case LogType.Tip:
      logSpinner.tipSpinner(text)
      break
    case LogType.Correct:
      logSpinner.correctSpinner(text)
      break
    case LogType.Delete:
      logSpinner.deleteSpinner(text)
      break
    case LogType.Finish:
      logSpinner.finishSpinner(text)
      break
    default:
      logSpinner.infoSpinner(text)
      break
  }
}
