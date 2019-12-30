const { Worker } = require('worker_threads');

class WorkerPool {
  constructor(numberOfThreads) {
    this.numberOfThreads = numberOfThreads || 1;
    this.workers = {};
    this.activeWorkers = {};
  }

  init() {
    for (let i = 0; i < this.numberOfThreads; i++) {
      const worker = new Worker();
    }
  }
}
