export interface ILogger {
  /**
   * Internal log notification.
   * @param args
   */
  log(method: string, ...args: Array<any>): void

  /**
   * User informational notification.
   * @param args
   */
  info(...args: Array<string>): void

  /**
   * User error notification.
   * @param args
   */
  error(...args: Array<string>): void
}

export class Logger implements ILogger {
  instanceName: string

  constructor(instanceName = 'Crip') {
    this.instanceName = instanceName
  }

  log(method: string, ...args: Array<any>): void {
    console.log.apply(console, [`${this.instanceName}.${method}`, ...args])
  }

  info(...args: Array<string>): void {
    // TODO: implement user informational notifications
  }

  error(...args: Array<string>): void {
    // TODO: implement user error notifications
  }
}