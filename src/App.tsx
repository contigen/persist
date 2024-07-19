import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ContactForm } from './features/contact-form'
import { QRCodeView } from './features/qr-code'
import { ContactPicker } from './features/contact-picker'
import { useEffect, useLayoutEffect, useState } from 'react'
import { downloadVCard, generateVCard } from './utils'

const BASE_URL = `https://persist-tau.vercel.app/`

function App() {
  const [contacts, setContacts] = useState<Contact[] | null>(null)
  const [vCardText, setVCardText] = useState(``)

  useLayoutEffect(() => {
    const queryString = window.location.search
    const searchParams = new URLSearchParams(queryString)
    const vCardTextParam = searchParams.get(`vCardText`)
    if (!vCardTextParam) return
    downloadVCard(vCardTextParam)
  }, [])

  useEffect(() => {
    contacts && setVCardText(generateVCard(contacts))
  }, [contacts])

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
      <ContactForm />
      <ContactPicker {...{ contacts, setContacts }} />
      {vCardText && <QRCodeView value={`${BASE_URL}?vCardText=${vCardText}`} />}
    </div>
  )
}

export default App
