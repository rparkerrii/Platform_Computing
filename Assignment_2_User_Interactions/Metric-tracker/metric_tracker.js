const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Set up Chrome options
const options = new chrome.Options();
options.addArguments("--headless"); // Run Chrome headlessly

// Initialize browser
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();

// Navigate to your website
driver.get("http://localhost:3000/");

const metrics = [];
// Track presence time
const startTime = new Date().getTime() / 1000;
let presenceTime = startTime;
let numClicks = 0;
const interval = setInterval(() => {
  const currentTime = new Date().getTime() / 1000;
  presenceTime = currentTime - startTime;
  console.log(`Presence time: ${presenceTime} seconds`);

  // Track scrolling
  driver.executeScript("return document.body.scrollHeight").then((scrollHeight) => {
    driver.executeScript("return window.pageYOffset").then((currentScroll) => {
      console.log(`Scrolled ${currentScroll}/${scrollHeight} pixels`);
    });
  });

  // Track clicks
  driver.findElements(By.tagName("button")).then((buttons) => {
     buttons.forEach((button) => {
       button.click();
       numClicks++;
     });
     console.log(`Number of clicks: ${numClicks}`);
   });

}, 2000);