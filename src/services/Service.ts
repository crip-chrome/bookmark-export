import {ILogger, Logger} from './Logger'

export default class Service {
  log: ILogger

  constructor(loggerInstanceName = 'Crip') {
    this.log = new Logger(loggerInstanceName)
  }
}