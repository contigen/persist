import { Dispatch, SetStateAction, useState } from 'react'

export function ContactPicker({
  contacts,
  setContacts,
}: {
  contacts: Contact[] | null
  setContacts: Dispatch<SetStateAction<Contact[] | null>>
}) {
  const [error, setError] = useState<string>(``)

  async function selectContacts() {
    if (!(`contacts` in navigator)) {
      return (
        setError(`The Contact Picker API is not supported in this browser.`),
        false
      )
    }
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
  }

  return (
    <div>
      <h1>Contact Picker</h1>
      <button onClick={selectContacts}>Select Contacts</button>
      <ul>
        {contacts?.map((contact, idx) => (
          <li key={idx}>
            <strong>Name:</strong> {contact.name.join(`, `)}
            <br />
            <strong>Phone:</strong> {contact.tel.join(`, `)}
            <br />
          </li>
        ))}
      </ul>
      {error && <p style={{ fontWeight: 450 }}>{error}</p>}
    </div>
  )
}
