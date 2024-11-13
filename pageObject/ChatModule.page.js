const { expect } = require('@playwright/test')
require('dotenv').config();
const data = require('../data/data.json')


exports.ChatPage = class ChatPage {
    constructor(page) {
        this.page = page;
        this.chatContent = page.locator("(//span[contains(@class,'e2e_navigation_item_title')])[4] ")
        this.creatChatIcon = page.locator("//div[contains(@class,'e2e_chat_page_header')]//child::icon")
        this.image = page.locator("//div[@class='flex flex-col text-center']")
        this.search = page.locator("//div[@class='flex-1 flex']//child::label")

        this.user1 = page.locator("//div[contains(@class,'ng-star-inserted')]//child::mat-option[@id='mat-option-2']")
        this.user2 = page.locator("//div[text()=' Rob Griffith ']")
        this.reloadPage = page.locator("//div[contains(@class,'ng-trigger ng-trigger-panelAnimation')]")

        this.creatChatButton = page.locator("//button[contains(@class,'ng-star-inserted')]")

        this.groupIcon = page.locator("(//div[contains(@class,'mat-mdc-menu-trigger')])[1]")

        this.addParticipant = page.locator("//span[text()='Add Participant']")
        this.addButton = page.locator("//button[text()='Add']")
        this.leave = page.locator("//span[text()='Leave']")
        this.clickYes = page.locator("(//span[@class='mat-mdc-button-touch-target'])[2]")

        this.searchFunction = page.locator("(//input[contains(@class,'ng-pristine')])[2]")
        this.editButton = page.locator("(//div[@class='flex items-center']//child::icon[@class='cursor-pointer ng-star-inserted'])[1]")

        this.groupName = page.locator("//input[contains(@class,'ng-pristine ng-valid ng-touched')]")
        this.inputFiled=page.locator("//input[contains(@class,'ng-valid ng-dirty ng-touched')]")
        this.save=page.locator("//button[text()='Save']")

    }
    async lunchUrl() {
        await this.page.goto(process.env.lightHouseUrl)
    }
    async testChatElement() {
        await this.chatContent.click();
        await expect(this.creatChatIcon).toBeVisible();
        await expect(this.image).toBeVisible();
        await expect(this.search).toBeEnabled();
    }
    async createNewChatIcon() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await expect(this.user1).toBeEditable();
        await expect(this.user1).toBeVisible();
    }
    async selectingUsers() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await this.page.reload();
        await this.user1.click();
        await this.page.reload();
        await this.user2.click();
        await this.creatChatButton.click();
        await expect(this.groupIcon).toBeVisible();

        const countText = await this.groupIcon.innerText();
        const currentCount = parseInt(countText.replace(/\D/g, ''), 10);
        this.currentGroupCount = currentCount;
        // const expectedCount = 2;
        // expect(this.currentGroupCount).toBe(expectedCount);

    }
    async clickOnTheGroupIcon() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await this.page.reload();
        await this.user1.click();
        await this.creatChatButton.click();
        await expect(this.groupIcon).toBeVisible();
        await this.groupIcon.click();

        await expect(this.addParticipant).toBeVisible();
        await this.addParticipant.click();
        await this.user2.click();
        await this.addButton.click();
        await this.groupIcon.click();
        await expect(this.leave).toBeVisible();
        await this.leave.click();
        await this.clickYes.click();
        await this.groupIcon.click();
        await expect(this.leave).toBeHidden();
    }
    async searchFunctionality() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await this.page.reload();
        await this.user1.click();
        await this.creatChatButton.click();
        await expect(this.groupIcon).toBeVisible();
        await this.groupIcon.click();
        await expect(this.addParticipant).toBeVisible();
        await this.addParticipant.click();
        await expect(this.searchFunction).toBeVisible();
        await this.searchFunction.fill(data.userName)
        await this.user2.click();
        await this.addButton.click();
    }
    async addButtonOperation() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await this.page.reload();
        await this.user1.click();
        await this.creatChatButton.click();
        await expect(this.groupIcon).toBeVisible();
        await this.groupIcon.click();

        await expect(this.addParticipant).toBeVisible();
        await this.addParticipant.click();
        await this.user2.click();
        await this.addButton.click();
        await this.groupIcon.click();
    }

    async renameTheChat() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await this.page.reload();
        await this.user1.click();
        await this.creatChatButton.click();
        await expect(this.groupIcon).toBeVisible();
        await this.groupIcon.click();

        await expect(this.addParticipant).toBeVisible();
        await this.addParticipant.click();
        await this.user2.click();
        await this.addButton.click();

        await this.editButton.click();
        const chatNameInput = await this.groupName;
        await chatNameInput.fill('');  // Clear the input field first
        await chatNameInput.fill(data.renameGroup);  

        await this.save.click();


    }
}