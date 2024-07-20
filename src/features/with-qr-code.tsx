import { ComponentType, useEffect, useState } from 'react'
import { QRCodeView } from './qr-code'
import { type VCardContact, generateVCard } from '../utils'

export function withQRCode<P>(Component: ComponentType<P>) {
  return function ComponentWithQRCode(props: P) {
    const [contacts, setContacts] = useState<VCardContact[]>([])
    const [vCardText, setVCardText] = useState(``)
    useEffect(() => {
      contacts && setVCardText(generateVCard(contacts))
    }, [contacts])

    return (
      <>
        <Component {...props} setContacts={setContacts} />
        <br />
        {vCardText && <QRCodeView value={vCardText} />}
      </>
    )
  }
}
