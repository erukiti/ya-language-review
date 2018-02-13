export interface Loc {
  index: number
  line: number
  column: number
}

export interface SyntaxNode {
  start: Loc
  end: Loc
  type: string
  opts: string[]
  children: SyntaxNode[]
}
