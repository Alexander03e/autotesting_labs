import { beforeEach, afterEach, describe, it } from "mocha";
import { assert } from "chai";
import { LambdaPage } from "../../pages/lambda_test/lambda.js";

const lambdaPage = new LambdaPage()

describe('lambda test', () => {
  before(async () => {
    await lambdaPage.open()
    await lambdaPage.getElements()
  })

  it('проверка заголовка', async () => {
    assert.isTrue(
      await lambdaPage.checkTitle(),
      'заголовок не соответствует'
    )
  })

  it('проверка первого чекбокса на выполнение', async () => {
    const item = await lambdaPage.getItem(1)
    assert.isTrue(
      await lambdaPage.isItemNotActive(item),
      'первый чекбокс не должен быть активен'
    )
  })

  it('нажать на первый элемент, проверить активен он или нет, затем проверить заголовок', async () => {
    const item = await lambdaPage.getItem(1)
    await lambdaPage.clickItem(1)

    assert.isTrue(
      await lambdaPage.isItemActive(item),
      'первый элемент должен быть активен после клика по нему'
    )
    assert.isTrue(
      await lambdaPage.checkTitle(),
      'заголовок не соответствует'
    )
  })

  it ('проверка остальных элементов активны или нет, затем нажать на них и проверить, стали ли они активны', async () => {
    const {total, falseTotal} = await lambdaPage.getElements()
    for (let i=2; i<=total; i++) {
      const item = await lambdaPage.getItem(i)
      assert.isFalse(
        await lambdaPage.isItemActive(item),
        `элемент ${i} должен быть неактивен`
      )
      await lambdaPage.clickItem(i)
      assert.isTrue(
        await lambdaPage.isItemActive(item),
        `элемент ${i} должен быть активен после клика`
      )
      assert.isTrue(
        await lambdaPage.checkTitle(),
        'заголовок неправильный'
      )
    }
  })

  it('добавление нового элемента и его проверка', async () => {
    await lambdaPage.createNewItem('new item')
    const {total, falseTotal} = await lambdaPage.getElements()
    const newItem = await lambdaPage.getItem(total)
    assert.isFalse(
      await lambdaPage.isItemActive(newItem),
      'добавленный элемент должен быть неактивен'
    )
    assert.isTrue(
      await lambdaPage.checkTitle(),
      'заголовок неверный'
    )

  })
  it('клик по новому элементу', async () => {
    const {total, falseTotal} = await lambdaPage.getElements()
    const newItem = await lambdaPage.getItem(total)
    await lambdaPage.clickItem(total)
    assert.isTrue(
      await lambdaPage.isItemActive(newItem),
      'новый элемент должен быть активным после клика'
    )
    assert.isTrue(
      await lambdaPage.checkTitle(),
      'заголовок отображается неверно после добавления нового элемента'
    )
  })

  // it('click all items, then check active', async () => {
  //   for (i=0; i<=)
  // })

  afterEach(async function(){
    if (this.currentTest.state === 'failed'){
      await lambdaPage.saveScreenshot(this.currentTest.title)
      console.log(`скриншот сохранен в папке screenshots/lab2/${this.currentTest.title}`)
    }
  })

  after(async () => {
    await lambdaPage.closeBrowser()
  })
})
