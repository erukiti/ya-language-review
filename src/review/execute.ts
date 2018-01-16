import * as childProcess from 'child_process'
const shellescape = require('any-shell-escape')

import { getOutputChannel } from '../utils'

const exec = (cmd: string) => {
  return new Promise<{ stdout; stderr }>((resolve, reject) => {
    childProcess.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}

export const execReviewCompile = (filename: string) => {
  const cmd = `review compile --target html ${shellescape([filename])}`
  console.log(cmd)
  return exec(cmd)
}

export const execReviewCheck = (filename: string) => {
  const cmd = `review compile -c ${shellescape([filename])}`
  console.log(cmd)
  return exec(cmd)
}

const reReviewVersion = /([0-9]+\.[0-9]+\.[0-9]+)/
export const detectReview = async () => {
  const rubyIsInstalled = await exec('ruby --version')
    .then(({ stdout, stderr }) => {
      return true
    })
    .catch(err => {
      const channel = getOutputChannel()
      channel.appendLine('Ruby is not detected.')
      channel.appendLine(err.toString('utf8'))
      channel.show(true)
      return false
    })

  const reviewVersion = await exec('review compile --version')
    .then(({ stdout, stderr }) => {
      const matched = reReviewVersion.exec(stdout)
      if (matched) {
        return matched[1]
      }
      return null
    })
    .catch(err => {
      const channel = getOutputChannel()
      channel.appendLine('Re:VIEW is not detected.')
      channel.appendLine(err.toString('utf8'))
      channel.show(true)
      return null
    })
  return reviewVersion
}
