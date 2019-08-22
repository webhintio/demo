const puppeteer = require('puppeteer');

test('The page is loading the header correctly', () => {
    puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe'
    }).then(async browser => {
        const page = await browser.newPage();
        await page.goto('http://localhost:4200/');
        await page.waitForSelector('h1');
        const headerText = await page.$eval('h1', node => node.innerText);
        expect(headerText).toEqual('todos');
        await browser.close();
    });
});

test('I can add a todo item', () => {
    puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe'
    }).then(async browser => {
        const page = await browser.newPage();
        await page.goto('http://localhost:4200/');
        await page.waitForSelector('input[class=new-todo]');
        await page.type('input[class=new-todo]', 'The test is adding this todo' + String.fromCharCode(13));
        const toDoText = await page.$eval('input[class=toggle]', node => node.nextElementSibling.innerText);
        expect(toDoText).toEqual('The test is adding this todo');
        await browser.close();
    });
});

