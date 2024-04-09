const {Builder, By, Key, until} = require('selenium-webdriver');

// Function to check if content contains a keyword
function checkKeywordPresence(content, keyword) {
    return content.toLowerCase().includes(keyword.toLowerCase());
}

// Function to extend presence time if keyword is found
async function extendPresenceTime(driver, presenceTime) {
    // Extending presence time by 10 seconds
    const extendedTime = presenceTime + 10;
    console.log("Extending presence time by 10 seconds...");
    await driver.sleep((extendedTime - presenceTime) * 1000);
    return extendedTime;
}

// Function to get presence time on a webpage
async function getPresenceTime(url, keyword) {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get(url);
    const startTime = new Date().getTime();

    // Get page content
    const content = await driver.findElement(By.tagName('body')).getText();

    // Check if content contains the keyword
    let presenceTime;
    if (checkKeywordPresence(content, keyword)) {
        presenceTime = await extendPresenceTime(driver, (new Date().getTime() - startTime) / 1000);
    } else {
        presenceTime = (new Date().getTime() - startTime) / 1000;
    }

    await driver.quit();
    return presenceTime;
}

// Test with a website containing the keyword
const urlWithKeyword = "https://www.csusb.edu/";
const keyword = "student";
getPresenceTime(urlWithKeyword, keyword)
    .then(presenceTime => {
        console.log("Presence time with keyword:", presenceTime, "seconds");
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });

// Test with a website not containing the keyword
const urlWithoutKeyword = "https://lzmfg.com/";
getPresenceTime(urlWithoutKeyword, keyword)
    .then(presenceTime => {
        console.log("Presence time without keyword:", presenceTime, "seconds");
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });