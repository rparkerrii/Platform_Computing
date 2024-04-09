const { Builder, By, Key, until } = require('selenium-webdriver');

// Function to check if a link exists
async function checkForLink(driver) {
    const links = await driver.findElements(By.tagName('a'));
    return links.length > 0 ? links[0] : null;
}

// Function to extend presence time for a link and click on it
async function extendPresenceTimeAndClickLink(driver, presenceTime) {
    const link = await checkForLink(driver);
    if (link !== null) {
        const extendedTime = presenceTime + 10;
        console.log("Extending presence time by 10 seconds for the link...");
        await link.click();
        await driver.sleep(10000); // Wait for 10 seconds after clicking the link
        return extendedTime;
    } else {
        return presenceTime;
    }
}

// Function to get presence time on a webpage
async function getPresenceTime(url) {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get(url);
    const startTime = new Date().getTime();

    let presenceTime = startTime / 1000;
    presenceTime = await extendPresenceTimeAndClickLink(driver, presenceTime);

    await driver.quit();
    return (new Date().getTime() - startTime) / 1000;
}

// Test with a website containing a link
const urlWithLink = "https://lzmfg.com/";
getPresenceTime(urlWithLink)
    .then(presenceTime => {
        console.log("Presence time with link:", presenceTime, "seconds");
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });

// Test with a website not containing a link
const urlWithoutLink = "https://justinjackson.ca/squirrel/";
getPresenceTime(urlWithoutLink)
    .then(presenceTime => {
        console.log("Presence time without link:", presenceTime, "seconds");
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });