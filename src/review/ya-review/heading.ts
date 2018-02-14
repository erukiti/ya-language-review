import * as assert from 'assert'

const reTest = /^\=+(\[.+\]|\{.+\}|[ \t]).+$/

const reParse = /^(\=+)(\[.+\])?(\{.+\})?[ \t]?(.+)$/

export class Heading {
  public level: number
  public option?: string
  public tag?: string
  public title: string

  public static testLine(line: string) {
    return reTest.test(line)
  }

  constructor(line: string) {
    const matched = reParse.exec(line)
    assert(matched)
    this.level = matched[1].length
    this.option = matched[2]
    this.tag = matched[3]
    this.title = matched[4]
  }
}
