// import express from 'express';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import cors from 'cors';
// import * as dotenv from 'dotenv';

// dotenv.config({ path: `.env.local`, override: true });
// const environmentSettings = dotenv.config().parsed;
// console.log('Environment settings from .env : ', environmentSettings);
// console.log('NODE_ENV:', process.env.NODE_ENV);

// // Routers
// import indexRouter from './routes/index.js';
// import apiRouter from './routes/api.js';
// import apiResponse from './helpers/apiResponse.js';

// const app = express();

// if (process.env.NODE_ENV !== "test") {
//     app.use(logger("dev"));
// }

// import { fileURLToPath } from 'node:url';
// const filename = fileURLToPath(import.meta.url);
// const dirname =  path.dirname(filename);

// // View engine setup
// app.set('views', path.join(dirname, 'views'));
// app.set('view engine', 'hbs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(dirname, 'public')));

// // To allow cross-origin requests
// app.use(cors());

// // Setup Mongoose based database
// import Storage from './storage/mongoDB/MongooseStorage.js';
// await Storage.ConnectCreateAndSeed(app);

// // Middlewares: Mongoose/Passport authentication
// import AuthStrategy from './middlewares/auth/MongooseJwtApiAuthenticator.js';
// AuthStrategy.initialize(app);

// // Route Prefixes
// app.use("/", indexRouter);
// app.use("/api", apiRouter);

// // Catch 404 and forward to error handler
// app.all("*", function (req, res) {
//     return apiResponse.notFoundResponse(res, "Page not found");
// });

// // Error handler
// app.use(function (err, req, res, next) {
//     if (err.name == "UnauthorizedError") {
//         return apiResponse.unauthorizedResponse(res, err.message);
//     }
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
// });

// export default app;
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.local`, override: true });
const environmentSettings = dotenv.config().parsed;
console.log('Environment settings from .env : ', environmentSettings);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Routers
import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';
import apiResponse from './helpers/apiResponse.js';

const app = express();

if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"));
}

import { fileURLToPath } from 'node:url';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// View engine setup
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));

// To allow cross-origin requests
const allowedOrigins = ['http://localhost:5173', 'http://your-frontend-url.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Setup Mongoose based database
import Storage from './storage/mongoDB/MongooseStorage.js';
await Storage.ConnectCreateAndSeed(app);

// Middlewares: Mongoose/Passport authentication
import AuthStrategy from './middlewares/auth/MongooseJwtApiAuthenticator.js';
AuthStrategy.initialize(app);

// Route Prefixes
app.use("/", indexRouter);
app.use("/api", apiRouter);

// Catch 404 and forward to error handler
app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "Page not found");
});

// Error handler
app.use(function (err, req, res, next) {
    if (err.name == "UnauthorizedError") {
        return apiResponse.unauthorizedResponse(res, err.message);
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

export default app;
