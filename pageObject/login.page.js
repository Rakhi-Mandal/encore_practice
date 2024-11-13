const { expect } = require("@playwright/test");
exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.email=page.locator("//input[@type='email']")
    this.password= page.locator("//input[@type='password']")
    this.submit=page.locator("//input[@type='submit']")
    this.checkBox=page.locator("//input[@type='checkbox']")
        

  }
  async loginFunction(userName, password) {
    await this.email.fill(userName);
    await this.submit.click();
    await this.password.fill(password);
    await this.submit.click();
    await this.checkBox.click();
    await this.submit.click();
    
  }
};
