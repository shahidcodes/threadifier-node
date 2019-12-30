# Threadifier

### Motivation

Node has recently added worker_thread, giving us ability to run long running synchronous tasks in a separate thread. But API is not very seamless.
Threadifier allows you to run any function in different thread seamlessly through its easy to use promise based api. It uses `worker_threads` module to run the given function in a new thread and return the response asynchronously so your event loop keeps running.

## Get started

    npm i @shahidcodes/threadifier

## Usage

Run a function in different thread.

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

## Examples

Please check the [examples](./examples) directory.

## Contribution

You're free to submit PRs. There are no build/tests yet. But it is in roadmap.

## Contact

Feel free to contact me on [twitter.com/shahidcodes](https://twitter.com/shahidcodes)
