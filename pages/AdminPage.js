// pages/AdminPage.js

exports.AdminPage = class AdminPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // THIS LINE IS CRITICAL
        this.adminLink = page.getByRole('link', { name: 'Admin' }); 
        
        // ... rest of locators
    }

    async navigateToUserManagement() {
        // 🌟 FIX: We'll stick to Playwright's default auto-scrolling for now 
        // and add a visibility wait for extra resilience on the click.
        // REMOVE the manual scrollIntoViewIfNeeded() call entirely.
        
        await this.adminLink.waitFor({ state: 'visible' }); 
        await this.adminLink.click();
        
        // Wait for the URL change
        await this.page.waitForURL('**/web/index.php/admin/*'); 
        
        // Wait for the content to appear
        await this.page.getByRole('heading', { name: 'User Management', exact: true }).waitFor({ state: 'visible' });
    }
    // ... rest of the class
}