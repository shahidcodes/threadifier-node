/* eslint-disable no-param-reassign */
/* eslint-disable no-eval */
const { parentPort } = require('worker_threads');

parentPort.on('message', ({ runnable, args, threadId }) => {
  if (!args) args = '';
  args = JSON.stringify(args);
  const result = eval(`(${runnable})(${args});`);
  result.threadId = threadId;
  parentPort.postMessage(result);
});
