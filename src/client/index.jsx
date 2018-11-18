import 'babel-polyfill';
import 'airbnb-browser-shims';

import 'sanitize.css/sanitize.css';
import {makeMainRoutes} from '../client/components/router';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
dotenv.config();

// global styles
import './style.scss';

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('app'));
