const Threadifier = require('../index');

function runTask(arg) {
  const moment = require('moment');
  let i = 0;
  for (let index = 0; index < 99999999; index++) {
    i++;
  }
  return `worked- loop count ${i}, arg: ${JSON.stringify(arg)}, ${moment().format('DD-MM-YYYY')}`;
}

const args = { name: 'Shahid' }

Threadifier.run(runTask, args)
  .then(console.log)
  .catch(console.error)


