//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, H2, P, H, B, C, E, SS, Nav } from '../../components/index.js';
import { Note, Code, Editor, Layout } from '../../components/index.js';
import { Checkpoint as LastCheckpoint } from './1-ecmascript.js';

const examples = [
//0-------------------------------------------------------------------//
`//config/develop.ts
import type { Config } from 'stackpress/types';
//development configuration
const config: Config = {
  server: { mode: 'development' }
};
//export configuration
export default config;`,
//1-------------------------------------------------------------------//
`//plugins/app/plugin.ts
import type { Server } from 'stackpress/server';

export default function plugin(server: Server) {
  //on route, add app routes
  server.on('route', async _ => {
    server.get('/', '@/plugins/app/views/home');
  });
};`,
//2-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
import type { ServerPageProps } from 'stackpress/view/client';
import { useState } from 'react';

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

export default function HomePage(props: ServerPageProps) {
  //basic count state
  const [ count, setCount ] = useState(0)
  //render
  return (
    <div>
      <h1>Welcome to Stackpress</h1>
      <button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}`,
];

const content = {
//--------------------------------------------------------------------//
'config/develop.ts': `
import type { Config } from 'stackpress/types';
//development configuration
const config: Config = {
  server: { mode: 'development' }
};
//export configuration
export default config;
`.trim(),
//--------------------------------------------------------------------//
'plugins/app/views/home.tsx': `
import type { ServerPageProps } from 'stackpress/view/client';
import { useState } from 'react';

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

export default function HomePage(props: ServerPageProps) {
  //basic count state
  const [ count, setCount ] = useState(0)
  //render
  return (
    <div>
      <h1>Welcome to Stackpress</h1>
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
    server.get('/', '@/plugins/app/views/home');
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
    "dev": "stackpress serve -b config/develop -v"
  },
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stackpress": "0.2.12"
  },
  "devDependencies": {
    "@types/node": "22.14.1",
    "@types/react": "19.1.2",
    "@types/react-dom": "19.1.2",
    "@vitejs/plugin-react": "4.4.1",
    "tsx": "4.19.3",
    "typescript": "5.8.3",
    "vite": "6.3.2"
  }
}
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
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    level: 0,
    content: content['tsconfig.json']
  }
];

export function Checkpoint() {
  //render
  return (
    <Editor 
      title="PROJECT"
      files={system}
      value="package.json"
      className="px-h-400 px-fs-13"
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
  const title = _('2. Plugin Archiecture - Stackpress Tutorial');
  const description = _(
    'The plugin architecture is a file structure pattern designed to '
    + 'separate the project code by unit feature.'
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
        <a className="theme-tx1 block" href="#development-config">
          {_('2.1. Development Config')}
        </a>
        <a className="theme-tx1 block" href="#app-plugin">
          {_('2.2. App Plugin')}
        </a>
        <a className="theme-tx1 block" href="#home-page-view">
          {_('2.3. Home Page View')}
        </a>
        <a className="theme-tx1 block" href="#plugin-list">
          {_('2.4. Plugin List & Scripts')}
        </a>
        <a className="theme-tx1 block" href="#run-server">
          {_('2.5. Run the Server')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('2.6. Check Point')}
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
          The last section covered how to setup your project to a 
          strict <SS>EcmaScript Module</SS> standard and provisioned 
          packages that will be used in later tutorials. Get caught up by 
          making sure your project looks like the following.
        </P>

        <LastCheckpoint />

        <P>
          If you are all caught up, then you can proceed to the next 
          section.
        </P>
      </section>
      
      {/*------------------------------------------------------------*/}

      <H1>2. The Plugin Architecture</H1>

      <section>
        <P>
          The plugin architecture is a file structure pattern designed to 
          separate the project code by unit feature. This allows developers 
          to progressively toggle each one at any given time. This 
          section will cover creating the first <H>app</H> plugin.
        </P>

        <Note>
          Stackpress remains unopinionated and the plugin architecture is 
          just one of many ways on how one can structure a project.
        </Note>
      </section>
      
      {/*------------------------------------------------------------*/}

      <a id="development-config"></a>
      <H2>2.1. Development Config File</H2>

      <section>
        <P>
          From the project root, create a new file 
          called <H>config/develop.ts</H> with the 
          following code.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          This file will host all the configuration for the development 
          piece of your application. In this case we just need to 
          set <C>{`{ server: { mode: 'development' } }`}</C> because by 
          default it's <C>'production'</C>. This tells future plugins 
          what environment the project is currently in. Later sections 
          will explain a <SS>build</SS> and <SS>preview</SS> configuration 
          as well.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="app-plugin"></a>
      <H2>2.2. App Plugin</H2>

      <section>
        <P>
          Next, from the project root, create a new file 
          called <H>plugins/app/plugin.ts</H> with the 
          following code.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          This file will be the entry point for your first plugin. Before
          starting the server, <SS>Stackpress</SS> will run a bootstrap 
          process that will run the following events this exact order.
        </P>

        <ol className="px-px-10 px-lh-30 px-pb-20">
          <li>
            1. <C>config</C> - Allows all plugins to 
            consume the configuration, and register themselves.
          </li>
          <li>
            2. <C>listen</C> - Allows all plugins to
            add events to listen to.
          </li>
          <li>
            3. <C>route</C> - Allows all plugins to
            add routes to listen to.
          </li>
        </ol>

        <P>
          Specifically in the above example, a handler 
          for <C>route</C> was added in which we are now 
          routing the path <C>/</C> to the 
          view <C>@/plugins/app/views/home</C> where 
          the <C>@</C> means project root pathname. 
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="home-page-view"></a>
      <H2>2.3. Home Page View</H2>

      <section>
        <P>
          Next from the project root, create a new file 
          called <H>plugins/app/views/home.tsx</H> with 
          the following code.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          This file will be the view for the home page. Valid views 
          in <SS>Stackpress</SS> require the file 
          to <C>default export</C> a <SS>React</SS> component. If 
          you want to modify the head of the page, you can optionally export 
          a <C>Head</C> function <SS>React</SS> component.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="plugin-list"></a>
      <H2>2.4. Plugin List &amp; Scripts</H2>

      <section>
        <P>
          Before we are ready to test this, we need to add the app plugin 
          to a plugin list. In the <H>package.json</H> at 
          the root of your project, add the following entries.
        </P>

        <Code>{
          JSON.stringify({
            "plugins": [
              "./plugins/app/plugin",
              "stackpress"
            ],
            "scripts": {
              "dev": "stackpress serve -b config/develop -v"
            },
          }, null, 2)
        }</Code>

        <P>
          When we run <B>npm run dev</B>, <SS>Stackpress</SS> will 
          execute a default bootstrap process that will register the 
          given <C>plugins</C> in the given order. 
          The <C>-b</C> <E>(bootstrap)</E> flag tells the command to use 
          the config found at <C>'config/develop'</C>. The <C>-v</C> flags 
          will make the command verbose. Adding the <C>stackpress</C> plugin 
          will provision all the optional toolsets to your application.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="run-server"></a>
      <H2>2.5. Run the Server</H2>
      
      <ol className="px-px-10 px-lh-30 px-py-20">
        <li>1. In Terminal, run <B>npm run dev</B></li>
        <li>2. On your browser, visit <H>http://localhost:3000/</H></li>
      </ol>

      {/*------------------------------------------------------------*/}
      
      <a id="checkpoint"></a>
      <H2>2.6. Check Point</H2>

      <section>
        <P>
          In case you got lost along the way, here is a checkpoint of what
          your project should look like.
        </P>

        <Checkpoint />
        
        <P>
          The next section will dive more into server and page routes.
        </P>
      </section>

      <Nav
        prev={{ 
          text: '1. EcmaScript', 
          href: '/docs/tutorial/1-ecmascript' 
        }}
        next={{ 
          text: '3. Server Routes', 
          href: '/docs/tutorial/3-server-routes' 
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