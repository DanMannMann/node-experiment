import "reflect-metadata";
import * as express from 'express';
import * as routes from './routes';
import * as cors from 'cors';
import * as winston from 'winston';

// Need to reference controllers so they are crawled by the swagger generator
import * as users from './controllers/testController'

// Things with no type def
var reqLogger = require('express-request-logger');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../dist/swagger.json');

const app = express()

// Configure request logging
var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)() ] });
app.use(reqLogger.create(logger));

// Configure cors
app.use(cors());
app.options('*', cors());

routes.RegisterRoutes(app);

app.get("/test", (req, res) => {
    res.send("it worketh");
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, true, {  }));
app.listen(1234);
