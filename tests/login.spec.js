const { test, expect, beforeEach } = require("@playwright/test");
const index  = require("../utils/index.page");  // Import the whole index object
const data = require("../Data/data.json");

let iframesPage;
let alertsPage;
let elementsPage; 
let interactionPage;
let widgetsPage;
let formPage;

beforeEach(async ({ page }) => {
 iframesPage=new index.IFrames(page);
 alertsPage= new index.AlertsPage(page);
 widgetsPage= new index.WidgetsPage(page);
 elementsPage=new index.ElementPage(page); 
 interactionPage=new index.InteractionsPage(page);
 formPage=new index.FormPage(page);
 await page.goto("https://demoqa.com/");
  await expect(page).toHaveURL("https://demoqa.com/");
});
