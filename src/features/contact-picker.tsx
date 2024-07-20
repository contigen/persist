import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { VCardContact } from '../utils'
import { withQRCode } from './with-qr-code'

function ContactPicker({
  setContacts,
}: {
  setContacts: Dispatch<SetStateAction<VCardContact[]>>
}) {
  const [error, setError] = useState<string>(``)
  const [contacts, _setContacts] = useState<Contact[] | null>(null)
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
      _setContacts(selectedContacts)
    } catch (err: unknown) {
      setError(`Error selecting contacts:, ${err}`)
    }
  }

  useEffect(() => {
    if (contacts) {
      const modifiedContacts = contacts.map(contact => {
        return {
          name: contact.name[0],
          tel: contact.tel[0],
        }
      })
      setContacts(modifiedContacts)
    }
  }, [contacts, setContacts])

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

export const ContactPickerWithQRCode = withQRCode(ContactPicker)
