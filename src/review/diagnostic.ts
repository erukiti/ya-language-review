import * as vscode from 'vscode'

import { execReviewCheck } from './execute'

const reError = /^ERROR: (.+\.re):([0-9]+): error: (.*)$/
export const reviewErrorToDiagnostics = (errString: string) => {
  const diagnostics: vscode.Diagnostic[] = []
  errString.split(/[\r\n]+/).forEach(line => {
    const matched = reError.exec(line)
    if (!matched) {
      return
    }
    const lineNumber = Number.parseInt(matched[2], 10) - 1
    const range = new vscode.Range(new vscode.Position(lineNumber, 0), new vscode.Position(lineNumber + 1, 0))
    diagnostics.push(new vscode.Diagnostic(range, matched[3], vscode.DiagnosticSeverity.Error))
  })
  return diagnostics
}

export const syntaxCheck = (filename: string) => {
  execReviewCheck(filename)
    .then(() => {
      vscode.languages.createDiagnosticCollection('Re:VIEW').set(vscode.window.activeTextEditor.document.uri, [])
    })
    .catch(err => {
      const diagnostics = reviewErrorToDiagnostics(err.toString())
      vscode.languages
        .createDiagnosticCollection('Re:VIEW')
        .set(vscode.window.activeTextEditor.document.uri, diagnostics)
    })
}
