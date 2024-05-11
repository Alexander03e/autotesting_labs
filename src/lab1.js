import { Browser, Builder, By, Key, until } from "selenium-webdriver"
import assert from "assert"
import fs from 'fs'
const task1 = async () => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {

    await driver.get('https://lambdatest.github.io/sample-todo-app/')
    const el = await driver.findElement(By.className('ng-binding')).getText()
    const checkboxesCount = (await driver.findElements(By.xpath(`//li[@class='ng-scope']/input`))).length
    const falseCheckboxesCount = (await driver.findElements(By.xpath(`//span[@class='done-false']`))).length
    assert.equal(el, `${falseCheckboxesCount} of ${checkboxesCount} remaining`)//проверка на соответствие надписи


    for (let i=1; i<=checkboxesCount; i++) {
      const checkboxSpan = await driver.findElement(By.xpath(`//li[@class='ng-scope'][${i}]/span`))
      assert.equal(await checkboxSpan.getAttribute('class'), 'done-false') //проверка на то, зачеркнут ли чекбокс
      await driver.findElement(By.xpath(`//input[@name='li${i}']`)).click() //клик по чекбоксу
      assert.equal(await checkboxSpan.getAttribute('class'), 'done-true')
    }

    const newText = 'new item'
    await driver.findElement(By.id('sampletodotext')).sendKeys(newText)
    await driver.findElement(By.id('addbutton')).click()
    const newItemSpan = await driver.findElement(By.xpath(`//input[@name='li6']/following-sibling::span`))
    const newItemClass = await newItemSpan.getAttribute('class')
    const newItemText = await newItemSpan.getText()

    assert.equal(newItemClass, 'done-false')
    assert.equal(newItemText, newText)

    await driver.sleep(500)
    
    await driver.findElement(By.xpath(`//input[@name='li6']`)).click()
    
    assert.equal(await newItemSpan.getAttribute('class'), 'done-true')


  }
  catch(e){
    driver.takeScreenshot().then(function(img) {
      fs.writeFileSync(`./screenshots/screenshot_error_${Date.now()}.png`, img, 'base64')
    })
    console.error('Test failed', e)
  }
  finally {
    await driver.quit()
  }
}

task1()