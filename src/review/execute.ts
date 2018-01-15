import * as childProcess from 'child_process'
const shellescape = require('any-shell-escape')

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
