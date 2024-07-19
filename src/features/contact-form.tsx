import { ChangeEvent, useState } from 'react'

export function ContactForm() {
  const [, setFormState] = useState({
    name: ``,
    number: ``,
    info: ``,
  })

  function handleChange({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) {
    setFormState(prev => ({ ...prev, [name]: value }))
  }
  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Number'
        pattern='[0-9]'
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
    </form>
  )
}
