const isDebugging = () => {
    const debugging_mode = {
        headless: false,
        slowMo: 25,
        devtools: true,
        timeout: 30000
    };
    return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
};
const testId = (id) => `[data-testid='${id}']`;

export {
    isDebugging,
    testId
};