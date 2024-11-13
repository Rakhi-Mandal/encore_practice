const { test } = require('@playwright/test');
const indexPage = require('../utils/index.page');
require('dotenv').config();
let loginPage, flowsheetPage;
test.beforeEach(async ({ page }) => {
     loginPage = new indexPage.Login(page);
     flowsheetPage = new indexPage.FlowsheetSearch(page);
     await loginPage.navigateToDashBoard(process.env.lightHouse_username, process.env.lightHouse_password);
});
test("TC_C56882: Verify Flowsheet Search", async () => {
     await flowsheetPage.verifySearchFunctionality()
})
