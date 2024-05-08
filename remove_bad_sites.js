const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const userAgent = require("user-agents");
const { Timer } = require("timer-node");

const DELAY_BETWEEN_WEBSITES = 50;

const {
  fillContactFormFields,
  navigateToContactPage,
  isPasswordPage,
  getWebsites,
  updateWebsite,
  getTotalEmailsSent,
  removeCaptchaScript,
  saveToEmailDatabase,
  injectHelpersAtContactPage,
} = require("./utils");

const timer = new Timer({ label: "timer" });

/* Counters */
let emailSuccess = 0;
let emailTotal = 0;

(async () => {
  const list = await getWebsites();

  let emailsSent = await getTotalEmailsSent(list);

  console.log(`\n\nEmails sent: ${emailsSent}`);

  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    args: [
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--allow-running-insecure-content",
      "--disable-blink-features=AutomationControlled",
      "--no-sandbox",
      "--mute-audio",
      "--no-zygote",
      "--no-xshm",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--enable-webgl",
      "--ignore-certificate-errors",
      "--lang=en-US,en;q=0.9",
      "--password-store=basic",
      "--disable-gpu-sandbox",
      "--disable-software-rasterizer",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--disable-infobars",
      "--disable-breakpad",
      "--disable-canvas-aa",
      "--disable-2d-canvas-clip-aa",
      "--disable-gl-drawing-for-tests",
    ],
  });

  timer.start();

  for (const [index, each] of list.entries()) {
    const url = `${each}/pages/contact-us`;

    if (index > list.entries()) {
      console.log("Finished!");
      await page.close();
      return;
    }

    if (!each || each === "" || each.includes("|||")) {
      continue;
    }

    emailsSent += 1;

    console.log(`\n\n ${index + 1}. ${url}`);

    const page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());

    try {
      await page.goto(url);
    } catch (err) {
      await updateWebsite(list, false, index);
      await page.waitForTimeout(DELAY_BETWEEN_WEBSITES);
      await page.close();
      continue;
    }

    try {
      if (await isPasswordPage(page)) {
        await updateWebsite(list, false, index);
        await page.waitForTimeout(DELAY_BETWEEN_WEBSITES);
        await page.close();
        continue;
      }
    } catch (err) {}

    try {
      const $unavailable = await page.waitForSelector(
        `.shop-unavailable, 
        #shop-not-found, 
        body.status-code-500,
        [data-adblockkey] .sale_banner_orange[style]
        `,
        {
          visible: true,
          timeout: 500,
        },
      );

      /* Shop does not exist */
      if ($unavailable) {
        await updateWebsite(list, false, index);
        await page.waitForTimeout(DELAY_BETWEEN_WEBSITES);
        await page.close();
        continue;
      }
    } catch (err) {}

    console.log("Website exists.");

    continue;

    await page.waitForTimeout(750);
    await page.close();
  }

  process.on("exit", function () {
    timer.stop();

    console.log("Total time: ", timer.format());
  });
})();
