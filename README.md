# AccuKnox-user-management-tests

This repository contains the solution for the AccuKnox QA Trainee Practical Assessment, focusing on the End-to-End User Management flow in the OrangeHRM application.

## Project Setup Steps

1.  **Clone the Repository:**
    ```
    git clone https://github.com/singhpratik-17/AccuKnox-user-management-tests.git
    cd AccuKnox-user-management-tests
    ```
2.  **Install Dependencies (Node.js/npm required):**
    ```
    npm install
    ```
3.  **Install Browser Drivers:**
      ```
     npx playwright install
    ```

## How to Run the Test Cases

The tests are configured to run on Chromium by default (see `playwright.config.js`).

* **Run all tests (headless):**
    ```
   npx playwright test
    ```
* **Run tests in UI mode (recommended for debugging):**
 ```
  npx playwright test --ui
    ```
* **Run tests in headed mode (browser visible):**
 ```
 npx playwright test --headed
    ```
* **View the HTML Report after execution:**
 ```
  npx playwright show-report
  ```

## Playwright Version Used

Playwright v1.57.0
