import * as vscode from 'vscode'

import { getOutputChannel } from '../utils'
import { syntaxCheck } from './diagnostic'
import { detectReview, execReviewCompile } from './execute'

export * from './preview'

export const isReview = () => {
  return vscode.window.activeTextEditor.document.languageId.toLowerCase() === 'review'
}

export class Review {
  private _prefix: string
  public reviewVersion: string

  public async detect() {
    const { prefix, reviewVersion, errors } = await detectReview()

    const channel = getOutputChannel()
    channel.show(true)

    if (reviewVersion) {
      channel.appendLine(`review is detected`)
      channel.appendLine(`prefix: '${prefix}'`)
      channel.appendLine(`review: ${reviewVersion}`)
      this._prefix = prefix
      this.reviewVersion = reviewVersion
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
    return execReviewCompile(filename, this._prefix)
  }

  public syntaxCheck(filename: string) {
    return syntaxCheck(filename, this._prefix)
  }
}
