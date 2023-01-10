const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const WHITE = '\x1b[37m'

export const LOG_TYPE_INFO = 'INFO'
export const LOG_TYPE_ERROR = 'ERROR'
export const LOG_TYPE_WARNING = 'WARNING'

export const log = (type: string = LOG_TYPE_INFO, ...rest: any[]) => {
  switch (type) {
    case LOG_TYPE_INFO: {
      // eslint-disable-next-line no-console
      console.log(WHITE, ...rest)
      break
    }

    case LOG_TYPE_WARNING: {
      // eslint-disable-next-line no-console
      console.log(YELLOW, ...rest)
      break
    }

    case LOG_TYPE_ERROR: {
      // eslint-disable-next-line no-console
      console.log(RED, ...rest)
      break
    }

    default: {
      // eslint-disable-next-line no-console
      console.log(...rest)
    }
  }
}