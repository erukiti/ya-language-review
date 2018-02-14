import { Heading } from './heading'

describe('testLine', () => {
  it('normal pattern', () => {
    expect(Heading.testLine('=ほげ')).toBeFalsy()
    expect(Heading.testLine('= ほげ')).toBeTruthy()
    expect(Heading.testLine('= [hoge] ほげ')).toBeTruthy()
  })

  it('column, tag...', () => {
    expect(Heading.testLine('=[column] コラム')).toBeTruthy()
    expect(Heading.testLine('=[column]{tag} タグ付きコラム')).toBeTruthy()
    expect(Heading.testLine('={tag} タグ付き')).toBeTruthy()

    expect(Heading.testLine('=[column]コラム')).toBeTruthy()
    expect(Heading.testLine('=[column]{tag}タグ付きコラム')).toBeTruthy()
    expect(Heading.testLine('={tag}タグ付き')).toBeTruthy()
  })
})

describe('constructor', () => {
  it('normal', () => {
    const h = new Heading('= ほげ')
    expect(h.level).toBe(1)
    expect(h.option).toBeUndefined()
    expect(h.tag).toBeUndefined()
    expect(h.title).toBe('ほげ')
  })

  it('normal', () => {
    const h = new Heading('= [hoge] ほげ')
    expect(h.level).toBe(1)
    expect(h.option).toBeUndefined()
    expect(h.tag).toBeUndefined()
    expect(h.title).toBe('[hoge] ほげ')
  })

  it('with option', () => {
    const h = new Heading('=[column] ほげ')
    expect(h.level).toBe(1)
    expect(h.option).toBe('[column]')
    expect(h.tag).toBeUndefined()
    expect(h.title).toBe('ほげ')
  })

  it('with option, without space', () => {
    const h = new Heading('=[column]ほげ')
    expect(h.level).toBe(1)
    expect(h.option).toBe('[column]')
    expect(h.tag).toBeUndefined()
    expect(h.title).toBe('ほげ')
  })

  it('with tag', () => {
    const h = new Heading('={hoge} ほげ')
    expect(h.level).toBe(1)
    expect(h.option).toBeUndefined()
    expect(h.tag).toBe('{hoge}')
    expect(h.title).toBe('ほげ')
  })

  it('with tag, without space', () => {
    const h = new Heading('={hoge}ほげ')
    expect(h.level).toBe(1)
    expect(h.option).toBeUndefined()
    expect(h.tag).toBe('{hoge}')
    expect(h.title).toBe('ほげ')
  })

  it('with option and tag', () => {
    const h = new Heading('=[column]{hoge} ほげ')
    expect(h.level).toBe(1)
    expect(h.option).toBe('[column]')
    expect(h.tag).toBe('{hoge}')
    expect(h.title).toBe('ほげ')
  })

  it('with option and tag, without space', () => {
    const h = new Heading('=[column]{hoge}ほげ')
    expect(h.level).toBe(1)
    expect(h.option).toBe('[column]')
    expect(h.tag).toBe('{hoge}')
    expect(h.title).toBe('ほげ')
  })
})
