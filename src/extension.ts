'use strict'

import * as vscode from 'vscode'

import { isReview, PREVIEW_URI, Review, ReviewPreviewProvider } from './review'
import { syntaxCheck } from './review/diagnostic'

export async function activate(context: vscode.ExtensionContext) {
  const review = new Review()
  const isDetected = await review.detect()
  const previewProvider = new ReviewPreviewProvider(review)
  const previewRegistration = vscode.workspace.registerTextDocumentContentProvider('review-preview', previewProvider)

  const statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
  statusbar.command = 'review.showPreview'
  // statusbar.text = `Re:VIEW ${reviewVersion}`
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
