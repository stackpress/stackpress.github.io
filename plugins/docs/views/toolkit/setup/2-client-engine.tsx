//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import type { File, Folder } from '../../../components/index.js';
import { H1, H2, P, C, H, SS, E, A, Nav, Note } from '../../../components/index.js';
import { Code, Editor, Layout } from '../../../components/index.js';
import { Checkpoint as LastCheckpoint } from './1-project-setup.js';

const examples = [
`//package.json
{
  //...
  "dependencies": {
    "frui": "0.1.8",
    //...
  },
  "devDependencies": {
    "prettier": "3.5.3",
    "ts-morph": "25.0.1",
    //...
  }
}`,
//1-------------------------------------------------------------------//
`//config/develop.ts
import type { Config } from 'stackpress/types';
import unocss from 'unocss/vite';

const cwd = process.cwd();
const build = path.join(cwd, '.build');

export const config: Config = {
  //...
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
};`,
//1-------------------------------------------------------------------//
`//schema.idea
use "stackpress/stackpress.idea"

//add project models here...`,
//2-------------------------------------------------------------------//
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
'package.json': `
{
  "type": "module",
  "private": true,
  "plugins": [
    "./plugins/app/plugin",
    "stackpress"
  ],
  "scripts": {
    "dev": "stackpress serve --b config/develop -v"
  },
  "dependencies": {
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
      value="schema.idea"
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
  const title = _('2. Client Engine - Stackpress Tutorial');
  const description = _(
    'The client engine is a dynamically generated library customized '
    + 'for your project. It is generated from an Idea schema file.'
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
        <a className="theme-tx1 block" href="#client-packages">
          {_('2.1. Client Packages')}
        </a>
        <a className="theme-tx1 block" href="#configure-database">
          {_('2.2. Configure Database')}
        </a>
        <a className="theme-tx1 block" href="#create-idea-file">
          {_('2.3. Create Idea File')}
        </a>
        <a className="theme-tx1 block" href="#generate-idea">
          {_('2.4. Generate Idea')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('2.5. Check Point')}
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
          The last section covered the project setup. Before we begin, 
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

      <H1>2. Client Engine</H1>

      <section>
        <P>
          The client engine is a dynamically generated library customized 
          for your project. It is generated from 
          an <A blank href="/idea">Idea</A> schema file. The schema file 
          is a parsable text file that contains a list of models and their 
          columns. Model columns describe the structure of the data as it 
          pertains to a database, form, filter, table, and view.
        </P>

        <P>
          Parts of the <SS>Stackpress</SS> toolkit is built under the 
          assumptions that there is a client engine in place. Tools like 
          authentication, roles &amp; permissions, and API rely on the 
          client engine to generate its backend and interaction with the 
          database.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="client-packages"></a>
      <H2>2.1. Client Packages</H2>

      <section>
        <P>
          Update the <H>package.json</H> file to include the following.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          The additonal packages and use are described below.
        </P>
      </section>

      <div className="px-w-100-0 overflow-x-auto">
        <Table>
          <Thead className="theme-bg-bg2 text-left">Package</Thead>
          <Thead wrap2 className="theme-bg-bg2 text-left">Description</Thead>
          <Thead wrap3 className="theme-bg-bg2 text-left">Usage</Thead>
          <Trow>
            <Tcol noWrap className="text-left">
              <H>frui</H>
            </Tcol>
            <Tcol className="text-left">
              Just <SS>React</SS> components
            </Tcol>
            <Tcol className="text-left">
              Imported from generated components and admin view templates.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="theme-bg-bg1 text-left">
              <H>@stackpress/idea-transformer</H>
            </Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              Transforms <SS>Idea</SS> files to generated code.
            </Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              Imported from toolkit plugins to generate code from the schema.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="text-left">
              <H>fast-glob</H>
            </Tcol>
            <Tcol className="text-left">
              Reads through files and folders.
            </Tcol>
            <Tcol className="text-left">
              Imported from the schema revision manager.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="theme-bg-bg1 text-left">
              <H>prettier</H>
            </Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              Prettifies code.
            </Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              Imported from the terminal to prettify the final 
              code <E>(if compiling to typescript)</E>.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="text-left">
              <H>ts-morph</H>
            </Tcol>
            <Tcol className="text-left">
              Typescript code builder.
            </Tcol>
            <Tcol className="text-left">
              desc
            </Tcol>
          </Trow>
        </Table>
      </div>

      {/*------------------------------------------------------------*/}

      <a id="configure-database"></a>
      <H2>2.2. Configure Database</H2>

      <section>
        <P>
          Update the <H>config/develop.ts</H> file to include the 
          following <C>database</C> and <C>client</C> configuration.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          The following explains the <C>database</C> configuration 
          options.
        </P>
      </section>

      <div className="px-w-100-0 overflow-x-auto">
        <Table>
          <Thead className="theme-bg-bg2 text-left">Options</Thead>
          <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
          <Trow>
            <Tcol noWrap className="text-left">
              <C>{'seed'}</C>
            </Tcol>
            <Tcol className="text-left">
              Used to encrypt/decrypt data in the database.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="theme-bg-bg1 text-left">
              <C>{'migrations'}</C>
            </Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              Where to store create and alter table migration files
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="text-left">
              <C>{'schema'}</C>
            </Tcol>
            <Tcol className="text-left">
              Cascading rules used when generating the database schema
            </Tcol>
          </Trow>
        </Table>
      </div>

      <section>
        <P>
          The following explains the <C>client</C> configuration 
          options.
        </P>
      </section>

      <div className="px-w-100-0 overflow-x-auto">
        <Table>
          <Thead className="theme-bg-bg2 text-left">Options</Thead>
          <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
          <Trow>
            <Tcol noWrap className="text-left">
              <C>{'module'}</C>
            </Tcol>
            <Tcol className="text-left">
              The name of the module that Stackpress will use to import the client
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="theme-bg-bg1 text-left">
              <C>{'package'}</C>
            </Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              The name of the client package that will be used when 
              generating a <C>package.json</C> during build
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="text-left">
              <C>{'revisions'}</C>
            </Tcol>
            <Tcol className="text-left">
              Where to store serialized idea json files for historical 
              purposes. Revisions are used in conjuction with push and 
              migrate to determine the changes between each idea change.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="text-left">
              <C>{'tsconfig'}</C>
            </Tcol>
            <Tcol className="text-left">
              What tsconfig file to base the typescript compiler on
            </Tcol>
          </Trow>
        </Table>
      </div>

      {/*------------------------------------------------------------*/}

      <a id="create-idea-file"></a>
      <H2>2.3. Create Idea File</H2>

      <section>
        <P>
          Let's start by creating a new file called <C>schema.idea</C> from 
          your project root.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          The <H>stackpress/stackpress.idea</H> file includes schema 
          definitions for user profiles <E>(Profile)</E>, 
          authentication <E>(Auth)</E>, API applications <E>(Application)</E>, 
          and API sessions <E>(Session)</E>. These model definitions 
          describe how the database structure looks like, the interaction 
          between server and database, and how it should be presented on 
          the client side using <SS>React</SS> components. It even 
          provides a working admin interface to manage the data of these 
          models.
        </P>

        <Note>
          You can learn more about modeling with <SS>Idea</SS> by visiting 
          the <a target="_blank" href="/idea" className="underline">
            Idea documentation
          </a>.
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="generate-idea"></a>
      <H2>2.4. Generate Idea</H2>

      <section>
        <P>In Terminal, run <C>npx stackpress generate --b config/develop</C>.</P>

        <P>
          If you open the <H>node_modules</H> folder in the project root,
          you should see a new folder called <C>stackpress-client</C>. The
          content of this folder is the generated client code that looks 
          like the following list.
        </P>

        <ul className="px-px-10 px-lh-30 px-py-20">
          <li>
            • <SS>Application</SS> - Model that manages the applications 
            using the APIs of the project.
          </li>
          <li>
            • <SS>Auth</SS> - Model that manages the authentication 
            methods of the project.
          </li>
          <li>
            • <SS>Profile</SS> - Model that manages user 
            profiles <E>(non-sensitive data)</E>.
          </li>
          <li>
            • <SS>Session</SS> - Model that manages the users using the 
            APIs of the project.
          </li>
        </ul>

        <P>
          Each of these models includes typings, ORMs, events, components, 
          admin routes and views you can access at anytime.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="checkpoint"></a>
      <H2>2.5. Check Point</H2>

      <section>
        <P>
          In case you got lost, you can sync up your code with the project 
          panel below.
        </P>

        <Checkpoint />

        <P>
          The next section will cover setting up a database engine,
          pushing table schemas to the database, and initially populating 
          the database.
        </P>
      </section>

      <Nav
        prev={{ 
          text: '1. Project Setup', 
          href: '/docs/toolkit/setup/1-project-setup' 
        }}
        next={{ 
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
      right={<Right />}
    >
      <Body />
    </Layout>
  );
}