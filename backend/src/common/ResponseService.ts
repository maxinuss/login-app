import { log, LOG_TYPE_ERROR } from './LogService'

const { ENABLE_DEBUG } = process.env

export const responseSuccessTemplate = (data: object|object[]) => ({ success: true, data })

export const responseFailTemplate = (err: any) => {
  log(LOG_TYPE_ERROR, `Error in response: ${JSON.stringify(err)}`, err.message)
  if (ENABLE_DEBUG === 'true') return { success: false, err }

  return { success: false, data: { error: err.message } }
}
