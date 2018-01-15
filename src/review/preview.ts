import * as path from 'path'
import * as util from 'util'

import * as vscode from 'vscode'

import { execReviewCompile } from './execute'

export const PREVIEW_URI = vscode.Uri.parse('review-preview://authority/review-preview')

const re = /((?:src|href)=[\'\"])((?!http|\\\/).*?)([\'\"])/gi

export class ReviewPreviewProvider implements vscode.TextDocumentContentProvider {
  private _onDidChange = new vscode.EventEmitter<vscode.Uri>()

  public update(uri: vscode.Uri) {
    this._onDidChange.fire(uri)
  }

  get onDidChange(): vscode.Event<vscode.Uri> {
    return this._onDidChange.event
  }

  public async provideTextDocumentContent(uri) {
    const textEditor = vscode.window.activeTextEditor
    const fileDir = path.dirname(textEditor.document.fileName)
    const { stdout, stderr } = await execReviewCompile(textEditor.document.fileName)
    if (stdout === '') {
      return stderr
    }
    let html = stdout.replace(re, (_, p1, p2, p3) => {
      if (p2.substr(0, 1) === '/') {
        return [p1, vscode.Uri.file(p2), p3].join('')
      } else {
        return [p1, vscode.Uri.file(path.join(fileDir, p2)), p3].join('')
      }
    })
    html += '<style type="text/css">body {color: #000; background: #fff;}</style>'
    return html
  }
}
