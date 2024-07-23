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
    <div vaul-drawer-wrapper='' className='bg-white min-h-[100vh]'>
      <header className='bg-gradient-to-tl from-slate-900 via-neutral-400 to-blue-800 p-20 space-y-8 hidden md:block'>
        <h1 className='leading-[4rem] text-balance'>
          Persist: transfer contacts across devices on the Web.
        </h1>
        <p className='tracking-tight text-xl md:text-2xl'>
          A contact sharing app using the Contact Picker API & QR Codes to embed
          data for seamless transfer across devices.
        </p>
      </header>
      <div className='p-4'>
        <h1 className='block sm:hidden'>
          <span className='inline-block p-2'>
            <InlineBubble direction='left' className='py-1.5 px-4'>
              <Book size='24' color='#fff' variant='TwoTone' />
            </InlineBubble>
            Persist.
          </span>
        </h1>
        <br />
        <PersonalContactWithQRCode />
        <SharedContactWithQRCode />
        <ContactPickerWithQRCode />
        <QRCodeScanner />
      </div>
    </div>
  )
}

export default App
