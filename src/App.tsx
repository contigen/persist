import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ContactForm } from './features/contact-form'
import { QRCodeView } from './features/qr-code'
import { ContactPicker } from './features/contact-picker'

function App() {
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
      <ContactPicker />
      <QRCodeView />
    </div>
  )
}

export default App
