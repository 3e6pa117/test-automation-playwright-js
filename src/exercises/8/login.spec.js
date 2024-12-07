/**
 * Lesson 6: Code organization: functions - Exercise 1
 */
import {username, password, userFullName} from "../fixtures/fixtures.js"
import {expect, test} from "@playwright/test";
import {LoginPage} from "./pages/login.page.js";

const pageTitle = "Přihlášení - Czechitas";



test.describe("Login Page", async () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        
        await test.expect(page).toHaveTitle(pageTitle);
    
        await expect(loginPage.emailFieldLocator, 'login page should be visible').toBeVisible();
        await expect(loginPage.emailFieldLocator).toBeEnabled();

        await expect(loginPage.passwordFieldLocator).toBeVisible();
        await expect(loginPage.passwordFieldLocator).toBeEnabled();

        await expect(loginPage.loginButtonLocator).toBeVisible();
        await expect(loginPage.loginButtonLocator).toHaveText("Přihlásit"); 
        
    });


    test("should login with valid credentials", async ({page}) => {

        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);
        
        // await login(page, username, password);

        await expect(loginPage.usernameDropdownLocator).toHaveText(userFullName);
        // await expect(await getUserNameDropdown(page).textContent()).toEqual(userFullName);
    

        await test.step("should logout", async () => {
            //const loginPage = new LoginPage(page);
            await expect(loginPage.usernameDropdownLocator).toHaveText(userFullName);
            await loginPage.logOut();
            await expect(loginPage.rightNavbarLocator).toHaveText("Přihlásit");
        });
    });


    test("should not login with invalid credentials", async ({ page }) => {
      
        const loginPage = new LoginPage(page);
        await loginPage.login(username, "invalid");
        // login(page, username, "invalid");
        
        
        console.log((loginPage.toastLocator).allinn());
        //const toast = await getToast(page);
        //const errorField = await getFieldError(page);
        
        await expect(loginPage.toastLocator).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        await expect(loginPage.fieldErrorLocator).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");

        await expect(loginPage.emailFieldLocator).toBeVisible();
        await expect(loginPage.passwordFieldLocator).toBeVisible();
        await expect(loginPage.loginButtonLocator).toBeVisible();
        
    }); 

});
