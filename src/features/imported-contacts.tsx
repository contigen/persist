import { useEffect, useLayoutEffect, useState } from 'react'
import { ContactsWithoutNote, parseVCardText } from '../utils'
import { Button } from './ui/button'
import { Sheet } from './ui/sheet'

const IMPORTED_CONTACTS_KEY = `imported-contacts`

export function ImportedContacts({ vCardText }: { vCardText: string }) {
  const [importedContacts, setImportedContacts] = useState<ContactsWithoutNote>(
    () => {
      const storedImportedContacts = localStorage.getItem(IMPORTED_CONTACTS_KEY)
      return storedImportedContacts ? JSON.parse(storedImportedContacts) : []
    }
  )

  useLayoutEffect(() => {
    const newContacts = parseVCardText(vCardText)
    setImportedContacts(prevContacts => [...prevContacts, ...newContacts])
  }, [vCardText])

  useEffect(() => {
    localStorage.setItem(
      IMPORTED_CONTACTS_KEY,
      JSON.stringify(importedContacts)
    )
  }, [importedContacts])

  return (
    <div className='my-4'>
      <Sheet
        content={
          <div className='space-y-4'>
            <h1 className='font-[650]'>Imported Contacts</h1>
            {importedContacts.length > 0 && (
              <ol className='list-inside list-decimal'>
                {importedContacts.map(({ name, tel }) => (
                  <li key={name}>
                    <b>{name}</b>{' '}
                    <a
                      href={`tel:${tel}`}
                      className='underline underline-offset-2'
                    >
                      {tel}
                    </a>
                  </li>
                ))}
              </ol>
            )}
            <Button
              className='bg-red-500 text-white shadow-md px-14'
              onClick={() => setImportedContacts([])}
            >
              Remove all
            </Button>
          </div>
        }
      >
        Show imported contacts
      </Sheet>
    </div>
  )
}
