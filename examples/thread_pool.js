const { WorkerPool } = require('../');

const pool = new WorkerPool(10);

function runTask(args) {
  let i = 0;
  for (let index = 0; index < 999999999; index++) {
    i++;
  }
  return { i, args };
}

const args = { name: 'Shahid' };

for (let index = 0; index < 100; index++) {
  pool
    .queueTask(runTask, args)
    .then(result => console.log(`from worker:`, result))
    .catch(console.error);
}
