import { test } from '@playwright/test';
const index = require("../utils/index.page");
require('dotenv').config();
const {  getWeekDates } = require("../utils/helper");

test.describe('Combined Customer Calendar Test', () => {
    let login;
    let customerCalender;
    let agenda;

    test('Run all steps in sequence', async ({ page }) => {
        login = new index.Login(page);
        customerCalender = new index.CustomerCalender(page);
        agenda = new index.Agenda(page);

        const email = process.env.userEmail;
        const password = process.env.password;
        await login.login(email, password);

        await customerCalender.navigateLeft();
        await customerCalender.navigateRight();


        await customerCalender.selectTodayAndVerify();

        const dates = getWeekDates();
        for (const date of dates) {
            await customerCalender.selectDate(date);
        }
        
        await agenda.clickAgenda();

    });
});
