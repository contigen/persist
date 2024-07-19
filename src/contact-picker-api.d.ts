interface ContactAddress {
  city?: string
  country?: string
  region?: string
  street?: string
  postalCode?: string
}

interface Contact {
  name: string[]
  tel: string[]
  email?: string[]
  address?: ContactAddress[]
  icon?: Blob[]
}

type ContactProperties = `name` | `tel` | `email` | `address` | `icon`
interface ContactPickerOptions {
  multiple?: boolean
}

interface ContactsManager {
  getProperties(): Promise<ContactProperties[]>
  select(
    props: ContactProperties[],
    options: ContactPickerOptions
  ): Promise<Contact[]>
}

declare interface Navigator {
  contacts: ContactsManager
}
