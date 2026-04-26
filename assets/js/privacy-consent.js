(function () {
  const script = document.currentScript;
  const lang = script?.dataset.lang === 'en' ? 'en' : 'is';
  const hubspotSrc = script?.dataset.hubspotSrc;
  const storageKey = 'kalvex_cookie_consent_v1';

  const text = {
    is: {
      title: 'Vefkökur og persónuvernd',
      intro:
        'Við notum nauðsynlega vistun til að muna valið þitt. HubSpot og valkvæðar vefmælingar hlaðast aðeins ef þú samþykkir.',
      accept: 'Samþykkja',
      reject: 'Hafna',
      settings: 'Stilla',
      save: 'Vista val',
      essential: 'Nauðsynlegt',
      essentialHelp: 'Heldur vefnum virkum og man val þitt. Alltaf virkt.',
      marketing: 'Valkvæðar vefmælingar',
      marketingHelp: 'Leyfir HubSpot til að mæla heimsóknir og samskipti við vefinn.',
      privacy: 'Persónuverndarstefna',
      cookies: 'Vefkökur',
      privacyHref: 'personuverndarstefna.html',
      cookiesHref: 'vefkokur.html'
    },
    en: {
      title: 'Cookies and privacy',
      intro:
        'We use necessary storage to remember your choice. HubSpot and optional analytics load only if you accept.',
      accept: 'Accept',
      reject: 'Reject',
      settings: 'Settings',
      save: 'Save choice',
      essential: 'Necessary',
      essentialHelp: 'Keeps the site working and remembers your choice. Always on.',
      marketing: 'Optional analytics',
      marketingHelp: 'Allows HubSpot to measure website visits and interactions.',
      privacy: 'Privacy policy',
      cookies: 'Cookies',
      privacyHref: 'privacy-policy.html',
      cookiesHref: 'cookies.html'
    }
  }[lang];

  let banner;

  document.addEventListener('DOMContentLoaded', () => {
    const consent = getConsent();
    if (consent?.marketing) loadHubSpot();
    if (!consent) showBanner(false);

    document.addEventListener('click', (event) => {
      const settingsButton = event.target.closest('[data-consent-settings]');
      if (settingsButton) {
        event.preventDefault();
        showBanner(true);
      }
    });
  });

  function getConsent() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function setConsent(marketing) {
    const value = {
      version: 1,
      necessary: true,
      marketing: Boolean(marketing),
      updatedAt: new Date().toISOString()
    };

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // If storage is unavailable, still respect the choice for the current page view.
    }

    if (value.marketing) loadHubSpot();
    banner?.remove();
    banner = null;
  }

  function loadHubSpot() {
    if (!hubspotSrc || document.getElementById('hs-script-loader')) return;

    const hubspot = document.createElement('script');
    hubspot.type = 'text/javascript';
    hubspot.id = 'hs-script-loader';
    hubspot.async = true;
    hubspot.defer = true;
    hubspot.src = hubspotSrc;
    document.head.appendChild(hubspot);
  }

  function showBanner(openSettings) {
    banner?.remove();

    const consent = getConsent();
    banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.innerHTML = `
      <div class="cookie-consent-copy">
        <h2 id="cookie-consent-title">${text.title}</h2>
        <p>${text.intro}</p>
        <div class="cookie-consent-links">
          <a href="${text.privacyHref}">${text.privacy}</a>
          <a href="${text.cookiesHref}">${text.cookies}</a>
        </div>
      </div>
      <div class="cookie-consent-settings" ${openSettings ? '' : 'hidden'}>
        <label class="cookie-choice">
          <input type="checkbox" checked disabled>
          <span><strong>${text.essential}</strong>${text.essentialHelp}</span>
        </label>
        <label class="cookie-choice">
          <input type="checkbox" data-consent-marketing ${consent?.marketing ? 'checked' : ''}>
          <span><strong>${text.marketing}</strong>${text.marketingHelp}</span>
        </label>
      </div>
      <div class="cookie-consent-actions">
        <button type="button" class="button button-secondary" data-cookie-settings>${text.settings}</button>
        <button type="button" class="button button-secondary" data-cookie-reject>${text.reject}</button>
        <button type="button" class="button button-primary" data-cookie-accept>${text.accept}</button>
        <button type="button" class="button button-primary" data-cookie-save ${openSettings ? '' : 'hidden'}>${text.save}</button>
      </div>
    `;

    document.body.appendChild(banner);

    const settingsPanel = banner.querySelector('.cookie-consent-settings');
    const settingsButton = banner.querySelector('[data-cookie-settings]');
    const saveButton = banner.querySelector('[data-cookie-save]');
    const marketingInput = banner.querySelector('[data-consent-marketing]');

    banner.querySelector('[data-cookie-accept]').addEventListener('click', () => setConsent(true));
    banner.querySelector('[data-cookie-reject]').addEventListener('click', () => setConsent(false));
    settingsButton.addEventListener('click', () => {
      settingsPanel.hidden = false;
      saveButton.hidden = false;
      settingsButton.hidden = true;
      marketingInput.focus();
    });
    saveButton.addEventListener('click', () => setConsent(marketingInput.checked));
  }
})();
