export const BASE_URL = `https://persist-tau.vercel.app/`

type VCardContact = {
  name: string
  tel: string
}

export function generateVCard(contacts: VCardContact[]) {
  return contacts
    .map(contact => {
      return `BEGIN:VCARD|VERSION:3.0|FN:${contact.name}|TEL:${contact.tel}|END:VCARD`
    })
    .join(`|`)
}

export function downloadVCard(vCardText: string) {
  const blob = new Blob([vCardText], { type: `text/vcard` })
  const url = URL.createObjectURL(blob)
  const link = document.createElement(`a`)
  link.href = url
  link.download = `contacts.vcf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
