//stackpress
import { terminalControls } from 'stackpress/terminal';
import * as scripts from 'stackpress/scripts';
//plugins
import { bootstrap } from './config/build.js';

async function build() {
  const server = await bootstrap();
  const control = terminalControls('[EXAMPLE]');
  //make server, client and styles
  control.warning('Building pages, client and styles...');
  await scripts.build(server);
};

build()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });