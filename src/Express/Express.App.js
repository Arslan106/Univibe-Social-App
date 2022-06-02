// import cors from 'cors'
const  express  =  require('express')
const cors = require('cors')
// ROUTES
const ClutRoutes =  require('./Routes/Routes.Club')
const PingRoutes = require('./Routes/Routes.Ping')
const BusinessRoutes = require('./Routes/Routes.business')
const AccountRoutes = require('./Routes/Routes.account')
const StudentRoutes = require('./Routes/Routes.student')

class App {
  constructor() {
    this.app = express()
    this.isProduction = false
    this.initializeMiddlewares()
   
  }

   initializeMiddlewares() {
    this.app.use(express.json())
    this.app.use(cors({credentials: true, origin: true}))
    this.app.use(express.urlencoded({ extended: true }))
    this.initializeRoutes()
   
  }

   initializeRoutes()  {
    this.app.use('/', PingRoutes)
    
    this.app.use('/club', ClutRoutes)
    this.app.use('/business', BusinessRoutes)
    this.app.use('/account', AccountRoutes)
    this.app.use('/student', StudentRoutes)
   
  }
}

module.exports =  App
