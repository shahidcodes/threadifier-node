const Threadifier = require('../index');

function runTask(arg) {
  const importedFile = require(process.cwd() + '/examples/file_to_be_imported');
  importedFile();
  let i = 0;
  for (let index = 0; index < 99999999; index++) {
    i++;
  }
  return `worked- loop count ${i}, arg: ${JSON.stringify(arg)}`;
}

const args = { name: 'Shahid' }

Threadifier.run(runTask, args)
  .then(console.log)
  .catch(console.error)


