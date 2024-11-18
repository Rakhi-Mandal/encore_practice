const { expect } = require('@playwright/test');
//const indexPage = require('../utils/index.page');

exports.Profile = class Profile {
   constructor(page) {
      this.page = page;
      this.isMobile = this.page.context()._options.isMobile;
      this.user_account = page.locator("//app-side-menu/div/icon");
      this.my_profile = page.locator("//span[text()='My Profile']");
      this.general_tab = this.isMobile
         ? page.locator("(//li[contains(@class, 'text-purple-500')]//span[text()='General'])[1]")
         : page.locator("(//li[contains(@class, 'text-purple-500')]//span[text()='General'])[2]");
      this.general_tab_color = this.isMobile
         ? page.locator("(//li[contains(@class, 'text-purple-500')])[1]")
         : page.locator("(//li[contains(@class, 'text-purple-500')])[2]");
      this.profile_header = page.locator("//div[@class='font-bold text-xl e2e_profile_header_title' and text()='Profile']");
      this.profile_last_sync = this.isMobile
         ? page.locator("(//div[ contains(@class, 'e2e_user_profile_sync_label')])[2]")
         : page.locator("(//div[ contains(@class, 'e2e_user_profile_sync_label')])[1]");
      this.profile_notifications_allowed = this.isMobile
         ? page.locator("(//div[contains(@class, 'e2e_user_profile_notifications_label')])[2]")
         : page.locator("(//div[contains(@class, 'e2e_user_profile_notifications_label')])[1]");
      this.profile_display_name = this.isMobile
         ? page.locator("(//app-profile-content/div)[6]/child::div[1]")
         : page.locator("(//app-profile-content/div)[5]/child::div[1]");
      this.profile_email = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_email_label') and text()='Email']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_email_label') and text()=' Email ']");
      this.profile_user_name = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_username_label') and text()='Username']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_username_label') and text()=' Username ']");
      this.profile_default_location = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_default_location_label') and text()='Default Location']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_default_location_label') and text()=' Default Location ']");
      this.profile_selected_location = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_selected_location_label') and text()='Selected Location']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_selected_location_label') and text()=' Selected Location ']");
      this.preferences_header = page.locator("//div[@class='font-bold text-xl e2e_profile_header_title' and text()='Preferences']");
      this.profile_selected_language = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_language_label') and text()='Language']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_language_label') and text()=' Language ']");
      this.profile_selected_equipment_display_choice = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_equipment_label') and text()='Equipment Display Choice']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_equipment_label') and text()=' Equipment Display Choice ']");
      this.profile_selected_default_schedule_view = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_schedule_label') and text()='Default Schedule View']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_schedule_label') and text()=' Default Schedule View ']");
      this.profile_selected_theme = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_theme_label') and text()='Theme']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_theme_label') and text()=' Theme ']");
      this.profile_time_display = this.isMobile
         ? page.locator("//div[contains(@class, 'e2e_user_profile_theme_label') and text()='Time Display']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_theme_label') and text()=' Time Display ']");
      this.profile_menu_options = page.locator("//div[contains(@class, 'e2e_profile_header_title') and text()='Menu Options / Default Screen']");
      this.profile_menu_slot1 = this.isMobile
         ? page.locator("//div[@class='font-bold e2e_user_profile_menu_1_label']")
         : page.locator("//div[@class='font-bold w-1/3 e2e_profile_content_title e2e_user_profile_menu_1_label']");
      this.profile_menu_slot2 = this.isMobile
         ? page.locator("//div[@class='font-bold e2e_user_profile_menu_2_label']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_menu_2_label') and text()=' Menu Slot 2 ']");
      this.profile_menu_slot3 = this.isMobile
         ? page.locator("//div[@class='font-bold e2e_user_profile_menu_3_label']")
         : page.locator("(//app-profile-content)[15]//div[@class='font-bold w-1/3 e2e_profile_content_title e2e_user_profile_menu_3_label']");
      this.profile_menu_slot4 = this.isMobile
         ? page.locator("//div[@class='font-bold e2e_user_profile_menu_4_label']")
         : page.locator("(//app-profile-content)[16]/descendant::div[@class='font-bold w-1/3 e2e_profile_content_title e2e_user_profile_menu_4_label']");
      this.profile_menu_slot5 = this.isMobile
         ? page.locator("//div[@class='font-bold e2e_user_profile_menu_5_label']")
         : page.locator("//div[contains(@class, 'e2e_user_profile_menu_5_label') and text()=' Menu Slot 5 ']");
   }
   async profileDeafultSelected() {
      await this.user_account.click();
      await this.my_profile.click();
      await expect(this.general_tab).toBeVisible();
      const attributeValue = await this.general_tab_color.getAttribute("class");
      expect(attributeValue).toContain("text-purple-500");
      await expect(this.profile_header).toBeVisible();
      await expect(this.preferences_header).toBeVisible();
      await expect(this.profile_menu_options).toBeVisible();
      await expect(this.profile_last_sync).toBeVisible();
      await expect(this.profile_notifications_allowed).toBeVisible();
      await expect(this.profile_display_name).toBeVisible();
      await expect(this.profile_email).toBeVisible();
      await expect(this.profile_user_name).toBeVisible();
      await expect(this.profile_default_location).toBeVisible();
      await expect(this.profile_selected_location).toBeVisible();
      await expect(this.profile_selected_language).toBeVisible();
      await expect(this.profile_selected_equipment_display_choice).toBeVisible();
      await expect(this.profile_selected_default_schedule_view).toBeVisible();
      await expect(this.profile_selected_theme).toBeVisible();
      await expect(this.profile_time_display).toBeVisible();
      await expect(this.profile_menu_slot1).toBeVisible();
      await expect(this.profile_menu_slot2).toBeVisible();
      await expect(this.profile_menu_slot3).toBeVisible();
      await expect(this.profile_menu_slot4).toBeVisible();
      await expect(this.profile_menu_slot5).toBeVisible();
   }
}