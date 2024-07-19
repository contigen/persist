import { useState } from 'react'

export function ContactPicker() {
  const [contacts, setContacts] = useState<Contact[] | null>(null)
  const [error, setError] = useState<string>(``)

  async function selectContacts() {
    if (`contacts` in navigator) {
      navigator.vibrate?.(200)
      try {
        const selectedContacts = await navigator.contacts.select(
          [`name`, `tel`],
          {
            multiple: true,
          }
        )
        setContacts(selectedContacts)
      } catch (err: unknown) {
        setError(`Error selecting contacts:', ${err}`)
      }
    } else {
      setError(`Web Contacts API not supported in this browser.`)
    }
  }

  return (
    <div>
      <h1>Contact Picker</h1>
      <button onClick={selectContacts}>Select Contacts</button>
      {contacts && <p>{JSON.stringify(contacts, null, 2)}</p>}
      <ul>
        {contacts?.map((contact, index) => (
          <li key={index}>
            <strong>Name:</strong> {contact.name?.join(', ')}
            <br />
            <strong>Phone:</strong> {contact.tel?.map(t => t.value).join(', ')}
            <br />
            <strong>Email:</strong>{' '}
            {contact.email?.map(e => e.value).join(', ')}
          </li>
        ))}
      </ul>
      {error && <p style={{ fontWeight: 450 }}>{error}</p>}
    </div>
  )
}
