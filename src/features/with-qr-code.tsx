import { ComponentType, Dispatch, useEffect, useState } from 'react'
import { QRCodeView } from './qr-code'
import { type VCardContact, generateVCard } from '../utils'

type WithQRCodeProp = {
  setContacts: Dispatch<React.SetStateAction<VCardContact[]>>
}

export function withQRCode<P extends WithQRCodeProp>(
  Component: ComponentType<P>
) {
  return function ComponentWithQRCode(props: Omit<P, keyof WithQRCodeProp>) {
    const [contacts, setContacts] = useState<VCardContact[]>([])
    const [vCardText, setVCardText] = useState(``)
    useEffect(() => {
      contacts && setVCardText(generateVCard(contacts))
    }, [contacts])

    return (
      <>
        <Component {...(props as P)} {...{ setContacts }} />
        <br />
        {vCardText && <QRCodeView value={vCardText} />}
      </>
    )
  }
}
