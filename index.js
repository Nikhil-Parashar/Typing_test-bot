const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://typing-speed-test.aoeu.eu/");
  await page.waitForSelector(".nextword");
  const words = await page.evaluate(() => {
    const wordElements = document.querySelectorAll(".nextword");
    const wordList = [document.querySelector(".currentword").innerText];
    wordElements.forEach((word) => {
      wordList.push(word.innerText);
    });
    return wordList;
  });

  for (let i = 0; i < words.length; i++) {
    await page.type("#input", words[i]);
    await page.keyboard.press("Space");
  }

  //await browser.close();
})();
