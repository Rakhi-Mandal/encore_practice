const { expect } = require('@playwright/test');
const indexPage = require('../utils/index.page');

export class FlowsheetSearch {
   constructor(page) {
      this.page = page;
      this.rooms_count = page.locator("(//app-label-with-number[1]/div[1]/div[2])[1]");
      this.search_box = page.locator("//input[@placeholder='Search Flowsheets']");
      this.cross_icon = page.locator("//icon[@name='cross_line']");
   }
   async roomsVisibility() {
      await expect(this.rooms_count).toBeVisible();
   }

   async searchClear() {
      await this.cross_icon.click();
   }

   async verifySearchFunctionality() {
      await expect(this.search_box).toBeEditable();
      await this.search_box.fill(indexPage.data.search.validNumber);
      await this.roomsVisibility();
      await this.searchClear();
      await this.search_box.fill(indexPage.data.search.invalidNumber);
      await this.roomsVisibility();
      await this.searchClear();
      await this.search_box.fill(indexPage.data.search.upperCaseText);
      await this.roomsVisibility();
      await this.searchClear();
      await this.search_box.fill(indexPage.data.search.lowerCaseText);
      await this.roomsVisibility();
      await this.searchClear();
   }
}