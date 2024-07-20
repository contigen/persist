import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  PersonalContactWithQRCode,
  SharedContactWithQRCode,
} from './features/contacts'
import { ContactPickerWithQRCode } from './features/contact-picker'
import { useEffect, useLayoutEffect, useState } from 'react'
import { downloadVCard } from './utils'
import { QRCodeScanner } from './features/qr-code-scanner'

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
      <div>
        <h1>Persist.</h1>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
        <h1>Vite + React</h1>
      </div>
      <br />
      <PersonalContactWithQRCode />
      <SharedContactWithQRCode />
      <ContactPickerWithQRCode />
      <QRCodeScanner />
    </div>
  )
}

export default App
