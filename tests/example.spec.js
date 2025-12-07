// tests/example.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AdminPage } = require('../pages/AdminPage');

// 🌟 Keeping this dynamic username is crucial for stable test runs
const testUsername = `user_${Date.now()}`;
const testPassword = 'Password123!';
const testEmployeeName = 'Odis Adalwin';
const originalUserRole = 'ESS';
const updatedUserRole = 'Admin'; 

test.describe('User Management E2E Flow', () => {
    let loginPage;
    let adminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);

        // All navigation and login steps are now more stable due to improved waits
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await adminPage.navigateToUserManagement();
    });

    test('TC1: Should successfully add a new ESS User', async ({ page }) => {
        
        await adminPage.addUser(originalUserRole, testEmployeeName, testUsername, testPassword);
        
        // Verification 1: Success Toast
        const successMessage = page.locator('.oxd-toast-container--success');
        await expect(successMessage).toBeVisible();

        // Verification 2: User in Table
        await adminPage.searchUser(testUsername);
        
        const tableUsernameCell = adminPage.userTableRow.locator(':nth-child(2) > div');
        await expect(tableUsernameCell).toHaveText(testUsername);
    });

    test('TC2: Should successfully edit the User Role to Admin', async ({ page }) => {
        
        // This test depends on TC1 or setup to run first, assuming unique user exists.
        await adminPage.searchUser(testUsername);
        
        await adminPage.editButton.click();
        await page.waitForLoadState('domcontentloaded');

        // 🌟 Using the selectDropdownOption logic implicitly
        const userRoleEditDropdown = page.getByLabel('User Role').locator('.oxd-select-text-input');
        await adminPage.selectDropdownOption(userRoleEditDropdown, updatedUserRole);
        
        await adminPage.saveButton.click();
        
        // Verification 1: Success Toast
        const successMessage = page.locator('.oxd-toast-container--success');
        await expect(successMessage).toBeVisible();

        // Verification 2: Updated Role in Table
        await adminPage.searchUser(testUsername);
        
        const roleCell = adminPage.userTableRow.locator(':nth-child(3) > div');
        await expect(roleCell).toHaveText(updatedUserRole);
    });

    test('TC3: Should successfully delete the User', async ({ page }) => {
        
        // This test depends on TC1 or setup to run first, assuming unique user exists.
        await adminPage.searchUser(testUsername);
        
        await adminPage.deleteButton.click();

        const deleteConfirmButton = page.getByRole('button', { name: 'Yes, Delete' });
        await deleteConfirmButton.click();

        // Verification 1: Success Toast
        const successMessage = page.locator('.oxd-toast-container--success');
        await expect(successMessage).toBeVisible();
        
        // Verification 2: User is no longer found
        await adminPage.searchUser(testUsername);

        const noRecordsMessage = page.getByText('No Records Found');
        await expect(noRecordsMessage).toBeVisible();
    });
});