const fs = require("fs-extra");
const Database = require("easy-json-database");
const ExcelJS = require("exceljs");

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
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function addPropertyToAllItems(arrayOfObjects, key, value) {
  if (arrayOfObjects.length === 0) {
    return arrayOfObjects;
  }

  arrayOfObjects.forEach((obj) => {
    obj[key] = value;
  });

  return arrayOfObjects;
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
  console.log(`${company} - Searching...`);

  return new Promise(async (resolve, reject) => {
    const variables = { ...linkedinCSSSelectors, company };

    const response = await page.evaluate((variables = variables) => {
      return new Promise(async (resolve, reject) => {
        const $404 = document.querySelector(
          `[class*='no-results'][class*='title']`,
        );

        if ($404) {
          resolve([]);
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
          const $link = each.querySelector(
            `.jobs-search__results-list > li a[class*='link'][class*='card']`,
          );

          const title = $title.textContent.trim();
          const location = $location.textContent.trim();
          const date = $date.textContent.trim();
          var link = $link.href;
          link = link.includes("?") ? link.split("?")[0] : link;

          window.results.push({
            title,
            location,
            date,
            link,
            company: variables.company,
          });
        }

        resolve(window.results);
      });
    }, variables);

    resolve(response);
  });
}

function getRandomInt(range) {
  if (
    !Array.isArray(range) ||
    range.length !== 2 ||
    typeof range[0] !== "number" ||
    typeof range[1] !== "number"
  ) {
    throw new Error("Invalid input. Please provide an array of two numbers.");
  }

  const [num1, num2] = range;

  if (num1 > num2) {
    [num1, num2] = [num2, num1];
  }

  const min = Math.ceil(num1);
  const max = Math.floor(num2);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Get AM or PM based on the current hour
  const AMorPM = now.getHours() >= 12 ? "PM" : "AM";

  return `${year}-${month}-${day}__at__${hours}-${minutes}-${seconds} ${AMorPM}`;
}

function exportAsExcelSheet(past24HoursData, pastWeekData) {
  return new Promise((resolve, reject) => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    console.log("data", past24HoursData);
    // Add the first worksheet (tab) for "Past 24 hours" if data is provided
    if (past24HoursData.length > 0) {
      const past24HoursWorksheet = workbook.addWorksheet("Past 24 hours");
      past24HoursWorksheet.columns = [
        { header: "Title", key: "title" },
        { header: "Company", key: "company" },
        { header: "Location", key: "location" },
        { header: "Date", key: "date" },
        { header: "Job link", key: "link" },
        { header: "URL", key: "url" },
      ];
      past24HoursData.forEach((row) => {
        past24HoursWorksheet.addRow(row);
      });
    }

    // Add the second worksheet (tab) for "Past week" if data is provided
    if (pastWeekData.length > 0) {
      const pastWeekWorksheet = workbook.addWorksheet("Past week");
      pastWeekWorksheet.columns = [
        { header: "Title", key: "title" },
        { header: "Company", key: "company" },
        { header: "Location", key: "location" },
        { header: "Date", key: "date" },
        { header: "Job link", key: "link" },
        { header: "URL", key: "url" },
      ];
      pastWeekData.forEach((row) => {
        pastWeekWorksheet.addRow(row);
      });
    }

    // Save the workbook as an XLSX file
    workbook.xlsx
      .writeFile(`./results/jobs__${getCurrentDateTime()}.xlsx`)
      .then(() => {
        console.log("XLSX file with two tabs created successfully!");
        resolve();
      })
      .catch((error) => {
        console.error("Error creating XLSX file:", error);
        reject(error);
      });
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
  createURLAsLocalStorage: createURLAsLocalStorage,
  sleep: sleep,
  getRandomInt: getRandomInt,
  extractResultsFromCompanyPage: extractResultsFromCompanyPage,
  exportAsExcelSheet: exportAsExcelSheet,
  addPropertyToAllItems: addPropertyToAllItems,
};
