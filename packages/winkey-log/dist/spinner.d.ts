export declare const spinner: any
declare class LogSpinner {
  private spinner
  private timer
  private speedTime
  infoSpinner(text: string): void
  startSpinner(text: string): void
  succeedSpiner(text?: string): void
  failSpinner(text?: string): void
  addSpinner(text?: string): void
  updateSpinner(text?: string): void
  warnSpinner(text?: string): void
  cmdSpinner(text?: string): void
  waitSpinner(text?: string): void
  tipSpinner(text?: string): void
  correctSpinner(text?: string): void
  deleteSpinner(text?: string): void
  finishSpinner(text?: string, status?: number): void
}
export default LogSpinner
