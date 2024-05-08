const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const userAgent = require("user-agents");
const { Timer } = require("timer-node");
const ProxyLists = require("proxy-lists");
const useProxy = require("puppeteer-page-proxy");
const proxy_check = require("proxy-check");

const DELAY_BETWEEN_WEBSITES = 50;

const {
  getSiteName,
  fillContactFormFields,
  navigateToContactPage,
  generateMessage,
  isPasswordPage,
  getWebsites,
  updateWebsite,
  getTotalEmailsSent,
} = require("./utils");

let emailTotal = 0;
let total = 0;

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function validateProxies(_proxies) {
  return new Promise(async (resolve, reject) => {
    let updated = [];
    let loop = 0;
    for (var [index, each] of _proxies.entries()) {
      proxy_check({
        host: each.ipAddress,
        port: each.port,
      })
        .then((r) => {
          console.log("Working!", loop);

          updated = [...updated, each];
        })
        .catch((e) => {})
        .finally((_) => {
          loop += 1;

          if (loop >= _proxies.length) {
            console.log("resolve", updated.length);
          }
        });
    }
  });
}

function getProxies(limit = 1000) {
  return new Promise(async (resolve, reject) => {
    let proxies = [];

    ProxyLists.getProxies({
      unique: true,
    }).on("data", async (_proxies) => {
      proxies = [...proxies, ..._proxies];
      console.log("Searching proxies...", proxies.length);

      if (proxies.length > limit) {
        resolve(shuffleArray(proxies));

        return;
      }
    });
  });
}

(async () => {
  const list = await getWebsites();

  const Database = require("easy-json-database");
  const db = new Database("./send_later.json");

  const user = {
    email: "x1",
    message: "asdja",
  };

  const previous = db.get("users");
  const update = [...previous, user];

  // Set data
  db.set("users", update);

  return;

  let emailsSent = await getTotalEmailsSent(list);

  console.log(`\n\nEmails sent: ${emailsSent}`);

  puppeteer.use(StealthPlugin());

  console.log("Getting proxies...");
  const _proxies = await getProxies();
  console.log("Validating proxies...");
  const proxies = await validateProxies(_proxies);
  console.log("DONE!!!!!!!!!!!!!", proxies.length);
  // const browser = await puppeteer.launch({ headless: false });

  for (var each of proxies) {
    // return;
    /*
    const ip = `http://${each.ipAddress}`;
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());

    console.log(ip);
    await useProxy(page, ip);
    await page.goto(`https://www.annachocola.com/pages/contact-anna-chocola`);
    await fillContactFormFields(page);
    await page.waitForTimeout(999999);
    */
  }
})();
