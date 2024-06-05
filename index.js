const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
const { Timer } = require("timer-node");

const DELAY_BETWEEN_24HOURS_AND_PAST_WEEK_FILTERS = [2000, 2300];
const DELAY_BETWEEN_STEPS = [100, 120];

const {
  saveToDatabase,
  getCompanyNamesFromCSVFile,
  goToJobsPage,

  createURLAsLocalStorage,
  extractResultsFromCompanyPage,
  sleep,
  getRandomInt,
  exportAsExcelSheet,
  addPropertyToAllItems,
  shuffleArray,
} = require("./utils");

const timer = new Timer({ label: "timer" });

/* Counters */
let emailSuccess = 0;
let emailTotal = 0;

(async () => {
  const _list = await getCompanyNamesFromCSVFile();
  const list = shuffleArray(_list);

  console.log(_list, list);

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

  let total24HoursResults = [];
  let totalPastWeekResults = [];

  for (const [index, each] of list.entries()) {
    let url = urls.urlPast24Hours.replace(
      `replacecompanyhere`,
      each.company.trim().replace(` `, `%20`),
    );

    var context = await browser.createIncognitoBrowserContext();
    const incognito1 = await context.newPage();
    await incognito1.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await sleep(getRandomInt(DELAY_BETWEEN_STEPS));

    var results24Hours = await extractResultsFromCompanyPage(
      incognito1,
      each.company,
    );

    results24Hours = addPropertyToAllItems(
      [...results24Hours],
      "url",
      each.URL,
    );

    await sleep(getRandomInt(DELAY_BETWEEN_STEPS));

    console.log(
      `${each.company} - extracted ${results24Hours.length} jobs for the past 24 hours.`,
    );

    await incognito1.close();
    await sleep(getRandomInt(DELAY_BETWEEN_24HOURS_AND_PAST_WEEK_FILTERS));

    var context = await browser.createIncognitoBrowserContext();
    const incognito2 = await context.newPage();

    url = urls.urlPastWeek.replace(
      `replacecompanyhere`,
      each.company.trim().replace(` `, `%20`),
    );
    await sleep(getRandomInt(DELAY_BETWEEN_STEPS));
    await incognito2.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await sleep(getRandomInt(DELAY_BETWEEN_STEPS));

    var resultsPastWeek = await extractResultsFromCompanyPage(
      incognito2,
      each.company,
    );

    resultsPastWeek = addPropertyToAllItems(
      [...resultsPastWeek].filter((e) => !e.date.includes("hour")),
      "url",
      each.URL,
    );

    await sleep(getRandomInt(DELAY_BETWEEN_STEPS));

    total24HoursResults.push(...results24Hours);
    totalPastWeekResults.push(...resultsPastWeek);

    await sleep(getRandomInt(DELAY_BETWEEN_24HOURS_AND_PAST_WEEK_FILTERS));
    await incognito2.close();
    await sleep(getRandomInt(DELAY_BETWEEN_24HOURS_AND_PAST_WEEK_FILTERS));

    if (index >= list.length - 1) {
      console.log("Completed!");
      await exportAsExcelSheet(total24HoursResults, totalPastWeekResults);
    }
  }

  process.on("exit", function () {
    console.log("Completed!");
    // timer.stop();
    // console.log("Total time: ", timer.format());
    // console.log(`${emailsSent} / ${emailTotal} emails`);
  });
})();
