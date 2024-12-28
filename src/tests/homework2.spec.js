// Homework 2

import {test, expect} from "./homework2/fixtures" 
import {
    ICOclientsData,
    validClientData,
    validCampOrderData,
    invalidClientData,
    invalidCampOrderData
} from "./homework2/newOrderTestData";

//return locator objects
async function getIcoFieldLocator(page) {
    return page.locator("#ico.form-control");
}
async function getClientFieldLocator(page) {
    return page.locator("#client.form-control");
}
async function getAddressFieldLocator(page) {
    return page.locator("#address.form-control");
}
async function getRepresentativeFieldLocator(page) {
    return page.locator("#substitute.form-control");
}
async function getContactNameFieldLocator(page) {
    return page.locator("#contact_name.form-control");
}
async function getContactTelFieldLocator(page) {
    return page.locator("#contact_tel.form-control");
}
async function getContactEmailFieldLocator(page) {
    return page.locator("#contact_mail.form-control");
}
async function getUrbanCampDateLocator(page) {
    return page.locator("#camp-date_part")
}
async function getUrbanCampButtonLocator(page) {
    return page.locator("#nav-home > div.form-group > input")
}
async function submitOrderLocator(page) {
    return page.getByText("Děkujeme za objednávku")
}

// return value of the "Odpolední"/"Dopolední" field for assertations
async function campDataValue(just_let) {  
    if (just_let == "Odpolední") {
        return "afternoon"; 
    } else {
        return "forenoon";
    }
};

// return array containing start/end date fields locators
async function getArrayOfDateLocators(page) {
    let dateLocatorstArray = [];
    for (let i=1; i<4; i++) {
        let dateString = {
            startDate : await page.locator("#start_date_"+i),
            endDate : await page.locator("#end_date_"+i) 
        }
        dateLocatorstArray.push(dateString);
    } 
    return dateLocatorstArray;
}

// return object containing Clients information input fields locators
async function getFormClientsInputFields (page) {
    const formInputFields = {
        icoField: await getIcoFieldLocator(page),
        clientField: await getClientFieldLocator(page),
        addressField: await getAddressFieldLocator(page),
        representativeField: await getRepresentativeFieldLocator(page),
        contactNameField: await getContactNameFieldLocator(page),
        contactTelField: await getContactTelFieldLocator(page),
        contactEmailField: await getContactEmailFieldLocator(page),
    };  
    return formInputFields;
}

// return texts of error messages
async function getErrorMessageText (page) {
    const errorLocator = await page.locator(".toast-message");
    await errorLocator.waitFor();
    await console.log(await errorLocator.textContent());
    return errorLocator.textContent();
}

// return object containing urban camp input fields locators 
async function getUrbanCampFormLocators(page) {
    const urbanCampForm = {
        campStudents : page.locator("#camp-students"),
        campAge : page.locator("#camp-age"),
        campAdults : page.locator("#camp-adults")
    }
    return urbanCampForm
}

// function for filling ICO field in the new order form
async function fillClientsDataIco (page, icoField, ico) { 
    await icoField.fill(ico);
    await page.keyboard.press("Enter");
}

// function for filling new order client information fields
async function fillNewOrderClientsData (page, clientsData) {    
    const formInputFields = await getFormClientsInputFields(page);

    await fillClientsDataIco(page, formInputFields.icoField, clientsData.ico);
    await getErrorMessageText(page);

    await formInputFields.clientField.fill(clientsData.client);
    await formInputFields.addressField.fill(clientsData.address);
    await formInputFields.representativeField.fill(clientsData.representative);
    await formInputFields.contactNameField.fill(clientsData.contactName);
    await formInputFields.contactTelField.fill(clientsData.contactTel);
    await formInputFields.contactEmailField.fill(clientsData.contactEmail);
}

// function for filling new order urban camp information fields
async function fillNewOrderCampData (page, campOrderData)
{    
    const arrayOfDateLocators = await getArrayOfDateLocators(page);
    for (let i = 0; i < campOrderData.startDate.length; i++) {
        await arrayOfDateLocators[i].startDate.fill(campOrderData.startDate[i]);
        await arrayOfDateLocators[i].endDate.fill(campOrderData.endDate[i]);
    }
    await page.getByText("Příměstský tábor").click();
    const urbanCampForm = await getUrbanCampFormLocators(page); 
    await page.locator("#camp-date_part").selectOption({label : campOrderData.campData}); 
    await urbanCampForm.campStudents.fill(campOrderData.campStudents);
    await urbanCampForm.campAge.fill(campOrderData.campAge);
    await urbanCampForm.campAdults.fill(campOrderData.campAdults);
};


test.describe ("Go to 'For teachers : New order page' from main page", () => {
    
    test("Go to new order page", async ({ page, mainPage }) => {
        
        await mainPage.openNewOrderForSchools();    
        await expect(page).toHaveURL("/objednavka/pridat");  
        await expect(page.locator("h1")).toHaveText("Nová objednávka");
        console.log("The new order page is open");
    });
})

test.describe ("For teachers : New order page, urban camp order", () => {

    test.beforeEach("Go to new order page", async ({ page, mainPage}) => {
        
        await mainPage.open();
        await expect(page.locator("h1")).toHaveText("Nová objednávka");
        console.log("The new order page is open");
    });

    test("Verify New order form", async ({ page }) => {

        const formInputFields = await getFormClientsInputFields(page);
        for(let handle of Object.values(formInputFields)) {
            await expect(handle, "field is visible").toBeVisible();
            await expect(handle, "field is enabled").toBeEnabled();
            await expect(handle, "field is editable").toBeEditable();
            await expect(handle, "field is empty").toBeEmpty(); 
        };
        
        const arrayOfDateLocators = await getArrayOfDateLocators(page);
        for (let i=0; i<3; i++ ) {
            for(let handle of Object.values(arrayOfDateLocators[i])) {
                await expect(handle, "date field is visible").toBeVisible(); 
                await expect(handle, "date field is enabled").toBeEnabled();
                await expect(handle, "date field is editable").toBeEditable();
                await expect(handle, "date field is empty").toBeEmpty();   
            }
        }
       
        await expect(page.getByText("Příměstský tábor")).toBeVisible();
        await page.getByText("Příměstský tábor").click();

        const urbanCampForm = await getUrbanCampFormLocators(page);
        for(let handle of Object.values(urbanCampForm)) {
            await expect(handle, "field is visible").toBeVisible();
            await expect(handle, "field is enabled").toBeEnabled();
            await expect(handle, "field is editable").toBeEditable();
            await expect(handle, "field is empty").toBeEmpty(); 
        };

        console.log('All fillable form fields are visible, enabled, editable and empty');

        const urbanCampDate = await getUrbanCampDateLocator(page); // Dopolední-Odpolední
        await expect(urbanCampDate).toBeVisible();
        await expect(urbanCampDate).toBeEnabled();
        
        const submitButton = await getUrbanCampButtonLocator(page);
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
        
        console.log('"Kurz" field and submit button are visible and enabled');
    });
    
    // should fail due to unimplemented functionality
    test.fail('ICO POST.should fail', async ({ page }) => {
        
        console.log("should fail due to unimplemented functionality");
        const formInputFields = await getFormClientsInputFields(page);
       
        await page.on('request', request => console.log('>>', request.method(), request.url()));
        await page.on('response', response => console.log('<<', response.status(), response.url()));
        await fillClientsDataIco (page, formInputFields.icoField, ICOclientsData.ico);
        
        await expect.soft(formInputFields.clientField).toHaveValue(ICOclientsData.client);
        await expect.soft(formInputFields.addressField).toHaveValue(ICOclientsData.address);
    });
       
    test ('ICO POST Error', async ({ page }) => {
        
        const formInputFields = await getFormClientsInputFields(page);
       
        await page.on('request', request => console.log('>>', request.method(), request.url()));
        await page.on('response', response => console.log('<<', response.status(), response.url()));
        await fillClientsDataIco (page, formInputFields.icoField, ICOclientsData.ico);
        
        const errorText = await getErrorMessageText(page);
        await expect(page.locator(".toast-message")).toBeVisible();
        await expect(errorText, 'message: vyplňte je prosím ručně').toContain("vyplňte je prosím ručně");
        await console.log("error message is visible");

        await formInputFields.clientField.fill(ICOclientsData.client);
        await formInputFields.addressField.fill(ICOclientsData.address);
        await expect.soft(formInputFields.clientField).toHaveValue(ICOclientsData.client);
        await expect.soft(formInputFields.addressField).toHaveValue(ICOclientsData.address);
        await console.log("client name and address successfully filled in manually after an error");
    })

    test ('New order - valid data', async ({ page }) => {
    
        await fillNewOrderClientsData(page, validClientData);
        
        await test.step("check client information fields", async() => {
            const formInputFields = await getFormClientsInputFields(page);
            await expect.soft(formInputFields.clientField).toHaveValue(validClientData.client);
            await expect.soft(formInputFields.addressField).toHaveValue(validClientData.address);
            await expect.soft(formInputFields.representativeField).toHaveValue(validClientData.representative);
            await expect.soft(formInputFields.contactNameField).toHaveValue(validClientData.contactName);
            await expect.soft(formInputFields.contactTelField).toHaveValue(validClientData.contactTel);
            await expect.soft(formInputFields.contactEmailField).toHaveValue(validClientData.contactEmail);
        });

        await fillNewOrderCampData(page, validCampOrderData); 

        await test.step("check start/end dates fields", async() => {
            const arrayOfDateLocators = await getArrayOfDateLocators(page);       
            for (let i = 0; i < validCampOrderData.startDate.length; i++) {
                await expect.soft(arrayOfDateLocators[i].startDate).toHaveValue(validCampOrderData.startDate[i]);
                await expect.soft(arrayOfDateLocators[i].endDate).toHaveValue(validCampOrderData.endDate[i]);
            }
        });

        await test.step("check urban camp order fields", async() => {
            const urbanCampForm = await getUrbanCampFormLocators(page); 
            await expect.soft(await getUrbanCampDateLocator(page)).toHaveValue(await campDataValue(validCampOrderData.campData)); 
            await expect.soft(urbanCampForm.campStudents).toHaveValue(validCampOrderData.campStudents);
            await expect.soft(urbanCampForm.campAge).toHaveValue(validCampOrderData.campAge);
            await expect.soft(urbanCampForm.campAdults).toHaveValue(validCampOrderData.campAdults);
        });

        const submitButton = await getUrbanCampButtonLocator(page);
        await submitButton.click();
        await expect(await submitOrderLocator(page)).toBeVisible();     
        await console.log("new order successfully created");
    });

    
    test ('New order - invalid data', async ({ page }) => {
        
        await fillNewOrderClientsData(page, invalidClientData);
        
        await test.step("check client information fields", async() => {
            const formInputFields = await getFormClientsInputFields(page);
            await expect.soft(formInputFields.clientField).toHaveValue(invalidClientData.client);
            await expect.soft(formInputFields.addressField).toHaveValue(invalidClientData.address);
            await expect.soft(formInputFields.representativeField).toHaveValue(invalidClientData.representative);
            await expect.soft(formInputFields.contactNameField).toHaveValue(invalidClientData.contactName);
            await expect.soft(formInputFields.contactTelField).toHaveValue(invalidClientData.contactTel);
            await expect.soft(formInputFields.contactEmailField).toHaveValue(invalidClientData.contactEmail);
        }); 
        
        await fillNewOrderCampData(page, invalidCampOrderData); 
        
        await test.step("check start/end dates fields", async() => {
            const arrayOfDateLocators = await getArrayOfDateLocators(page);
            for (let i = 0; i < invalidCampOrderData.startDate.length; i++) {
            await expect.soft(arrayOfDateLocators[i].startDate).toHaveValue(invalidCampOrderData.startDate[i]);
            await expect.soft(arrayOfDateLocators[i].endDate).toHaveValue(invalidCampOrderData.endDate[i]);
            }
        });

        await test.step("check urban camp order fields", async() => {
            const urbanCampForm = await getUrbanCampFormLocators(page);  
            await expect.soft(await getUrbanCampDateLocator(page)).toHaveValue(await campDataValue(invalidCampOrderData.campData)); 
            await expect.soft(urbanCampForm.campStudents).toHaveValue(invalidCampOrderData.campStudents);
            await expect.soft(urbanCampForm.campAge).toHaveValue(invalidCampOrderData.campAge);
            await expect.soft(urbanCampForm.campAdults).toHaveValue(invalidCampOrderData.campAdults);
        });
        
        const submitButton = await getUrbanCampButtonLocator(page);
        await submitButton.click();
        await expect(await submitOrderLocator(page)).not.toBeVisible();
        await console.log("new order creation successfully failed");
    });
})


