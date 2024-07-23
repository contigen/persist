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
import { Button } from './ui/button'
import { Add, Minus, Send2 } from 'iconsax-react'

function PersonalContact({
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
    // @ts-ignorej
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
      <h2 className='font-[640]'>Personal contact</h2>
      <form onSubmit={handleSubmit} name='personal-form'>
        <input placeholder='Name' name='name' required />
        <input
          placeholder='Number'
          inputMode='numeric'
          name='number'
          required
        />
        <Button type='submit' className='bg-black text-white rounded-lg'>
          <Add />
          Add Contact
        </Button>
      </form>
    </div>
  )
}

export const PersonalContactWithQRCode = withQRCode(PersonalContact)

type SharedContact = VCardContact & {
  note: string
}

function SharedContact({
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
    setSharedContacts([...sharedContacts, { name: ``, tel: ``, note: `` }])
  }

  function shareContact(idx: number) {
    const targetContact = [...sharedContacts][idx]
    const { name, tel, note } = targetContact
    setContacts(prevContacts => [...prevContacts, { name, tel, note }])
  }

  function deleteContact(idx: number) {
    setSharedContacts(prevContacts => prevContacts.filter((_, i) => i !== idx))
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sharedContacts))
  }, [LOCAL_STORAGE_KEY, sharedContacts])

  return (
    <div>
      <h2 className='font-[640]'>Shared contact</h2>
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
            placeholder='Notes'
            name='note'
            required
            value={contact.note}
            onChange={({ currentTarget: { name, value } }) =>
              handleInputChange(idx, name, value)
            }
          />
          <Button onClick={() => shareContact(idx)}>
            <Send2 /> Share contact
          </Button>
          <Button
            onClick={() => deleteContact(idx)}
            className='bg-red-500 p-px rounded-full'
          >
            <Minus size='32' color='#ffffff' />
          </Button>
        </div>
      ))}
      <Button onClick={addNewContactField}>Add new contact</Button>
      {sharedContacts.length > 0 && (
        <>
          <Button onClick={() => setContacts(sharedContacts)}>
            <Send2 /> Share contacts
          </Button>
          <Button onClick={() => setSharedContacts([])}>Delete contacts</Button>
        </>
      )}
    </div>
  )
}

export const SharedContactWithQRCode = withQRCode(SharedContact)
