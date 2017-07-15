/* eslint-disable no-console */

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './jumbotron.css';
import './breadcrumbs.css';
import Routes from './routes';

injectTapEventPlugin();


ReactDOM.render(<Routes/>, document.getElementById('wrapper') );


