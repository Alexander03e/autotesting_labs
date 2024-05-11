import { By, Key } from "selenium-webdriver";
import { BasePage } from "../basepage.js";
export class MospolytechPage extends BasePage {
  group
  constructor(group) {
    super()
    this.group = group
  }
  async open() {
    await this.goToUrl('https://mospolytech.ru')
  }
  async findElementByXpath(xpath){
    const item = await driver.findElement(By.xpath(xpath))
    return item
  }
  async openTable() {
    const link = await this.findElementByXpath(`//li[@class='user-nav__item']/a[@href='/obuchauschimsya/raspisaniya/']`)
    await link.click()
    await driver.sleep(1500)
  }
  async openTableSiteInNewWindow(){
    this.mainWindow = await driver.getWindowHandle()    
    const link = await this.findElementByXpath(`//div[@class='button-group__item']/a[@href='https://rasp.dmami.ru/']`) 
    await link.sendKeys(Key.CONTROL + Key.ENTER)
    const allWindows = await this.getAllWindows()
    for(const window of allWindows) {
      if (window !== this.mainWindow) {
        await driver.switchTo().window(window)
        await driver.sleep(1000)
        return this.mainWindow != window
      }
    }

  }
  async getAllWindows() {
    let allWindows = await driver.getAllWindowHandles()
    return allWindows
  }
  async enterGroup(){
    const input = await this.findElementByXpath(`//input[@class='groups']`)
    await input.sendKeys(`${this.group}`)
    await driver.sleep(1000)
  }

  async getGroups() {
    const allGroups = await driver.findElements(By.xpath('//div[contains(@class, "found-groups")]/div'))
    return allGroups.length == 1
  }

  async findGroup() {
    const group = await this.findElementByXpath(`//div[@id='${this.group}']`)
    const groupText = await group.getText()
    return groupText == this.group
  }

  async clickGroup(){
    const item = await this.findElementByXpath(`//div[@id='${this.group}']`)
    await item.click()
    await driver.sleep(1000)
  }
  async checkColorOfCurrentDay(){
    let days = await driver.findElements(
      By.xpath(`//div[@class="schedule-week"]/child::div`)
    );  
    let thisDay
    for (let i = 0; i < days.length; i++) {
      if (days.indexOf(days[i]) == new Date().getDay() - 1) {
        thisDay = days[i];
      }
    }
    return (
      (await thisDay.getAttribute("class")) ===
      "schedule-day schedule-day_today"
    );
  }
}


// (async () => {
//   const mp = new MospolytechPage('221-323')
//   await mp.open()
//   await mp.openTable()
//   await mp.openTableSiteInNewWindow()
//   await mp.enterGroup()
//   await mp.getGroups()
  
//   await mp.clickGroup() 
//   await mp.closeBrowser()
// })()