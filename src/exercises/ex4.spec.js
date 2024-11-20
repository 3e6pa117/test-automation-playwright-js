import { expect, test } from "@playwright/test";
import {
    username,
    password,
    userFullName,
    applicationsSearchText,
    applicationsPageSize,
} from "../fixtures/fixtures.js"
import {RegExp} from "../fixtures/regular-expressions";


test("should login and list applications", async ({ page }) => {

    await page.goto("/prihlaseni");
    console.log(await page.title());

    const loginButtonLocator = page.getByRole("button", { name: 'Přihlásit'});
    console.log("login button attached" + await expect(loginButtonLocator).toBeAttached());
    
    await loginButtonLocator.click();
    const toastMessage = page.locator(".toast-message");
    console.log('je to');

    const emailField = page.getByLabel("Email");
    await expect(emailField, "email field should be visible").toBeVisible();
    await expect(emailField, "email field should be enabled").toBeEnabled();

    const passwordField = page.getByLabel("Heslo");
    await expect(passwordField, "password field should be visible").toBeVisible();
    await expect(passwordField, "password field should be enabled").toBeEnabled();

    await emailField.fill(username);
    await passwordField.fill(password);
    await loginButtonLocator.click();


    const currentUser = page
    .locator(".navbar-right")
    .locator("strong")
    .textContent();
    
    console.log("Current user name:" + await currentUser);

    await page.getByRole("link", {name: "Přihlášky"}).click();
    await page.waitForLoadState();

    // Check page title
    console.log("Page title is: " + await page.getByRole("heading", {level: 1}).textContent())

    const tableSizeInfo = page.locator("#DataTables_Table_0_info");
    console.log(await tableSizeInfo.textContent());

    // Print all applications
    const rows = await page
        .locator(".dataTable")
        .locator("tbody")
        .locator("tr")
        .all();

    console.log("There are " + rows.length + " rows in the table");
    for (const row of rows) {
        const rowText = await row.textContent()
        console.log(rowText);
    }
});

        



