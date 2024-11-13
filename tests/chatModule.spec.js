const {test}= require('@playwright/test')
const indexPage= require('../index.page.js')
const data=require('../data/data.json')


let chatPage,loginPage;

test.describe("Create New Chat / Add participant / Leave Chat",()=>{
    test.beforeEach("Login page", async({page})=>{
        chatPage=new indexPage.ChatPage(page);
        loginPage=new indexPage.LoginPage(page)
        await chatPage.lunchUrl();
        await loginPage.loginFunction();
        
    })
    test.skip("Chat Page Module",async()=>{
        await chatPage.testChatElement();
        await chatPage.createNewChatIcon();
        await chatPage.selectingUsers();
        await chatPage.clickOnTheGroupIcon();
        await chatPage.searchFunctionality();
        await chatPage.addButtonOperation();
    })
    test("Rename the Chat",async()=>{
        await chatPage.renameTheChat() 
    })

})