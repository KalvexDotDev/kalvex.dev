// CI Playwright test: verify site works correctly
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

    // Check 1: CSS loaded
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

    // Check 2: No JS errors
    if (errors.length) {
      console.error("FAIL: JS errors:", errors);
      exitCode = 1;
    } else {
      console.log("PASS: No JS errors");
    }

    // Check 3: cal.com booking links present
    const calLinks = await page.evaluate(() => {
      return document.querySelectorAll('a[href*="cal.com/kalvex-jaimie/30min"]').length;
    });
    if (calLinks < 1) {
      console.error("FAIL: No cal.com booking links found");
      exitCode = 1;
    } else {
      console.log(`PASS: ${calLinks} cal.com booking links`);
    }

    // Check 4: No HubSpot meeting links
    const hsMeetings = await page.evaluate(() => {
      return document.querySelectorAll('a[href*="meetings-eu1.hubspot.com"]').length;
    });
    if (hsMeetings > 0) {
      console.error(`FAIL: ${hsMeetings} HubSpot meeting links (should be 0)`);
      exitCode = 1;
    } else {
      console.log("PASS: No HubSpot meeting links");
    }

    // Check 5: No HubSpot consent banner
    const hsBanner = await page.evaluate(() => {
      return !!document.querySelector(".cookie-consent");
    });
    if (hsBanner) {
      console.error("FAIL: HubSpot cookie consent banner still present");
      exitCode = 1;
    } else {
      console.log("PASS: No HubSpot consent banner");
    }

    // Check 6: Umami tracking script present
    const umamiScript = await page.evaluate(() => {
      return !!document.querySelector('script[data-website-id="6b09f082-3a32-4605-9abe-8cf6e794cc0a"]');
    });
    if (!umamiScript) {
      console.error("FAIL: Umami tracking script not found");
      exitCode = 1;
    } else {
      console.log("PASS: Umami tracking script present");
    }

    // Check 7: No HubSpot tracking scripts
    const hsScripts = await page.evaluate(() => {
      return document.querySelectorAll('script[src*="hubspot"], script[src*="hs-script"], script[data-hubspot-src]').length;
    });
    if (hsScripts > 0) {
      console.error(`FAIL: ${hsScripts} HubSpot scripts found (should be 0)`);
      exitCode = 1;
    } else {
      console.log("PASS: No HubSpot tracking scripts");
    }

    // Check 8: No HubSpot data privacy links
    const privacyLink = await page.evaluate(() => {
      return document.querySelectorAll('a[href*="hs-data-privacy"]').length;
    });
    if (privacyLink > 0) {
      console.error(`FAIL: ${privacyLink} HubSpot data privacy links (should be 0)`);
      exitCode = 1;
    } else {
      console.log("PASS: No HubSpot data privacy links");
    }

  } catch (e) {
    console.error("FATAL:", e.message);
    exitCode = 1;
  } finally {
    await browser.close();
    process.exit(exitCode);
  }
})();
