//Homework2 - fixtures

const base = require('@playwright/test');
const { MainPage } = require('./main.page');
require('dotenv').config();

const { BASE_URL } = process.env;

exports.test = base.test.extend({
     mainPage: async ({page}, use) => {
        const mainPage = new MainPage(page);
        await page.goto(BASE_URL);
        await use(mainPage);
    }
});

export { expect } from "@playwright/test";