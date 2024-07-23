import QRCode from 'react-qr-code'
import { toJpeg } from 'html-to-image'
import { BASE_URL } from '../utils'
import { useRef } from 'react'
import { Button } from './ui/button'

export function QRCodeView({
  value,
  children,
}: {
  value: string
  children?: React.ReactNode
}) {
  value = encodeURIComponent(value)
  const QRCodeContainerRef = useRef<HTMLDivElement | null>(null)

  function downloadQRCode() {
    QRCodeContainerRef.current &&
      toJpeg(QRCodeContainerRef.current).then(dataUrl => {
        const link = document.createElement(`a`)
        link.download = `contact-qr_code.jpeg`
        link.href = dataUrl
        link.click()
      })
  }
  return (
    <div>
      <div className='flex justify-center flex-col items-center space-y-2'>
        <h1>Quick Response Code.</h1>
        <div className='p-3 bg-white' ref={QRCodeContainerRef}>
          <QRCode value={`${BASE_URL}?vCardText=${value}`} />
        </div>
        <hr />
        {children}
        <Button
          onClick={downloadQRCode}
          className='rounded-full border-blue-600 border-2 bg-blue-400/15 text-blue-600'
        >
          Download
        </Button>
      </div>
    </div>
  )
}
