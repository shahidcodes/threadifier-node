# Threadifier

### Motivation

Node has recently added worker_thread, giving us ability to run long running synchronous tasks in a separate thread. But API is not very seamless.  
Threadifier allows you to run any function in different thread seamlessly through its easy to use promise based api. It uses `worker_threads` module to run the given function in a new thread and return the response asynchronously so your event loop keeps running. Also you can create a worker thread pool to reuse the same threads for various tasks.

## Get started

    npm i @shahidcodes/threadifier

## Usage

### Run a function in different thread.

```javascript
const Threadifier = require('@shahidcodes/threadifier');

function runTask(arg) {
  let i = 0;
  for (let index = 0; index < 99999999; index++) {
    i++;
  }
  return `worked- loop count ${i}, arg: ${JSON.stringify(arg)}`;
}

const args = { name: 'Shahid' };

Threadifier.run(runTask, args)
  .then(console.log)
  .catch(console.error);
```

### Create a pool of threads and queue the tasks (recommended)

```javascript
const { WorkerPool } = require('@shahidcodes/threadifier');

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
```

## General Advice

You should not create many threads at once. If you're going to use this in a request handler/controller then better use a fixed size thread pool. And queue tasks otherwise you'll see CPU spikes when you spawn many many threads than the server can handle. One other reason you should use a thread pool is creating worker thread is expensive so if you're creating threads again n again then better use pool.

## Examples

Please check the [examples](./examples) directory.

## Contribution

You're free to submit PRs. There are no build/tests yet. But it is in roadmap.

## Contact

Feel free to contact me on [twitter.com/shahidcodes](https://twitter.com/shahidcodes)
