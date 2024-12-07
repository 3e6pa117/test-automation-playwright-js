// Homework 1 test 3 (Domaci ukol lekce 5)
/* Test, který provede registraci uživatele s nevalidním heslem (obsahující pouze čísla) - registrace by se neměla povést
V tomto testu opět najdi všechny elementy s třídou invalid-feedback a vypiš jejich text do konzole */


import { test, expect } from "@playwright/test";

test.beforeEach("goto and varify registrace page", async ({ page }) => {

    await page.goto("/registrace");
    await expect(page).toHaveURL(/ *registrace /);
    console.log("The Registrace page is open");
});

test.afterEach ("Back", async ({ page }) => {
    await page.goto ('https://team8-2022brno.herokuapp.com');
});

test ("Wrong password", async ({ page }) => {
    
    await page.goto("/registrace");
    await expect(page).toHaveURL(/registrace/);

    const nameField = page.getByText("Jméno a příjmení");
    const emailField = page.getByText("Email");        
    const passwordField = page.getByLabel("Heslo");
    const controlPassword =  page.getByLabel("Kontrola hesla");
    const registraceButton = page.getByRole('button', {name: 'Zaregistrovat'});
        
    await nameField.fill('Frodo Baggins');
    await emailField.fill('Frodo@lost.com');
    await passwordField.fill('123456');
    await controlPassword.fill('123456');
    await page.screenshot({ path: "homework_13_1.png" });
    await registraceButton.click();
    console.log("click"); 
    
    const toastMessage = page.locator(".toast-message").textContent();
    const fieldError = await page.getByRole("alert").textContent(); 
    
    await expect(fieldError).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
    
    console.log("Field error message is : "+ fieldError);
    console.log("Toast error message is : "+ toastMessage);
    //page.locator(".invalid-feedback");
    //await toastMessage.screenshot({path:'toastMessage.png'});
    //
    //console.log("ToastMessage: "+ toastMessage);
    //console.log ("FieldError: "+ fieldError);
        //await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        //await expect(fieldError).toHaveText("Účet s tímto emailem již existuje");
          



        //console.log("Well done!");
     await page.screenshot({ path: "homework_13_2.png" });
    
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
