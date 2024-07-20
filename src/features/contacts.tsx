import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { VCardContact } from '../utils'
import { withQRCode } from './with-qr-code'

function _PersonalContact({
  setContacts,
}: {
  setContacts: Dispatch<SetStateAction<VCardContact[]>>
}) {
  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const $form = evt.currentTarget
    const formData = new FormData($form)
    const objectFormData = Object.fromEntries(formData)
    localStorage.setItem(`personal-contact`, JSON.stringify(objectFormData))
    const { name, number } = objectFormData
    setContacts([{ name: name.toString(), tel: number.toString() }])
  }

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const $form = document.forms[`personal-form`]
    const stringFormData = localStorage.getItem(`personal-contact`)
    if (!stringFormData) return
    const objectFormData = JSON.parse(stringFormData) as {
      [k: string]: FormDataEntryValue
    }
    for (const [key, value] of Object.entries(objectFormData)) {
      const $input = $form.elements[key] as HTMLInputElement
      $input.value = value.toString()
    }
    const { name, number } = objectFormData
    setContacts([{ name: name.toString(), tel: number.toString() }])
  }, [setContacts])

  return (
    <div>
      <h1>Personal contact</h1>
      <form onSubmit={handleSubmit} name='personal-form'>
        <input placeholder='Name' name='name' />
        <input placeholder='Number' inputMode='numeric' name='number' />
        <button type='submit'>Add Contact</button>
      </form>
    </div>
  )
}

export const PersonalContact = withQRCode(_PersonalContact)

type SharedContact = VCardContact & {
  info: string
}

function _SharedContact({
  setContacts,
}: {
  setContacts: Dispatch<SetStateAction<VCardContact[]>>
}) {
  const LOCAL_STORAGE_KEY = `shared-contact`

  const [sharedContacts, setSharedContacts] = useState<SharedContact[]>(() => {
    const savedContacts = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedContacts ? JSON.parse(savedContacts) : []
  })

  function handleInputChange(idx: number, name: string, value: string) {
    const updatedContacts = [...sharedContacts]
    updatedContacts[idx] = { ...updatedContacts[idx], [name]: value }
    setSharedContacts(updatedContacts)
  }

  function addNewContactField() {
    setSharedContacts([...sharedContacts, { name: ``, tel: ``, info: `` }])
  }

  function shareContact(idx: number) {
    const targetContact = [...sharedContacts][idx]
    setContacts(prevContacts => [
      ...prevContacts,
      { name: targetContact.name, tel: targetContact.tel },
    ])
  }

  function shareContacts() {
    setContacts(sharedContacts.map(({ name, tel }) => ({ name, tel })))
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sharedContacts))
  }, [LOCAL_STORAGE_KEY, sharedContacts])

  return (
    <div>
      <h1>Shared contact.</h1>
      {sharedContacts.map((contact, idx) => (
        <div key={idx} style={{ marginBottom: `10px` }}>
          <input
            placeholder='Name'
            name='name'
            value={contact.name}
            onChange={({ currentTarget: { name, value } }) =>
              handleInputChange(idx, name, value)
            }
            style={{ marginRight: `10px` }}
          />
          <input
            placeholder='Telephone'
            name='tel'
            value={contact.tel}
            onChange={({ currentTarget: { name, value } }) =>
              handleInputChange(idx, name, value)
            }
            style={{ marginRight: `10px` }}
          />
          <input
            placeholder='Additional Info'
            name='info'
            value={contact.info}
            onChange={({ currentTarget: { name, value } }) =>
              handleInputChange(idx, name, value)
            }
          />
          <button onClick={() => shareContact(idx)}>Share contact</button>
        </div>
      ))}
      <button onClick={addNewContactField}>Add new contact</button>
      <button onClick={shareContacts}>Share contacts</button>
    </div>
  )
}

export const SharedContact = withQRCode(_SharedContact)
