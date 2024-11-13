import { test, } from '@playwright/test';
import { getCurrentDate, getWeekDates } from '../utils/dateAndMonth';
const index = require("../utils/index.page")
const data= require("../data/data.json");

test.describe('Customer Calendar Tests', () => {
let login;
let customerCalender;
test.beforeEach(async ({ page }) => {
     login= new index.Login(page)
     customerCalender = new index.CustomerCalender(page)
    await login.navigateToDashBoard(data.login.username,data.login.password);
});

test('Current Date', async () => {
    const currentDate = getCurrentDate();
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
    const dates = getWeekDates(); 
    for (const date of dates) {
        await customerCalender.selectDate(date);
    }
});

});