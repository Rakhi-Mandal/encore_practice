const { expect } = require('@playwright/test');


exports.Agenda = class Agenda{
    constructor(page){
        this.page= page
        this.agendaButton = page.locator('div.e2e_navigation_item_link >> text=Agendas');
    }

    async clickAgenda(){
        await this.agendaButton.click();
        
    }
}