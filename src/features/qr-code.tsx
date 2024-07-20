import QRCode from 'react-qr-code'
import { BASE_URL } from '../utils'

export function QRCodeView({ value }: { value: string }) {
  return (
    <div>
      <h1>QR Code.</h1>
      <div className=''>
        <QRCode value={`${BASE_URL}?vCardText=${value}`} />
      </div>
    </div>
  )
}
