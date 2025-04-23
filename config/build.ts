//node
import path from 'node:path';
//modules
import unocss from 'unocss/vite';
//stackpress
import { server as http } from 'stackpress/http';
//config
import type { Config } from './common.js';
import * as common from './common.js';

export const config: Config = {
  server: {
    ...common.server,
    mode: 'production'
  },
  view: {
    ...common.view,
    //reactus specific settings
    engine: {
      //path where to save assets (css, images, etc)
      assetPath: path.join(common.assets, 'assets'),
      //path where to save the client scripts (js)
      clientPath: path.join(common.assets, 'client'),
      //filepath to a global css file
      cssFiles: [ 
        'frui/frui.css', 
        'stackpress/stackpress.css', 
        'virtual:uno.css' 
      ],
      //vite plugins
      plugins: [ unocss() ],
      //original vite options (overrides other settings related to vite)
      vite: undefined
    }
  },
  brand: common.brand,
  cli: common.cli,
  cookie: common.cookie,
  language: common.language,
  session: common.session
};

export async function bootstrap() {
  //make a server
  const server = http();
  //set config
  server.config.set(config);
  //load the plugins
  await server.bootstrap();
  //initialize the plugins
  await server.resolve('config');
  //add events
  await server.resolve('listen');
  //add routes
  await server.resolve('route');
  //return the server
  return server;
};