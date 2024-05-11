import {Builder , Browser} from 'selenium-webdriver'
import fs from 'fs'
export class BasePage {
 
  async goToUrl(url) {
    global.driver = new Builder().forBrowser(Browser.CHROME).build()
    driver.manage().setTimeouts({implicit: 5000}),
    await driver.get(url)
  }
  async enterText(locator, textToEnter) {
    await driver.findElement(locator).sendKeys(textToEnter)
  }

  async click(locator) {
    await driver.findElement(locator).click()
  }
  async getText(locator) {
    return await driver.findElement(locator).getText();
  }
  getDateTimeString ()  {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}`;
  };
  async saveScreenshot(fileName) {
    const date = this.getDateTimeString()
    driver.takeScreenshot().then(function(image) {
      fs.writeFileSync(`./screenshots/lab2/error_${fileName}_${date}.png`, image, 'base64')
    })
  }

  async closeBrowser() {
    await driver.sleep(1000)
    await driver.quit()
  }
}