const fs = require("fs-extra");
const path = require("path");
const { resolve } = require("path");
const { Timer } = require("timer-node");
const userAgent = require("user-agents");
const copySync = require("fs-extra/lib/copy/copy-sync");
const Database = require("easy-json-database");

const { GoogleGenerativeAI } = require("@google/generative-ai");

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

/*

For the CSS selectors:

jobs = parent of the div containing all jobs. Example: #jobs
jobsItem = each individual job. The parent must be re-declared here. Example: #jobs .job-item
jobsTitle = each individual title without the parent. It  will be used in a loop. Example: .job-title
*/
async function getWebsites() {
  return new Promise(async (resolve, reject) => {
    const websites = [
      {
        website: `https://dawsonohana.hrmdirect.com/employment/job-openings.php?search=true&dept=-1&city=-1&state=-1&cust_sort1=199216`,
        CSS: {
          jobs: `.reqResultTable`,
          jobsItem: `.reqResultTable tr`,
          jobsTitle: `a`,
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

      // ``,
    ];

    resolve(websites);
  });
}

/* Scrapes all jobs from a given website. 

returns the following array of objects:

[
  {
    title: "" // string, job title
    url: "" // string, job url
  }
]
*/
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

        function getCurrentDateTime() {
          const now = new Date();

          const month = (now.getMonth() + 1).toString().padStart(2, "0");
          const day = now.getDate().toString().padStart(2, "0");
          const year = now.getFullYear();

          let hours = now.getHours();
          const amPM = hours >= 12 ? "PM" : "AM";
          hours = hours % 12;
          hours = hours ? hours : 12; // 12-hour clock format
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const seconds = now.getSeconds().toString().padStart(2, "0");

          return `${month}-${day}-${year}, ${hours}:${minutes}:${seconds} ${amPM}`;
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
            debugger;
            var $items = $found.querySelectorAll(CSSSelectors.jobsItem);

            for (var each of $items) {
              var $title = each.querySelector(CSSSelectors.jobsTitle);

              if (!$title) {
                throw new Error(`No title found`);
              }
              var $url = each.querySelector(`a[href]`);

              if (!$url) {
                throw new Error(`No title found`);
              }

              var title = $title.textContent;
              var url = $url.href;
              var extractionDate = getCurrentDateTime();

              found.push({
                title,
                url,
                extractionDate,
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
          console.error(err);
          alert("error (check console)");
          resolve(false);
        }
      });
    }, CSSSelectors);

    resolve(response);
  });
}

async function saveToDatabase(data = null) {
  return new Promise(async (resolve, reject) => {
    if (data === null || data.length <= 0) {
      throw new Error(`No data passed to the function saveToDatabase`);
    }

    console.log(`Processing ${data.length} jobs...`);

    const db = new Database("./db.json", {
      snapshots: {
        enabled: true,
        interval: 24 * 60 * 60 * 1000,
        folder: "./backups/",
      },
    });

    const database = db.get("jobs");

    const filtered = data.filter(
      (obj) => !database.some((dbObj) => dbObj.url === obj.url),
    );

    console.log(`Saving ${filtered.length} job(s) to database.`);

    const update = [...database, ...filtered];

    db.set("jobs", update);
    resolve(update);
  });
}

function capitalize(str) {
  return str
    .toLowerCase()
    .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
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

module.exports = {
  replaceAll: replaceAll,
  getWebsites: getWebsites,
  capitalize: capitalize,
  saveToDatabase: saveToDatabase,
  geminiQuestion: geminiQuestion,
  getJobs: getJobs,
};
