const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads')

function fibonacci(n) {
  if (n < 2) return n
  return fibonacci(n - 2) + fibonacci(n - 1)
}

parentPort.once('message', (message) => {
  const result = fibonacci(message)

  parentPort.postMessage(result)
})
