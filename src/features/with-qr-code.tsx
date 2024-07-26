import { ComponentType, Dispatch, useEffect, useState } from 'react'
import { QRCodeView } from './qr-code'
import { type VCardContact, generateVCard } from '../utils'
import { Sheet } from './ui/sheet'

type WithQRCodeProp = {
  setContacts: Dispatch<React.SetStateAction<VCardContact[]>>
}

export function withQRCode<P extends WithQRCodeProp>(
  Component: ComponentType<P>
) {
  return function ComponentWithQRCode(props: Omit<P, keyof WithQRCodeProp>) {
    const [contacts, setContacts] = useState<VCardContact[]>([])
    const [vCardText, setVCardText] = useState(``)
    const [open, setOpen] = useState(false)

    useEffect(() => {
      contacts[0]?.note && setOpen(true)
      contacts && setVCardText(generateVCard(contacts))
    }, [contacts])

    return (
      <>
        <Component {...(props as P)} {...{ setContacts }} />
        <br />
        {!contacts[0]?.note && vCardText && (
          <Sheet content={<QRCodeView value={vCardText} />}>Show QR Code</Sheet>
        )}
        {open && vCardText && (
          <Sheet
            content={<QRCodeView value={vCardText} />}
            open={open}
            onClose={() => setOpen(false)}
          />
        )}
      </>
    )
  }
}
