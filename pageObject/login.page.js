require('dotenv').config();

exports.Login = class Login {
    constructor(page) {
        this.page = page
        this.isMobile = this.page.context()._options.isMobile;
        this.email = page.locator("//input[@type='email']")
        this.password = page.locator("//input[@type='password']")
        this.submit = page.locator("//input[@type='submit']")
        this.checkBox = page.locator("//input[@type='checkbox']")
        this.checkBox = page.locator("//input[contains(@type,'checkbox')]")
    }
    async login(userMail, userPassword) {
        await this.page.goto(process.env.lightHouseURL);
        await this.email.fill(userMail);
        await this.submit.click();
        await this.password.fill(userPassword);
        await this.submit.click();
        if (!this.isMobile) {
            await this.checkBox.click();
            await this.submit.click();
        }
    }
}