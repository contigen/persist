import { ContactsWithoutNote, parseVCardText } from '../utils'
import { Button } from './ui/button'
import { Sheet } from './ui/sheet'

const IMPORTED_CONTACTS_KEY = `imported-contacts`

export function ImportedContacts({ vCardText }: { vCardText: string }) {
  const storedImportedContacts =
    localStorage.getItem(IMPORTED_CONTACTS_KEY) || ``
  const parsedImportedContacts: ContactsWithoutNote = storedImportedContacts
    ? JSON.parse(storedImportedContacts)
    : []
  const importedContacts = [
    ...parsedImportedContacts,
    parseVCardText(vCardText),
  ] as ContactsWithoutNote
  importedContacts &&
    localStorage.setItem(
      IMPORTED_CONTACTS_KEY,
      JSON.stringify(importedContacts)
    )

  return (
    <div className='my-4'>
      <Sheet
        content={
          <div className='space-y-4'>
            <h1 className='font-[650]'>Imported Contacts</h1>
            {importedContacts?.length > 0 && (
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
              onClick={() => localStorage.removeItem(IMPORTED_CONTACTS_KEY)}
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
