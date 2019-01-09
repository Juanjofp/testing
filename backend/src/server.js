import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from './helpers/cors';
// Admin
import Admin from './routes/admin';

export default (ordersCollection) => {
    // Configure express and SIO
    const app = express();
    const server = http.Server(app);

    // Parse body query to JSON
    app.use(bodyParser.json());

    // Allow Cross Domain
    app.use(cors);

    // Configure routes without SIO
    const route2Admin = Admin();

    // routes
    app.use('/admin', route2Admin());

    server.listen(process.env.PORT || 7573, () => {
        console.log('Express started on: ', server.address());
    });
};
