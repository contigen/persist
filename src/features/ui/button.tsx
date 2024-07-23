import { cn } from '../../utils'
import { ComponentPropsWithoutRef } from 'react'

export function Button({
  children,
  onClick,
  className,
  ...restProps
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={cn(
        `py-1 px-6 bg-blue-600 rounded-xl text-white inline-flex`,
        className
      )}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  )
}
