const { expect } = require("@playwright/test");
const data = require("../data/data.json");
const {createRegExp,getCurrentDate} = require(
  "../utils/helper"
  )

exports.SchedulePage = class SchedulePage {
  constructor(page) {
    this.page = page;
    this.scheduleModule = page.locator(
      "//span[normalize-space(text())='Schedule']/parent::div[contains(@class, 'e2e_navigation_item_link')]"
    );
    this.currentDate = page.locator(
      "//div[contains(@class, 'header-active')]"
    );
    this.teamScheduleTable = page.locator(
      "(//div[contains(@class, 'timeline-grid')])[1]"
    );
    this.filter = page.locator("//icon[@name='filter_bulk']//parent::div");

    this.filterPage = page.locator(
      "//div[contains(@class, 'cdk-overlay-pane')]"
    );

    this.clearFiltersButton = page.locator("(//span[text()=' Clear filters '])[1]");
    this.applyFiltersButton = page.locator(
      "//span[contains(@class,'e2e_filter_sheet_dismiss')]"
    );

    // Filters section
    this.employeeNameOption = page.locator('(//div[contains(@class,"cm-chips-wrapper")]//div)[1]');

    this.locationOption = page.locator('(//div[contains(@class,"cm-chips-wrapper")]//div[2])[2]');
    this.assignmentOption = page.locator('(//div[contains(@class,"cm-chips-wrapper")]//div[3])[1]');
    this.shiftTypeOption = page.locator('(//div[contains(@class,"cm-chips-wrapper")]//div[3])[1]');
    
    this.filterTitles = page.locator(
      "(//div[contains(@class, 'e2e_filter_title')])[1]"
    );

    this.leftArrow = page.locator(
      "(//icon[contains(@class,'e2e_schedule_previous')])[2]"
    );
    this.rightArrow = page.locator(
      "(//icon[contains(@class,'e2e_schedule_next')])[2]"
    );
    // Locator for the 'Today' link (update the locator if needed)
    this.todayLink = page.locator(
      "(//icon[contains(@class,'e2e_schedule_next')])[2]//parent::div//following-sibling::span"
    );
    this.myScheduleButton = page.locator('.e2e_schedule_my_schedule_button');
    this.teamScheduleButton = page.locator('.e2e_schedule_team_schedule_button');
    this.employeeNameOption = page.locator('div[title="Employee Name"]');
  }

  async navigate() {
    await this.page.goto(data.lightHouseURL);
  }

  async launchschedulePage() {
    await expect(this.teamScheduleTable).toBeVisible();
    //Scrollable
    await expect(this.teamScheduleTable).toHaveCSS("overflow", "auto");
  }
  async checkHighlightedDate() {
    const highlightedDate = await this.currentDate.innerText();  // Get the highlighted date from the page

    // Get the formatted current date by calling the helper function
    const formattedCurrentDate = getCurrentDate();  

    // Compare the actual date with the highlighted date
    expect(highlightedDate).toBe(formattedCurrentDate);
  }

  async openFilter() {
    await expect(this.filter).toBeVisible();
    await this.filter.click();
    await expect(this.filterPage).toBeVisible({ timeout: 1000 });
    // await expect(this.filterPage).toBeVisible();

  }
  async checkDefaultSort(){
    await expect(this.employeeNameOption).toHaveClass(createRegExp(data.defaultSort));


  }
  async verifyDefaultSelectedSchedule(){
     // await expect(schedulePage.teamScheduleButton).toHaveClass(data.teamSchedule); 
  await expect(this.teamScheduleButton).toHaveClass(createRegExp(data.teamSchedule));
  // createRegExp
  
  // Verify that the "My Schedule" button is NOT checked by default 
  await expect(this.myScheduleButton).not.toHaveClass(createRegExp(data.mySchedule));
  }
 
  async goToPreviousWeek() {
    await this.leftArrow.click();
  }

  async goToNextWeek() {
    await this.rightArrow.click();
  }

  async clickToday() {
    await this.todayLink.click();
  }
  async checkAllFilterOptions() {
    await this.filterTitles.click();
  }

  async applyFilter() {
    await this.applyFiltersButton.click();
  }

  async clearFilter() {
    // Clear filters by clicking the "Clear filters" button
    await this.clearFiltersButton.click();
  }


   // Filter Methods
   async selectSortByEmployeeName() {
    // Ensure the Employee Name filter is clicked
    await expect(this.employeeNameOption).toBeVisible();
    await this.employeeNameOption.click();
  }

  async selectLocation() {
    // Select the "Location" filter
    await expect(this.locationOption).toBeVisible();
    await this.locationOption.click();
  }

  async selectAssignment() {
    // Select the "Assignment" filter
    await expect(this.assignmentOption).toBeVisible();
    await this.assignmentOption.click();
  }

  async selectShiftType() {
    // Select the "Shift Type" filter
    await expect(this.shiftTypeOption).toBeVisible();
    await this.shiftTypeOption.click();
  }

  // Apply and Clear Filters
  async applyFilter() {
    await this.applyFiltersButton.click();
  }

  async clearFilter() {
    await this.clearFiltersButton.click();
  }

  // Helper: Check All Filters
  async checkAllFilterOptions() {
    await this.selectSortByEmployeeName();
    await this.selectLocation();
    await this.selectAssignment();
    await this.selectShiftType();
    await this.applyFilter();
  }
};
