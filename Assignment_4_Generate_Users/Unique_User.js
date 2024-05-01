const { Builder, By } = require('selenium-webdriver');

// Find keyword 
async function findKeyword(driver, keyword) {
    let pageSource = await driver.getPageSource();
    return pageSource.toLowerCase().includes(keyword.toLowerCase());
}

// Find image
async function countElem(driver, tagName) {
    let elements = await driver.findElements(By.tagName(tagName));
    return elements.length;
}

// userAction for keyword, image, and link on webpage
async function userAction(action, driver, rewardTime, reqList) {
    let totalRewardTime = 0;
    if (action.toUpperCase() === "KEYWORD") {
        for (let keyword of reqList) {
            if (await findKeyword(driver, keyword)) {
                console.log("found", keyword);
                await new Promise(resolve => setTimeout(resolve, rewardTime * 1000)); // Reward time for each keyword
                totalRewardTime += rewardTime;
            } else {
                console.log(keyword, " not found");
            }
        }
    } else if (action.toUpperCase() === "IMAGE") {
        let numImages = await countElem(driver, reqList[0]);
        totalRewardTime = rewardTime * numImages;
        await new Promise(resolve => setTimeout(resolve, rewardTime * 1000)); // Reward time for each image
    } else if (action.toUpperCase() === "LINK") {
        let numLinks = await countElem(driver, 'a');
        totalRewardTime = rewardTime * numLinks;
        await new Promise(resolve => setTimeout(resolve, rewardTime * 1000)); // Reward time for each link
    }
    return totalRewardTime;
}

async function main() {
    // Open local host page
    const driver = await new Builder().forBrowser('chrome').build();
    const localhostURL = "http://localhost:3000/";
    await driver.get(localhostURL);

    const startTime = new Date();
    
    const rewardTime = 10;
    const helper1 = ["About"]; // Keyword to search for
    const helper2 = ["img"]; // Tag name of images
    const helper3 = ["a"]; // Tag name of links
    console.log("in userAction");
    
    // Keyword reward time
    for (const keyword of helper1) {
        if (findKeyword(driver, keyword)) {
            await new Promise(resolve => setTimeout(resolve, rewardTime * 1000));
        }
    }

    // Image reward time
    for (const tagName of helper2) {
        if (countElem(driver, tagName)) {
            await new Promise(resolve => setTimeout(resolve, rewardTime * 1000));
        }
    }

    //Link reward time
    for (const tagName of helper3) {
        if (countElem(driver, tagName)) {
            await new Promise(resolve => setTimeout(resolve, rewardTime * 1000));
        }
    }

    // Calculate time on page and print to console
    const endTime = new Date();
    const totalTime = endTime - startTime;
    console.log(`Total time on the page: ${Math.round(totalTime / 1000)} seconds`);

    await driver.quit();
}

main();