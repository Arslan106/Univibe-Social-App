// import cors from 'cors'
// const  express  =  require('express')
// const cors = require('cors')
import cors from 'cors';
import express from 'express';
// ROUTES
import ClutRoutes from './Routes/Routes.Club.js'
import PingRoutes from './Routes/Routes.Ping.js'
import BusinessRoutes from './Routes/Routes.business.js'
import AccountRoutes from './Routes/Routes.account.js'
import StudentRoutes from './Routes/Routes.student.js'

class App {
  constructor() {
    this.app = express()
    this.isProduction = false
    this.initializeMiddlewares()

  }

  initializeMiddlewares() {
    this.app.use(express.json())
    this.app.use(cors({ credentials: true, origin: true }))
    this.app.use(express.urlencoded({ extended: true }))
    this.initializeRoutes()

  }

  initializeRoutes() {
    this.app.use('/', PingRoutes)

    this.app.use('/club', ClutRoutes)
    this.app.use('/business', BusinessRoutes)
    this.app.use('/account', AccountRoutes)
    this.app.use('/student', StudentRoutes)

  }
}

// export default   App
export default App