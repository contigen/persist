import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'non.geist'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position='top-center'
      toastOptions={{
        classNames: {
          toast:
            'bg-white rounded-xl px-6 py-2 flex items-center gap-2 shadow-md border justify-center',
        },
      }}
      duration={1000}
    />
  </React.StrictMode>
)
