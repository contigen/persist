import {
  IDetectedBarcode,
  Scanner as QRScanner,
} from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import { BASE_URL } from '../utils'
import { Scanner } from 'iconsax-react'
import { Sheet } from './ui/sheet'
import { Spinner } from './ui/spinner'

export function QRCodeScanner() {
  const [scanning, setScanning] = useState(true)

  function handleResult(result: IDetectedBarcode[]) {
    setScanning(false)
    const resolvedResult = result.map(r => r.rawValue).join(``)
    console.log(resolvedResult)
    if (resolvedResult.startsWith(BASE_URL)) {
      location.replace(resolvedResult)
    }
  }
  return (
    <div className='rounded-[1.5rem] shadow-md px-10 py-20 space-y-6 w-max max-w-full'>
      <span className='rounded-xl p-4 bg-gray-900 inline-block'>
        <Scanner color='#fff' />
      </span>
      <h2 className='font-[640]'>QR Code Scanner</h2>
      <Sheet
        content={
          <div className='flex flex-col space-y-4 items-center'>
            {scanning && Spinner}
            <QRScanner
              onScan={handleResult}
              classNames={{
                container: `rounded-[2rem] max-w-sm overflow-hidden`,
                video: `rounded-[2rem] max-w-sm`,
              }}
            />
          </div>
        }
      >
        scan
      </Sheet>
    </div>
  )
}
