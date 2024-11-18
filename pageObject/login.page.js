const { expect } = require("@playwright/test");
require('dotenv').config();


exports.LoginPage = class LoginPage {
  constructor(page){
    this.page = page;
    this.isMobile = this.page.context()._options.isMobile;
    this.email=page.locator("//input[@type='email']")
    this.password= page.locator("//input[@type='password']");
    this.submit=page.locator("//input[@type='submit']");
    this.checkBox=page.locator("//input[@type='checkbox']")
       
 
  }
  async loginFunction() {
    await this.email.fill(process.env.userMail);
    await this.submit.click();
    await this.password.fill(process.env.password);
    await this.submit.click();
    if(!this.isMobile){
    await this.checkBox.click();
    await this.submit.click();
    }
  }
};