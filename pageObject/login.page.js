const {projects}=require("../playwright.config")

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.isMobile = this.page.context()._options.isMobile;

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
    if(!this.isMobile)
    {
    await this.checkBox.click();
    await this.submit.click();
    }
    
  }
};
