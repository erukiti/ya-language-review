import * as childProcess from 'child_process'
const shellescape = require('any-shell-escape')

export const execReviewCompile = (filename: string) => {
  return new Promise<{ stdout; stderr }>((resolve, reject) => {
    const cmd = `review compile --target html ${shellescape([filename])}`
    console.log(cmd)
    childProcess.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}
