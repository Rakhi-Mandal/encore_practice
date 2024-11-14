const { expect } = require('@playwright/test');
const data = require("../data/data.json");
require('dotenv').config();
const {getCurrentDate,getCurrentMonth, createRegExp} = require("../utils/helper")


exports.CustomerCalender = class CustomerCalender {
    constructor(page) {
        this.page = page;
        this.dateElements = page.locator("//div[contains(@class,'e2e_date_selector_option')]");
        this.previousWeekButton = page.locator('.e2e_date_selector_previous_week');
        this.nextWeekButton = page.locator('.e2e_date_selector_next_week');
        this.currentMonthDisplay = page.locator("//div[contains(@class, 'e2e_date_selector_month')]");
        this.todayButton = page.locator(`div[title="${getCurrentDate()}"]`); 
        this.getDateElement = (date) => this.dateElements.locator(`text=${date}`);
        this.getSelectedDateElement = (currentDate) => this.dateElements.locator(`text=${currentDate}`);

    }

    async selectDate(date) {
        const dateElement = this.getDateElement(date);
        const visibilityTimeout = Number(process.env.bigTimeout);
        await expect(dateElement).toBeVisible({ timeout: visibilityTimeout });
        await dateElement.click();
    }

    async navigateLeft() {
        await this.previousWeekButton.click();
    }

    async navigateRight() {
        await this.nextWeekButton.click();
    }

    async selectTodayAndVerify() {
        const currentDate = getCurrentDate();

        const todayDateElement = this.getDateElement(currentDate);

        await todayDateElement.click();

        await expect(todayDateElement.locator('..')).toHaveClass(createRegExp(data.expectedClasses.selectedDateClass.replace(/\s+/g, '\\b.*\\b')));

        await expect(this.currentMonthDisplay).toContainText(getCurrentMonth());
    }
}
