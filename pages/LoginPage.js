// pages/LoginPage.js

exports.LoginPage = class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
    
    // ... rest of the methods (navigate, login) ...
    
    async navigate() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await this.loginButton.waitFor({ state: 'visible', timeout: 45000 });
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        
        // Final fix for flakiness
        await this.loginButton.click({ force: true });
        
        await this.page.waitForURL('**/web/index.php/dashboard/index');
        await this.page.waitForLoadState('networkidle');
    }
};