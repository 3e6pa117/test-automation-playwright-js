/**
 * Page object describing the applications page
 */
const { ApplicationPage } = require("../pages/applications.page");
const {AppPage} = require("./app.page");
exports.ApplicationsPage = class ApplicationsPage extends AppPage {


    constructor(page) {
        super(page, "admin/prihlasky");
        this.aplicationsLink = this.page.getByRole("link", {name: "Přihlášky"});
        this.loadingIndicator = this.page.locator("#DataTables_Table_0_processing");
        this.applicationsTable = this.page.locator(".dataTable");
        this.applicationsTableRows = this.applicationsTable.locator("tbody").locator("tr");
        this.searchField = this.page.locator("input[type='search']");
    }

    async goToApplicationsPage() {
        await this.aplicationsLink.click();
    }

    async waitForTableToLoad() {
        await this.page.waitForLoadState();
        await this.loadingIndicator.waitFor({state: "hidden"});
    }

    async getApplicationsTableRows() {
        await this.waitForTableToLoad();
        const rows = await this.applicationsTableRows.all();
        return Promise.all(rows.map(async row => new TableRow(this.page, row)));
    }

    async searchInApplicationsTable(text) {
        await this.searchField.fill(text);
        await this.loadingIndicator.waitFor({state: "visible"});
    }

}

class TableRow {

    constructor(page, rowElement) {
        this.page = page;
        this.rowElement = rowElement;
    }
     
    async getValues() {
            const cells = await this.rowElement.locator("td");
            return {
                name: await cells.nth(0).textContent(),
                date: await cells.nth(1).textContent(),
                paymentType: await cells.nth(2).textContent(),
                toPay: await cells.nth(3).textContent()
        }
        }
    }