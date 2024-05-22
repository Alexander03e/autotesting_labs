import { beforeEach, afterEach, describe, it } from "mocha";
import { assert } from "chai";
import { MainPage, TabletsPage } from "../pages/yandex.page.js";
import { Browser, Builder } from "selenium-webdriver";
export let driver = new Builder().forBrowser(Browser.CHROME).build();

describe('вариант 1', function () {
  this.timeout(100000);
  it('переход на страницу с товаром', async function () {
    let mainPage = new MainPage(driver);
      try {
          await mainPage.openURL();
          await mainPage.getLaptopsAndСomputers();
      } catch (err) {
          mainPage.saveScreenshot('main_error')
          console.error('Error: ', err);
      }
  });
  it('поиск товара по производителю', async function () {
    let tabletsPage = new TabletsPage(driver);
      try {
          await tabletsPage.searchSamsung();
          await tabletsPage.setThePrice();
          await tabletsPage.sortierungList();
          await tabletsPage.rememberDevice();
          await tabletsPage.deviceSearch();

          let allDevices = await driver.findElements(tabletsPage.locator.getFiveNameTablets);
          let thisFirstDevice = allDevices[0];
          let thisFirstDeviceText = await thisFirstDevice.getText();
          assert.strictEqual(thisFirstDeviceText, tabletsPage.variables.secondDevice, 'Названия не совпадают');
      } catch (err) {
          tabletsPage.saveScreenshot('tablets_error')
          console.error('Error: ', err);
      }
  })
  after(async function () {
      await driver.quit();
  });
})