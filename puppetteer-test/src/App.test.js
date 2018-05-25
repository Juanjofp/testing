import {isDebugging, testId} from './test_utils/utils';
import {performLogin} from './test_utils/perform_login';
import puppeteer from 'puppeteer';

let browser,
    page;

beforeAll(async () => {
    browser = await puppeteer.launch(isDebugging());
    page = await browser.newPage();
    await performLogin(page);
});

describe(
    'Home screen',
    () => {
        test(
            'loads header correctly after login',
            async () => {

                const html = await page.$eval(
                    testId('public-main'),
                    (e) => e.innerHTML
                );

                // Assert
                expect(html).toBe('Home');
            },
            30000
        );

        test(
            'can visit admin after login',
            async () => {

                await page.goto('http://localhost:3000/admin');
                const html = await page.$eval(
                    testId('admin-main'),
                    (e) => e.innerHTML
                );

                // Assert
                expect(html).toBe('Administrador');
            },
            30000
        );

        test(
            'can visit private after login',
            async () => {

                await page.goto('http://localhost:3000/private');
                const html = await page.$eval(
                    testId('private-main'),
                    (e) => e.innerHTML
                );

                // Assert
                expect(html).toBe('Privado');
            },
            30000
        );
    }
);

afterAll(async () => {
    if(isDebugging()) {
        browser.close();
    }
});