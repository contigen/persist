import { FormEvent, useState } from 'react'
import QRCode from 'react-qr-code'
import { generateVCard } from '../utils'

export function ContactForm() {
  const [vCardText, setVCardText] = useState(``)

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const $form = evt.currentTarget
    const formData = new FormData($form)
    let { name, number } = Object.fromEntries(formData)
    ;(name = name.toString()), (number = number.toString())
    setVCardText(generateVCard([{ name, tel: number }]))
  }
  return (
    <>
      <h1>Add contact</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Name' name='name' />
        <input
          type='text'
          placeholder='Number'
          inputMode='numeric'
          name='number'
        />
        <input type='text' placeholder='Additional Info' name='info' />
        <button type='submit'>Add Contact</button>
      </form>
      <br />
      {vCardText && (
        <QRCode
          value={`https://persist-tau.vercel.app?vCardText=${vCardText}`}
        />
      )}
    </>
  )
}
