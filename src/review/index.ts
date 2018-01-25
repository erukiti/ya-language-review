import * as vscode from 'vscode'

import { getOutputChannel } from '../utils'
import { syntaxCheck } from './diagnostic'
import { detectReview, execReviewCompile } from './execute'

export * from './preview'

export const isReview = () => {
  return vscode.window.activeTextEditor.document.languageId.toLowerCase() === 'review'
}

export class Review {
  private _shell: string
  private _shellopt: string
  public rubyVersion: string
  public reviewVersion: string

  public async detect() {
    const { detections, errors } = await detectReview()

    const channel = getOutputChannel()
    channel.show(true)

    if (detections.length > 0) {
      channel.appendLine(`review is detected`)
      detections.forEach(detection => {
        channel.appendLine(`prefix: '${detection.shell}'`)
        channel.appendLine(`ruby: ${detection.rubyVersion}`)
        channel.appendLine(`review: ${detection.reviewVersion}`)
      })

      this._shell = detections[0].shell
      this._shellopt = detections[0].shellopt
      this.rubyVersion = detections[0].rubyVersion
      this.reviewVersion = detections[0].reviewVersion

      return true
    } else {
      channel.appendLine(`review is not detected`)
      errors.forEach(err => {
        channel.appendLine(err.toString())
      })
      return false
    }
  }

  public compile(filename: string) {
    return execReviewCompile(filename, this._shell, this._shellopt)
  }

  public syntaxCheck(filename: string) {
    return syntaxCheck(filename, this._shell, this._shellopt)
  }
}
