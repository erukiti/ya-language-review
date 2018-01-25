import * as childProcess from 'child_process'
const shellescape = require('any-shell-escape')

const exec = (cmd: string, shell: string, shellopt: string) => {
  return new Promise<{ stdout; stderr }>((resolve, reject) => {
    try {
      const stdout = childProcess.execFileSync(shell, [shellopt, cmd], {})
      resolve({ stdout, stderr: '' })
    } catch (e) {
      reject(e)
    }
  })
}

export const execReviewCompile = (filename: string, shell: string, shellopt: string) => {
  const cmd = `review compile --target html ${shellescape([filename])}`
  console.log(cmd)
  return exec(cmd, shell, shellopt)
}

export const execReviewCheck = (filename: string, shell: string, shellopt: string) => {
  const cmd = `review compile -c ${shellescape([filename])}`
  console.log(cmd)
  return exec(cmd, shell, shellopt)
}

const reReviewVersion = /([0-9]+\.[0-9]+\.[0-9]+)/

interface ReviewDetection {
  detections: Array<{
    shell: string
    shellopt: string
    rubyVersion: string
    reviewVersion: string
  }>
  errors?: Error[]
}

const detect = async (shell: string, shellopt: string, errors: Error[]) => {
  const rubyVersion = await exec('ruby --version', shell, shellopt)
    .then(({ stdout }) => stdout.toString().trim())
    .catch(err => {
      errors.push(err)
      return null
    })
  if (!rubyVersion) {
    return null
  }

  const reviewVersion = await exec('review compile --version', shell, shellopt)
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
  if (!reviewVersion) {
    return null
  }

  return { shell, shellopt, rubyVersion, reviewVersion }
}

export const detectReview = async (): Promise<ReviewDetection> => {
  const shells = [{ shell: 'bash', shellopt: '-c' }]
  const errors = []
  const detections = []

  for (const shell of shells) {
    const detection = await detect(shell.shell, shell.shellopt, errors)
    if (detection) {
      detections.push(detection)
    }
  }

  return { detections, errors }
}
