//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import type { File, Folder } from '../../../components/index.js';
import { H1, H2, A, P, C, H, B, SS } from '../../../components/index.js';
import { Nav, Note, Code, Editor, Layout } from '../../../components/index.js';
import { Checkpoint as LastCheckpoint } from './2-client-engine.js';

const examples = [
//0-------------------------------------------------------------------//
`//package.json
{
  //...
  "plugins": [
    "./plugins/app/plugin",
    "./plugins/store/plugin",
    "stackpress"
  ],
  //...
  "dependencies": {
    "@electric-sql/pglite": "0.2.17",
    "@stackpress/inquire-pglite": "0.5.27",
    //...
  },
  //...
}`,
//1-------------------------------------------------------------------//
`//plugins/store/connect.ts
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
};`,
//2-------------------------------------------------------------------//
`//plugins/store/plugin.ts
import type { Server } from 'stackpress/server';
import connect from './connect.js';

export default function plugin(server: Server) {
  //on config, register the store
  server.on('config', async _ => {
    server.register('database', await connect());
  });
};`,
//3-------------------------------------------------------------------//
`//plugins/store/populate.ts
import type { ProfileAuth } from 'stackpress';
import { action } from 'stackpress/server';

export default action(async function Populate(_req, _res, ctx) {
  const admin = await ctx.resolve<ProfileAuth>('auth-signup', {
    type: 'person',
    name: 'Admin',
    username: 'admin',
    email: 'admin@project.com',
    secret: 'admin',
    roles: [ 'ADMIN' ]
  });
  await ctx.resolve('application-create', {
    profileId: admin.results?.id,
    name: 'Example App',
    scopes: [ 'user' ],
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  });
});`,
//4-------------------------------------------------------------------//
`//plugins/store/plugin.ts
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
};`,
];

const content = {
//--------------------------------------------------------------------//
'config/develop.ts': `
import type { Config } from 'stackpress/types';
import unocss from 'unocss/vite';
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
    migrations: path.join(build, 'migrations'),
    //cascading rules used when generating the database schema
    //options: 'CASCADE', 'SET NULL', 'RESTRICT'
    schema: {
      onDelete: 'CASCADE' as Cascade,
      onUpdate: 'RESTRICT' as Cascade
    }
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
import { useState } from 'react';

export function Head(props: ServerPageProps<{ title: string }>) {
  const { data, styles = [] } = props;
  //render
  return (
    <>
      <title>{data.title}</title>
      <meta name="description" content="Welcome to Stackpress" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  )
}

export default function HomePage(props: ServerPageProps) {
  //response
  const { response } = props;
  const { name = 'guest' } = response.results || {};
  //basic count state
  const [ count, setCount ] = useState(0)
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
import type { ProfileAuth } from 'stackpress';
import { action } from 'stackpress/server';

export default action(async function Populate(_req, _res, ctx) {
  const admin = await ctx.resolve<ProfileAuth>('auth-signup', {
    type: 'person',
    name: 'Admin',
    username: 'admin',
    email: 'admin@project.com',
    secret: 'admin',
    roles: [ 'ADMIN' ]
  });
  await ctx.resolve('application-create', {
    profileId: admin.results?.id,
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
    "@stackpress/inquire-pglite": "0.5.27",
    "frui": "0.1.8",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stackpress": "0.2.27"
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
      value="plugins/store/plugin.ts"
      className="px-h-400 px-fs-13"
      leftClassName="px-w-150"
      topClassName="px-l-150"
      mainClassName="px-l-150"
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
  const title = _('3. Database Engine - Tookkit - Stackpress Tutorial');
  const description = _(
    'This tutorial will guide you through the process of setting up a '
    + 'database plugin used by the Stackpress toolkit.'
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

export function Right() {
  //i18n
  const { _ } = useLanguage();
  //render
  return (
    <menu className="px-m-0 px-px-10 px-py-20 overflow-auto">
      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-0 px-pb-10 uppercase">
        {_('On this page')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx1 block" href="#install-pglite">
          {_('3.1. Install PGLite')}
        </a>
        <a className="theme-tx1 block" href="#database-connection">
          {_('3.2. Database Connection')}
        </a>
        <a className="theme-tx1 block" href="#store-plugin">
          {_('3.3. Store Plugin')}
        </a>
        <a className="theme-tx1 block" href="#populate-database">
          {_('3.4. Populate Database')}
        </a>
        <a className="theme-tx1 block" href="#database-commands">
          {_('3.5. Database Commands')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('3.6. Check Point')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  //render
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H2>Recap</H2>

      <section>
        <P>
          The last section covered the client engine, a dynamically 
          generated library customized for your project. Before we begin, 
          make sure your code generally syncs up with the project panel 
          below.
        </P>

        <LastCheckpoint />

        <P>
          If you are all caught up, then you can proceed to the next 
          section.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <H1>3. Database Engine</H1>

      <P>
        Before we can enable the default <SS>Stackpress</SS> toolkit 
        backend, we need to create a database plugin. This plugin will 
        be used by all plugins requiring interaction with a database 
        ensuring the same connection will be used throughout the project.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="install-pglite"></a>
      <H2>3.1. Install PGLite</H2>

      <section>
        <P>
          In the interest of staying focused on the task at hand, 
          working with <A blank href="https://pglite.dev/">PGLite</A> allows 
          to quickly create a file based <SS>Postgres</SS> scaffold for 
          testing purposes. Let's add the <SS>PGLite</SS> and query builder 
          in <C>package.json</C> like the following code.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          This also adds the eventual <C>plugins/store/plugin</C> to 
          the plugin list so Stackpress can initialize it. Next, 
          run <C>yarn</C> or <C>npm i</C> to get the required packages for 
          this tutorial to be installed.
        </P>

        <Note>
          Stackpress has SQL connection mappings for <C>mysql2</C>, <C>pg</C>, 
          <C>@electric-sql/pglite</C>, and <C>better-sqlite3</C> NPM packages. 
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="database-connection"></a>
      <H2>3.2. Database Connection</H2>

      <section>
        <P>
          Next, from the project root, create a new file 
          called <C>plugins/store/connect.ts</C> with the following code.
        </P>

        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="store-plugin"></a>
      <H2>3.3. Store Plugin</H2>

      <section>
        <P>
          Now that a connection function is defined, let's work on the 
          database plugin entry file. From the project root, create a new 
          file called <C>./plugins/store/plugin.ts</C> with the following 
          code.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          This file will be the entry point for the database plugin. 
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="populate-database"></a>
      <H2>3.4. Populate Database</H2>

      <section>
        <P>
          From the project root, create a new file 
          called <H>plugins/store/populate.ts</H> with the following code.
        </P>

        <Code>{examples[3]}</Code>

        <P>
          Then update the <C>plugins/store/plugin.ts</C> file to
          include the <C>populate</C> event like the following code.
        </P>

        <Code>{examples[4]}</Code>

        <P>
          Last, run the following commands to push to and populate the 
          database.
        </P>

        <ol className="px-px-10 px-lh-30 px-py-20">
          <li>1. In Terminal, run <B>npx stackpress config/develop generate</B></li>
          <li>2. In Terminal, run <B>npx stackpress config/develop push</B></li>
          <li>3. In Terminal, run <B>npx stackpress config/develop emit populate</B></li>
        </ol>

        <Note>
          The <C>emit</C> command generally triggers events on the command 
          line.
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="database-commands"></a>
      <H2>3.5. Database Commands</H2>

      <section>
        <P>
          Now that both the client and database engine is setup, the following
          commands can be used to manage the database.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead className="theme-bg-bg2 text-left">Command</Thead>
            <Thead className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <B>npx stackpress config/develop migrate</B>
              </Tcol>
              <Tcol className="text-left">
                Creates a <H>migrations</H> folder 
                in <H>[cwd]/.build</H> folder and generates an SQL file. 
                It does not push these changes to the database.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <B>npx stackpress config/develop purge</B>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Removes all rows from all tables in the database.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <B>npx stackpress config/develop push</B>
              </Tcol>
              <Tcol className="text-left">
                Pushes schema changes to the database.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <B>npx stackpress config/develop query</B>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Queries the database. ie. 
                <C>{`npx stackpress config/develop query "SELECT * FROM users"`}</C>
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="checkpoint"></a>
      <H2>3.6. Check Point</H2>

      <section>
        <P>
          In case you got lost, you can sync up your code with the project 
          panel below.
        </P>

        <Checkpoint />

        <P>
          The next section will show how to add 
          the <SS>Stackpress</SS> context provider so views can consume 
          the toolkit.
        </P>
      </section>

      <Nav
        prev={{ 
          text: '2. Client Engine', 
          href: '/docs/toolkit/setup/2-client-engine' 
        }}
        next={{ 
          text: '4. Context Provider', 
          href: '/docs/toolkit/setup/4-context-provider' 
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
      right={<Right />}
    >
      <Body />
    </Layout>
  );
}