const { expect } = require("@playwright/test");
const data = require("../data/data.json");
import { format } from "date-fns";

exports.SchedulePage = class SchedulePage {
  constructor(page) {
    this.page = page;
    this.scheduleModule = page.locator(
      "//span[normalize-space(text())='Schedule']/parent::div[contains(@class, 'e2e_navigation_item_link')]"
    );
    this.currentDate = page.locator(
      "//div[contains(@class, 'mbsc-timeline-header-active')]"
    );
    this.teamScheduleTable = page.locator(
      "//div[contains(@class, ' mbsc-material mbsc-timeline-grid')]"
    );
    this.filter = page.locator("//icon[@name='filter_bulk']//parent::div");

    this.filterPage = page.locator(
      "//div[contains(@class, 'cdk-overlay-pane')]"
    );

    this.clearFiltersButton = this.filterPage.locator(
      "//span[contains(@class,'e2e_filter_sheet_clear')]"
    );
    this.applyFiltersButton = this.filterPage.locator(
      "//span[contains(@class,'e2e_filter_sheet_dismiss')]"
    );

    // Filters section
    this.employeeNameOption = page.locator('div[title="Employee Name"]');
    this.locationOption = page.locator('div[title="1137-Hotel del Coronado"]');
    this.assignmentOption = page.locator('div[title="Audio Technician Op"]');
    this.shiftTypeOption = page.locator('div[title="Hourly"]');

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
    const highlightedDate = await this.currentDate.innerText();
    // Formated the current date in the same format as the date
    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, "EEE MMM dd, yyyy"); 
    //Compare the actual date with the highlighted date
    expect(highlightedDate).toBe(formattedCurrentDate);
  }

  async openFilter() {
    await expect(this.filter).toBeVisible();
    await this.filter.click();
    await expect(this.filterPage).toBeVisible({ timeout: 1000 });
    // await expect(this.filterPage).toBeVisible();

  }
  async checkDefaultSort(){
    await expect(this.employeeNameOption).toHaveClass(/bg-sky-200/);
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
