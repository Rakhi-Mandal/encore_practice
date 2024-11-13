const { expect } = require('@playwright/test');
import { getCurrentDate, getCurrentMonth } from '../utils/dateAndMonth';
const data= require("../data/data.json");


exports.CustomerCalender = class CustomerCalender {
    constructor(page) {
        this.page = page;
        this.dateElements = page.locator("//div[contains(@class,'e2e_date_selector_option')]");
        this.previousWeekButton = page.locator('.e2e_date_selector_previous_week');
        this.nextWeekButton = page.locator('.e2e_date_selector_next_week');
        this.currentMonthDisplay = page.locator("//div[contains(@class, 'e2e_date_selector_month')]");
        this.todayButton = page.locator('div[title="Tuesday, November 12, 2024"]');
    }

    async selectDate(date) {
        const dateElement = this.dateElements.locator(`text=${date}`);
        const visibilityTimeout = data.timeout.normalTimeout
        await expect(dateElement).toBeVisible({timeout: visibilityTimeout});
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
        const currentDate = getCurrentDate();
        const selectedDateElement = this.dateElements.locator(`text=${currentDate}`);
    
        await expect(selectedDateElement).toBeVisible();
        await this.page.waitForTimeout(data.timeout.bigTimeout);
    
        // Parent element of the date(.. is a special locator)
        const parentElement = selectedDateElement.locator('..');  
        await expect(parentElement).toHaveClass(new RegExp(data.expectedClasses.selectedDateClass));
    
        const currentMonth = getCurrentMonth();
        await expect(this.currentMonthDisplay).toContainText(currentMonth);
    }
    

}
