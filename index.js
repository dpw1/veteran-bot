const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
const { Timer } = require("timer-node");

const DELAY_BETWEEN_WEBSITES = 50;
global.SCRAPED_DATA = [];

const {
  saveToDatabase,
  getCompanyNamesFromCSVFile,
  goToJobsPage,
  searchForCompany,
  setFilter,
  createURLAsLocalStorage,
  extractResultsFromCompanyPage,
  sleep,
} = require("./utils");

const timer = new Timer({ label: "timer" });

/* Counters */
let emailSuccess = 0;
let emailTotal = 0;

(async () => {
  const list = await getCompanyNamesFromCSVFile();

  puppeteer.use(StealthPlugin());

  const userAgent = new UserAgent({
    deviceCategory: "desktop",
  });
  const userAgentStr = userAgent.toString();

  const anonymizeUserAgentPlugin =
    require("puppeteer-extra-plugin-anonymize-ua")({
      customFn: () => userAgentStr,
      stripHeadless: true,
      makeWindows: false,
    });
  puppeteer.use(anonymizeUserAgentPlugin);

  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    args: [
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

  let page = await browser.newPage();
  const agent = userAgent.toString();
  await page.setUserAgent(agent);

  await goToJobsPage(page);

  await page.waitForNavigation();

  const urls = await createURLAsLocalStorage(page);

  for (const [index, each] of list.entries()) {
    let url = urls.urlPast24Hours.replace(
      `replacecompanyhere`,
      each.trim().replace(` `, `%20`),
    );

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    const results24Hours = await extractResultsFromCompanyPage(page, each);

    console.log(results24Hours);

    if (results24Hours === null) {
      console.log("No results found during past 24 hours.");

      await page.close();

      const page2 = await browser.newPage();

      await goToJobsPage(page2);

      await page2.waitForNavigation();

      url = urls.urlPastWeek.replace(
        `replacecompanyhere`,
        each.trim().replace(` `, `%20`),
      );

      console.log("new page: ", url);

      await sleep(2000);

      await page2.goto(url, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });

      /* Todo 
      
      */
    } else {
      global.SCRAPED_DATA.push(...results24Hours);
    }
    console.log(global.SCRAPED_DATA);

    await page.close();
  }

  process.on("exit", function () {
    console.log("Completed!");
    // timer.stop();
    // console.log("Total time: ", timer.format());
    // console.log(`${emailsSent} / ${emailTotal} emails`);
  });
})();
