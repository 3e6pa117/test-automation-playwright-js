import {expect, test} from "@playwright/test";
import {
    username,
    password,
    userFullName,
} from "../fixtures/fixtures.js"

/**
 * Lesson 5: Test organization Lekce 6 Functions
 */

async function emailFieldLocator(page) {
    
    return page.getByLabel("Email");  
}
async function passwordFieldLocator(page) {
    
    return page.getByLabel("Heslo");  
}
async function loginButtonLocator(page) {
    
    return page.getByRole("button", { name: "Přihlásit"});
}
async function navbarRightLocator(page) {
    
    return page.locator(".navbar-right");
}
async function logoutLinkLocator(page) {
    
    return page.locator("#logout-link");
}

test.describe("Login Page", () => {

    test.beforeEach(async ({page}) => {
        await page.goto("/prihlaseni");
    });

    test("should show login form", async ({ page }) => {
        const emailField = await emailFieldLocator(page);
        await expect(emailField, "email field should be visible").toBeVisible();
        await expect(emailField, "email field should be enabled").toBeEnabled();

        const passwordField = await passwordFieldLocator(page);
        await expect(passwordField, "password field should be visible").toBeVisible();
        await expect(passwordField, "password field should be enabled").toBeEnabled();

        const loginButton = await loginButtonLocator(page);
        await expect(loginButton, "login button should be visible").toBeVisible();
        await expect(loginButton, "login button text should have text").toHaveText("Přihlásit");
    });

    test("should login with valid credentials", async ({ page }) => {
        const emailField = await emailFieldLocator(page);
        const passwordField = await passwordFieldLocator(page);
        const loginButton = await loginButtonLocator(page);

        await emailField.fill(username);
        await passwordField.fill(password);
        await loginButton.click();

        const currentUser = page
            .locator(".navbar-right")
            .locator("strong");
        await expect(currentUser, "current user should be displayed").toHaveText(userFullName);
    });

    test("should not login with invalid credentials", async ({ page }) => {
        const emailField = await emailFieldLocator(page);
        const passwordField = await passwordFieldLocator(page);
        const loginButton = await loginButtonLocator(page);

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
    });

    test("should logout", async ({ page }) => {
        const emailField = await emailFieldLocator(page);
        const passwordField = await passwordFieldLocator(page);
        const loginButton = await loginButtonLocator(page);

        const navbarRight = await navbarRightLocator(page);
        const userNameDropdown = navbarRight.locator("[data-toggle='dropdown']");
        const logoutLink = await logoutLinkLocator(page);

        await emailField.fill(username);
        await passwordField.fill(password);
        await loginButton.click();

        await expect(userNameDropdown).toHaveText(userFullName);

        await userNameDropdown.click();
        await logoutLink.click();

        await expect(userNameDropdown).toBeVisible({ visible: false });
        await expect(navbarRight).toHaveText("Přihlásit");
    });
});
