const { expect } = require('@playwright/test')
require('dotenv').config();
const data = require('../data/data.json')


exports.ChatPage = class ChatPage {
    constructor(page){
        this.page = page;
        this.isMobile = this.page.context()._options.isMobile;
        this.chatContent = this.isMobile
        ? page.locator("(//div[contains(@class,'e2e_navigation_item_link')])[9]")
        : page.locator("(//span[contains(@class,'e2e_navigation_item_title')])[4] ")
        this.creatChatIcon =this.isMobile
        ? page.locator("//icon[@name='new_chat_line']")
        : page.locator("//div[contains(@class,'e2e_chat_page_header')]//child::icon")
        this.image = page.locator("//app-empty-state//child::div")
        this.search = page.locator("//div[contains(@class,'e2e_search_bar_icon')]")
        this.user1 = page.locator("(//mat-option[@role='option'])[2]")
        this.user2 = page.locator("(//mat-option[@role='option'])[5]")
        this.creatChatButton = page.locator("//span[text()=' Create Chat ']")
        this.groupIcon = this.isMobile
        ? page.locator("(//icon[@name='group_line'])[2]")
        : page.locator("(//icon[@name='group_line'])[1]")
        this.addParticipant = page.locator("//span[text()='Add Participant']")
        this.addButton = page.locator("//button[text()='Add']")
        this.leave = page.locator("//span[text()='Leave']")
        this.clickYes = page.locator("//button[contains(@class,'e2e_confirm_dialog_yes')]")
        this.searchFunction = page.locator("//input[@placeholder='Search users']")
        this.editButton = this.isMobile
        ? page.locator("(//app-avatar//following-sibling::div)[2]//following-sibling::icon")
        : page.locator("(//icon[@name='pen_line'])[1]")
        this.selectingUser=page.locator("(//div[@role='listbox']//child::mat-option)[2]")
        this.groupName = page.locator("//div[text()='Group name']//following-sibling::input")
        this.save=page.locator("//button[text()='Save']")
    }
    async lunchUrl() {
        await this.page.goto(process.env.lightHouseUrl)
    }

    async testChatElement() {
        await this.chatContent.click();
        await expect(this.creatChatIcon).toBeVisible();
        if(!this.isMobile){
        await expect(this.image).toBeVisible();
        }
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
        await this.user1.click();
        await this.user2.click();
        await this.creatChatButton.click();
        if(!this.isMobile){
        await expect(this.groupIcon).toBeVisible();
        }
        const countText = await this.groupIcon.innerText();

    }
    async clickOnTheGroupIcon() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await this.user1.click();
        await this.creatChatButton.click();
        if(!this.isMobile){
            await expect(this.groupIcon).toBeVisible();
        }
        await this.groupIcon.click();
        await expect(this.addParticipant).toBeVisible();
        await this.addParticipant.click();
        await this.selectingUser.click();
        await this.addButton.click();
        await this.groupIcon.click();
        await this.leave.click();
        await this.clickYes.click();
        await this.groupIcon.click();
        await expect(this.leave).toBeHidden();
    }
    async searchFunctionality() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await this.user1.click();
        await this.creatChatButton.click();
        await expect(this.groupIcon).toBeVisible();
        await this.groupIcon.click();
        await expect(this.addParticipant).toBeVisible();
        await this.addParticipant.click();
        await expect(this.searchFunction).toBeVisible();
        await this.page.pause();
        await this.selectingUser.click();
        if(!this.isMobile){
        await expect(this.addButton).toBeVisible();
        }
        await this.page.getByText('Add participants:').click();
        await this.addButton.click();
    }
    async addButtonOperation() {
        await this.chatContent.click();
        await this.creatChatIcon.click();
        await this.user1.click();
        await this.creatChatButton.click();
        await expect(this.groupIcon).toBeVisible();
        await this.groupIcon.click();
        await expect(this.addParticipant).toBeVisible();
        await this.addParticipant.click();
        await this.selectingUser.click();
        await this.page.getByText('Add participants:').click();
        await this.addButton.click();
        await this.groupIcon.click();
    }

    async renameGroupChat() {
        await expect(this.editButton).toBeVisible();
        await this.editButton.click();
        const chatNameInput = await this.groupName;
        await chatNameInput.fill(data.renameGroup);
        await this.save.click();
        await expect(chatNameInput).toContainText(data.renameGroup)
    }
}