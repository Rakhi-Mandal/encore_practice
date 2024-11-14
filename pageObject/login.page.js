const { expect } = require("@playwright/test");
exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.email=page.locator("//input[@type='email']")
    this.password= page.locator("//input[@type='password']")
    this.submit=page.locator("//input[@type='submit']")
    this.checkBox=page.locator("//input[@type='checkbox']")
        

  }
  async loginFunction(userEmail, userPassword) {
    await this.email.fill(userEmail);
    await this.submit.click();
    await this.password.fill(userPassword);
    await this.submit.click();
    await this.checkBox.click();
    await this.submit.click();
    
  }
};
