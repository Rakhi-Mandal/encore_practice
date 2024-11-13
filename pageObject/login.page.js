const { expect } = require('@playwright/test');
require('dotenv').config();

exports.Login = class Login {
    constructor(page) {
        this.page = page
        this.email = page.locator("//input[@type='email']")
        this.password = page.locator("//input[@type='password']")
        this.submit = page.locator("//input[@type='submit']")
        this.checkBox = page.locator("//input[@type='checkbox']")
    }
    async navigateToDashBoard(mail, loginPassword) {
        await this.page.goto(process.env.lightHouseURL);
        await this.page.waitForTimeout(3000);
        await this.email.fill(mail);
        await this.submit.click();
        await this.password.fill(loginPassword);
        await this.submit.click();
        await this.checkBox.click();
        await this.submit.click();
        // await this.page.waitForTimeout(20000);
    }
}