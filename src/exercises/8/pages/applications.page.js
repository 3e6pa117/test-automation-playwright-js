exports.ApplicationPage = class ApplicationPage{

    constructor (page) {    

        this.page = page;
        //this.emailFieldLocator = this.page.getByLabel("Email");
        //this.passwordFieldLocator  = this.page.getByLabel("Heslo");
        //this.loginButtonLocator  = this.page.getByRole("button", { name: "Přihlásit"});
        //this.toastLocator  = this.page.locator(".toast-message");
        //this.fieldErrorLocator = this.page.locator(".invalid-feedback");
        this.rightNavbarLocator = this.page.locator(".navbar-right");
        //this.userNameLocator = await getUserNameDropdown(page)
        this.usernameDropdownLocator = this.page.locator(".dropdown-toggle");
        this.logoutLinkLocator = this.page.locator("#logout-link");
        this.buttonLink = this.page.getByRole("link", {name: "Přihlášky"});
        this.hiddenLocator = this.page.locator("#DataTables_Table_0_processing");
        }
       
        async open() {
            await this.page.goto("/prihlaseni");
        }

        
        async goTo() {
            await this.buttonLink.click();
        }
        async getPageTitle() {
            await this.page.getByRole("heading", {level: 1});
        }
        async waitForTableToLoad() {
            await this.page.waitForLoadState();
            await this.hiddenLocator.waitFor({state: "hidden"});
        }
    
        async getApplicationsTableRows() {
            return await this.page
                .locator(".dataTable")
                .locator("tbody")
                .locator("tr")
                .all();
        }
    
    }
        
        
