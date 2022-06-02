
const  http  =  require('http')
const dotenv = require('dotenv');
const App = require('./Express/Express.App')
import MongoConnect from './mongoose'

dotenv.config()
// Mongoose Connection
MongoConnect()

// Express App1
const ExpressApp = new App()

// HTTP Server
const httpserver = http.createServer(ExpressApp.app)
const PORT = process.env.PORT ? process.env.PORT : 8080
httpserver.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 App listening on the port ${PORT}`)
})


module.exports =   {  httpserver }
