import { ChangeEvent, FormEvent, useState } from 'react'
import QRCode from 'react-qr-code'
import { generateVCard } from '../utils'

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: ``,
    number: ``,
    info: ``,
  })
  const [vCardText, setVCardText] = useState(``)

  function handleChange({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) {
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const $form = evt.currentTarget
    const formData = new FormData($form)
    console.log(`Form submitted!`, formData.get(`name`), formData.get(`number`))
    const { name, number } = formState
    setVCardText(generateVCard([{ name, tel: number }]))
  }
  return (
    <>
      <h1>Add contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Number'
          inputMode='numeric'
          name='number'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Additional Info'
          name='info'
          onChange={handleChange}
        />
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
