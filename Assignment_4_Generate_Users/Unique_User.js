const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Open the local host page
        await driver.get('http://localhost:3000/'); // Update the port if necessary

        // Check for keywords
        const keywords = ['keyword1', 'keyword2', 'keyword3'];
        const pageSource = await driver.getPageSource();
        const keywordFound = keywords.some(keyword => pageSource.includes(keyword));
        if (keywordFound) {
            console.log('Keywords found on the page!');
            // Increase time spent on website
            await driver.sleep(10000); // Sleep for 10 seconds
        }

        // Check for images
        const images = await driver.findElements(By.tagName('img'));
        if (images.length > 0) {
            console.log('Images found on the page!');
            // Increase time spent on website
            await driver.sleep(10000); // Sleep for 10 seconds
        }

        // Check for links
        const links = await driver.findElements(By.tagName('a'));
        if (links.length > 0) {
            console.log('Links found on the page!');
            // Increase time spent on website
            await driver.sleep(10000); // Sleep for 10 seconds
        }
        
    } finally {
        await driver.quit();
    }
})();