import * as childProcess from 'child_process'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as util from 'util'

import * as vscode from 'vscode'
const shellescape = require('shell-escape')

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

  public provideTextDocumentContent(uri) {
    const textEditor = vscode.window.activeTextEditor
    const fileDir = path.dirname(textEditor.document.fileName)
    return new Promise<string>((resolve, reject) => {
      childProcess.exec(
        `review compile --target html ${shellescape([textEditor.document.fileName])}`,
        (err, stdout, stderr) => {
          if (err) {
            reject(err)
            return
          }
          if (stdout === '') {
            resolve(stderr)
            return
          }
          const html = stdout.replace(re, (_, p1, p2, p3) => {
            if (p2.substr(0, 1) === '/') {
              return [p1, vscode.Uri.file(p2), p3].join('')
            } else {
              return [p1, vscode.Uri.file(path.join(fileDir, p2)), p3].join('')
            }
          })
          resolve(html + '<style type="text/css">body {color: #000; background: #fff;}</style>')
        }
      )
    })
  }
}
