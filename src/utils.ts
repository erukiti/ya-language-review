import * as vscode from 'vscode'

let _channel: vscode.OutputChannel = null

export const getOutputChannel = () => {
  if (!_channel) {
    _channel = vscode.window.createOutputChannel('Re:VIEW')
  }
  return _channel
}
