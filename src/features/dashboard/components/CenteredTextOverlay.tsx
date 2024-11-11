import { useEffect, useRef, useState } from 'react'

const CenteredTextOverlay = ({ pathId, text, padding = 4 }: { pathId: string; text: string; padding: number }) => {
  const textRef = useRef<SVGTextElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Get path center
    const path = document.getElementById(pathId) as unknown as SVGPathElement
    if (path) {
      const bbox = path.getBBox()
      setPosition({
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2
      })
    }

    // Get text dimensions
    if (textRef.current) {
      const textBox = textRef.current.getBBox()
      setDimensions({
        width: textBox.width + padding * 2,
        height: textBox.height + padding * 2
      })
    }
  }, [pathId, text, padding])

  return (
    <g>
      <rect
        x={position.x - dimensions.width / 2}
        y={position.y - dimensions.height / 2}
        width={dimensions.width}
        height={dimensions.height}
        fill='black'
        opacity={0.3}
        rx={3}
        ry={3}
      />
      <text
        ref={textRef}
        x={position.x}
        y={position.y}
        fill='white'
        textAnchor='middle'
        dominantBaseline='middle'
        className='text-xs'
      >
        {text}
      </text>
    </g>
  )
}

export default CenteredTextOverlay
