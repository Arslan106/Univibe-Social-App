
// const  http  =  require('http')
// const dotenv = require('dotenv');
// const App = require('./Express/Express.App')

import http from 'http';
import dotenv from 'dotenv';
import App from './Express/Express.App.js';
import MongoConnect from './mongoose/index.js';
// let {App} = expressApp;
dotenv.config()
// Mongoose Connection
MongoConnect()

// Express App1
const ExpressApp = new App()

// HTTP Server
const httpserver = http.createServer(ExpressApp.app)
const PORT = process.env.PORT ? process.env.PORT : 3000
httpserver.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 App listening on the port ${PORT}`)
})


export default  { httpserver }
