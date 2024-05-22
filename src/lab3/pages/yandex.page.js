import{ Builder, Browser, By } from 'selenium-webdriver';
const URL = 'https://market.yandex.ru/';
const BrowserType = Browser.CHROME;
import {driver} from '../test/yandex.test.js' 
const SLEEP_TIME1 = 1500;
const SLEEP_TIME3 = 3500;
const SLEEP_TIME5 = 5000;
const SLEEP_TIME7 = 7000;

class BasePage {
  async saveScreenshot(fileName) {
    const date = this.getDateTimeString()
    driver.takeScreenshot().then(function(image) {
      fs.writeFileSync(`./screenshots/lab2/error_${fileName}_${date}.png`, image, 'base64')
    })
  }
}

export class MainPage extends BasePage  {
    constructor(driver) {
        super()
        this.driver = driver;
        this.locator = {
            hamburger: By.xpath("//div[@data-zone-name='catalog']"),
            laptopsAndComputers: By.xpath("//span[contains(text(), 'Ноутбуки и компьютеры')]"),
            tablets_url: By.xpath("//a[@href='/catalog--planshety/54545/list?hid=6427100']")
        }
    }

    async openURL() {
        await driver.get(URL);
        await driver.manage().window().maximize();
        console.log('переход по ссылке');
        await driver.sleep(SLEEP_TIME1);
    }

    async getLaptopsAndСomputers() {
        await this.driver.findElement(this.locator.hamburger).click();
        await this.driver.sleep(SLEEP_TIME5);
        let laptopsAndСomputers = await this.driver.findElement(this.locator.laptopsAndComputers);
        await this.driver.sleep(SLEEP_TIME1);
        let element = laptopsAndСomputers;
        let action = this.driver.actions({ async: true });
        await action.move({ origin: element }).perform();
        await this.driver.sleep(SLEEP_TIME1);
        let tablets_url = await this.driver.findElement(this.locator.tablets_url);
        await tablets_url.click();
        console.log('открытые страницы с планшетами');
        await this.driver.sleep(SLEEP_TIME3);
    }
}

export class TabletsPage extends BasePage {
    constructor(driver) {
        super()
        this.driver = driver;
        this.variables = {
            nameTablets: [],
            priceTablets: [],
            secondDevice: [],
            secondPrice: [],
        }
        this.locator = {
            getSamsung: By.xpath("//span[contains(text(), 'Samsung')]"),
            getBilliger: By.xpath("//button[contains(text(), 'подешевле')]"),
            getFiveNameTablets: By.xpath("//div[@data-auto-themename='listDetailed']//h3[@data-auto='snippet-title']"),
            getFivePriceTablets: By.xpath("//div[@data-auto-themename='listDetailed']//span[@data-auto='snippet-price-current']"),
            getInput: By.xpath("//div[@data-zone-name='search-input']//input[@id='header-search']"),
            getButton: By.xpath("//button[@data-auto='search-button']"),
        }
    }

    
    async setThePrice() {
        await this.driver.findElement(this.locator.getBilliger).click();
        console.log('сортировка списка по цене');
        await this.driver.sleep(SLEEP_TIME1);
    }



    async sortierungList() {
        await this.driver.sleep(SLEEP_TIME5);
        let fiveNameTablets = await this.driver.findElements(this.locator.getFiveNameTablets);
        let fivePriceTablets = await this.driver.findElements(this.locator.getFivePriceTablets);
        await this.driver.sleep(SLEEP_TIME3);
        console.log('найденные товары:');
        for (let i = 0; i < 5; i++) {
            this.variables.nameTablets[i] = await fiveNameTablets[i].getText();
            this.variables.priceTablets[i] = await fivePriceTablets[i].getText();
            console.log(`название: ${this.variables.nameTablets[i]}`);
            console.log(`цена: ${this.variables.priceTablets[i]} рублей`);
        }
        await this.driver.sleep(SLEEP_TIME3);
    }

    async searchSamsung() {
      await this.driver.findElement(this.locator.getSamsung).click();
      console.log('выбран производитель самсунг');
      await this.driver.sleep(SLEEP_TIME7);
  }

   
    async deviceSearch() {
        await this.driver.findElement(this.locator.getInput).sendKeys(this.variables.secondDevice);
        await this.driver.sleep(SLEEP_TIME1);
        await this.driver.findElement(this.locator.getButton).click();
        await this.driver.sleep(SLEEP_TIME7);
        console.log('поиск устройства');
    }
    async rememberDevice() {
      this.variables.secondDevice = this.variables.nameTablets[1];
      this.variables.secondPrice = this.variables.priceTablets[1];
      console.log('Название ' + this.variables.secondDevice);
      console.log('Цена ' + this.variables.secondPrice);
      console.log('информация о втором устройстве:');
  }

}
