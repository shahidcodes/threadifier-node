const Threadifier = require('../index');

function runTask(arg) {
  let i = 0;
  for (let index = 0; index < 9999999999999999; index++) {
    i++;
  }
  return `worked- loop count ${i}, arg: ${JSON.stringify(arg)}`;
}

const args = { name: 'Shahid' };
for (let i = 0; i < 15; i++) {
  Threadifier.run(runTask, args)
    .then(console.log)
    .catch(console.error);
}
