// Homework 1 

import { test, expect } from "@playwright/test";

//return locator objects

async function getNameFieldLocator(page) {
    return page.locator("#name");
}
async function getEmailFieldLocator(page){
    return page.getByLabel("Email");  
}

async function getPasswordFieldLocator(page) {
    return page.getByLabel("Heslo");
}
async function getControlPasswordFieldLocator(page) {
    return page.getByLabel("Kontrola hesla");
}
async function getRegistraceButtonLocator (page) {
    return page.getByRole('button', {name: 'Zaregistrovat'});
}

async function getCurrentUserLocator(page) 
{
    const currentUser = page
        .locator(".navbar-right")
        .locator("strong");
    return currentUser;
}
async function getLoginInLocator(page) 
{
    const loginInLocator = await page.locator(".navbar-right"); 
    return loginInLocator;
}

// return texts of error messages
async function getToastMessageLocator (page) 
{
    const errorLocator = await page.locator(".toast-message").textContent();
    return errorLocator;
}

async function getFieldErrorLocator(page, thisLabel) 
{
    const errorLocator = await page
        .getByRole("alert")
        .getByText(thisLabel)
        .textContent(); 
    return errorLocator;
}

//function for navigation to the registration page
async function goToPage (page) 
{
    await page.goto("/registrace");
    await page.waitForLoadState();
}

// function for performing user registration
async function fillRegistrationForm (page, personsData)
{    
    const nameField = await getNameFieldLocator(page);
    const emailField = await getEmailFieldLocator(page);
    const passwordField = await getPasswordFieldLocator(page);
    const controlPasswordField = await getControlPasswordFieldLocator(page);
    const registraceButton = await getRegistraceButtonLocator(page);
    
    await nameField.fill(personsData.name);
    await emailField.fill(personsData.email);
    await passwordField.fill(personsData.password);
    await controlPasswordField.fill(personsData.password);
    
    await registraceButton.click();
    console.log("click registration button");  
}

// return object containing imput fields of the registration form
async function getformInputFields (page) 
{
    const formInputFields = {
        nameField: await getNameFieldLocator(page),
        emailField: await getEmailFieldLocator(page),
        passwordField: await getPasswordFieldLocator(page),
        controlPasswordField: await getControlPasswordFieldLocator(page),
    };  
    return formInputFields;
}


test.describe ("Registration page ", () => {

    test.beforeEach("Go to registration page", async ({ page }) => {

        await goToPage (page);
        await expect(page).toHaveURL(/registrace/);
        await expect(page).toHaveTitle("Registrace - Czechitas");
        console.log("The registration page is open");
    });
    
    
    test("Verify registration form", async ({ page }) => {

        const formInputFields = await getformInputFields(page);
        const registraceButton = await getRegistraceButtonLocator(page);
    
        for(var handle of Object.values(formInputFields)) {
            await expect(handle, "field is visible").toBeVisible();
            await expect(handle, "field is enabled").toBeEnabled();
            await expect(handle, "field is editable").toBeEditable();
            await expect(handle, "field is empty").toBeEmpty(); 
        };
        
        await expect(registraceButton, "registrace button is visible").toBeVisible();
        await expect(registraceButton, "registrace button is enabled").toBeEnabled();

        console.log('Registration form is visible and enabled, all fields are editable and empty');

    });

    
    test ('user valid registration', async ({ page }) => {
    
        var testId = Math.floor(Math.random() * 1000000).toString() //creating an index for email
        const usersRegistrationData = {
            name: "John Wick",
            email: "John" + testId + "@gmail.com",
            password: "Jw1234"
        };

        await fillRegistrationForm(page, usersRegistrationData);
        page.screenshot({ path: "valid_user.png" });
        const currentUser = await getCurrentUserLocator(page);
        await expect(currentUser, "current user should be displayed").toHaveText(usersRegistrationData.name);

        console.log("New user have been registered");
    });


    test ('existing user registration', async ({ page }) => {
    
        const usersRegistrationData = {
            name: "John Wick",
            email: "John@lost.com",
            password: "Qs63234"
        };
        const thisLabel="email";

        await fillRegistrationForm(page, usersRegistrationData);
        
        // check that correct error messages are displayed
        const toastMessage = await getToastMessageLocator(page);
        const fieldError = await getFieldErrorLocator(page, thisLabel); 
        
        console.log("Field error message is : "+ fieldError);
        console.log("Toast error message is : "+ toastMessage);

        await expect(fieldError).toMatch("Účet s tímto emailem již existuje");
        await expect(toastMessage).toContain("obsahuje špatně zadanou hodnotu");
        await page.screenshot({ path: "existing_user.png" });

        // check that login didn't happen
        const currentUser = await getLoginInLocator(page);
        await expect(currentUser, "user should not be loggin in").toContainText("Přihlásit");
        
        // check the initial state of the registration form
        const formInputFields = await getformInputFields(page);

        await expect(formInputFields.nameField, "name field is editable").toBeEditable();
        await expect(formInputFields.emailField, "email field is editable").toBeEditable();
        await expect(formInputFields.passwordField, "name field is editable").toBeEditable();
        await expect(formInputFields.controlPasswordField, "name field is editable").toBeEditable();
        
        await expect(formInputFields.nameField, "name field is empty").toHaveValue(usersRegistrationData.name);
        await expect(formInputFields.emailField, "field is empty").toHaveValue(usersRegistrationData.email); 
        await expect(formInputFields.passwordField, "password field is empty").toBeEmpty(); 
        await expect(formInputFields.controlPasswordField, "password field is empty").toBeEmpty(); 
        
        console.log("Test has completed successfuly");
    });

    
    test ("Wrong password (only numbers) user registration", async ({ page }) => {

        const usersRegistrationData = {
            name: "Frodo Baggins",
            email: "Frodo@lost.com",
            password: "123456"
        };

        await fillRegistrationForm(page, usersRegistrationData);

        // check that correct error messages are displayed
        const thisLabel ='Heslo';
        const toastMessage = await getToastMessageLocator(page);
        const fieldError = await getFieldErrorLocator(page, thisLabel); 
        
        console.log("Toast error message is : "+ toastMessage);
        console.log("Field error message is : "+ fieldError);
        
        await expect(fieldError).toMatch("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
        await expect(toastMessage).toContain("obsahuje špatně zadanou hodnotu");

        await page.screenshot({ path: "wrong_password.png" });

        // check the initial state of the registration form
        const formInputFields = await getformInputFields(page);
        await expect(formInputFields.nameField, "name field is editable").toBeEditable();
        await expect(formInputFields.emailField, "email field is editable").toBeEditable();
        await expect(formInputFields.passwordField, "name field is editable").toBeEditable();
        await expect(formInputFields.controlPasswordField, "name field is editable").toBeEditable();
        
        await expect(formInputFields.nameField, "name field is empty").toHaveValue(usersRegistrationData.name);
        await expect(formInputFields.emailField, "field is empty").toHaveValue(usersRegistrationData.email); 
        await expect(formInputFields.passwordField, "password field is empty").toBeEmpty(); 
        await expect(formInputFields.controlPasswordField, "password field is empty").toBeEmpty(); 
        
        console.log("Test has completed successfuly");
    });

});
