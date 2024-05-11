import { MospolytechPage } from "../../pages/mospolytech/mospolytech.js";
import { beforeEach, afterEach, describe, it } from "mocha";
import { assert } from "chai";

const mp = new MospolytechPage('221-323')

describe('mp test', () => {

  before(async () => {
    await mp.open()
  })

  it('открытие расписания', async () => {
    await mp.openTable()
  })

  it('проверка на открытие новой вкладки', async () => {
    const check = await mp.openTableSiteInNewWindow()
    assert.isTrue(check, 'новая вкладка не была открыта')
  })

  it('ввод группы', async () => {
    await mp.enterGroup()
  })
  
  it('проверка на количество групп в списке, проверка на то, есть ли нужная группа в списке', async () => {
    const groups = await mp.getGroups()
    const myGroup = await mp.findGroup()
    assert.isTrue(groups == 1, 'было найдено больше, чем одна группа')
    assert.isTrue(myGroup, 'найденная группа не соответсвует заданной')
  })

  it('проверка на соответствие текущего дня недели в расписании', async () => {
    await mp.clickGroup()
    assert.equal(await mp.checkColorOfCurrentDay(), true)
  })

  afterEach(async function(){
    if (this.currentTest.state === 'failed'){
      await mp.saveScreenshot(this.currentTest.title)
      console.log(`скриншот сохранен в папке screenshots/lab2/${this.currentTest.title}`)
    }
  })

  after(async () => {
    await mp.closeBrowser()
  })
})