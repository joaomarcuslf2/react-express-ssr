import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import viewRoutes from './routes/views';

import pjson from '../package.json';

import cors from './middlewares/cors';
import favicon from './middlewares/favicon';

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(favicon());
app.use(compression());
app.use(morgan('dev'));

app.use(express.static(`${__dirname}/../public`));

// View engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

// Routes
app.use('/', viewRoutes);

const PORT = process.env.PORT || 3000;
const IP_BIND = process.env.IP || '0.0.0.0';

app.listen(PORT, IP_BIND, () => {
  console.log(`
  => Starting ${pjson.name}
  => Node ${pjson.engines.node} application starting in ${process.env
  .NODE_ENV || 'development'}
  * Listening on http://${IP_BIND}:${PORT}/
  * Environment: ${process.env.NODE_ENV || 'development'}
  * Npm version: ${pjson.engines.npm}
  Use Ctrl-C to stop
  `);
});
