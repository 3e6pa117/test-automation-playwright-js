import { test } from "@playwright/test";

test("should open login page", async ({ page }) => {
    await page.goto("/prihlaseni");
    console.log(await page.title());
  
    console.log("This is my first test!");
  
    await page.pause(1000);
  
    await page.setViewportSize({ width: 900, height: 700 });
    await page.screenshot({ path: "login_page_900_700.png" });
    
    console.log("Well done!")
    });
    