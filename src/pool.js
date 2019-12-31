/* eslint-disable no-plusplus */
const { Worker } = require('worker_threads');

const log = () => '';

class WorkerPool {
  constructor(numberOfThreads) {
    this.workerFile = `${__dirname}/worker_file.js`;
    this.numberOfThreads = numberOfThreads || 1;
    this.workers = {};
    this.activeWorkers = {};
    this.queue = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.numberOfThreads; i++) {
      const worker = new Worker(this.workerFile);
      this.workers[i] = worker;
      this.activeWorkers[i] = false;
      log(`worker: ${i}, threadId: ${worker.threadId} - init`);
    }
  }

  queueTask(fn, args) {
    return new Promise((resolve, reject) => {
      const workerId = this.getInactiveWorker();
      const task = {
        script: fn.toString(),
        args: { ...args, basePath: __dirname },
        callback: (e, r) => {
          if (e) reject(e);
          else resolve(r);
        },
      };
      if (workerId === -1) {
        log(`task queued on will be exec when worker is available`);
        this.queue.push(task);
      } else {
        log(`task is being notified to worker #${workerId}`);
        this.runWorker(workerId, task);
      }
    });
  }

  runWorker(workerId, task) {
    log(`executing queued taks on ${workerId}`);
    const worker = this.workers[workerId];
    this.activeWorkers[workerId] = true;
    worker.on('message', result => {
      log(
        `worker responded with success workerId: ${workerId}, threadId:${worker.threadId}`,
      );
      task.callback(null, result);
      this.cleanup(worker, workerId);
    });
    worker.on('error', error => {
      log(
        `worker responsed with error ${error}, workerId: ${workerId}, threadId:${worker.threadId}`,
      );
      task.callback(error);
      this.cleanup(worker, workerId);
    });

    worker.on('online', () => {
      log(`worker ${workerId} is online.`);
    });

    worker.on('exit', () => {
      log(`worker ${workerId} is exiting`);
    });

    worker.postMessage({
      runnable: task.script,
      args: task.args,
      threadId: worker.threadId,
    });
    log(`worker ${workerId} notified on ${worker.threadId}`);
  }

  cleanup(worker, workerId) {
    this.activeWorkers[workerId] = false;
    worker.removeAllListeners('message');
    worker.removeAllListeners('error');
    worker.removeAllListeners('online');
    worker.removeAllListeners('exit');
    if (this.queue.length > 0) {
      this.runWorker(workerId, this.queue.shift());
    }
  }

  getInactiveWorker() {
    for (let i = 0; i < this.numberOfThreads; i += 1) {
      if (!this.activeWorkers[i]) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = WorkerPool;
