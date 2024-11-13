import { test, } from '@playwright/test';
const index = require("../utils/index.page")
const helper = require("../utils/helper")
require('dotenv').config();


test.describe('Customer Calendar Tests', () => {
let login;
let customerCalender;
test.beforeEach(async ({ page }) => {
     login= new index.Login(page)
     customerCalender = new index.CustomerCalender(page)
     const email=process.env.userEmail
     const password=process.env.password
    await login.login(email,password);
});

test('Current Date', async () => {
    const currentDate = helper.getCurrentDate();
    await customerCalender.selectDate(currentDate);
});

test('Navigate weeks with arrows', async () => {
    await customerCalender.navigateLeft();
    await customerCalender.navigateRight();
});

test('Select Today and verify selection', async () => {
    await customerCalender.selectTodayAndVerify();
});

test.only('Change dates and verify customers returned', async () => {
    const dates = helper.getWeekDates(); 
    for (const date of dates) {
        await customerCalender.selectDate(date);
    }
});

});