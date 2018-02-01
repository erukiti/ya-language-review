import * as childProcess from 'child_process'
import * as os from 'os'

const shellescape = require('any-shell-escape')

const exec = (cmd: string, prefix: string = '') => {
  return new Promise<{ stdout; stderr }>((resolve, reject) => {
    childProcess.exec(prefix + cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}

export const execReviewCompile = (filename: string, prefix: string = '') => {
  const cmd = `review-compile --target html ${shellescape([filename])}`
  console.log(prefix, cmd)
  return exec(cmd, prefix)
}

export const execReviewCheck = (filename: string, prefix: string = '') => {
  const cmd = `review-compile -c ${shellescape([filename])}`
  console.log(prefix, cmd)
  return exec(cmd, prefix)
}

const reReviewVersion = /([0-9]+\.[0-9]+\.[0-9]+)/

interface ReviewDetection {
  prefix: string
  reviewVersion: string
  errors?: Error[]
}

const detect = async (errors: Error[], prefix: string = '') => {
  return exec('review-compile --version', prefix)
    .then(({ stdout }) => {
      const matched = reReviewVersion.exec(stdout)
      if (matched) {
        return matched[1]
      }
      return null
    })
    .catch(err => {
      errors.push(err)
      return null
    })
}

export const detectReview = async (): Promise<ReviewDetection> => {
  let prefix = ''
  if (os.platform() === 'win32') {
    prefix = `${__dirname}\\..\\..\\win32\\bin\\ruby ${__dirname}\\..\\..\\win32\\lib\\ruby\\gems\\2.2.0\\gems\\review-2.4.0\\bin\\`
  }
  const errors = []
  const detections = []

  const reviewVersion = await detect(errors, prefix)

  return { prefix, reviewVersion, errors }
}
