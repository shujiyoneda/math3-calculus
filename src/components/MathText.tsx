import katex from 'katex'
import { Fragment, useMemo } from 'react'

interface MathBlockProps {
  tex: string
  display?: boolean
  className?: string
}

export function MathBlock({ tex, display = true, className = '' }: MathBlockProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      })
    } catch {
      return tex
    }
  }, [tex, display])

  if (display) {
    return (
      <div
        className={`math-display-wrapper ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span
      className={`math-inline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

interface MathSegment {
  type: 'text' | 'inline' | 'display'
  content: string
}

function parseMathSegments(input: string): MathSegment[] {
  const segments: MathSegment[] = []
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: input.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      segments.push({ type: 'display', content: match[1].trim() })
    } else if (match[2] !== undefined) {
      segments.push({ type: 'inline', content: match[2].trim() })
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < input.length) {
    segments.push({ type: 'text', content: input.slice(lastIndex) })
  }

  return segments
}

function renderMathNodes(input: string) {
  const segments = parseMathSegments(input)
  return segments.map((seg, i) => {
    if (seg.type === 'text') {
      return <Fragment key={i}>{seg.content}</Fragment>
    }
    return <MathBlock key={i} tex={seg.content} display={seg.type === 'display'} />
  })
}

interface MathTextProps {
  text: string
  className?: string
}

export function MathText({ text, className = '' }: MathTextProps) {
  const chunks = useMemo(() => {
    const parts = text.split(/(\*\*[\s\S]+?\*\*)/g)
    return parts.filter(Boolean).map((part) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return { bold: true, content: part.slice(2, -2) }
      }
      return { bold: false, content: part }
    })
  }, [text])

  return (
    <span className={className}>
      {chunks.map((chunk, i) =>
        chunk.bold ? (
          <strong key={i}>{renderMathNodes(chunk.content)}</strong>
        ) : (
          <Fragment key={i}>{renderMathNodes(chunk.content)}</Fragment>
        )
      )}
    </span>
  )
}
