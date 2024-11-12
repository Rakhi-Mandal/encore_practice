exports.flowsheet_groups= class flowsheet_groups {
    constructor(page) {
        this.page = page;        
        this.flowcard_groupicon = page.locator("//app-button-card[@class='e2e_flowsheet_action_group-button']");
        this.empty_group_msg=page.locator("//div[@class='cdk-overlay-container']");
        this.flowcard_statusicon = page.locator("//app-flowsheet-action-card[1]//div[1]//div[5]//app-button-card[1]//div[1]//icon[1]//*[name()='svg']//*[name()='path' and contains(@opacity,'.3')]");
        //e2e_flowsheet_action_status_button
    };
    async goto(url) {
        await this.page.goto(url);
      }
}
