const { test, expect, beforeEach } = require("@playwright/test");
const index = require("../utils/index.page"); // Import the whole index object
const data = require("../data/data.json");
require("dotenv").config();

let schedulePage;
let loginPage;

beforeEach(async ({ page }) => {
  schedulePage = new index.SchedulePage(page);
  loginPage = new index.LoginPage(page);

  await page.goto(process.env.lightHouseURL);
  await loginPage.loginFunction(data.userName, data.password);
});
test("C56916: a:Launch Schedule page and check the functionality", async ({
  page,
}) => {
  await schedulePage.scheduleModule.waitFor({ state: "visible" }); // Wait until visible
  await schedulePage.scheduleModule.click();
  await schedulePage.launchschedulePage();
  await schedulePage.checkHighlightedDate();
  await schedulePage.goToPreviousWeek();
  await schedulePage.clickToday();
  await schedulePage.goToNextWeek();

  // Verify that the "Team Schedule" button is checked by default 
  await expect(schedulePage.teamScheduleButton).toHaveClass(/mat-button-toggle-checked/); 

  // Verify that the "My Schedule" button is NOT checked by default 
  await expect(schedulePage.myScheduleButton).not.toHaveClass(/mat-button-toggle-checked/);

  await schedulePage.openFilter();
  await schedulePage.checkDefaultSort();
  await schedulePage.checkAllFilterOptions();
  // await schedulePage.launchschedulePage();
  await schedulePage.filter.click();
  // await schedulePage.openFilter();

  await schedulePage.clearFilter();


 
  await page.pause();
});


