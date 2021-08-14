import cron from 'node-cron'
import ping from 'ping'
var hosts = ['google.com']

async function PingHost() {
  for (let host of hosts) {
    const isAlive = await ping.promise.probe(host)
    const message = isAlive
      ? 'host ' + host + ' is alive'
      : 'host ' + host + ' is dead'
    console.log(message)
  }
}

const PingHostTask = cron.schedule('*/20 * * * * *', PingHost, {
  scheduled: false,
})

export default PingHostTask
