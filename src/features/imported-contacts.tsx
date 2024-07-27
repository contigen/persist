import { parseVCardText } from '../utils'

export function ImportedContacts({ vCardText }: { vCardText: string }) {
  const importedContacts = parseVCardText(vCardText)
  return (
    <div className='my-4'>
      <h2 className='font-[640]'>Imported Contacts</h2>
      <ul>
        {importedContacts.map(({ name, tel }) => (
          <li key={name}>
            <b>{name}</b>{' '}
            <a href={`tel:${tel}`} className='underline underline-offset-2'>
              {tel}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
