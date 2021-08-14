import cron from 'node-cron'
import SendMailDailyTask from './cron/SendMailDaily'
class ManagerCron {
  private jobs!: Array<cron.ScheduledTask>
  constructor() {
    this.jobs = [SendMailDailyTask]
  }

  run() {
    this.jobs.forEach((job) => job.start())
  }
}

module.exports = new ManagerCron()
