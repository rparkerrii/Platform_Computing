const { Builder, By } = require('selenium-webdriver');

async function main() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await processPage(driver);
    } finally {
        await driver.quit();
    }
}

async function processPage(driver) {
    await driver.get('http://localhost:3000/');

    // Find all links
    const links = await driver.findElements(By.tagName('a'));
    // Find all images
    const images = await driver.findElements(By.tagName('img'));
    // Keywords to search for
    const keywords = ['About', 'gaba'];

    // Calculate total time to stay on the page
    let totalTime = 0;

    // Increment total time for each link and image found
    totalTime += links.length * 10000;
    totalTime += images.length * 10000;

    // Check for each keyword and increment total time if found
    for (const keyword of keywords) {
        const bodyText = await driver.findElement(By.tagName('body')).getText();
        if (bodyText.includes(keyword)) {
            totalTime += 10000;
        }
    }

    // Stay on the page for total time
    await driver.sleep(totalTime);
}

main();