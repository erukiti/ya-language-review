import { getBlockType, parseBlock } from './parser'

describe('parseBlock', () => {
  it('paragraph', () => {
    const sample = ['', 'p1', '', 'p2', 'p2', '', '', 'p3', ''].join('\n')
    const res = parseBlock(sample)
    expect(res.length).toBe(3)
    expect(res[0].trim()).toEqual('p1')
    expect(res[1].trim()).toEqual('p2\np2')
    expect(res[2].trim()).toEqual('p3')
  })

  it('heading', () => {
    const sample = ['= hoge', 'fuga', 'piyo'].join('\n')
    const res = parseBlock(sample)
    expect(res.length).toBe(2)
    expect(res[0].trim()).toBe('= hoge')
    expect(res[1].trim()).toBe('fuga\npiyo')
  })

  it('slash single', () => {
    const sample = ['hoge', '//footnote[fuga][piyo]', '捕鯨'].join('\n')
    const res = parseBlock(sample)
    expect(res.length).toBe(3)
    expect(res[0].trim()).toBe('hoge')
    expect(res[1].trim()).toBe('//footnote[fuga][piyo]')
    expect(res[2].trim()).toBe('捕鯨')
  })

  it('slash block', () => {
    const sample = ['hoge', '//hoge[]{', '/}', '//}', '捕鯨'].join('\n')
    const res = parseBlock(sample)
    expect(res.length).toBe(3)
    expect(res[0].trim()).toBe('hoge')
    expect(res[1].trim()).toBe('//hoge[]{\n/}')
    expect(res[2].trim()).toBe('捕鯨')
  })
})

describe('getBlockType', () => {
  it('paragraph', () => {
    const res = getBlockType('hoge')
    expect(res).toEqual({ type: 'paragraph' })
  })

  it('h1', () => {
    const res = getBlockType('= hoge')
    expect(res).toEqual({ type: 'heading', options: [1, undefined, 'hoge'] })
  })

  it('h6', () => {
    const res = getBlockType('====== hoge')
    expect(res).toEqual({ type: 'heading', options: [6, undefined, 'hoge'] })
  })

  it('h column', () => {
    const res = getBlockType('=[column] hoge')
    expect(res).toEqual({ type: 'heading', options: [1, '[column]', 'hoge'] })
  })
})
