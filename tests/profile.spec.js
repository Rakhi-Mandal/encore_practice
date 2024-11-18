const { test } = require('@playwright/test');
const indexPage = require('../utils/index.page');
require('dotenv').config();

let loginPage, profilePage;
test.beforeEach(async ({ page }) => {
     loginPage = new indexPage.Login(page);
     profilePage = new indexPage.Profile(page);
     await loginPage.login(process.env.userEmail, process.env.password);
});
test("TC_C000001: Verify Profile Elements", async () => {
     await profilePage.profileDeafultSelected();
})
