exports.LoginPage = class LoginPage{

    constructor (page) {    

        this.page = page;
        this.emailFieldLocator = this.page.getByLabel("Email");
        this.passwordFieldLocator  = this.page.getByLabel("Heslo");
        this.loginButtonLocator  = this.page.getByRole("button", { name: "Přihlásit"});
        this.toastLocator  = this.page.locator(".toast-message");
        this.fieldErrorLocator = this.page.locator(".invalid-feedback");
        this.rightNavbarLocator = this.page.locator(".navbar-right");
        
        //this.userNameLocator = await getUserNameDropdown(page)
        
        this.usernameDropdownLocator = this.page.locator(".dropdown-toggle");
        this.logoutLinkLocator = this.page.locator("#logout-link");
        }
       
        async open() {
            await this.page.goto("/prihlaseni");
        }

        async login(username, password) {
            await this.emailFieldLocator.fill(username);
            await this.passwordFieldLocator.fill(password);
            await this.loginButtonLocator.click();
        }
        async logOut () {

            await this.usernameDropdownLocator.click();
            await this.logoutLinkLocator.click();
        }
    
    }
        
        
