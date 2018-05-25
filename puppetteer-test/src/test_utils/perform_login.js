import {testId} from './utils';

const performLogin = async (page) => {
    page.setViewport({width: 500, height: 2400});
    await page.goto('http://localhost:3000/login');
    await page.click(testId('login-email'));
    await page.type(testId('login-email'), 'juanjo@centic.es');
    await page.click(testId('login-password'));
    await page.type(testId('login-password'), '123456');
    await page.click(testId('login-submit'));
    await page.waitForSelector(testId('public-main'));
};

export {
    performLogin
};