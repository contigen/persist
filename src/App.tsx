import './App.css'
import {
  PersonalContactWithQRCode,
  SharedContactWithQRCode,
} from './features/contacts'
import { ContactPickerWithQRCode } from './features/contact-picker'
import { useEffect, useLayoutEffect, useState } from 'react'
import { downloadVCard } from './utils'
import { QRCodeScanner } from './features/qr-code-scanner'
import { InlineBubble } from './features/ui/inline-bubble'
import { Book } from 'iconsax-react'

function App() {
  const [downloaded, setDownloaded] = useState(false)

  useLayoutEffect(() => {
    const queryString = window.location.search
    const searchParams = new URLSearchParams(queryString)
    const vCardTextParam = searchParams.get(`vCardText`)
    if (!vCardTextParam) return
    const decodedVCardText = decodeURIComponent(vCardTextParam)
      .split(`|`)
      .join(`\n`)
    downloadVCard(decodedVCardText)
    setDownloaded(true)
  }, [])

  useEffect(() => {
    downloaded && history.replaceState(null, ``, `/`)
  }, [downloaded])

  return (
    <div>
      <span className='p-2 inline-block'>
        <InlineBubble direction='right' className='py-1'>
          <Book size='20' color='#fff' />
        </InlineBubble>
      </span>
      <h1>Persist.</h1>
      <br />
      <PersonalContactWithQRCode />
      <SharedContactWithQRCode />
      <ContactPickerWithQRCode />
      <QRCodeScanner />
    </div>
  )
}

export default App
