import * as vscode from 'vscode'

export { detectReview } from './execute'
export * from './preview'
export const isReview = () => {
  return vscode.window.activeTextEditor.document.languageId.toLowerCase() === 'review'
}
