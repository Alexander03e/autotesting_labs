import { By, Key } from "selenium-webdriver";
import { BasePage } from "../basepage.js";

export class GoogleHomePage extends BasePage{

  get searchField() {return By.name('q')}

  async open() {
    await this.goToUrl('https://www.google.ru/')
  }

  async enterSearch(searchText) {
    await this.enterText(this.searchField, searchText)
    await this.enterText(this.searchField, Key.ENTER)
  }
}