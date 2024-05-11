import { By } from "selenium-webdriver";
import { BasePage } from "../basepage.js";

export class LambdaPage extends BasePage {

  async getElements() {
    this.itemsCount = (await driver.findElements(By.xpath(`//li[@class='ng-scope']/input`))).length
    this.falseItemsCount = (await driver.findElements(By.xpath(`//span[@class='done-false']`))).length
    return {total: this.itemsCount, falseTotal: this.falseItemsCount }
  }

  async open() {
    await this.goToUrl('https://lambdatest.github.io/sample-todo-app/')
  }

  async checkTitle() {
    await this.getElements()
    return (
      (await this.getText(By.xpath('//span[@class="ng-binding"]'))) ===
      `${this.falseItemsCount} of ${this.itemsCount} remaining`
    );

  }
  async clickItem(id) {
    const item = await driver.findElement(By.xpath(`//input[@name='li${id}']`)).click()
    // await item.click()
  }
  async isItemActive(item) {
    return (await item.getAttribute('class') === 'done-true')
  }
  async getItem(itemId) {
    return await driver.findElement(By.xpath(`//input[@name='li${itemId}']/following-sibling::span`))
  }
  async isItemNotActive(item) {
    return (await item.getAttribute('class') === 'done-false')
  }

  async createNewItem(text) {
    await this.enterText(By.id('sampletodotext'), text)
    await this.click(By.id('addbutton'))
    await this.getElements()
  }



  get itemCount() {
    return this.itemsCount
  }
  get falseItemCount() {
    return this.falseItemsCount
  }
}

// (async () => {
//   const test = new LambdaPage()
//   await test.open()
//   const {total, falseTotal} = await test.getElements()
//   console.log(total, falseTotal)
//   await test.checkTitle()
//   await test.clickItem(3)
//   await test.closeBrowser()
// })()
