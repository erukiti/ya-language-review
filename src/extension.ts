'use strict'

import * as vscode from 'vscode'

import { isReview, PREVIEW_URI, ReviewPreviewProvider } from './review'

export function activate(context: vscode.ExtensionContext) {
  const previewProvider = new ReviewPreviewProvider()
  const previewRegistration = vscode.workspace.registerTextDocumentContentProvider('review-preview', previewProvider)

  vscode.workspace.onDidChangeTextDocument((ev: vscode.TextDocumentChangeEvent) => {
    if (ev.document === vscode.window.activeTextEditor.document) {
      previewProvider.update(PREVIEW_URI)
    }
  })

  vscode.window.onDidChangeTextEditorSelection((ev: vscode.TextEditorSelectionChangeEvent) => {
    if (ev.textEditor === vscode.window.activeTextEditor) {
      previewProvider.update(PREVIEW_URI)
    }
  })

  const showPreview = vscode.commands.registerCommand('review.showPreview', uri => {
    console.log('command')
    if (!isReview(context)) {
      vscode.window.showInformationMessage('Not Re:VIEW file')
      return
    }
    return vscode.commands
      .executeCommand('vscode.previewHtml', PREVIEW_URI, vscode.ViewColumn.Two, 'Re:VIEW preview')
      .then(success => console.log(success), err => vscode.window.showErrorMessage(err))
  })

  context.subscriptions.push(previewRegistration, showPreview)
}
