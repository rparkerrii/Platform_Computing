const { Builder, By } = require('selenium-webdriver');

// Find keyword 
async function findKeyword(driver, keyword) {
    let pageSource = await driver.getPageSource();
    return pageSource.toLowerCase().includes(keyword.toLowerCase());
}

// Find element count by tag name
async function countElem(driver, tagName) {
    let elements = await driver.findElements(By.tagName(tagName));
    return elements.length;
}

// Perform user action based on action type
async function performUserAction(action, driver, rewardTime, reqList) {
    let totalRewardTime = 0;
    if (action.toUpperCase() === "KEYWORD") {
        for (let keyword of reqList) {
            if (await findKeyword(driver, keyword)) {
                console.log("Found", keyword);
                totalRewardTime += rewardTime;
            } else {
                console.log(keyword, "not found");
            }
        }
    } else if (action.toUpperCase() === "IMAGE") {
        let numImages = await countElem(driver, reqList[0]);
        totalRewardTime = rewardTime * numImages;
    } else if (action.toUpperCase() === "LINK") {
        let numLinks = await countElem(driver, 'a');
        totalRewardTime = rewardTime * numLinks;
    }
    await new Promise(resolve => setTimeout(resolve, totalRewardTime * 1000)); // Reward time for each action
    return totalRewardTime;
}

// User action for keyword, image, and link on webpage
async function userAction(driver, rewardTime) {
    const keywords = ["About"]; // Keywords to search for
    const imageTag = "img"; // Tag name of images
    const linkTag = "a"; // Tag name of links

    const keywordRewardTime = await performUserAction("KEYWORD", driver, rewardTime, keywords);
    const imageRewardTime = await performUserAction("IMAGE", driver, rewardTime, [imageTag]);
    const linkRewardTime = await performUserAction("LINK", driver, rewardTime, [linkTag]);

    const totalRewardTime = keywordRewardTime + imageRewardTime + linkRewardTime;
    return totalRewardTime;
}

async function main() {
    // Open local host page
    const driver = await new Builder().forBrowser('chrome').build();
    const localhostURL = "http://localhost:3000/";
    await driver.get(localhostURL);

    const startTime = new Date();

    // Perform user actions
    const rewardTime = 10;
    await userAction(driver, rewardTime);

    // Calculate time on page and print to console
    const endTime = new Date();
    const totalTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    console.log(`Total time on the page: ${Math.round(totalTime)} seconds`);

    await driver.quit();
}

main();