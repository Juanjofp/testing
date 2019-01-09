import app from './server';

async function startServer() {
    try {
        app();
    } catch (error) {
        console.log('Error loading server', error);
        throw error;
    }
}

startServer();
