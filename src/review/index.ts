import * as vscode from 'vscode'

export * from './preview'
export const isReview = (context: vscode.ExtensionContext) => {
  return vscode.window.activeTextEditor.document.languageId.toLowerCase() === 'review'
}