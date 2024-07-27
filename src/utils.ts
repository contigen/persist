import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const BASE_URL = window.location.origin

export type VCardContact = {
  name: string
  tel: string
  note?: string
}

type ContactsWithoutNote = Omit<VCardContact, `note`>[]

export function generateVCard(contacts: VCardContact[]) {
  return contacts
    .map(contact => {
      return `BEGIN:VCARD|VERSION:3.0|FN:${contact.name}|TEL:${contact.tel}${
        contact.note ? `|NOTE:${contact.note}` : ``
      }|END:VCARD`
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseVCardText(vCardText: string) {
  const contacts: ContactsWithoutNote = []

  const vCards = vCardText.split(/BEGIN:VCARD/i).filter(v => v.trim() !== ``)
  console.log(vCards)
  vCards.forEach(vCard => {
    const nameMatch = vCard.match(/FN:(.+)/i)
    const telMatch = vCard.match(/TEL:(.+)/i)
    console.log(nameMatch, telMatch)
    if (nameMatch && telMatch) {
      contacts.push({
        name: nameMatch[1].trim(),
        tel: telMatch[1].trim(),
      })
    }
  })

  return contacts
}
