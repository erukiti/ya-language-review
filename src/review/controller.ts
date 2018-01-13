import * as vscode from 'vscode'

import { PREVIEW_URI, ReviewPreviewProvider } from './preview'

export class ReviewController implements vscode.Disposable {
  private _previewProvider: ReviewPreviewProvider
  private _disposable: vscode.Disposable
  constructor(previewProvider: ReviewPreviewProvider) {
    this._previewProvider = previewProvider
    this._previewProvider.update(PREVIEW_URI)

    const subscriptions: vscode.Disposable[] = []
    vscode.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions)
    vscode.window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions)

    this._disposable = vscode.Disposable.from(...subscriptions)
  }

  public dispose() {
    this._disposable.dispose()
  }

  private _onEvent() {
    this._previewProvider.update(PREVIEW_URI)
  }
}
