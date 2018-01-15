import * as vscode from 'vscode'

export * from './preview'
export const isReview = () => {
  return vscode.window.activeTextEditor.document.languageId.toLowerCase() === 'review'
}
