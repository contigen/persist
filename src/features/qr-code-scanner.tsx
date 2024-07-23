import {
  IDetectedBarcode,
  Scanner as QRScanner,
} from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import { BASE_URL } from '../utils'
import { Scanner } from 'iconsax-react'
import { Button } from './ui/button'

export function QRCodeScanner() {
  const [showScanner, setShowScanner] = useState(false)
  const [result, setResult] = useState(``)

  function handleResult(result: IDetectedBarcode[]) {
    const resolvedResult = result.map(r => r.rawValue).join(``)
    setResult(resolvedResult)
    if (resolvedResult.startsWith(BASE_URL)) {
      location.replace(resolvedResult)
    }
  }
  return (
    <div className='rounded-[1.5rem] shadow-md px-10 py-20 space-y-6 w-max'>
      <span className='rounded-xl p-4 bg-gray-900 inline-block'>
        <Scanner color='#fff' />
      </span>
      <h2 className='font-[640]'>QR Code Scanner</h2>
      <Button
        onClick={() => setShowScanner(prev => !prev)}
        className='bg-black text-white'
      >
        Scan
      </Button>
      {showScanner && <QRScanner onScan={handleResult} />}
      {result && (
        <h3 style={{ letterSpacing: `-0.04em`, wordWrap: `break-word` }}>
          {result}
        </h3>
      )}
    </div>
  )
}
