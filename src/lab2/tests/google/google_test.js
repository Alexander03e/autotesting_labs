import { beforeEach, afterEach, describe, it } from "mocha";
import { GoogleHomePage } from "../../pages/google/google_homepage.js";

const googleHomePage = new GoogleHomePage()

describe('Google test', async function() {

  beforeEach(async function() {
    await googleHomePage.open()
  })

  it('opens Google home page and searches for selenium webdriver', async () => {
    await googleHomePage.enterSearch('selenium webdriver')
  })

  afterEach(async () => {
    await googleHomePage.closeBrowser()
  })
})