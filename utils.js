const fs = require("fs-extra");
const path = require("path");
const { resolve } = require("path");
const { Timer } = require("timer-node");
const userAgent = require("user-agents");
const copySync = require("fs-extra/lib/copy/copy-sync");
const Database = require("easy-json-database");

const csv = require("csv-parser");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const linkedinCSSSelectors = {
  searchForCompanyInput: `input[aria-controls*='job-search-bar'][aria-label*='Search']`,
  jobsButton: `a[href*='nav_menu_jobs']`,
  dateFilterButton: `button[aria-label*="Date posted"]`,
  dateFilterButtonRadioButtons: `[class*='filter-values'][aria-label*="Date posted"] > *`,
  dateFilterSubmitButton: `[aria-label*="Date posted"] + * .filter__submit-button`,
};

function getCompanyNamesFromCSVFile(csvFilePath = `./company_urls.csv`) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data.company);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

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

/* Generates URL to search for company with included filter.

The filter for past 24 hours has an ID. 

*/
async function createURLAsLocalStorage(page) {
  console.log("Creating local storage URLs.");
  return new Promise(async (resolve, reject) => {
    const response = await page.evaluate(
      (linkedinCSSSelectors = linkedinCSSSelectors) => {
        return new Promise(async (resolve, reject) => {
          const $id = document.querySelector(`[name="geoId"]`);

          if (!$id) {
            alert(`Error: no geoid found`);
          }

          const $filterPastWeek = document.querySelector(
            `[aria-label*="Date posted"] > [class*='filter-values']:nth-child(3)`,
          );
          const $filterPast24Hours = document.querySelector(
            `[aria-label*="Date posted"] > [class*='filter-values']:nth-child(4)`,
          );

          const id = $id.getAttribute(`value`);
          const past24HoursID = $filterPast24Hours
            .querySelector(`input`)
            .getAttribute("value");
          const pastWeekFilter = $filterPastWeek
            .querySelector(`input`)
            .getAttribute("value");

          const urlPast24Hours = `https://www.linkedin.com/jobs/search?keywords=replacecompanyhere&location=United%20States&geoId=${id}8&f_TPR=${past24HoursID}&position=1&pageNum=0`;
          const urlPastWeek = `https://www.linkedin.com/jobs/search?keywords=replacecompanyhere&location=United%20States&geoId=${id}8&f_TPR=${pastWeekFilter}&position=1&pageNum=0`;

          localStorage.setItem(`past_24_hours_url`, urlPast24Hours);
          localStorage.setItem(`past_week_url`, urlPastWeek);

          resolve({ urlPast24Hours, urlPastWeek });
        });
      },
      linkedinCSSSelectors,
    );

    resolve(response);
  });
}

function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function cleanCompanyName(list) {
  return new Promise(async (resolve, reject) => {});
}

async function goToJobsPage(page) {
  return new Promise(async (resolve, reject) => {
    await page.goto(`https://linkedin.com/`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    const response = await page.evaluate(
      (linkedinCSSSelectors = linkedinCSSSelectors) => {
        return new Promise(async (resolve, reject) => {
          const $job = document.querySelector(linkedinCSSSelectors.jobsButton);

          if (!$job) {
            alert("no job button found");
            throw new Error("no job button found");
          }

          $job.click();
          resolve();
        });
      },
      linkedinCSSSelectors,
    );

    resolve(response);
  });
}

async function setFilter(page) {
  console.log(`Setting filter..`);
  return new Promise(async (resolve, reject) => {
    const variables = { ...linkedinCSSSelectors };

    const response = await page.evaluate((variables = variables) => {
      return new Promise(async (resolve, reject) => {
        function getRandomInteger(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

        var found24Hours = false;
        var $el = document.querySelector(variables.dateFilterButton);

        if (!$el) {
          alert(`Error: unable to find date filter button`);
        }

        var $filters = document.querySelectorAll(
          variables.dateFilterButtonRadioButtons,
        );

        if (!$filters) {
          alert(`Error: unable to find date filter options.`);
        }

        $el.click();
        await sleep(getRandomInteger(200, 400));

        for (var each of $filters) {
          var text = each.textContent.toLowerCase().trim();
          var $found = each.querySelector(`input`);

          if (text.includes("24 hours")) {
            $found.checked = true;
            break;
          } else if (text.includes("past week")) {
            $found.checked = true;
          }
        }

        await sleep(getRandomInteger(1500, 2000));

        const $submit = document.querySelector(
          variables.dateFilterSubmitButton,
        );

        if (!$submit) {
          alert(`Error: submit button for the date filter not found.`);
          throw new Error(
            `Error: submit button for the date filter not found.`,
          );
        }

        $submit.click();

        resolve();
      });
    }, variables);

    resolve(response);
  });
}

async function searchForCompany(page, company) {
  console.log(`Searching for ${company}...`);
  return new Promise(async (resolve, reject) => {
    const variables = { ...linkedinCSSSelectors, company };

    const response = await page.evaluate((variables = variables) => {
      return new Promise(async (resolve, reject) => {
        // const $search = document.querySelector(variables.searchForCompanyInput);

        // if (!$search) {
        //   alert(`Error: no search input found.`);
        //   throw new Error(`Error: no search input found.`);
        // }

        // $search.value = variables.company;
        // const $form = $search.closest(`form`);

        // if (!$form) {
        //   alert(`Error: no form found.`);
        //   throw new Error(`Error: no form found.`);
        // }

        // $form.submit();
        resolve();
      });
    }, variables);

    resolve(response);
  });
}

async function resetPageIfSearchIsBlocked() {}

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

function extractResultsFromCompanyPage(page, company) {
  console.log(`Searching past 24h...`);

  return new Promise(async (resolve, reject) => {
    const variables = { ...linkedinCSSSelectors, company };

    const response = await page.evaluate((variables = variables) => {
      return new Promise(async (resolve, reject) => {
        const $404 = document.querySelector(
          `[class*='no-results'][class*='title']`,
        );

        if ($404) {
          resolve(null);
          return;
        }

        window.results = [];
        const $jobs = document.querySelectorAll(
          `.jobs-search__results-list > li`,
        );

        for (var each of $jobs) {
          const $title = each.querySelector(`.base-search-card__title`);
          const $location = each.querySelector(`.job-search-card__location`);
          const $date = each.querySelector(
            `[class*='job-search-card__listdate']`,
          );

          const title = $title.textContent.trim();
          const location = $location.textContent.trim();
          const date = $date.textContent.trim();

          window.results.push({
            title,
            location,
            date,
            company: variables.company,
          });
        }

        resolve(window.results);
      });
    }, variables);

    resolve(response);
  });
}

module.exports = {
  replaceAll: replaceAll,
  searchForCompany: searchForCompany,
  capitalize: capitalize,
  saveToDatabase: saveToDatabase,
  geminiQuestion: geminiQuestion,
  getCompanyNamesFromCSVFile: getCompanyNamesFromCSVFile,
  goToJobsPage: goToJobsPage,
  setFilter: setFilter,
  createURLAsLocalStorage: createURLAsLocalStorage,
  sleep: sleep,
  extractResultsFromCompanyPage: extractResultsFromCompanyPage,
};
