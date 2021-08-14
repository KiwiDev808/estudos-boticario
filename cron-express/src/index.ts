const express = require('express')
const ManagerCron = require('./manager-cron')
const app = express()

app.listen(3003, () => {
  console.log('Running on port 3003')
  ManagerCron.run()
})
