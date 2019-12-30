/* eslint-disable global-require */
let Worker;
try {
  ({ Worker } = require('worker_threads'));
} catch (err) {
  console.error(
    `worker_threads are not supported in your current node version ${process.version}.`,
  );
  process.exit(-1);
}

function fnWrapper(fn) {
  const runStr = `
    const { parentPort, workerData } = require('worker_threads');
    const data = (${fn.toString()})(workerData);
    parentPort.postMessage(data)
  `;
  return runStr;
}

function run(fn, workerData) {
  if (!Worker) return;
  return new Promise((resolve, reject) => {
    const wrapped = fnWrapper(fn);
    const fnStr = wrapped.toString();
    // console.log(fnStr)
    const worker = new Worker(fnStr, { eval: true, workerData });
    worker.on('error', reject);
    worker.on('message', resolve);
    worker.on('exit', code => {
      if (code != 0) reject(new Error('worker stopped with non-zero code.'));
    });
    worker.on('online', () => console.count('online'));
  });
}

module.exports = { run };
