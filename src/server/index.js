const http = require('http');
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./logger');
const db = require('./db');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HTTP_PORT = process.env.HTTP_PORT || 3000;

const setupAppRoutes =
  process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

const app = express();

app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true
  })
);

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

function onUnhandledError(err) {
  try {
    logger.error(err);
  } catch (e) {
    // console.log('LOGGER ERROR:', e);
    // console.log('APPLICATION ERROR:', err);
  }
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

app.use(logger.expressMiddleware);

require('./routes')(app, db);

// application routes (this goes last)
setupAppRoutes(app);

const server = http.createServer(app);

server.listen(process.env.HTTP_PORT, () => {
  logger.info(`HTTP server is now running on http://localhost:${process.env.HTTP_PORT}`);
});

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
