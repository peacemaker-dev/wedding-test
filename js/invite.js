/* Edit the sample wedding in this one object. No server or build step is required. */
const INVITE = {
  couple: { firstNames: 'Lerato & Thabo', signature: 'With love, Lerato & Thabo' },
  openingSong: 'assets/Savy_Henry_-_The_Best_Part_Vistanaij.com_.ng_.mp3',
  shared: {
    heroKicker: 'A celebration in two chapters',
    heroSubline: 'invite you to celebrate',
    heroSummary: 'Share the day of love with us as we celebrate a love that brings two families together. We can’t wait to welcome you.',
    introHeading: 'It all started...',
    invitationMessage: 'A simple hello grew into a friendship, then a love that felt like home. We’ve shared new adventures, ordinary days made special, and a thousand reasons to choose each other. Now we can’t wait to begin our next chapter with the people we love around us.',
    giftNote: 'Your presence is the loveliest present.',
    rsvpEmail: 'celebrate@example.com',
    shareUrl: ''
  },
  ceremonies: {
    white: {
      number: '01',
      heroEyebrow: 'THE WHITE WEDDING · CHAPTER ONE',
      heroImage: 'assets/white/w5.jpeg',
      countdownImage: 'assets/white/w4.jpeg',
      heroAlt: 'The couple together in their white wedding attire',
      photos: [
        ['assets/white/w3.jpeg', 'The bride holding her bouquet', 'A beautiful beginning'],
        ['assets/white/w1.jpeg', 'The groom in his white wedding suit', 'Ready for forever'],
        ['assets/white/w4.jpeg', 'The bride preparing for the ceremony', 'A quiet moment before'],
        ['assets/white/w2.jpeg', 'The groom dressed for the celebration', 'Every detail, chosen with care']
      ],
      name: 'The White Wedding',
      subline: 'the beginning of forever',
      start: '2027-02-14T09:00:00+02:00',
      end: '2027-02-14T12:30:00+02:00',
      venue: 'The Garden House',
      address: 'Ballito, KwaZulu-Natal',
      mapQuery: 'Ballito, KwaZulu-Natal',
      dressCode: 'Formal attire',
      dressNote: 'Garden formal · soft neutrals',
      rsvpBy: '1 February 2027',
      programme: [
        ['9:00 AM', 'Guest arrival', 'Welcome drinks and a chance to find your seat.'],
        ['9:30 AM', 'The white ceremony', 'Join us as we make our promises to one another.'],
        ['11:00 AM', 'Photos & refreshments', 'A chance to greet the couple and families.'],
        ['12:00 PM', 'Farewell', 'A little pause before the afternoon celebration.']
      ],
      menu: [
        ['MENU: STARCH', 'Savoury rice · Ujeqe · Samp'],
        ['MENU: CURRY', 'Beef stew · Chicken curry · Mutton curry']
      ]
    },
    traditional: {
      number: '02',
      heroEyebrow: 'THE TRADITIONAL WEDDING · CHAPTER TWO',
      heroImage: 'assets/traditional/t4.jpeg',
      countdownImage: 'assets/traditional/t2.jpeg',
      heroAlt: 'The couple together in traditional wedding attire',
      photos: [
        ['assets/traditional/t1.jpeg', 'The couple celebrating in traditional attire', 'A celebration of heritage'],
        ['assets/traditional/t2.jpeg', 'The couple with their traditional wedding attire and beadwork', 'A joyful family gathering'],
        ['assets/traditional/t3.jpeg', 'A tender moment during the traditional celebration', 'A moment of tradition']
      ],
      name: 'The Traditional Wedding',
      subline: 'two families, joined in celebration',
      start: '2027-02-14T13:00:00+02:00',
      end: '2027-02-14T18:00:00+02:00',
      venue: 'The Maseko Family Home',
      address: 'Inanda, KwaZulu-Natal',
      mapQuery: 'Inanda, KwaZulu-Natal',
      dressCode: 'Traditional attire',
      dressNote: 'Jewel tones and family colours',
      rsvpBy: '1 February 2027',
      programme: [
        ['1:00 PM', 'Welcoming the families', 'A warm arrival and time to reconnect.'],
        ['2:00 PM', 'Family ceremony', 'Honouring the traditions that bring us together.'],
        ['4:00 PM', 'A shared feast', 'Food, music and a joyful afternoon together.'],
        ['5:30 PM', 'Celebration & family photos', 'Make a memory together before the day continues.']
      ],
      menu: [
        ['MENU: STARCH', 'Savoury rice · Ujeqe · Samp'],
        ['MENU: CURRY', 'Beef stew · Chicken curry · Mutton curry']
      ]
    }
  }
};

(() => {
  const one = (selector) => document.querySelector(selector);
  const setText = (selector, value) => document.querySelectorAll(selector).forEach((node) => { node.textContent = value; });
  const pad = (value) => String(value).padStart(2, '0');
  let activeKey = 'white';
  let clock;
  let momentUrls = [];

  function renderProgramme(items) {
    const list = one('[data-programme]');
    if (!list) return;
    list.replaceChildren(...items.map(([time, title, detail]) => {
      const item = document.createElement('li');
      const at = document.createElement('time'); at.textContent = time;
      const dot = document.createElement('span'); dot.className = 'timeline-dot';
      const copy = document.createElement('div');
      const heading = document.createElement('h3'); heading.textContent = title;
      const description = document.createElement('p'); description.textContent = detail;
      copy.append(heading, description); item.append(at, dot, copy); return item;
    }));
  }

  function renderMenu(items) {
    const list = one('[data-menu]');
    if (!list) return;
    list.replaceChildren(...items.map(([label, detail], index) => {
      const card = document.createElement('article');
      card.className = 'menu-card';
      const number = document.createElement('span'); number.className = 'menu-number'; number.textContent = String(index + 1).padStart(2, '0');
      const heading = document.createElement('h3'); heading.textContent = label;
      const copy = document.createElement('p'); copy.textContent = detail;
      card.append(number, heading, copy);
      return card;
    }));
  }

  function renderGallery(photos) {
    const gallery = one('[data-gallery]');
    if (!gallery) return;
    gallery.replaceChildren(...photos.map(([src, alt, caption], index) => {
      const figure = document.createElement('figure');
      figure.className = `photo-card${index === 0 ? ' photo-card-wide' : ''}`;
      const image = document.createElement('img');
      image.src = src; image.alt = alt; image.loading = 'lazy'; image.decoding = 'async';
      const label = document.createElement('figcaption'); label.textContent = caption;
      figure.append(image, label); return figure;
    }));
  }

  function updateCountdown(start) {
    const remaining = Math.max(0, start.getTime() - Date.now());
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor(remaining % 86400000 / 3600000),
      minutes: Math.floor(remaining % 3600000 / 60000),
      seconds: Math.floor(remaining % 60000 / 1000)
    };
    Object.entries(values).forEach(([unit, value]) => {
      const node = one(`[data-count="${unit}"]`);
      if (node) node.textContent = unit === 'days' ? String(value) : pad(value);
    });
  }

  function updateGuestMoments(start, ceremony) {
    const open = Date.now() >= start.getTime();
    const lockedPanel = one('[data-moments-locked]');
    const openPanel = one('[data-moments-open]');
    if (lockedPanel) lockedPanel.hidden = open;
    if (openPanel) openPanel.hidden = !open;
    const title = one('[data-moments-lock-title]');
    const copy = one('[data-moments-lock-copy]');
    if (title) title.textContent = `${ceremony.name} Guest Moments opens when the celebration begins`;
    if (copy) copy.textContent = `Photo sharing opens at ${new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', hour: 'numeric', minute: '2-digit' }).format(start)} on ${new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', weekday: 'long', day: 'numeric', month: 'long' }).format(start)}.`;
  }

  function previewGuestPhotos(files) {
    const gallery = one('[data-moments-gallery]');
    if (!gallery) return;
    momentUrls.forEach((url) => URL.revokeObjectURL(url));
    momentUrls = [];
    const figures = Array.from(files).filter((file) => file.type.startsWith('image/')).map((file) => {
      const url = URL.createObjectURL(file);
      momentUrls.push(url);
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      image.src = url; image.alt = `Guest moment: ${file.name}`;
      const caption = document.createElement('figcaption'); caption.textContent = file.name;
      figure.append(image, caption); return figure;
    });
    gallery.replaceChildren(...figures);
  }

  function escapeIcs(value) {
    return String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }

  function localIcsDate(iso) {
    return iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '').slice(0, 15);
  }

  function downloadCalendar(ceremony) {
    const location = `${ceremony.venue}, ${ceremony.address}`;
    const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const contents = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//InviteHarbour//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
      `UID:${Date.now()}-${activeKey}@inviteharbour.test`, `DTSTAMP:${now}`,
      `DTSTART;TZID=Africa/Johannesburg:${localIcsDate(ceremony.start)}`,
      `DTEND;TZID=Africa/Johannesburg:${localIcsDate(ceremony.end)}`,
      `SUMMARY:${escapeIcs(`${ceremony.name} · ${INVITE.couple.firstNames}`)}`,
      `LOCATION:${escapeIcs(location)}`,
      `DESCRIPTION:${escapeIcs(`A sample invitation for ${INVITE.couple.firstNames}. Dress code: ${ceremony.dressCode}.`)}`,
      'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Wedding celebration tomorrow', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([contents], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `lerato-thabo-${activeKey}-wedding.ics`;
    document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  }

  function render(key, updateUrl = true) {
    activeKey = INVITE.ceremonies[key] ? key : 'white';
    const ceremony = INVITE.ceremonies[activeKey];
    const start = new Date(ceremony.start);
    const end = new Date(ceremony.end);
    const dateLong = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(start);
    const dateShort = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(start);
    const calendarDay = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg', weekday: 'long'
    }).format(start);
    const calendarDate = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg', day: 'numeric', month: 'short', year: 'numeric'
    }).format(start);
    const timeRange = `${new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', hour: 'numeric', minute: '2-digit' }).format(start)} — ${new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', hour: 'numeric', minute: '2-digit' }).format(end)}`;

    document.body.dataset.ceremony = activeKey;
    document.querySelectorAll('[data-ceremony-button]').forEach((button) => {
      const selected = button.dataset.ceremonyButton === activeKey;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    setText('[data-bind="firstNames"]', INVITE.couple.firstNames);
    setText('[data-bind="signature"]', INVITE.couple.signature);
    setText('[data-bind="heroEyebrow"]', ceremony.heroEyebrow);
    setText('[data-bind="heroKicker"]', INVITE.shared.heroKicker);
    setText('[data-bind="heroSubline"]', INVITE.shared.heroSubline);
    setText('[data-bind="heroSummary"]', INVITE.shared.heroSummary);
    setText('[data-bind="introHeading"]', INVITE.shared.introHeading);
    setText('[data-bind="invitationMessage"]', INVITE.shared.invitationMessage);
    setText('[data-bind="giftNote"]', INVITE.shared.giftNote);
    setText('[data-bind="heroDate"]', dateShort);
    setText('[data-bind="calendarDay"]', calendarDay);
    setText('[data-bind="calendarDate"]', calendarDate);
    setText('[data-bind="heroTime"]', new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', hour: 'numeric', minute: '2-digit' }).format(start));
    setText('[data-bind="heroCeremony"]', ceremony.name);
    setText('[data-bind="ceremonyName"]', ceremony.name);
    setText('[data-bind="ceremonySubline"]', ceremony.subline);
    setText('[data-bind="eventNumber"]', ceremony.number);
    setText('[data-bind="dateLong"]', dateLong);
    setText('[data-bind="timeRange"]', timeRange);
    setText('[data-bind="venueName"]', ceremony.venue);
    setText('[data-bind="venueAddress"]', ceremony.address);
    setText('[data-bind="dressCode"]', ceremony.dressCode);
    setText('[data-bind="dressNote"]', ceremony.dressNote);
    setText('[data-bind="rsvpCopy"]', `Kindly let us know if you’ll be joining us by ${ceremony.rsvpBy}.`);

    const mapLink = one('[data-map-link]');
    if (mapLink) mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ceremony.mapQuery)}`;
    const mapFrame = one('[data-map-frame]');
    if (mapFrame) {
      mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(ceremony.mapQuery)}&output=embed`;
      mapFrame.title = `Map to ${ceremony.venue}`;
    }
    renderProgramme(ceremony.programme);
    renderMenu(ceremony.menu);
    const qrCanvas = one('[data-share-qr]');
    const qrLabel = one('[data-share-url-label]');
    if (qrCanvas && window.QRCode) {
      const pageUrl = new URL(INVITE.shared.shareUrl || location.href, location.href);
      pageUrl.search = '';
      pageUrl.searchParams.set('ceremony', activeKey);
      pageUrl.hash = '';
      QRCode.toCanvas(qrCanvas, pageUrl.href, { width: 240, margin: 2, errorCorrectionLevel: 'H', color: { dark: '#203a33', light: '#fffefa' } });
      if (qrLabel) qrLabel.textContent = location.protocol === 'file:' ? 'Shareable when this page is hosted online' : 'Scan to open this invitation';
    }
    const heroImage = one('[data-hero-image]');
    if (heroImage) { heroImage.src = ceremony.heroImage; heroImage.alt = ceremony.heroAlt; }
    const countdownImage = one('[data-countdown-bg]');
    if (countdownImage) countdownImage.src = ceremony.countdownImage;
    renderGallery(ceremony.photos);
    if (clock) window.clearInterval(clock);
    updateCountdown(start);
    updateGuestMoments(start, ceremony);
    clock = window.setInterval(() => {
      updateCountdown(start);
      updateGuestMoments(start, ceremony);
    }, 1000);
    const footerClient = one('[data-bind="footerClient"]');
    if (footerClient) footerClient.textContent = INVITE.couple.firstNames;
    if (updateUrl && location.protocol !== 'file:') history.replaceState(null, '', `?ceremony=${activeKey}`);
    document.title = `${ceremony.name} · ${INVITE.couple.firstNames} | InviteHarbour`;
  }

  /* Start music from the guest's tap while muted, then fade in after the envelope reveal. */
  const openingScreen = one('[data-opening-screen]');
  const openingEnvelope = one('[data-envelope]');
  const openButton = one('[data-break-seal]');
  const openingAudio = one('[data-opening-audio]');
  const musicButton = one('[data-music-toggle]');
  const musicLabel = one('[data-music-label]');
  const initials = INVITE.couple.firstNames.split('&').map((name) => name.trim()[0]).filter(Boolean).join(' & ');
  setText('[data-couple-initials]', initials);
  setText('[data-seal-initials]', initials.replace(' & ', ' · '));
  let songReady = false;
  let songFailed = false;
  let revealFinished = false;
  let songStarted = false;
  let openingTapped = false;
  const updateMusicStatus = (message) => { if (musicLabel) musicLabel.textContent = message; };
  const fadeInSong = () => {
    if (!openingAudio || openingAudio.paused || !revealFinished || !openingTapped) return;
    openingAudio.muted = false;
    let volume = openingAudio.volume;
    const fade = window.setInterval(() => {
      volume = Math.min(.42, volume + .035);
      openingAudio.volume = volume;
      if (volume >= .42) window.clearInterval(fade);
    }, 90);
  };
  const startSongFromEightSeconds = () => {
    if (!openingAudio) return Promise.resolve();
    if (!songStarted && openingAudio.readyState >= 1) { openingAudio.currentTime = Math.min(8, Math.max(0, openingAudio.duration - 1)); songStarted = true; }
    return openingAudio.play();
  };
  openingAudio?.addEventListener('loadedmetadata', () => {
    songReady = true;
    if (!songStarted && openingAudio.duration > 8) { openingAudio.currentTime = 8; songStarted = true; }
    if (musicButton) musicButton.disabled = !revealFinished;
    updateMusicStatus(revealFinished ? 'Play · The Best Part' : 'Song ready · starts on opening');
  });
  openingAudio?.addEventListener('canplay', () => {
    songReady = true;
    if (musicButton) musicButton.disabled = !revealFinished;
    if (!songFailed) updateMusicStatus(revealFinished ? 'Play · The Best Part' : 'Song ready · starts on opening');
  });
  openingAudio?.addEventListener('playing', fadeInSong);
  openingAudio?.addEventListener('error', () => {
    songFailed = true;
    songReady = false;
    if (musicButton) musicButton.disabled = !revealFinished;
    updateMusicStatus('Song unavailable · tap to retry');
  });
  if (openingAudio) { openingAudio.src = INVITE.openingSong; openingAudio.load(); }
  musicButton?.addEventListener('click', () => {
    if (!openingAudio || !revealFinished) return;
    if (songFailed) { songFailed = false; openingAudio.load(); updateMusicStatus('Loading The Best Part…'); return; }
    if (!songReady) { updateMusicStatus('Still loading · try again shortly'); return; }
    if (openingAudio.paused) {
      startSongFromEightSeconds().then(() => {
        musicButton.setAttribute('aria-label', 'Pause the song');
        musicButton.setAttribute('aria-pressed', 'true');
        musicLabel.textContent = 'Pause · The Best Part';
      }).catch(() => { if (musicLabel) musicLabel.textContent = 'Tap to play the song'; });
    } else {
      openingAudio.pause();
      musicButton.setAttribute('aria-label', 'Play the song');
      musicButton.setAttribute('aria-pressed', 'false');
      musicLabel.textContent = 'Play · The Best Part';
    }
  });
  openButton?.addEventListener('click', () => {
    if (!openingScreen || !openingEnvelope || !openButton) return;
    openButton.disabled = true;
    openingScreen.classList.add('is-opening');
    openingEnvelope.classList.add('is-opening');
    openingTapped = true;
    if (openingAudio) {
      openingAudio.muted = true;
      openingAudio.volume = 0;
      if (openingAudio.readyState >= 1 && !songStarted) { openingAudio.currentTime = Math.min(8, Math.max(0, openingAudio.duration - 1)); songStarted = true; }
      startSongFromEightSeconds().catch(() => { if (songFailed) updateMusicStatus('Song unavailable · tap to retry'); });
    }
    window.setTimeout(() => {
      openingScreen.classList.add('is-revealed');
      document.body.classList.add('invite-revealing');
      document.body.classList.remove('invite-locked');
      window.setTimeout(() => document.body.classList.remove('invite-revealing'), 1250);
      window.setTimeout(() => {
        revealFinished = true;
        if (musicButton) musicButton.disabled = false;
        if (openingAudio && songReady && !openingAudio.paused) {
          if (musicLabel) musicLabel.textContent = 'Pause · The Best Part';
          musicButton?.setAttribute('aria-label', 'Pause The Best Part');
          musicButton?.setAttribute('aria-pressed', 'true');
          fadeInSong();
        } else if (musicLabel && songReady) {
          musicLabel.textContent = 'Play · The Best Part';
          musicButton?.setAttribute('aria-label', 'Play The Best Part');
          musicButton?.setAttribute('aria-pressed', 'false');
        } else if (songFailed) updateMusicStatus('Song unavailable · tap to retry');
      }, 650);
      const topbar = one('.topbar');
      if (topbar && musicButton && openingAudio) {
        document.body.append(openingAudio, musicButton);
        musicButton.classList.add('music-fixed');
      }
      openingScreen.addEventListener('transitionend', () => openingScreen.remove(), { once: true });
      window.setTimeout(() => openingScreen.remove(), 900);
    }, 1050);
  });

  document.querySelectorAll('[data-ceremony-button]').forEach((button) => {
    button.addEventListener('click', () => render(button.dataset.ceremonyButton));
  });
  document.querySelectorAll('[data-calendar]').forEach((button) => button.addEventListener('click', () => downloadCalendar(INVITE.ceremonies[activeKey])));
  one('[data-rsvp-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const celebrationLabels = {
      both: 'Both celebrations', white: 'White wedding only', traditional: 'Traditional wedding only'
    };
    const responseLabels = { accept: 'Joyfully accepts', decline: 'Regretfully declines' };
    const details = [
      `Name: ${fields.get('guestName')}`,
      `Phone: ${fields.get('phone') || 'Not provided'}`,
      `Response: ${responseLabels[fields.get('response')]}`,
      `Celebration: ${celebrationLabels[fields.get('celebration')]}`,
      `Number attending: ${fields.get('guests')}`,
      `Message: ${fields.get('message') || '—'}`
    ].join('\n');
    const subject = encodeURIComponent(`Wedding RSVP — ${INVITE.couple.firstNames}`);
    const body = encodeURIComponent(`Hello,\n\n${details}\n\nThank you!`);
    const draft = document.createElement('a');
    draft.href = `mailto:${INVITE.shared.rsvpEmail}?subject=${subject}&body=${body}`;
    draft.click();
    const status = one('[data-rsvp-status]');
    if (status) status.textContent = 'Your email draft is ready. Review it and press Send to complete your RSVP.';
  });
  one('[data-moments-input]')?.addEventListener('change', (event) => previewGuestPhotos(event.currentTarget.files || []));
  const query = new URLSearchParams(location.search).get('ceremony');
  render(query === 'traditional' ? 'traditional' : 'white', false);
})();

