const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
const { Timer } = require("timer-node");

const DELAY_BETWEEN_WEBSITES = 50;

const { getWebsites, getJobs } = require("./utils");

const timer = new Timer({ label: "timer" });

/* Counters */
let emailSuccess = 0;
let emailTotal = 0;

(async () => {
  const list = await getWebsites();

  puppeteer.use(StealthPlugin());

  const userAgent = new UserAgent({
    platform: "MacIntel",
    deviceCategory: "desktop",
  });
  const userAgentStr = userAgent.toString();
  console.log(`User Agent: ${userAgentStr}`);

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

  timer.start();

  for (const [index, each] of list.entries()) {
    console.log(`\n\n ${index + 1}. ${each.website}`);

    const page = await browser.newPage();
    const agent = userAgent.toString();
    await page.setUserAgent(agent);

    console.log("agent", agent);

    await page.goto(each.website);
    const websites = await getJobs(page, each.CSS);

    console.log("result", websites);
    await page.close();
  }

  process.on("exit", function () {
    // timer.stop();
    // console.log("Total time: ", timer.format());
    // console.log(`${emailsSent} / ${emailTotal} emails`);
  });
})();
