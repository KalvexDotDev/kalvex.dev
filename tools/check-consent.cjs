// CI Playwright test: verify consent banner renders correctly
// Runs against local server on port 4173
const { chromium } = require("playwright");

const URL = "http://127.0.0.1:4173/";
let exitCode = 0;

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    
    // Collect JS errors
    const errors = [];
    page.on("pageerror", err => errors.push(err.message));

    await page.goto(URL, { waitUntil: "load", timeout: 15000 });
    await page.waitForTimeout(1000);

    // Check 1: showConsentBanner function exists
    const fnType = await page.evaluate(() => typeof window.showConsentBanner);
    if (fnType !== "function") {
      console.error("FAIL: showConsentBanner not a function, got:", fnType);
      exitCode = 1;
    } else {
      console.log("PASS: showConsentBanner is a function");
    }

    // Check 2: Consent banner is in DOM and visible
    const banner = await page.evaluate(() => {
      const el = document.querySelector(".cookie-consent");
      if (!el) return { visible: false, reason: "not in DOM" };
      const s = getComputedStyle(el);
      return {
        visible: s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0",
        display: s.display,
        position: s.position,
        zIndex: s.zIndex
      };
    });

    if (!banner.visible) {
      console.error("FAIL: Cookie banner not visible:", JSON.stringify(banner));
      exitCode = 1;
    } else {
      console.log("PASS: Cookie banner visible —", banner.display, banner.position, "z-index:", banner.zIndex);
    }

    // Check 3: CSS loaded
    const cssLoaded = await page.evaluate(() => {
      const link = document.querySelector('link[rel="stylesheet"]');
      return link && !!link.sheet;
    });
    if (!cssLoaded) {
      console.error("FAIL: CSS not loaded");
      exitCode = 1;
    } else {
      console.log("PASS: CSS loaded");
    }

    // Check 4: No JS errors
    if (errors.length) {
      console.error("FAIL: JS errors:", errors);
      exitCode = 1;
    } else {
      console.log("PASS: No JS errors");
    }

    // Check 5: No cal.com links
    const calLinks = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href*="cal.com"]');
      return links.length;
    });
    if (calLinks > 0) {
      console.error(`FAIL: ${calLinks} cal.com links found`);
      exitCode = 1;
    } else {
      console.log("PASS: No cal.com links");
    }

    // Check 6: HubSpot meeting links present
    const hsMeetings = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href*="meetings-eu1.hubspot.com"]');
      return links.length;
    });
    if (hsMeetings < 1) {
      console.error("FAIL: No HubSpot meeting links found");
      exitCode = 1;
    } else {
      console.log(`PASS: ${hsMeetings} HubSpot meeting links`);
    }

    // Check 7: Data privacy link
    const privacyLink = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href*="hs-data-privacy"]');
      return links.length;
    });
    if (privacyLink < 1) {
      console.error("FAIL: No data privacy link found");
      exitCode = 1;
    } else {
      console.log("PASS: Data privacy link present");
    }

  } catch (e) {
    console.error("FATAL:", e.message);
    exitCode = 1;
  } finally {
    await browser.close();
    process.exit(exitCode);
  }
})();
