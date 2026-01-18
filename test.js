console.log("Starting Quiz Master Automation Test...");

const { Builder, By, until } = require('selenium-webdriver');

async function runQuizTest() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {

        const WAIT_TIME = 15000;

        console.log("\nTEST 1: Opening Quiz Application...");

        // IMPORTANT – USE YOUR REAL PATH
        await driver.get('file:///C:/Users/ajays/OneDrive/Desktop/frugal/quiz.html');

        console.log("Page Title:", await driver.getTitle());

        // Wait for page to fully load
        await driver.sleep(2000);

        console.log("\nTEST 2: Starting Quiz...");

        // Wait until start button appears
        await driver.wait(
            until.elementLocated(By.id('start-btn')),
            WAIT_TIME
        );

        let startBtn = await driver.findElement(By.id('start-btn'));
        await startBtn.click();

        console.log("Start button clicked");

        await driver.wait(
            until.elementLocated(By.id('question-text')),
            WAIT_TIME
        );

        console.log("Quiz started successfully");

        console.log("\nTEST 3: Answering Questions...");

        for (let i = 0; i < 5; i++) {

            await driver.wait(
                until.elementLocated(By.id('question-text')),
                WAIT_TIME
            );

            let question = await driver.findElement(By.id('question-text')).getText();

            console.log(`Question ${i + 1}: ${question}`);

            let options = await driver.findElements(By.className('option-btn'));

            // Click first option (for testing)
            await options[0].click();

            console.log(`Selected option for question ${i + 1}`);

            await driver.sleep(1000);

            let nextBtn = await driver.findElement(By.id('next-btn'));

            await driver.wait(
                until.elementIsVisible(nextBtn),
                WAIT_TIME
            );

            await nextBtn.click();

            console.log("Next question clicked");
        }

        console.log("\nTEST 4: Verifying Results Page...");

        await driver.wait(
            until.elementLocated(By.id('result-page')),
            WAIT_TIME
        );

        let summary = await driver.findElement(By.id('score-summary')).getText();

        console.log("Score Summary:", summary);

        let correct = await driver.findElement(By.id('correct-count')).getText();
        let incorrect = await driver.findElement(By.id('incorrect-count')).getText();

        console.log("Correct Answers:", correct);
        console.log("Incorrect Answers:", incorrect);

        console.log("\nAutomation Test Completed Successfully!");

    } catch (error) {
        console.log("Test Failed:", error);
    } finally {
        await driver.quit();
    }
}

runQuizTest();