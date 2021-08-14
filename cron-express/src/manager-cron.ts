class ManagerCron {
  private jobs!: Array<any>
  constructor() {
    this.jobs = []
  }

  run() {
    this.jobs.forEach((job) => job.start())
  }
}

module.exports = new ManagerCron()
