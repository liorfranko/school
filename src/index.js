/* eslint-disable no-console */

import React from 'react';

import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import './jumbotron.css';
import Routes from './routes';


ReactDOM.render(<Routes/>, document.getElementById('wrapper') );


