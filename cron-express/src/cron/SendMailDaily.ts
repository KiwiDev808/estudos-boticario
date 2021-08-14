import cron from 'node-cron'

function SendMailDaily() {
  console.log('Enviar o email diariamente')
}

const SendMailDailyTask = cron.schedule('*/1 * * * *', SendMailDaily, {
  scheduled: false,
})

export default SendMailDailyTask
