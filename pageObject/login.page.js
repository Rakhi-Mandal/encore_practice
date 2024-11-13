const { expect } = require('@playwright/test');
require('dotenv').config();
const data= require("../data/data.json");

exports.Login = class Login{
    constructor(page){
        this.page= page
        this.email=page.locator("//input[@type='email']")
        this.password= page.locator("//input[@type='password']")
        this.submit=page.locator("//input[@type='submit']")
        this.checkBox=page.locator("//input[@type='checkbox']")
     
    }

    async navigateToDashBoard(userMail, userPassword){
        await this.page.goto(process.env.lightHouseURL); 
        // await expect(this.page).toHaveURL(process.env.lightHouseURL)
        await this.page.waitForTimeout(data.timeout.bigTimeout);
        await this.email.fill(userMail);
        await this.submit.click();
        await this.password.fill(userPassword);
        await this.submit.click();
        await this.checkBox.click();
        await this.submit.click();

    }
}