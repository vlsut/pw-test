import {test, expect} from '@playwright/test';
import {generateRandomUser} from "../utils/email-generator";

test.describe('Sign up flow', () => {
    const ERROR_COLOR = "rgb(220, 53, 69)";
    const user = generateRandomUser();

    test.beforeEach(async ({page}) => {
        await page.goto('https://guest:welcome2qauto@qauto2.forstudy.space/');
        await page.getByRole('button', {name: 'Sign up'}).click();
    });

    test.describe("Positive cases", () => {
        test('should successfully register user', async ({page}) => {
            const signupNameInput = await page.locator('#signupName');

            await signupNameInput.waitFor({state: "visible"})
            await page.locator('#signupName').fill(user.name);
            await page.locator('#signupLastName').fill(user.lastName);
            await page.getByLabel('Name').fill(user.email);
            await page.getByLabel('Password', {exact: true}).fill(user.password);
            await page.getByLabel('Re-enter password').fill(user.repeatPassword);
            await page.getByRole('button', {name: 'Register'}).click();
            await expect(page).toHaveURL(/garage/);
        });
    });

    test.describe("Negative cases", () => {
        test('should show error messages for "Name" field', async ({page}) => {
            const signupNameInput = await page.locator('#signupName');
            const registerButton = await page.locator("button[class='btn btn-primary']");
            const modalHeader = await page.locator("div[class='modal-header']");

            await signupNameInput.waitFor({state: "visible"})
            await signupNameInput.click();
            await modalHeader.click();

            const nameErrorMessage = await page.locator("html > body > ngb-modal-window > div > div > app-signup-modal > div:nth-of-type(2) > app-signup-form > form > div:nth-of-type(1) > div > p");

            await expect(registerButton).toBeDisabled();
            await expect(signupNameInput).toHaveCSS("border-color", ERROR_COLOR);
            await expect(nameErrorMessage).toHaveCSS("color", ERROR_COLOR);
            await expect(nameErrorMessage).toHaveText("Name required");
        });

        test('should show error messages for "Last name" field', async ({page}) => {
            const signupLastNameInput = await page.locator('#signupLastName');
            const registerButton = await page.locator("button[class='btn btn-primary']");
            const modalHeader = await page.locator("div[class='modal-header']");

            await signupLastNameInput.waitFor({state: "visible"});
            await signupLastNameInput.click();
            await modalHeader.click();

            const lastNameErrorMessage = await page.locator("html > body > ngb-modal-window > div > div > app-signup-modal > div:nth-of-type(2) > app-signup-form > form > div:nth-of-type(2) > div > p");

            await expect(registerButton).toBeDisabled();
            await expect(signupLastNameInput).toHaveCSS("border-color", ERROR_COLOR);
            await expect(lastNameErrorMessage).toHaveCSS("color", ERROR_COLOR);
            await expect(lastNameErrorMessage).toHaveText("Last name required");
        });

        test('should show error messages for "Email" field', async ({page}) => {
            const signupEmailInput = await page.locator('#signupEmail');
            const registerButton = await page.locator("button[class='btn btn-primary']");
            const modalHeader = await page.locator("div[class='modal-header']");

            await signupEmailInput.waitFor({state: "visible"});
            await signupEmailInput.click();
            await modalHeader.click();

            const lastNameErrorMessage = await page.locator("html > body > ngb-modal-window > div > div > app-signup-modal > div:nth-of-type(2) > app-signup-form > form > div:nth-of-type(3) > div > p");

            await expect(registerButton).toBeDisabled();
            await expect(signupEmailInput).toHaveCSS("border-color", ERROR_COLOR);
            await expect(lastNameErrorMessage).toHaveCSS("color", ERROR_COLOR);
            await expect(lastNameErrorMessage).toHaveText("Email required");
        });

        test('should show error messages for passwords fields', async ({page}) => {
            const signupPasswordInput = await page.locator('#signupPassword');
            const signupRepeatPasswordInput = await page.locator('#signupRepeatPassword');
            const registerButton = await page.locator("button[class='btn btn-primary']");
            const modalHeader = await page.locator("div[class='modal-header']");

            await signupPasswordInput.waitFor({state: "visible"});
            await signupPasswordInput.click();
            await signupRepeatPasswordInput.click();
            await modalHeader.click();

            const passwordErrorMessage = await page.locator("html > body > ngb-modal-window > div > div > app-signup-modal > div:nth-of-type(2) > app-signup-form > form > div:nth-of-type(4) > div > p");
            const repeatPasswordErrorMessage = await page.locator("html > body > ngb-modal-window > div > div > app-signup-modal > div:nth-of-type(2) > app-signup-form > form > div:nth-of-type(5) > div > p");

            await expect(registerButton).toBeDisabled();
            await expect(signupPasswordInput).toHaveCSS("border-color", ERROR_COLOR);
            await expect(signupRepeatPasswordInput).toHaveCSS("border-color", ERROR_COLOR);
            await expect(passwordErrorMessage).toHaveCSS("color", ERROR_COLOR);
            await expect(repeatPasswordErrorMessage).toHaveCSS("color", ERROR_COLOR);
            await expect(passwordErrorMessage).toHaveText("Password required");
            await expect(repeatPasswordErrorMessage).toHaveText("Re-enter password required");
        });
    });
});
