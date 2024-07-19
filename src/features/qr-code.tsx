import QRCode from 'react-qr-code'

export function QRCodeView({ value }: { value: string }) {
  return (
    <div>
      <h1>QR Code.</h1>
      <div className=''>
        <QRCode value={value} />
      </div>
    </div>
  )
}
