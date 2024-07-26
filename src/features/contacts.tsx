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
import { toast } from 'sonner'

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
      <h2 className='font-[640] mb-2'>Personal contact</h2>
      <form
        onSubmit={handleSubmit}
        name='personal-form'
        className='flex gap-2 flex-wrap
        '
      >
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
    if (name === `` || tel === `` || note === ``) {
      toast.warning(`Empty field`)
      return
    }
    setContacts(prevContacts => [...prevContacts, { name, tel, note }])
  }

  function deleteContact(idx: number) {
    setSharedContacts(prevContacts => prevContacts.filter((_, i) => i !== idx))
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sharedContacts))
  }, [LOCAL_STORAGE_KEY, sharedContacts])

  return (
    <div className='my-8'>
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
          <sub className='inline-flex gap-0.5 ml-3 scale-[.8]'>
            <Button
              onClick={() => shareContact(idx)}
              className='bg-black text-white gap-1 px-2 rounded-full'
            >
              <Send2 size={16} />
            </Button>
            <Button
              onClick={() => deleteContact(idx)}
              className='bg-red-500 p-px rounded-full'
            >
              <Minus size='32' color='#ffffff' />
            </Button>
          </sub>
        </div>
      ))}
      <div className='flex mt-4 gap-2 flex-wrap'>
        <Button onClick={addNewContactField}>Add new contact</Button>
        {sharedContacts.length > 0 && (
          <>
            <Button
              onClick={() => setContacts(sharedContacts)}
              className='bg-black text-white gap-1'
            >
              <Send2 size={16} /> Share contacts
            </Button>
            <Button
              onClick={() => setSharedContacts([])}
              className='bg-red-500'
            >
              Delete contacts
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export const SharedContactWithQRCode = withQRCode(SharedContact)
