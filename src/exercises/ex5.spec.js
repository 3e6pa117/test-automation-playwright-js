import {expect, test} from "@playwright/test";
import {
    username,
    password,
    userFullName,
    applicationsPageSize,
    applicationsSearchText
} from "../fixtures/fixtures.js"
import {RegExp} from "../fixtures/regular-expressions";

test.describe ("login", () => {

test("should test login and list applications", async ({ page }) => {
    await page.goto("/prihlaseni");

    const emailField = page.getByLabel("Email");
    const passwordField = page.getByLabel("Heslo");
    const loginButton = page.getByRole("button", { name: "Přihlásit"});

    await emailField.fill(username);
    await passwordField.fill("invalid");
    await loginButton.click();

    const toastMessage = page.locator(".toast-message");
    const fieldError = page.locator(".invalid-feedback");
    await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
    await expect(fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");
    await expect(emailField, "email field should be visible").toBeVisible();
    await expect(passwordField, "password field should be visible").toBeVisible();
    await expect(loginButton, "login buton should be visible").toBeVisible();

    await emailField.fill(username);
    await passwordField.fill(password);
    await loginButton.click();

    const currentUser = page
        .locator(".navbar-right")
        .locator("strong");
    await expect(currentUser, "current user should be displayed").toHaveText(userFullName);
});
test.describe ("Tables", () => {
    
    await page.getByRole("link", {name: "Přihlášky"}).click();
    await page.waitForLoadState();

    const loadingIndicator = page.locator("#DataTables_Table_0_processing");
    await loadingIndicator.waitFor({state: "visible"});
    await loadingIndicator.waitFor({state: "hidden"});

    const pageTitle = await page.getByRole("heading", {level: 1});
    await expect(pageTitle, "page title should be displayed").toHaveText("Přihlášky");

    const rows = await page
            .locator(".dataTable")
            .locator("tbody")
            .locator("tr")
            .all();

    await expect(rows.length, "table should have >= " + applicationsPageSize + " rows")
    .toBeGreaterThanOrEqual(applicationsPageSize);

     for (const row of rows) {
        const cells = row.locator("td");            
        await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
        await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
        await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
        await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
    }


    await page.locator("input[type='search']").fill(applicationsSearchText);
    await page.waitForLoadState()
    await loadingIndicator.waitFor({state: "visible"});
    await loadingIndicator.waitFor({state: "hidden"});

    const filteredRows = await page
        .locator(".dataTable")
        .locator("tbody")
        .locator("tr")
        .all();

    await expect(filteredRows.length, "table should have < " + applicationsPageSize + " rows")
        .toBeLessThan(applicationsPageSize);

    for (const row of filteredRows) {
        const cells = row.locator("td");
        await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
        await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
        await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
        await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
    }
});
});