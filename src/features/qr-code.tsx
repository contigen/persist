import QRCode from 'react-qr-code'

export function QRCodeView() {
  return (
    <div>
      <h1>QR Code.</h1>
      <div className=''>
        <QRCode value='tel:+2348101193584' />
      </div>
    </div>
  )
}
