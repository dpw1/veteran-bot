const fs = require("fs-extra");
const { getTheme } = require("./getTheme");
const path = require("path");
const { resolve } = require("path");
const { Timer } = require("timer-node");
const userAgent = require("user-agents");
const copySync = require("fs-extra/lib/copy/copy-sync");

const { GoogleGenerativeAI } = require("@google/generative-ai");

/* Local paths */
const textFolder = path.resolve(`D:/EZFY/2022_cold_email/project/text`);
const websitesPath = `${textFolder}\\websites_test.txt`;
const LOCAL_STORAGE_EMAIL_FOUND = `ezfy-found-email`;

const formSelector = `form:not([action*='subscribe']):not([action*='/search']):not([id*='wsl-form']):not([action^='/localization']):not([action*='improvedcontactform']):not([id*='subscribe-form']):not([action*='account/login']):not([action*='account/']):not([action*='/cart']):not([class*='newsletter']):not([action*='footer_form']):not([onsubmit*='customer']):not([id*='customer']):not([id*='add-item-form']):not([class*='jdgm-form']):not([action*='plugins/like']):not([action*='newsletter'])`;

const CSSSelectors = {
  name: `
  ${formSelector} input[placeholder*='Name'], 
  ${formSelector} input[placeholder*='name'], 
  ${formSelector} input[placeholder*='NAME'],
  ${formSelector} input[name*='name'],
  ${formSelector} input[name*='Name']
  `,

  email: `
  ${formSelector} input[placeholder*='Email'], 
  ${formSelector} input[placeholder*='email'], 
  ${formSelector} input[placeholder*='EMAIL'], 
  ${formSelector} input[placeholder*='mail'], 
  ${formSelector} input[placeholder*='MAIL'], 
  ${formSelector} input[placeholder*='Mail'], 
  ${formSelector} input[name*='email'],
  ${formSelector} input[name*="mail"]
  `,

  message: `
  ${formSelector} textarea[name*='message']:not([class*='recaptcha']), 
  ${formSelector} textarea[name*='body']:not([class*='recaptcha']), 
  ${formSelector} textarea[placeholder*='message']:not([class*='recaptcha']),
  ${formSelector} textarea[placeholder*='Message']:not([class*='recaptcha']),
  ${formSelector} textarea[placeholder*='MESSAGE']:not([class*='recaptcha']),
  ${formSelector} textarea[placeholder*='Comment']:not([class*='recaptcha']),
  ${formSelector} textarea[placeholder*='comment']:not([class*='recaptcha']),
  ${formSelector} textarea[placeholder*='COMMENT']:not([class*='recaptcha']),
  ${formSelector} textarea[name*='Comment']:not([class*='recaptcha']),
  ${formSelector} textarea[name*='comment']:not([class*='recaptcha']),
  ${formSelector} textarea[name*='Message']:not([class*='recaptcha']),
  ${formSelector} textarea[name*='message']:not([class*='recaptcha']),
  ${formSelector} textarea[name*='MESSAGE']:not([class*='recaptcha']),
  ${formSelector} textarea[name*='interests'],
  ${formSelector} textarea[name*='body]']
  `,

  button: `
  ${formSelector} button[type='submit'],
  ${formSelector} input[type='submit']
  `,
};

const contact = {
  name: `Diego`,
  email: `contact@ezfycode.com`,
  phone: `+351931744850`,
};

async function geminiQuestion(
  prompt = "Write a story about a magic backpack.",
) {
  return new Promise(async (resolve, reject) => {
    const genAI = new GoogleGenerativeAI(
      `AIzaSyCXqDTt2o0A9dlg90CkYpS--stfVAV6VVo`,
    );

    const model = genAI.getGenerativeModel({ model: "gemini" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    resolve(text);
  });
}

async function getTotalEmailsSent(_websites) {
  return new Promise(async (resolve, reject) => {
    const websites = _websites ? _websites : await getWebsites();
    const total = websites.filter((e) => e.includes(`|||success`)).length;

    resolve(total);
  });
}

/*

For the CSS selectors:

jobs = parent of the div containing all jobs
jobsItem = each individual job. The parent must be re-declared here
jobsTitle = each individual title without the parent since it will be used in a loop.
*/
async function getWebsites() {
  return new Promise(async (resolve, reject) => {
    const websites = [
      {
        website: `https://sempervalens.isolvedhire.com/jobs/`,
        CSS: {
          jobs: `#job_results`,
          jobsItem: `#job_results > *`,
          jobsTitle: `.job-name`,
          pagination: ``,
          paginationNextButton: ``,
        },
      },
      {
        website: `https://careers.bwfed.com/jobs`,
        CSS: {
          jobs: `.job-results-container > * > *`,
          jobsItem: `.job-results-container > * > * mat-expansion-panel-header > span:nth-child(1)`,
          jobsTitle: `[itemprop="title"]`,
          pagination: ``,
          paginationNextButton: `button.mat-paginator-navigation-next:not([disabled])`,
        },
      },

      // `https://careers.bwfed.com/jobs`,
      // `https://dawsonohana.hrmdirect.com/employment/job-openings.php?search=true&dept=-1&city=-1&state=-1&cust_sort1=199216`,
    ];

    resolve(websites);
  });
}

async function getJobs(page, CSSSelectors) {
  return new Promise(async (resolve, reject) => {
    const response = await page.evaluate((CSSSelectors) => {
      return new Promise(async (resolve, reject) => {
        /* Helper functions */

        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
        function waitForElement(selector, delay = 50, tries = 100) {
          const element = document.querySelector(selector);

          if (!window[`__${selector}`]) {
            window[`__${selector}`] = 0;
            window[`__${selector}__delay`] = delay;
            window[`__${selector}__tries`] = tries;
          }

          function _search() {
            return new Promise((resolve) => {
              window[`__${selector}`]++;
              setTimeout(resolve, window[`__${selector}__delay`]);
            });
          }

          if (element === null) {
            if (window[`__${selector}`] >= window[`__${selector}__tries`]) {
              window[`__${selector}`] = 0;
              return Promise.resolve(null);
            }

            return _search().then(() => waitForElement(selector));
          } else {
            return Promise.resolve(element);
          }
        }

        /* Code starts here 
        ======================= */

        try {
          let found = [];
          let pages = 1;

          const $found = await waitForElement(CSSSelectors.jobs);

          if (!$found) {
            alert(
              "error - no jobs selector found. Maybe this site was updated",
            );
          }

          for (var i = 0; i <= pages; i++) {
            var $items = $found.querySelectorAll(CSSSelectors.jobsItem);

            for (var each of $items) {
              var $title = each.querySelector(CSSSelectors.jobsTitle);
              var $url = each.querySelector(`a[href]`);

              var title = $title.textContent;
              var url = $url.getAttribute("href");

              found.push({
                title,
                url,
              });
            }
            debugger;
            var $nextPage =
              CSSSelectors.paginationNextButton &&
              CSSSelectors.paginationNextButton.length >= 1 &&
              document.querySelector(CSSSelectors.paginationNextButton);

            if ($nextPage) {
              $nextPage.click();
              await sleep(2500);
              pages += 1;
            } else {
              resolve(found);
              return;
            }
          }

          resolve(found);
        } catch (err) {
          resolve(false);
        }
      });
    }, CSSSelectors);

    resolve(response);
  });
}

async function generateMessage(page) {
  return new Promise(async (resolve, reject) => {
    const name = await getSiteName(page);

    console.log("website name: ", name);

    const theme = await getTheme(page);
    let rawMessage;
    if (theme.name !== "unknown") {
      rawMessage = await fs.readFile(
        `${textFolder}\\default_detected_theme.txt`,
        `UTF-8`,
      );
    } else {
      rawMessage = await fs.readFile(`${textFolder}\\default.txt`, `UTF-8`);
    }

    const _message = rawMessage
      .replace(`{name}`, name)
      .replace(`{theme}`, theme.name);
    const message = replaceAll(_message, { "\n": "" }).replace(
      `{weekday}`,
      getCurrentDayOfWeek(),
    );

    console.log(theme.name);

    resolve(message);
  });
}

async function getSiteName(page) {
  return new Promise(async (resolve, reject) => {
    const websiteName = await page.evaluate(() => {
      return new Promise((resolve, reject) => {
        let __name = "";
        let _name = "";
        let name = null;
        const $site = document.querySelector(`[property="og:site_name"]`);

        if ($site) {
          const _site = $site.getAttribute(`content`);
          name = _site.split(".")[0].trim();

          resolve(name);
          return;
        }

        const $logo = document.querySelector(
          `[class*='logo'] img[alt], 
          [id*='logo'] img[alt]`,
        );

        if ($logo) {
          _name = $logo.getAttribute(`alt`);
        }

        const $title = document.querySelector(`head > title`);

        if ($title) {
          _name = $title.textContent.trim();
        }

        /* Clean website name */
        // let aux;
        // if (_name.includes("-")) {
        //   aux = _name.split("-");
        //   name = aux[aux.length - 1];
        // } else if (_name.includes("—")) {
        //   aux = _name.split("—");
        //   name = aux[aux.length - 1];
        // } else if (_name.includes("–")) {
        //   aux = _name.split("–");
        //   name = aux[aux.length - 1];
        // } else if (_name.includes("|")) {
        //   aux = _name.split("|");
        //   name = aux[aux.length - 1];
        // } else if (_name.includes("•")) {
        //   aux = _name.split("•");
        //   name = aux[aux.length - 1];
        // } else {
        //   name = _name;
        // }

        /* Remove "contact us" and all characters except letters/numbers */
        const regex = /[^a-z0-9\s]+|contact\s*us?/gi;

        name = _name.replace(regex, "").trim();

        resolve(name.trim());
      });
    });

    resolve(capitalize(websiteName));
  });
}

async function getContactPageHref(page) {
  return new Promise(async (resolve, reject) => {
    const response = await page.evaluate(() => {
      return new Promise((resolve, reject) => {
        const $contact = document.querySelector(
          `a[href*='contact'][href*='pages/'],
          a[href*='talk-to'][href*='pages/'],
          a[href*='inquiries'][href*='pages/']
          `,
        );

        if (!$contact) {
          resolve(null);
        }

        const contact = $contact.getAttribute(`href`);
        const url = `${window.location.origin}/${contact}`;

        resolve(url);
      });
    });

    resolve(response);
  });
}

async function navigateToContactPage(page, _url) {
  return new Promise(async (resolve, reject) => {
    try {
      await getPageEmail(page);
      const href = await getContactPageHref(page);
      let isContactable;

      isContactable = await isPageContactable(page);

      if (isContactable) {
        resolve(true);
        return;
      }

      if (href) {
        await page.goto(href);

        isContactable = await isPageContactable(page);

        if (isContactable) {
          resolve(true);
        } else {
          resolve(false);
        }

        return;
      }
      /* All pages come with "contact-us", so we'll be removing it here */
      const url = _url.replace(`pages/contact-us`, "");

      /* All URLs that can have contact forms.
    Ignoring 'contact-us' because it's the first one to try */
      const urls = [
        `${url}/pages/contact`,
        `${url}/pages/contactus`,
        `${url}/pages/contacts`,
        `${url}/pages/contacto`,
        `${url}/pages/contato`,
        `${url}/pages/about`,
        `${url}/pages/about-us`,
        `${url}/pages/contacting-us`,
      ];

      isContactable = await isPageContactable(page);

      if (isContactable) {
        console.log("Contact form found");
        resolve(true);
        return;
      }

      for (const each of urls) {
        await page.setUserAgent(userAgent.toString());
        await page.goto(each);

        await getPageEmail(page);

        isContactable = await isPageContactable(page);

        if (isContactable) {
          console.log("Contact form found");
          resolve(true);
          break;
        } else {
          await getPageEmail(page);
        }

        await page.waitForTimeout(200);
      }

      resolve(false);
    } catch (err) {
      resolve(false);
    }
  });
}

/* Pages contain an "email" and "Message" field */
async function isPageContactable(page) {
  return new Promise(async (resolve, reject) => {
    const response = await page.evaluate((CSSSelectors) => {
      return new Promise((resolve, reject) => {
        try {
          var $email = document.querySelector(CSSSelectors.email);

          var $message = document.querySelector(CSSSelectors.message);

          if ($email && $message) {
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (err) {
          resolve(false);
        }
      });
    }, CSSSelectors);

    resolve(response);
  });
}

/* Returns @ email if page has it */
async function getPageEmail(page) {
  return new Promise(async (resolve, reject) => {
    const response = await page.evaluate(
      (LOCAL_STORAGE_EMAIL_FOUND = LOCAL_STORAGE_EMAIL_FOUND) => {
        return new Promise((res) => {
          try {
            const found = localStorage.getItem(LOCAL_STORAGE_EMAIL_FOUND);

            if (found && found.length >= 2) {
              res(JSON.parse(found));
              return;
            }

            const extractEmails = (text) => {
              let emails = [];
              const emailsTemp = text.match(
                /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi,
              );

              emailsTemp.map((e) => {
                e.match(/(.jpg|.jpeg|.png|.gif|.mov|.mp4|.mp3|.avi|.wmv)$/gim)
                  ? null
                  : emails.push(e);
              });

              return !!emails ? [...new Set(emails)] : false;
            };

            const result = extractEmails(document.body.innerHTML);

            if (result.length >= 1) {
              localStorage.setItem(
                LOCAL_STORAGE_EMAIL_FOUND,
                JSON.stringify(result),
              );
              res(result);
              return;
            } else {
              res(null);
              return;
            }
          } catch (err) {
            res(null);
            console.log("Error!!! ", err);
          }
        });
      },
      LOCAL_STORAGE_EMAIL_FOUND,
    );

    resolve(response);
  });
}

function getCurrentDayOfWeek() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const dayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  return daysOfWeek[dayIndex];
}

async function saveToEmailDatabase(page) {
  return new Promise(async (resolve, reject) => {
    const email = await getPageEmail(page);

    if (!email || email.length <= 0) {
      resolve(null);
      return;
    }
    const name = await getSiteName(page);
    const theme = await getTheme(page);
    let rawMessage;

    if (theme.name !== "unknown") {
      rawMessage = await fs.readFile(
        `${textFolder}\\default_detected_theme.txt`,
        `UTF-8`,
      );
    } else {
      rawMessage = await fs.readFile(`${textFolder}\\default.txt`, `UTF-8`);
    }

    const _message = rawMessage
      .replace(`{name}`, name)
      .replace(`{theme}`, theme.name);
    const message = replaceAll(_message, { "\n": "" }).replace(
      `{weekday}`,
      getCurrentDayOfWeek(),
    );

    const Database = require("easy-json-database");
    const db = new Database("./send_later.json");

    const user = {
      email,
      message,
    };

    const previous = db.get("users");
    const update = [...previous, user];

    // Set data
    db.set("users", update);

    resolve(true);
  });
}

async function excludeFakeForms(page) {
  return new Promise(async (resolve, reject) => {
    const response = await page.evaluate((formSelector) => {
      return new Promise((resolve, reject) => {
        try {
          const $forms = document.querySelectorAll(formSelector);

          if ($forms.length <= 1) {
            resolve(true);
            return;
          }

          for (var [i, each] of $forms.entries()) {
            const $input = each.querySelector(
              `input[type='hidden'][value='contact']`,
            );

            if (!$input) {
              each.remove();
            }

            if (i >= $forms.length - 1) {
              resolve(true);
            }
          }
        } catch (err) {
          resolve(false);
        }
      });
    }, formSelector);

    resolve(response);
  });
}

function capitalize(str) {
  return str
    .toLowerCase()
    .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
}

async function removeCaptchaScript(page) {
  return new Promise(async (resolve, reject) => {
    const response = await page.evaluate((selector) => {
      return new Promise(async (resolve, reject) => {
        const $form = document.querySelector(selector);

        if (!$form) {
          $form.setAttribute("onsubmit", "");
        }

        /* ==== */

        const $tokens = document.querySelectorAll(
          `input[id*='captcha'], [src*='captcha']`,
        );

        for (var each of $tokens) {
          each.remove();
        }

        /* ===== */

        const $forms = document.querySelectorAll(`[onsubmit*='captcha']`);

        for (var each of $forms) {
          $form.setAttribute("onsubmit", "");
        }

        /* ======= */

        if (window.hasOwnProperty(`recaptcha`)) {
          delete window.recaptcha;
        }
        if (window.hasOwnProperty(`grecaptcha`)) {
          delete window.grecaptcha;
        }
        if (window.hasOwnProperty(`__recaptcha_api`)) {
          delete window.__recaptcha_api;
        }
        if (window.hasOwnProperty(`___grecaptcha_cfg`)) {
          delete window.___grecaptcha_cfg;
        }
        if (window.hasOwnProperty(`__google_recaptcha_client`)) {
          delete window.__google_recaptcha_client;
        }
        if (window.hasOwnProperty(`storefrontContactFormsRecaptchaCallback`)) {
          delete window.storefrontContactFormsRecaptchaCallback;
        }

        localStorage.clear();

        setTimeout(() => {
          (function () {
            var cookies = document.cookie.split("; ");
            for (var c = 0; c < cookies.length; c++) {
              var d = window.location.hostname.split(".");
              while (d.length > 0) {
                var cookieBase =
                  encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
                  "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
                  d.join(".") +
                  " ;path=";
                var p = location.pathname.split("/");
                document.cookie = cookieBase + "/";
                while (p.length > 0) {
                  document.cookie = cookieBase + p.join("/");
                  p.pop();
                }
                d.shift();
              }
            }
          })();
        }, 500);

        debugger;

        try {
          function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
          }

          const $scripts = window.document.querySelectorAll(
            `head > script:not([src]), script[src*='captcha']`,
          );

          if (!$scripts || $scripts.length <= 0) {
            resolve(false);
            return;
          }

          let removed = false;

          for (let [i, each] of $scripts.entries()) {
            const src = each.getAttribute("src")
              ? each.getAttribute("src")
              : "null";
            const content = each.innerHTML;

            console.log("src", src);

            if (/captcha/gim.test(content)) {
              each.remove();

              if (
                window.hasOwnProperty("Shopify") &&
                window.Shopify.hasOwnProperty("recaptchaV3")
              ) {
                delete window.Shopify.recaptchaV3;
              }

              removed = true;

              continue;
            }

            if (i >= $scripts.length - 1) {
              resolve(removed);
            }
          }
        } catch (err) {
          resolve(removed);
        }
      });
    }, formSelector);

    console.log(`Captcha removed: ${response ? "true" : "false"}`);
    resolve(response);
  });
}

async function fillContactFormFields(page) {
  const TYPING_KEYBOARD_DELAY = 56;
  const TYPING_DELAY = 350;

  return new Promise(async (resolve, reject) => {
    const url = page.url();
    const message = await generateMessage(page);

    await page.evaluate(
      (message, contact) => {
        function copyToClipboard(text) {
          if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return clipboardData.setData("Text", text);
          } else if (
            document.queryCommandSupported &&
            document.queryCommandSupported("copy")
          ) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
              return document.execCommand("copy"); // Security exception may be thrown by some browsers.
            } catch (ex) {
              console.warn("Copy to clipboard failed.", ex);
              return false;
            } finally {
              document.body.removeChild(textarea);
            }
          }
        }

        const html = `<div style="position:fixed;bottom:0;left:0;width:150px;height:150px;z-index:99999999999999999999;">
        <button id="cName">Name</button>
        <button id="cEmail">Email</button>
        <button id="cMessage">message</button>
        </div>`;

        const $body = document.querySelector(`body`);
        $body.insertAdjacentHTML("beforeend", html);

        const $cName = document.querySelector(`#cName`);
        const $cEmail = document.querySelector(`#cEmail`);
        const $cMessage = document.querySelector(`#cMessage`);

        $cName.addEventListener("click", function () {
          copyToClipboard(contact.name);
        });
        $cEmail.addEventListener("click", function () {
          copyToClipboard(contact.email);
        });
        $cMessage.addEventListener("click", function () {
          copyToClipboard(message);
        });

        console.log(message, contact);
        debugger;
      },

      message,
      contact,
    );

    console.log("Please send email.");

    await page.waitForNavigation({ timeout: 999999 });

    try {
      const $captcha = await page.waitForSelector(
        `.shopify-challenge__container`,
        {
          visible: true,
          timeout: 400,
        },
      );

      if (!$captcha) {
        resolve(true);
      }

      if ($captcha) {
        console.log("Captcha - Please solve the captcha.");
        const $iframe = await page.waitForSelector(
          `iframe[src*='captcha'][title]`,
          1000,
        );

        // await isSolved;
        await page.waitForNavigation();

        const hasFailed = await page.evaluate(() => {
          return new Promise(async (resolve, reject) => {
            try {
              const failed = /(account\/register)|(account\/login)/gim.test(
                window.location.href,
              );

              resolve(failed);
            } catch (err) {
              resolve(true);
            }
          });
        });

        if (hasFailed) {
          console.log("Something went wrong. Please send it manually: \n\n");
          resolve(false);
          return;
        }

        resolve(true);
        return;
      }
    } catch (err) {
      console.error("Error!", err);
    } finally {
      const wasEmailSent = await page.evaluate(() => {
        return /contact_posted=true/.test(window.location.href);
      });

      resolve(wasEmailSent);
    }

    resolve(true);
  });
}

function replaceAll(word, obj) {
  let finalString = "";
  for (let each of word) {
    for (const o in obj) {
      const value = obj[o];
      if (each == o) {
        each = value;
      }
    }
    finalString += each;
  }

  return finalString;
}

async function updateWebsite(websites, isSuccess = false, index = 0) {
  return new Promise(async (resolve, reject) => {
    if (index >= websites.length) {
      throw new Error("Index larger than array");
    }

    websites[index] = isSuccess
      ? `|||success_${websites[index]}`
      : `|||notsent_${websites[index]}`;

    const websitesFormatted = websites.join("\n");

    await fs.writeFile(websitesPath, websitesFormatted, "UTF-8");

    resolve();
  });
}

module.exports = {
  isPageContactable: isPageContactable,
  navigateToContactPage: navigateToContactPage,
  generateMessage: generateMessage,
  fillContactFormFields: fillContactFormFields,
  getSiteName: getSiteName,
  replaceAll: replaceAll,
  getWebsites: getWebsites,
  updateWebsite: updateWebsite,
  getTotalEmailsSent: getTotalEmailsSent,
  capitalize: capitalize,
  saveToEmailDatabase: saveToEmailDatabase,
  removeCaptchaScript: removeCaptchaScript,
  geminiQuestion: geminiQuestion,
  getJobs: getJobs,
};
