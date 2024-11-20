// Homework 1 test 1 (Domaci ukol lekce 5)
/* Test který přejde na formulář registrace a zkontroluje, že se formulář správně zobrazil. 
Vypiš do konzole stavy políček a tlačítek */

import { test, expect } from "@playwright/test";

test("goto and varify registrace page", async ({ page }) => {

    await page.goto("/registrace");
    await expect(page).toHaveURL(/registrace/);
    await expect(page).toHaveTitle("Registrace - Czechitas");
    console.log("The registration page is open");

    
    // Finding name field, checking if it is enabled and visible
    const nameField = page.getByText("Jméno a příjmení");
    const emailField = page.getByText("Email");
    const passwordField = page.getByLabel("Heslo");
    const controlPassword =  page.getByLabel("Kontrola hesla");
    const registraceButton = page.getByRole('button', {name: 'Zaregistrovat'});
    
    
    console.log("Name field is visible " + await nameField.isVisible());
    console.log(`Name field is enabled ${await nameField.isEnabled()}`);
    
    //await nameField.fill('John Wick');
    // Finding email field, checking if it is enaconst emailField = page.getByText("Email");
    console.log("Email field is visible" + await emailField.isVisible());
    console.log("Email field is enabled" + await emailField.isEnabled());
    //await emailField.fill('John@lost.com');
    
     // Finding password field, checking if it is enabled and visible
    
    console.log("Password field is visible" + await passwordField.isVisible());
    console.log("Password field is enabled" + await passwordField.isEnabled());
    //await passwordField.fill('Jw1234');
    console.log('ok');


    console.log("Password field is visible" + await registraceButton.isVisible());
    console.log("Password field is enabled" + await registraceButton.isEnabled());
    //await (page.getByLabel("Kontrola hesla")).fill('Jw1234');
    console.log('ok');

    console.log("Button is visible" + await registraceButton.isVisible());
    console.log("Button is enabled" + await registraceButton.isEnabled());

});
