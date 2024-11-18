const {test}= require('@playwright/test')
const indexPage= require('../utils/index.page')


let chatPage,loginPage;

test.describe("C56931 Create New Chat / Add participant / Leave Chat Preconditions",()=>{
    test.beforeEach("Login page", async({page})=>{
        chatPage=new indexPage.ChatPage(page);
        loginPage=new indexPage.LoginPage(page)
        await chatPage.lunchUrl();
        await loginPage.loginFunction();
        
    })
    test("ChatModule Test Cases",async()=>{
        await chatPage.testChatElement();
        await chatPage.createNewChatIcon();
        await chatPage.selectingUsers();
        await chatPage.clickOnTheGroupIcon();
        await chatPage.searchFunctionality();
        await chatPage.addButtonOperation();
        await chatPage.renameGroupChat();
    })
})