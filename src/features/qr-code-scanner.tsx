import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils'

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
  useEffect(() => {
    result && location.replace(BASE_URL)
  }, [result])
  return (
    <div>
      <h1>QR Code Scanner</h1>
      <button onClick={() => setShowScanner(prev => !prev)}>
        Show Scanner
      </button>
      {showScanner && <Scanner onScan={handleResult} />}
      {result && (
        <h3 style={{ letterSpacing: `-0.04em`, wordWrap: `break-word` }}>
          {result}
        </h3>
      )}
    </div>
  )
}
