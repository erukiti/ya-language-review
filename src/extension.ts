'use strict'

import * as vscode from 'vscode'

import { detectReview, isReview, PREVIEW_URI, ReviewPreviewProvider } from './review'
import { syntaxCheck } from './review/diagnostic'

export async function activate(context: vscode.ExtensionContext) {
  const reviewVersion = await detectReview()
  const previewProvider = new ReviewPreviewProvider()
  const previewRegistration = vscode.workspace.registerTextDocumentContentProvider('review-preview', previewProvider)

  const statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
  statusbar.command = 'review.showPreview'
  statusbar.text = `Re:VIEW ${reviewVersion}`
  statusbar.show()

  const update = () => {
    if (!isReview()) {
      return
    }
    previewProvider.update(PREVIEW_URI)
    syntaxCheck(vscode.window.activeTextEditor.document.fileName)
  }

  vscode.workspace.onDidOpenTextDocument(update)
  vscode.workspace.onDidSaveTextDocument(update)

  const showPreview = vscode.commands.registerCommand('review.showPreview', uri => {
    if (!isReview()) {
      vscode.window.showInformationMessage('Not Re:VIEW file')
      return
    }
    return vscode.commands
      .executeCommand('vscode.previewHtml', PREVIEW_URI, vscode.ViewColumn.Two, 'Re:VIEW preview')
      .then(success => {}, err => vscode.window.showErrorMessage(err))
  })

  context.subscriptions.push(previewRegistration, showPreview, statusbar)
}
