const { Builder, By, Key, until } = require('selenium-webdriver');

// Function to check if content contains a keyword
function checkForKeyword(content, keyword) {
    return content.toLowerCase().includes(keyword.toLowerCase());
}

// Function to check if there are images on the webpage
async function checkForImages(driver) {
    const images = await driver.findElements(By.tagName('img'));
    return images.length > 0;
}

// Function to check if there are links on the webpage
async function checkForLinks(driver) {
    const links = await driver.findElements(By.tagName('a'));
    return links.length > 0;
}

// Function to simulate user behavior
async function simulateUserBehavior(url, keyword) {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get(url);
    const startTime = new Date().getTime();

    // Get page content
    const content = await driver.findElement(By.tagName('body')).getText();

    // Check if content contains the keyword
    const keywordPresent = checkForKeyword(content, keyword);

    // Check for images and links
    const imagesPresent = await checkForImages(driver);
    const linksPresent = await checkForLinks(driver);

    // Determine presence time based on user preferences
    let presenceTime = 0;
    if (keywordPresent && imagesPresent && linksPresent) {
        // User is highly engaged
        presenceTime = Math.floor(Math.random() * 61) + 60; // Random duration between 60 to 120 seconds
    } else if (keywordPresent && imagesPresent) {
        // User is moderately engaged
        presenceTime = Math.floor(Math.random() * 31) + 30; // Random duration between 30 to 60 seconds
    } else if (keywordPresent) {
        // User is somewhat engaged
        presenceTime = Math.floor(Math.random() * 21) + 10; // Random duration between 10 to 30 seconds
    }


    // Wait for the determined presence time
    await driver.sleep(presenceTime * 1000);

    await driver.quit();
    return presenceTime;
}

// Test with a website
const url = "https://lzmfg.com/";
const keyword = "menu";
simulateUserBehavior(url, keyword)
    .then(presenceTime => {
        console.log("User spent", presenceTime, "seconds on the site.");
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });