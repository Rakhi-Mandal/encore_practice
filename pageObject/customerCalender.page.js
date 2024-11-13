const { expect } = require('@playwright/test');
const data = require("../data/data.json");
require('dotenv').config();
const helper = require("../utils/helper")


exports.CustomerCalender = class CustomerCalender {
    constructor(page) {
        this.page = page;
        this.dateElements = page.locator("//div[contains(@class,'e2e_date_selector_option')]");
        this.previousWeekButton = page.locator('.e2e_date_selector_previous_week');
        this.nextWeekButton = page.locator('.e2e_date_selector_next_week');
        this.currentMonthDisplay = page.locator("//div[contains(@class, 'e2e_date_selector_month')]");
        this.todayButton = page.locator('div[title="Tuesday, November 12, 2024"]');
        this.getDateElement = (date) => this.dateElements.locator(`text=${date}`);
        this.getSelectedDateElement = () => this.dateElements.locator(`text=${helper.getCurrentDate()}`);
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
        await this.todayButton.click();
        
        const selectedDateElement = this.getSelectedDateElement();
        await expect(selectedDateElement).toBeVisible();
        await this.page.waitForTimeout(Number(process.env.bigTimeout));
        
        // Parent element of the date (.. is a special locator)
        const parentElement = selectedDateElement.locator('..');
        await expect(parentElement).toHaveClass(data.expectedClasses.selectedDateClass);

        const currentMonth = helper.getCurrentMonth();
        await expect(this.currentMonthDisplay).toContainText(currentMonth);
    }
}
