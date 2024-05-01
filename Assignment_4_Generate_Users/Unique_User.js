const { Builder, By } = require('selenium-webdriver');

async function main() {
    const driver = await new Builder().forBrowser('chrome').build();

    let startTime = new Date(); // Store the start time

    try {
        await userAction(driver);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for the page to be visible for at least 1 second
    } finally {
        await driver.quit();
        let endTime = new Date(); // Store the end time
        let totalTime = endTime - startTime; // Calculate total time in milliseconds
        let totalTimeRounded = Math.round(totalTime / 10000) * 10; // Round to the nearest 10 seconds
        console.log(`Total time the webpage was open: ${totalTimeRounded} seconds`); // Convert milliseconds to seconds and print rounded total time
    }
}

async function userAction(driver) {
    const localhostURL = "http://localhost:3000/";
    await driver.get(localhostURL);

    // Keywords, links, and images to search for
    const elementsToSearch = [
        { type: 'link', tag: 'a', selector: By.tagName('a'), waitTime: 10000 },
        { type: 'image', tag: 'img', selector: By.tagName('img'), waitTime: 10000 },
        { type: 'keyword', keyword: 'About', waitTime: 10000 }
    ];

    // Calculate total time to stay on the page
    let totalTime = 0;

    for (const element of elementsToSearch) {
        totalTime += await checkElement(driver, element);
    }

    // Wait for the total time
    await new Promise(resolve => setTimeout(resolve, totalTime));
}

async function checkElement(driver, element) {
    let totalTime = 0;

    switch (element.type) {
        case 'link':
        case 'image':
            const elements = await driver.findElements(element.selector);
            totalTime += elements.length * element.waitTime;
            break;
        case 'keyword':
            const bodyText = await driver.findElement(By.tagName('body')).getText();
            if (bodyText.includes(element.keyword)) {
                totalTime += element.waitTime;
            }
            break;
    }

    return totalTime;
}

main();