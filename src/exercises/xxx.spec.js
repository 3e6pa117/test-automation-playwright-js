// Import Playwright test module
const { test, expect } = require('@playwright/test');

// Base URL of the application
const BASE_URL = 'https://team8-2022brno.herokuapp.com/registrace';

// 1. Test to check if the registration form is displayed correctly
test('Should display the registration form correctly', async ({ page }) => {
  // Navigate to the registration page
  await page.goto(BASE_URL);

  //await expect(page.

  // Verify the form is visible
  await expect(page.locator('form')).toBeVisible();


  // Log the status of input fields and buttons
  console.log('Form Fields Status:');
  const fields = ['#name', '#email', '#password', '#password-confirm', 'button[type="submit"]'];
  for (const field of fields) {
    const isVisible = await page.locator(field).isVisible();
    console.log(`${field}: ${isVisible ? 'Visible' : 'Not Visible'}`);
    const isEnabled = await page.locator(field).isEnabled();
    console.log(`${field}: ${isEnabled ? 'Enabled' : 'Not Enabled'}`);
    await expect(page.locator(field)).toBeEnabled();
    console.log("Well done "+field)
  }
});

// 2. Test for a valid user registration
test('Should register a user successfully', async ({ page }) => {
  // Navigate to the registration page
  await page.goto(BASE_URL);

  // Fill in valid registration data
  await page.fill('#name', 'new user');
  await page.fill('#email', 'newuser@jll.com');
  await page.fill('#password', 'ValidPassword123');
  await page.fill('#password-confirm', 'ValidPassword123');
  
  // Submit the form
  await page.click('button[type="submit"]');

  // Verify registration success - check for specific confirmation element or URL change
  await page.waitForURL('https://team8-2022brno.herokuapp.com/zaci');
  console.log('Registration success: user redirected to page Přihlašky.');
});

// 3. Test for registration with an already existing email
test('Should not allow registration with an existing email', async ({ page }) => {
  // Navigate to the registration page
  await page.goto(BASE_URL);

  // Fill in the registration data with an existing email
  await page.fill('#name', 'existing user');
  await page.fill('#email', 'existinguser@exa.com'); // Assume this email is already registered
  await page.fill('#password', 'AnotherValidPass123');
  await page.fill('#password-confirm', 'AnotherValidPass123');
  
  // Submit the form
  await page.click('button[type="submit"]');

  // Find all elements with the class "invalid-feedback" and print their text to the console
  const feedbackElements = await page.locator('.invalid-feedback').all();
  console.log('Invalid Feedback Messages:');
  for (const feedback of feedbackElements) {
    console.log(await feedback.textContent());
  }
});

// 4. Test for registration with an invalid password (numbers only)
test('Should not allow registration with a password containing only numbers', async ({ page }) => {
  // Navigate to the registration page
  await page.goto(BASE_URL);

  // Fill in registration data with a numeric-only password
  await page.fill('#name', 'user weakpassword');
  await page.fill('#email', 'userwithweakpassword@exa.com');
  await page.fill('#password', '12345678'); // Password with numbers only
  await page.fill('#password-confirm', '12345678');
  
  // Submit the form
  await page.click('button[type="submit"]');

  // Find all elements with the class "invalid-feedback" and print their text to the console
  const feedbackElements = await page.locator('.invalid-feedback').all();
  console.log('Invalid Feedback Messages for Weak Password:');
  for (const feedback of feedbackElements) {
    console.log(await feedback.textContent());
  }
});