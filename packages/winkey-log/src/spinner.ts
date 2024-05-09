import chalk from 'chalk'

const ora = require('ora')

export const spinner = ora()

class LogSpinner {
  private spinner
  private timer
  private speedTime

  infoSpinner(text: string) {
    spinner.stopAndPersist({
      symbol: '🚘',
      text: chalk.cyan(text)
    })
  }

  startSpinner(text: string) {
    const msg = `${text}...\n`

    spinner.start(msg)
    spinner.stopAndPersist({
      symbol: '✨',
      text: msg
    })
  }

  succeedSpiner(text?: string) {
    spinner.stopAndPersist({
      symbol: '🎉',
      text: `${text}\n`
    })
  }

  failSpinner(text?: string) {
    spinner.stopAndPersist({
      symbol: '☠️',
      text: chalk.red(text)
    })
  }

  addSpinner(text?: string) {
    spinner.stopAndPersist({
      symbol: '😏',
      text: chalk.greenBright(text)
    })
  }

  updateSpinner(text?: string) {
    spinner.stopAndPersist({
      symbol: '😮',
      text: chalk.dim(text)
    })
  }

  warnSpinner(text?: string) {
    spinner.stopAndPersist({
      symbol: '😡',
      text: chalk.yellow(text)
    })
  }

  cmdSpinner(text?: string) {
    spinner.stopAndPersist({
      symbol: '👻',
      text: chalk.white(text)
    })
  }

  waitSpinner(text?: string) {
    if (!this.timer) return
    this.spinner = ora({
      prefixText: text || '正在执行',
      spinner: 'monkey'
    }).start()

    this.timer = setInterval(() => {
      this.speedTime += 100
      this.spinner.text = `${this.speedTime / 1000}s`
    }, 100)
  }

  tipSpinner(text?: string) {
    spinner.stopAndPersist({
      symbol: '🐌',
      text: text || '这是提示'
    })
  }

  correctSpinner(text?: string) {
    spinner.stopAndPersist({
      symbol: '✔️',
      text: text || '正确'
    })
  }

  deleteSpinner(text?: string) {
    spinner.stopAndPersist({
      symbol: '❌',
      text: text || '删除'
    })
  }

  finishSpinner(text?: string, status?: number) {
    clearInterval(this.timer)
    this.timer = null
    this.spinner = null
    this.spinner.stop()
    if (status) {
      this.failSpinner(text || 'sorry~失败')
    } else {
      this.succeedSpiner(`consume:${this.speedTime / 1000}s ${text}` || '结束咯~')
    }
  }
}

export default LogSpinner
