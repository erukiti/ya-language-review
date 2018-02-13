import * as assert from 'assert'

import { SyntaxNode } from './types'

const reHeading = /^(\=+)(\[.+\])?[ \t]+(.+)$/
const reSlashBlockStart = /^\/\/.*{$/
const reSlashBlockEnd = /^\/\/}$/
const reSlashSingle = /^\/\/.*$/

export const parseBlock = (text: string): string[] => {
  const res = []
  let paragraph = ''
  let isBlock = false
  text
    .trim()
    .split('\n')
    .forEach(line => {
      if (isBlock) {
        if (reSlashBlockEnd.test(line)) {
          res.push(paragraph)
          paragraph = ''
          isBlock = false
        } else {
          paragraph += line + '\n'
        }
        return
      }

      if (line === '') {
        if (paragraph !== '') {
          res.push(paragraph)
          paragraph = ''
        }
        return
      }

      if (reHeading.test(line)) {
        if (paragraph !== '') {
          res.push(paragraph)
          paragraph = ''
        }
        res.push(line)
        return
      }

      if (reSlashBlockStart.test(line)) {
        if (paragraph !== '') {
          res.push(paragraph)
        }
        paragraph = line + '\n'
        isBlock = true
        return
      }

      if (reSlashSingle.test(line)) {
        if (paragraph !== '') {
          res.push(paragraph)
          paragraph = ''
        }
        res.push(line)
        return
      }

      paragraph += line + '\n'
    })
  if (paragraph !== '') {
    res.push(paragraph)
  }

  return res
}

export const getBlockType = (block: string) => {
  switch (block.substr(0, 1)) {
    case '=': {
      const matched = reHeading.exec(block)
      assert(matched)
      const options: any[] = [matched[1].length]
      options.push(...matched.slice(2))

      return { type: 'heading', options }
    }
    case '/': {
      return ''
    }
    default: {
      return { type: 'paragraph' }
    }
  }
}
