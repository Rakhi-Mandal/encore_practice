const { test, beforeEach } = require("@playwright/test");
const index = require("../utils/index.page");
require("dotenv").config();

let schedulePage;
let loginPage;

beforeEach(async ({ page }) => {
  schedulePage = new index.SchedulePage(page);
  loginPage = new index.LoginPage(page);

  await page.goto(process.env.lightHouseURL);
  await loginPage.loginFunction(process.env.userEmail,process.env.userPassword
  );
});
test("C56916: a:Launch Schedule page and check the functionality", async ({}) => {
  await schedulePage.scheduleModule.waitFor({ state: "visible" });
  await schedulePage.scheduleModule.click();
  await schedulePage.launchschedulePage();
  await schedulePage.checkHighlightedDate();
  await schedulePage.goToPreviousWeek();
  await schedulePage.clickToday();
  await schedulePage.goToNextWeek();
  await schedulePage.verifyDefaultSelectedSchedule();
  await schedulePage.openFilter();
  await schedulePage.checkDefaultSort();
  await schedulePage.checkAllFilterOptions();
  await schedulePage.filter.click();
  await schedulePage.clearFilter();
});
