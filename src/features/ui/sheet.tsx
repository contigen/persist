import { Drawer } from 'vaul'
import { ReactNode, ReactPortal, useState } from 'react'
import clsx from 'clsx'
import { Button } from './button'

export function Sheet({
  content,
  children,
  open,
  onClose,
}: {
  children?: ReactNode
  content: ReactNode
  open?: boolean
  onClose?: () => void
}) {
  const [dragged, setDragged] = useState(false)
  return (
    <div>
      <Drawer.Root
        shouldScaleBackground
        onDrag={() => setDragged(true)}
        onRelease={() => setDragged(false)}
        open={open}
        onOpenChange={isOpen => !isOpen && onClose?.()}
        onClose={onClose}
      >
        {children && (
          <Drawer.Trigger asChild>
            <Button className='bg-black text-white'>{children}</Button>
          </Drawer.Trigger>
        )}
        <Drawer.Portal>
          <Drawer.Overlay className='fixed inset-0 bg-black/40 backdrop-blur-sm' />
          <Drawer.Content className='flex flex-col rounded-t-3xl mt-24 fixed bottom-0 left-0 right-0 max-h-[80%] min-h-[50%] outline-none'>
            <div className='p-4 bg-white rounded-t-3xl flex-1'>
              <div
                className={clsx(
                  `mx-auto w-28 md:w-32 h-1.5 flex-shrink-0 rounded-full bg-zinc-200 hover:bg-zinc-300/90 mb-8 transition`,
                  dragged && `bg-zinc-400/65 shadow-md`
                )}
              />
              <div className='text-center'>{content as ReactPortal}</div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}
