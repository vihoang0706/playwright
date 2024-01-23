This is the automation framework implemented by QA engineer, it is created to get familiar with playwright language for training purposes. 

Please spend time reading the [Best Practice](https://playwright.dev/docs/best-practices) before working.

# Install Dependences
    `npm install`
    
# Getting started
+ Run all the tests paralel
    
    `npx playwright test`

+ Run all the tests paralel against a specific project

    `npx playwright test --project=\"Google Chrome\"`

+ Run tests with specific test

    `npx playwright test DA_LOGIN_TC001.spec.ts`

+ Run tests with only 1 worker

    `npx playwright test --headed --project \"Google Chrome\" --workers=1`

# View report
+ View default HTML report via command
    
    `npx playwright show-report`    


# Installed Plugin in Visual Code
1. Playwright Test for VS Code