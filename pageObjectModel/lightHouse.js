const { expect } = require("@playwright/test");
const data = require("../Data/data.json");
exports.FormPage = class FormPage {
  constructor(page) {
    this.page = page;
    this.forms = page.locator(
      "//h5[text()='Forms']//ancestor::div[@class='card mt-4 top-card']"
    );
    this.getForm = page.locator("//span[text()='Practice Form']");
    this.firstName = page.locator("//input[@id='firstName' and @required]");
    this.lastName = page.locator("//input[@id='lastName' and @required]");
    this.phoneNumber = page.locator("//input[@id='userNumber' and @required]");
    this.gender = page.locator("//label[@for='gender-radio-2']");
    this.uploadPicture = page.locator("//input[@id='uploadPicture']");
    this.selectState = page.locator("//div[text()='Select State']");
    this.selectCity = page.locator("//div[text()='Select City']");
    this.dob = page.locator("//input[@id='dateOfBirthInput']");
    this.month = page.locator("(//select['datepicker__month'])[1]");
    this.year = page.locator("(//select['datepicker__month'])[2]");
    this.date = page.locator("//div[@role='option' and text()='14']");

    this.formSubmitButton = page.locator("#submit");
  }