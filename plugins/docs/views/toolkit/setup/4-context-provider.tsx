//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../../components/index.js';
import { H1, H2, P, C, H, SS, Nav } from '../../../components/index.js';
import { Congrats, Code, Editor, Layout } from '../../../components/index.js';
import { Checkpoint as LastCheckpoint } from './3-database-engine.js';

const examples = [
//0-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
import { useState, useEffect } from 'react';
import { 
  unload,
  useResponse,
  NotifyContainer,
  StackpressProvider
} from 'stackpress/view/client';

//...

export function HomeBody() {
  //basic count state
  const [ count, setCount ] = useState(0);
  //response
  const response = useResponse<{ name: string }>();
  const { name = 'guest' } = response.results || {};
  //render
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">
        Welcome {name} to Stackpress
      </h1>
      <button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default function HomePage(props: ServerPageProps) {
  //layout props
  const { data, session, request, response } = props;
  //unload flash message
  useEffect(unload, []);
  //render
  return (
    <StackpressProvider 
      data={data}
      session={session}
      request={request}
      response={response}
    >
      <HomeBody />
      <NotifyContainer />
    </StackpressProvider>
  )
}`,
//1-------------------------------------------------------------------//
];

const content = {
//--------------------------------------------------------------------//
'config/develop.ts': `
import type { Config } from 'stackpress/types';
import unocss from 'unocss/vite';

const cwd = process.cwd();
const build = path.join(cwd, '.build');

//development configuration
const config: Config = {
  server: { 
    mode: 'development' 
  },
  view: {
    engine: {
      //filepath to a global css files
      cssFiles: [ 
        //frui component styles
        'frui/frui.css', 
        //stackpress component styles
        'stackpress/stackpress.css', 
        //unocss atomic style engine
        'virtual:uno.css' 
      ],
      //vite plugins
      plugins: [ unocss() ]
    }
  },
  database: {
    //used to encrypt/decrypt data in the database
    seed: '[INSERT SEED HERE]',
    //where to store create and alter table migration files
    // - This is used in conjunction with \`revisions\`
    // - This doesn't update the database, it simply logs the changes
    migrations: path.join(build, 'migrations')
  },
  client: {
    //used by stackpress/client to import()
    //the generated client code to memory
    module: 'stackpress-client',
    //name of the client package used in package.json
    package: 'stackpress-client',
    //where to store serialized idea json files for historical 
    //purposes. Revisions are used in conjuction with push and 
    //migrate to determine the changes between each idea change.
    revisions: path.join(build, 'revisions'),
    //what tsconfig file to base the typescript compiler on
    tsconfig: path.join(cwd, 'tsconfig.json')
  }
};
//export configuration
export default config;
`.trim(),
//--------------------------------------------------------------------//
'plugins/app/pages/home.ts': `
import { action } from 'stackpress/server';

export default action(function HomePage(req, res) {
  const name = req.data<string>('name');
  res.setResults({ name });
  res.data.set('title', 'Home Page');
});
`.trim(),
//--------------------------------------------------------------------//
'plugins/app/views/home.tsx': `
import type { ServerPageProps } from 'stackpress/view/client';
import { useState, useEffect } from 'react';
import { 
  unload,
  useResponse,
  NotifyContainer,
  StackpressProvider
} from 'stackpress/view/client';

export function Head(props: ServerPageProps) {
  const { styles = [] } = props;
  //render
  return (
    <>
      <title>Stackpress</title>
      <meta name="description" content="Welcome to Stackpress" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  )
}

export function HomeBody() {
  //basic count state
  const [ count, setCount ] = useState(0);
  //response
  const response = useResponse<{ name: string }>();
  const { name = 'guest' } = response.results || {};
  //render
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">
        Welcome {name} to Stackpress
      </h1>
      <button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default function HomePage(props: ServerPageProps) {
  //layout props
  const { data, session, request, response } = props;
  //unload flash message
  useEffect(unload, []);
  //render
  return (
    <StackpressProvider 
      data={data}
      session={session}
      request={request}
      response={response}
    >
      <HomeBody />
      <NotifyContainer />
    </StackpressProvider>
  )
}
`.trim(),
//--------------------------------------------------------------------//
'plugins/app/plugin.ts': `
import type { Server } from 'stackpress/server';

export default function plugin(server: Server) {
  //on route, add app routes
  server.on('route', async _ => {
    server.get('/api/home', () => import('./pages/home.js'));
    server.get('/', () => import('./pages/home.js'));
    server.get('/', '@/plugins/app/views/home', -100);
  });
};
`.trim(),
//--------------------------------------------------------------------//
'plugins/store/connect.ts': `
import fs from 'node:fs';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { connect as pglite } from 'stackpress/pglite';

const url = process.env.DATABASE_URL || './.build/database';

export default async function connect() {
  //this maps the resource to the engine
  return pglite(async () => {
    const file = path.resolve(process.cwd(), url);
    if (!fs.existsSync(path.dirname(file))) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
    }
    return new PGlite(file);
  }); 
};
`.trim(),
//--------------------------------------------------------------------//
'plugins/store/plugin.ts': `
import type { Server } from 'stackpress/server';
import connect from './connect.js';

export default function plugin(server: Server) {
  //on config, register the store
  server.on('config', async _ => {
    server.register('database', await connect());
  });
  //on listen, add populate event
  server.on('listen', async _ => {
    server.on('populate', () => import('./populate.js'));
  });
};
`.trim(),
//3-------------------------------------------------------------------//
'plugins/store/populate.ts': `
import type { Profile } from 'stackpress';
import { action } from 'stackpress/server';

export default action(async function Populate(_req, _res, ctx) {
  const profile = await ctx.resolve<Profile>('profile-create', {
    type: 'person',
    name: 'Admin',
    roles: [ 'ADMIN' ]
  });
  await ctx.resolve('auth-create', {
    profileId: profile.results?.id,
    type: 'username',
    token: 'admin',
    secret: 'admin'
  });
  await ctx.resolve('application-create', {
    profileId: profile.results?.id,
    name: 'Example App',
    scopes: [ 'profile-write', 'auth-read' ],
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  });
});`,
//--------------------------------------------------------------------//
'package.json': `
{
  "type": "module",
  "private": true,
  "plugins": [
    "./plugins/app/plugin",
    "./plugins/store/plugin",
    "stackpress"
  ],
  "scripts": {
    "dev": "stackpress serve --b config/develop -v"
  },
  "dependencies": {
    "@electric-sql/pglite": "0.2.17",
    "@stackpress/inquire-pglite": "0.6.1",
    "frui": "0.1.8",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stackpress": "0.6.1"
  },
  "devDependencies": {
    "@types/node": "22.14.1",
    "@types/react": "19.1.2",
    "@types/react-dom": "19.1.2",
    "@vitejs/plugin-react": "4.4.1",
    "fast-glob": "3.3.3",
    "prettier": "3.5.3",
    "ts-morph": "25.0.1",
    "tsx": "4.19.3",
    "typescript": "5.8.3",
    "unocss": "66.0.0",
    "vite": "6.3.2"
  }
}
`.trim(),
//--------------------------------------------------------------------//
'schema.idea': `
use "stackpress/stackpress.idea"

//add project models here...
`.trim(),
//--------------------------------------------------------------------//
'tsconfig.json': `
{
  "extends": "stackpress/tsconfig/esm",
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext"
  },
  "include": [ 
    "config/**/*.ts", 
    "plugins/**/*.ts", 
    "plugins/**/*.tsx"
  ],
  "exclude": [ "node_modules" ]
}
`.trim(),
//--------------------------------------------------------------------//
'unocss.config.ts': `
import { defineConfig, presetWind3 } from 'unocss';
import presetStackpress from 'stackpress/unocss';

export default defineConfig({
  content: {
    pipeline: {
      include: [
        'plugins/**/*.{js,ts,tsx}'
      ]
    },
  },
  presets: [
    presetWind3(),
    presetStackpress()
  ]
});
`.trim()
//--------------------------------------------------------------------//
};

const system: (File | Folder)[] = [
  {
    type: 'folder',
    name: 'config',
    level: 0
  },
  {
    type: 'file',
    id: 'config/develop.ts',
    name: 'develop.ts',
    level: 1,
    content: content['config/develop.ts']
  },
  {
    type: 'folder',
    name: 'plugins',
    level: 0
  },
  {
    type: 'folder',
    name: 'app',
    level: 1
  },
  {
    type: 'folder',
    name: 'pages',
    level: 2
  },
  {
    type: 'file',
    id: 'plugins/app/pages/home.ts',
    name: 'home.ts',
    level: 3,
    content: content['plugins/app/pages/home.ts']
  },
  {
    type: 'folder',
    name: 'views',
    level: 2
  },
  {
    type: 'file',
    id: 'plugins/app/views/home.tsx',
    name: 'home.tsx',
    level: 3,
    content: content['plugins/app/views/home.tsx']
  },
  {
    type: 'file',
    id: 'plugins/app/plugin.ts',
    name: 'plugin.ts',
    level: 2,
    content: content['plugins/app/plugin.ts']
  },
  {
    type: 'folder',
    name: 'store',
    level: 1
  },
  {
    type: 'file',
    id: 'plugins/store/connect.ts',
    name: 'connect.ts',
    level: 2,
    content: content['plugins/store/connect.ts']
  },
  {
    type: 'file',
    id: 'plugins/store/populate.ts',
    name: 'populate.ts',
    level: 2,
    content: content['plugins/store/populate.ts']
  },
  {
    type: 'file',
    id: 'plugins/store/plugin.ts',
    name: 'plugin.ts',
    level: 2,
    content: content['plugins/store/plugin.ts']
  },

  {
    type: 'file',
    id: 'package.json',
    name: 'package.json',
    level: 0,
    content: content['package.json']
  },
  {
    type: 'file',
    id: 'schema.idea',
    name: 'schema.idea',
    level: 0,
    content: content['schema.idea']
  },
  {
    type: 'file',
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    level: 0,
    content: content['tsconfig.json']
  },
  {
    type: 'file',
    id: 'unocss.config.ts',
    name: 'unocss.config.ts',
    level: 0,
    content: content['unocss.config.ts']
  }
];

export function Checkpoint() {
  //render
  return (
    <Editor 
      title="PROJECT"
      files={system}
      value="plugins/app/views/home.tsx"
      className="px-h-400 px-fs-13 px-mb-20"
      leftClassName="px-w-140"
      topClassName="px-l-140"
      mainClassName="px-l-140"
    />
  );
}

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  //i18n
  const { _ } = useLanguage();
  //variables
  const title = _('4. Context Provider - Stackpress Tutorial');
  const description = _(
    'Adding a React context provider enables the toolkit to be usable '
    + 'in the frontend'
  );
  //render
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content="/images/icon.png" />
      <meta property="og:url" content={request.url.pathname} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content="/images/icon.png" />

      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/styles/global.css" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  )
}

export function Body() {
  //render
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H2>Recap</H2>
      
      <section>
        <P>
          The last section went through the process of setting up the 
          database engine through an example <H>store</H> plugin as well 
          as demonstrating some of the <SS>Stackpress</SS> command lines
          used to manage the database. Before we begin, make sure your 
          code generally syncs up with the project panel below.
        </P>

        <LastCheckpoint />

        <P>
          If you are all caught up, then you can proceed to the next 
          section.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <H1>4. Context Provider</H1>

      <section>
        <P>
          Adding a <SS>React</SS> context provider enables the toolkit to 
          be usable in the frontend. Context providers need to be included 
          per view. Let's first setup the Provider in 
          the <H>plugins/app/views/home.tsx</H> file like the following 
          code.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          What was done here was first moved the 
          original <C>HomePage</C> logic to the <C>HomeBody</C> component. 
          Next the <C>HomePage</C> component was refactored to wrap 
          the <C>HomeBody</C> component around 
          the <C>StackpressProvider</C> component supplied by Stackpress. 
          The reason why it is done this way is because you can't use 
          context states in the same component where the context provider 
          is defined. This is a React thing. With 
          the <C>StackpressProvider</C> in 
          place, <C>{'useResponse()'}</C> a context provider hook can now 
          be used in lieu of passing the response directly to 
          the <C>HomePage</C> component. 
        </P>

        <P>
          So far this project demonstrates how a pluggable project 
          structure that can be used to build a web application with the 
          following objectives achieved.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li>
            • Set up of the <SS>Stackpress</SS> client engine.
          </li>
          <li>
            • Set up of an SQL database engine.
          </li>
          <li>
            • Set up of the <SS>Stackpress</SS> context provider.
          </li>
        </ul>

        <P>
          If your final files and project code look like the following, 
          then...
        </P>

        <Checkpoint />

        <Congrats>
          You have completed setting the Stackpress Toolkit.
        </Congrats>
      </section>

      <Nav
        prev={{ 
          text: '3. Database Engine', 
          href: '/docs/toolkit/setup/3-database-engine' 
        }}
      />
    </article>
  );
}

export default function Page(props: ServerPageProps<ServerConfigProps>) {
  const { data, session, request, response } = props;
  //render
  return (
    <Layout
      data={data}
      session={session}
      request={request}
      response={response}
    >
      <Body />
    </Layout>
  );
}