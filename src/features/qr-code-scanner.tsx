import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'

export function QRCodeScanner() {
  const [showScanner, setShowScanner] = useState(false)
  const [result, setResult] = useState<IDetectedBarcode[]>([])
  return (
    <div>
      <h1>QR Code Scanner</h1>
      <button onClick={() => setShowScanner(prev => !prev)}>
        Show Scanner
      </button>
      {showScanner && <Scanner onScan={result => setResult(result)} />}
      {result && (
        <h3 style={{ letterSpacing: `-0.04em` }}>
          {result.map(r => r.rawValue)}
        </h3>
      )}
    </div>
  )
}
