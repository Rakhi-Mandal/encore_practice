const { expect } = require("@playwright/test");
const data = require("../data/data.json");
const helper = require("../utils/helper");
require("dotenv").config();
exports.SchedulePage = class SchedulePage {
  constructor(page) {
    this.page = page;
    this.isMobile = this.page.context()._options.isMobile;
    this.chatContent = this.isMobile;
    this.scheduleModule = this.isMobile
      ? page.locator("(//app-mobile-navigation-item)[2]")
      : page.locator(
          "//span[normalize-space(text())='Schedule']/parent::div[contains(@class, 'navigation_item_link')]"
        );
    this.currentDate = this.isMobile
      ? page.locator('//div[contains(@class, "calendar-today")]')
      : page.locator("//div[contains(@class, 'timeline-header-active')]");

    this.teamScheduleTable = this.isMobile
      ? page.locator(".mbsc-event-list")
      : page.locator("(//mbsc-timeline//following-sibling::div)[4]");
    this.filter = this.isMobile
      ? page.locator("(//icon[@name='filter_bulk']//parent::div)[2]")
      : page.locator("//icon[@name='filter_bulk']//parent::div");

    this.filterPage = page.locator("//app-filter-bottom-sheet");
    this.filterTitles = page.locator(
      "(//div[contains(@class, 'filter_title')])[1]"
    );
    this.clearFiltersButton = page.locator(
      "(//span[text()=' Clear filters '])[1]"
    );
    this.applyFiltersButton = page.locator(
      "//span[contains(@class,'e2e_filter_sheet_dismiss')]"
    );

    this.employeeNameOption = page.locator(
      '(//div[normalize-space(text())="Sort"]//../following-sibling::div//div)[1]'
    );
    this.locationTitle = page.locator(
      '(//div[contains(@class, "filter_title")])[2]'
    );
    this.locationOption = page.locator(
      '(//div[normalize-space(text())="At Location"]//../following-sibling::div//div)[1]'
    );

    this.assignmentTitle = page.locator(
      '//div[normalize-space(text())="Assignment"]'
    );
    this.assignmentOption = page.locator(
      '(//div[normalize-space(text())="Assignment"]//../following-sibling::div//div)[1]'
    );
    this.shiftTitle = page.locator(
      '//div[normalize-space(text())="Shift Type"]'
    );
    this.shiftTypeOption = page.locator(
      '(//div[normalize-space(text())="Shift Type"]//../following-sibling::div//div)[1]'
    );

    this.leftArrow = this.isMobile
      ? page.locator(
          '//div[normalize-space(text())="Schedule"]//following-sibling::div[2]//icon[contains(@class,"schedule_previous")]'
        )
      : page.locator("(//icon[contains(@class,'previous')])[2]");
    this.rightArrow = this.isMobile
      ? page.locator(
          '//div[normalize-space(text())="Schedule"]//following-sibling::div[2]//icon[contains(@class,"schedule_next")]'
        )
      : page.locator("(//icon[contains(@class,'next')])[2]");

    this.todayLink = this.isMobile
      ? page.getByText("Today").nth(1)
      : page.getByText("Today").nth(2);

    this.myScheduleButton = page.locator(
      '//mat-button-toggle[contains(@class,"my_schedule_button")]'
    );
    this.teamScheduleButton = page.locator(
      '//mat-button-toggle[contains(@class,"team_schedule_button")]'
    );
    this.employeeNameOption = page.locator('div[title="Employee Name"]');
  }

  async navigate() {
    await this.page.goto(data.lightHouseURL);
  }

  async launchschedulePage() {
    await expect(this.teamScheduleTable).toBeVisible();
    await expect(this.teamScheduleTable).toHaveCSS("overflow", "auto");
  }
  async checkHighlightedDate() {
    const highlightedDate = await this.currentDate.innerText();

    if (this.isMobile) {
      var formattedCurrentDate = helper.getOnlyCurrentDate();
    } else {
      var formattedCurrentDate = helper.getCurrentDate();
    }
    expect(highlightedDate).toBe(formattedCurrentDate);
  }

  async openFilter() {
    await expect(this.filter).toBeVisible();
    await this.filter.click();
    await expect(this.filterPage).toBeVisible(
      parseInt(process.env.smallTimeOut)
    );
  }
  async checkDefaultSort() {
    await this.filterTitles.click();
    await expect(this.employeeNameOption).toHaveClass(
      helper.createRegExp(data.defaultSort)
    );
    await expect(this.employeeNameOption).toHaveClass(
      helper.createRegExp(data.defaultSort)
    );
  }
  async verifyDefaultSelectedSchedule() {
    await expect(this.teamScheduleButton).toHaveClass(
      helper.createRegExp(data.checkedSchedule)
    );
    await expect(this.myScheduleButton).not.toHaveClass(
      helper.createRegExp(data.checkedSchedule)
    );
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
    await this.clearFiltersButton.click();
  }

  async selectSortByEmployeeName() {
    await expect(this.employeeNameOption).toBeVisible();
    await this.employeeNameOption.click();
  }

  async selectLocation() {
    await this.locationTitle.click();
    await expect(this.locationOption).toBeVisible();
    await this.locationOption.click();
  }

  async selectAssignment() {
    await this.assignmentTitle.click();
    await expect(this.assignmentOption).toBeVisible();
    await this.assignmentOption.click();
  }

  async selectShiftType() {
    await this.shiftTitle.click();
    await expect(this.shiftTypeOption).toBeVisible();
    await this.shiftTypeOption.click();
  }

  async applyFilter() {
    await this.applyFiltersButton.click();
  }

  async clearFilter() {
    await this.clearFiltersButton.click();
  }

  async checkAllFilterOptions() {
    await this.selectSortByEmployeeName();
    await this.selectLocation();
    await this.selectAssignment();
    await this.applyFilter();
  }
};
