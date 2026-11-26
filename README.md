# Wedding test invitation

A standalone, dependency-free InviteHarbour sample invitation. Open `index.html` directly in a browser; it does not need a server or build step.

## Change the sample details

Edit the `INVITE` object at the top of `js/invite.js`. Shared couple details and copy live under `shared`; each ceremony has its own date, venue, dress code, RSVP deadline, programme, menu and image paths under `ceremonies.white` and `ceremonies.traditional`.

The ceremony switch updates the hero photo and copy, gallery, palette, countdown background, details, embedded map, programme, menu and calendar file. The invitation QR is generated locally in the browser from the page address and selected ceremony; it is useful when the page is hosted at a public URL. Both sample ceremonies are on 14 February 2027. Guest Moments stays locked until the selected ceremony starts; then selected photos preview in the current browser only. Shared uploads and saved RSVPs need a live backend. The RSVP form prepares an email draft to `celebrate@example.com`. All sample names, dates, locations and menu copy are fictional.

## Files

- `index.html` — page structure and metadata
- `styles.css` — responsive design and ceremony palettes
- `js/invite.js` — sample details and interactions
- `assets/white/` and `assets/traditional/` — the ceremony photo sets
- `assets/inviteharbour.png` — InviteHarbour logo in the footer

The top bar contains the ceremony switch and save-date control. The InviteHarbour logo stays at the bottom of the page.
