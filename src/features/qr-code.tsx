import QRCode from 'react-qr-code'
import { toJpeg } from 'html-to-image'
import { BASE_URL } from '../utils'
import { useRef } from 'react'

export function QRCodeView({ value }: { value: string }) {
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
      <h2 className='font-[640]'>Quick Response Code.</h2>
      <br />
      <div className='flex justify-center flex-col items-center'>
        <div className='p-3 bg-white' ref={QRCodeContainerRef}>
          <QRCode value={`${BASE_URL}?vCardText=${value}`} />
        </div>
        <button onClick={downloadQRCode}>Download QR Code</button>
      </div>
    </div>
  )
}
