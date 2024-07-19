interface ContactAddress {
  city?: string
  country?: string
  region?: string
  street?: string
  postalCode?: string
}

interface ContactField {
  type?: string
  value: string
}

interface Contact {
  name?: string[]
  tel?: ContactField[]
  email?: ContactField[]
  address?: ContactAddress[]
  icon?: string
}

interface ContactPickerOptions {
  multiple?: boolean
}

interface ContactsAPI {
  select(options?: ContactPickerOptions): Promise<Contact[]>
}

declare interface Navigator {
  contacts: ContactsAPI
}
