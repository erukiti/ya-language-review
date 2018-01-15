'use strict'

import * as vscode from 'vscode'

import { isReview, PREVIEW_URI, ReviewPreviewProvider } from './review'
import { syntaxCheck } from './review/diagnostic'

export function activate(context: vscode.ExtensionContext) {
  const previewProvider = new ReviewPreviewProvider()
  const previewRegistration = vscode.workspace.registerTextDocumentContentProvider('review-preview', previewProvider)

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

  context.subscriptions.push(previewRegistration, showPreview)
}
