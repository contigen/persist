<img src="./public/persist.png" width=89.48655257 height=60 alt='logo for app'>

# Persist

A contact sharing progressive web app using the Contact Picker API, QR Codes and vCards to embed contact data for contactless/seamless transfer across devices on the Web. The app/PWA offers a refined way of sharing contacts during social interactions, events, networking sessions and whatnots.
It enables users to select contacts from their phonebook, generate vCard files to import contacts on other devices, and share them via dynamically generated QR codes. <br/>
The PWA is live at [persist-tau.vercel.app](https://persist-tau.vercel.app)

# Features

- Contact Selection with Vibration Feedback: users can select contacts from their phonebook, with vibration feedback provided, via the Vibration API, to confirm their action
- Generate vCard files to import contacts on other devices
- Personal and shared contact forms, with local storage persistence
- Share contacts via dynamically generated QR codes － download & scan QR Codes in-app
- Imported contacts' list with link to each contact and local storage persistence
- Toast notifications for user feedback
- Progressive Web Application － Installable app

## Technologies

- React
- TypeScript
- TailwindCSS for styling

## Gotcha

The Contact Picker API only works in Chromium Browsers and Safari (requires enabling a feature flag).
Ability to save contacts directly has been revoked on the Web (Firefox's deprecated Contacts API)

## Misc.

Other transfer protocols were evaluated like the Web Bluetooth API, WebSockets and even the Web NFC API, for contact sharing.
<br/>

- **Web Bluetooth API**: The current implementation of the API doesn't allow for P2P connection.

- **WebSockets**: While WebSockets offer real-time communication capabilities, they require a server-side component to handle connections and message exchanges. This adds additional complexity and infrastructure requirements, which were deemed unnecessary for the current app state.

- **Web NFC API**: The Web NFC API enables interaction with NFC tags for contactless data transfer. Although promising, it is not yet widely supported across all devices and browsers, which will limit the app’s accessibility and functionality for users.

Quick Response Codes affords the best compatibility for the current app state: doesn't introduce any server-side effect, convenient for storage.

Regardless, future updates could include:

Remote Contact Sharing via WebSockets: Implementing WebSocket-based contact sharing could enable real-time updates and interactions, allowing users to exchange contact information instantly regardless of location.

Exporting Contacts to NFC Tags using Web NFC API for quick and intuitive data transfer.

## Usage

If you use this project, please provide appropriate credit to acknowledge the original work.

If this project inspires you to create something, I'd love to hear about it. Please reach out and share your work with me.

### Development dependencies

- `Vite` as the dev server with HMR and some ESLint rules.
- `VitePWA` to serve the app as a PWA for offline capabilities and native-like app feel
- `Bun` as the runtime

### Development Scripts

To start the dev server:

```
bun install && bun run dev
```

To build the app and start the prod server:

```
bun run build && bun run preview
```
