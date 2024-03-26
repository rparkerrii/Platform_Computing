import { By, Builder, Browser } from 'selenium-webdriver';
import { assert } from "assert";

(async function firstTest() {
  let driver;
  
  try {
    // Starts the session 
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    
    // Navigate to the webpage provided
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    
    // Requests the browser information when opening
    let title = await driver.getTitle();
    assert.equal("Web form", title);
  
    // Waits to make sure the element provided is on the webpage
    await driver.manage().setTimeouts({implicit: 500});
  
    // Finds an element to interact with
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
  
    // Takes action on an element 
    await textBox.sendKeys('Selenium');
    await submitButton.click();
  
    let message = await driver.findElement(By.id('message'));
    
    // stores the element that was requested
    let value = await message.getText();
    assert.equal("Received!", value);
  } catch (e) {
    console.log(e)
  } finally {
    
    // Ends the process which closes the webpage as well
    await driver.quit();
  }
}())