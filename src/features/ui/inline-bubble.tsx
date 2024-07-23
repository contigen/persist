import React from 'react'
import { cn } from '../../utils'

type BubbleProps = {
  direction: 'right' | 'left'
  children: React.ReactNode
  className?: string
}

export function InlineBubble({ direction, children, className }: BubbleProps) {
  return (
    <span
      className={cn(
        `relative isolate rounded-3xl text-white px-3 py-px before:absolute after:absolute before:content-[''] after:content-[''] before:h-4 before:bottom-0 after:bottom-0 after:h-4 tracking-tight font-[550] inline-block mx-2`,
        direction === `right` &&
          `before:right-[-7px] before:w-5 before:rounded-bl-2xl bg-gray-600 before:bg-gray-600 before:z-[-1] after:right-[-26px] after:w-[26px] after:bg-white after:rounded-bl-[10px] after:z-[-1]`,
        direction === `left` &&
          `before:left-[-7px] before:w-5 before:rounded-br-2xl bg-blue-600 before:bg-blue-600 before:z-[-1] after:left-[-26px] after:w-[26px] after:bg-white after:rounded-br-[10px] after:z-[-1]`,
        className
      )}
    >
      {children}
    </span>
  )
}
