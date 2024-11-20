import { test, expect } from "@playwright/test";
import { username, password } from "../fixtures/fixtures";

/**
 * Lesson 3: Locators and element interactions
 */
test.beforeEach("goto and varify registrace page", async ({ page }) => {

    await page.goto("/registrace");
    
    console.log("registrace page open");

    await expect(page).toHaveTitle("Registrace - Czechitas");
    // Finding name field, checking if it is enabled and visible
    const nameField = page.getByText("Jméno a příjmení");
    const emailField = page.getByText("Email");
    const passwordField = page.getByLabel("Heslo");
    const controlPassword =  page.getByLabel("Kontrola hesla");
    const registraceButton = page.getByRole('button', {name: 'Zaregistrovat'});
    
    
    console.log("Name field is visible" + await nameField.isVisible());
    console.log("Name field is enabled" + await nameField.isEnabled());

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

test.afterEach ("Back", async ({ page }) => {
    await page.goto ('https://team8-2022brno.herokuapp.com');
});

test ("Autofill already registered", async ({ page }) => {
    
    const nameField = page.getByText("Jméno a příjmení");
    const emailField = page.getByText("Email");
    const passwordField = page.getByLabel("Heslo");
    const controlPassword =  page.getByLabel("Kontrola hesla");
    const registraceButton = page.getByRole('button', {name: 'Zaregistrovat'});
    
    
    await nameField.fill('John Wick');
    await emailField.fill('John@lost.com');
    await passwordField.fill('Jw1234');
    await (page.getByLabel("Kontrola hesla")).fill('Jw1234');
    await page.screenshot({ path: "homework1.png" });
    registraceButton.click();

    const toastMessage = page.locator(".toast-message");
    const fieldError = page.locator(".invalid-feedback");
    await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
    await expect(fieldError).toHaveText("Účet s tímto emailem již existuje");

    //console.log("Well done!");
    await page.screenshot({ path: "homework2.png" });
});

test ("Autofill wrong password", async ({ page }) => {
    
    const nameField = page.getByText("Jméno a příjmení");
    const emailField = page.getByText("Email");        
    const passwordField = page.getByLabel("Heslo");
    const controlPassword =  page.getByLabel("Kontrola hesla");
    const registraceButton = page.getByRole('button', {name: 'Zaregistrovat'});
        
        
    await nameField.fill('Frodo Baggins');
    await emailField.fill('Frodo@lost.com');
    await passwordField.fill('123456');
    await controlPassword.fill('123456');
    await page.screenshot({ path: "homework3.png" });
    await registraceButton.click();
    console.log("click"); 
    
    const toastMessage = page.locator(".toast-message");
    const fieldError = await page.getByRole("alert").textContent(); 
    
    console.log("Error message is : "+ fieldError);
    //page.locator(".invalid-feedback");
    //await toastMessage.screenshot({path:'toastMessage.png'});
    //
    //console.log("ToastMessage: "+ toastMessage);
    //console.log ("FieldError: "+ fieldError);
        //await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        //await expect(fieldError).toHaveText("Účet s tímto emailem již existuje");
          



        //console.log("Well done!");
     await page.screenshot({ path: "homework2.png" });
    
});
    /*// Finding login button, checking text content
    const loginButton = page.getByRole("button", { name: "Přihlásit"});
    console.log("Login button text: " + await loginButton.textContent());

    // Finding forgot password link
    const link = page.getByText("Zapomněli jste své heslo?").getAttribute("href");
    console.log("Forgot password? link: " + await link);

    // Login
    await emailField.fill(username);
    await passwordField.fill(password);
    await loginButton.click();

    // Print users full name
    // const currentUser = $(".navbar-right").$("strong").getText();
    const currentUser = page
        .locator(".navbar-right")
        .locator("strong")
        .textContent();
    console.log("Current user name:" + await currentUser);

    // Got to applications page
    await page.getByRole("link", {name: "Přihlášky"}).click();
    await page.waitForLoadState();

    // Check page title
    console.log("Page title is: " + await page.getByRole("heading", {level: 1}).textContent())

    // Check recourds count
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

    // Optional: filter the applications table
    await page.locator("input[type='search']").fill("mar");
    await page.waitForLoadState()

    const filteredRows = await page
        .locator(".dataTable")
        .locator("tbody")
        .locator("tr")
        .all();

    console.log("There are " + filteredRows.length + " filtered rows in the table");
    for (const row of filteredRows) {
        console.log(await row.textContent());
    } */
