const { Builder, By } = require('selenium-webdriver');

async function main() {
    const driver = await new Builder().forBrowser('chrome').build();

    let startTime = new Date(); // Store the start time

    try {
        await processPage(driver);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for the page to be visible for at least 1 second
    } finally {
        await driver.quit();
        let endTime = new Date(); // Store the end time
        let totalTime = endTime - startTime; // Calculate total time in milliseconds
        console.log(`Total time the webpage was open: ${totalTime / 1000} seconds`); // Convert milliseconds to seconds
    }
}

async function processPage(driver) {
    await driver.get('http://localhost:3000/');

    // Find all links
    const links = await driver.findElements(By.tagName('a'));
    // Find all images
    const images = await driver.findElements(By.tagName('img'));
    // Keywords to search for
    const keywords = ['About'];

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

    // Wait for the total time
    await new Promise(resolve => setTimeout(resolve, totalTime));
}

main();
