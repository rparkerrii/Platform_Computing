const { createConnection }= require("mysql");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let connection = createConnection({
  host: "localhost",
  user: "meows",
  password: "testpassword123",
  database: "sakila"
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

function insertMetric(presenceTime, scrolls) {
  const timestamp = new Date();
  const sql = 'INSERT INTO metric_tracker (create_time, presence_time, scrolling) VALUES (?, ?, ?)';
  const values = [`${timestamp.getFullYear()}-${timestamp.getMonth()}-${timestamp.getDay()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`, presenceTime, scrolls];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log('Inserted metric with id: ' + result.insertId);
  });
}
// Set up Chrome options
const options = new chrome.Options();
options.addArguments("--headless"); // Run Chrome headlessly

// Initialize browser
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();

// Navigate to your website
driver.get("http://localhost:3000/");

const metrics = [];
// Track presence time
const startTime = new Date().getTime() / 1000;
var presenceTime = startTime;
var numClicks = 0;
var scrollInPixels = 0;
const interval = setInterval(() => {
  const currentTime = new Date().getTime() / 1000;
  presenceTime = currentTime - startTime;
  console.log(`Presence time: ${presenceTime} seconds`);

  // Track scrolling
  driver.executeScript("return document.body.scrollHeight").then((scrollHeight) => {
    driver.executeScript("return window.pageYOffset").then((currentScroll) => {
      console.log(`Scrolled ${currentScroll}/${scrollHeight} pixels`);
      scrollInPixels+= currentScroll;
    });
    insertMetric(presenceTime, scrollInPixels);
  });

  // Track clicks
  driver.findElements(By.css("button")).then((buttons) => {
     buttons.forEach((button) => {
       button.click();
       numClicks++;
     });
     console.log(`Number of clicks: ${numClicks}`);
   });
}, 2000);

process.stdin.resume(); // so the program will not close instantly
function exitHandler(options, exitCode) {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection: ' + err.stack);
      return;
    }
    console.log('MySQL connection closed successfully');
  });

  if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

// do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));