/**
 * Homework2 - Page object describing the main page 
 ** @type {exports.MainPage}
 */

exports.MainPage = class MainPage {

constructor(page) {
    this.page = page,
    this.pageTitle = page.locator("head > title"),
    this.teachersMenuLocator = page.locator('a', {hasText: "Pro učitelé"}),
    this.orderForSchools = page.locator('a', {hasText: "Objednávka pro MŠ/ZŠ"})
};

async open() {
        await this.page.goto("/objednavka/pridat");
    }

async openNewOrderForSchools () {
    await this.teachersMenuLocator.click();
    await this.orderForSchools.click();
    await this.page.waitForLoadState();
}
}