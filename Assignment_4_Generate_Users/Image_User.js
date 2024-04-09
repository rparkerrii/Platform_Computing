const {Builder, By, Key, until} = require('selenium-webdriver');

// Function to check if there are images on the webpage
async function checkForImages(driver) {
    const images = await driver.findElements(By.tagName('img'));
    return images.length > 0;
}

// Function to extend presence time for each image found
async function extendPresenceTimeForImages(driver, presenceTime) {
    const images = await driver.findElements(By.tagName('img'));
    if (images.length > 0) {
        const extendedTime = presenceTime + (images.length * 10);
        console.log(`Extending presence time by ${images.length * 10} seconds for ${images.length} images...`);
        await driver.sleep((extendedTime - presenceTime) * 1000);
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

    const presenceTime = await extendPresenceTimeForImages(driver, (new Date().getTime() - startTime) / 1000);

    await driver.quit();
    return presenceTime;
}

// Test with a website containing multiple images
const urlWithImages = "https://lzmfg.com/";
getPresenceTime(urlWithImages)
    .then(presenceTime => {
        console.log("Presence time with images:", presenceTime, "seconds");
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });

// Test with a website not containing images
const urlWithoutImages = "https://justinjackson.ca/words.html";
getPresenceTime(urlWithoutImages)
    .then(presenceTime => {
        console.log("Presence time without images:", presenceTime, "seconds");
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });