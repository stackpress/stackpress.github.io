//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, H2, P, C, H, SS, E, A, Nav, Note } from '../../components/index.js';
import { Code, Editor, Layout } from '../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  //i18n
  const { _ } = useLanguage();
  //variables
  const title = _('6. Client Engine - Stackpress Tutorial');
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
        <a className="theme-tx1 block" href="#create-idea-file">
          {_('6.1. Create Idea File')}
        </a>
        <a className="theme-tx1 block" href="#generate-idea">
          {_('6.2. Generate Idea')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('6.3. Check Point')}
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
      <P>
        The last section covered how to setup the view engine and 
        configuring <SS>UnoCSS</SS>. Before we begin, make sure your 
        code generally syncs up with the project panel below.
      </P>

      <Editor 
        title="PROJECT"
        files={checkpoint1System}
        value="config/develop.ts"
        className="px-h-400 px-fs-13"
        leftClassName="px-w-140"
        topClassName="px-l-140"
        mainClassName="px-l-140"
      />

      <P>
        If you are all caught up, then you can proceed to the next 
        section.
      </P>

      {/*------------------------------------------------------------*/}

      <H1>6. Client Engine</H1>

      <P>
        The client engine is a dynamically generated library customized 
        for your project. It is generated from 
        an <A blank href="/idea">Idea</A> schema file. The schema file 
        is a parsable text file that contains a list of models and their 
        columns. Model columns describe the structure of the data as it 
        pertains to a database, form, filter, table, and view.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="create-idea-file"></a>
      <H2>6.1. Create Idea File</H2>

      <P>
        Let's start by creating a new file called <C>schema.idea</C> from 
        your project root.
      </P>

      <Code>{examples[0]}</Code>

      <Note>
        You can learn more about modeling with <SS>Idea</SS> by visiting 
        the <a target="_blank" href="/idea" className="underline">
          Idea documentation
        </a>.
      </Note>

      {/*------------------------------------------------------------*/}

      <a id="generate-idea"></a>
      <H2>6.2. Generate Idea</H2>

      <P>In Terminal, run <C>npx stackpress generate</C>.</P>

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

      {/*------------------------------------------------------------*/}

      <a id="checkpoint"></a>
      <H2>6.3. Check Point</H2>

      <P>
        In case you got lost, you can sync up your code with the project 
        panel below.
      </P>

      <Editor 
        title="PROJECT"
        files={checkpoint2System}
        value="schema.idea"
        className="px-h-400 px-fs-13"
        leftClassName="px-w-150"
        topClassName="px-l-150"
        mainClassName="px-l-150"
      />

      <P>
        The next section will cover setting up a database engine,
        pushing table schemas to the database, and initially populating 
        the database.
      </P>

      <Nav
        prev={{ text: '5. View Engine', href: '/docs/tutorial/view-engine' }}
        next={{ text: '7. Database Engine', href: '/docs/tutorial/database-engine' }}
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

const examples = [
//0-------------------------------------------------------------------//
`//schema.idea
use "stackpress/stackpress.idea"

//add project models here...`,
//1-------------------------------------------------------------------//
];

const checkpoint1Content = {
//--------------------------------------------------------------------//
'config/develop.ts': `
import type { Config } from 'stackpress/types';
import unocss from 'unocss/vite';

export const config: Config = {
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
  }
};
`.trim(),
//--------------------------------------------------------------------//
'plugins/app/pages/home.ts': `
import type { ViewConfig, BrandConfig, LanguageConfig } from 'stackpress';
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
  StackpressProvider,
  useLanguage,
  Translate,
  useTheme,
  notify,
  flash,
  useModal,
  useConfirm
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
  //i18n
  const { _ } = useLanguage();
  //theme
  const { theme, toggle } = useTheme();
  //modal
  const modal = useModal();
  modal.title('Modal Title');
  modal.body(<span>Go Time?</span>);
  const { confirm } = useConfirm({
    label: 'Go time?',
    message: (<span>Are you sure you want to Go?</span>),
    action: () => alert('Gogogo!')
  });
  //render
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">
        {_('Welcome %s to Stackpress', name)}
      </h1>
      <Translate>Hello <span>{name}</span></Translate>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
      <button onClick={() => toggle()}>
        {theme}
      </button>
      <button onClick={() => notify('info', 'Welcome to Stackpress')}>
        Notify
      </button>
      <button onClick={() => {
        flash('info', 'Welcome to Stackpress');
        window.location.reload();
      }}>
        Flash
      </button>
      <button onClick={() => open(true)}>
        Modal
      </button>
      <button onClick={() => confirm()}>
        Confirm
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
'package.json': `
{
  "type": "module",
  "private": true,
  "plugins": [
    "./plugins/app/plugin",
    "stackpress"
  ],
  "scripts": {
    "dev": "stackpress config/develop serve -v"
  },
  "dependencies": {
    "frui": "0.1.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stackpress": "0.2.10"
  },
  "devDependencies": {
    "@stackpress/idea-transformer": "0.5.15",
    "@types/node": "22.14.1",
    "@types/react": "19.1.2",
    "@types/react-dom": "19.1.2",
    "@vitejs/plugin-react": "4.4.1",
    "fast-glob": "3.3.3",
    "prettier": "3.5.3",
    "ts-mocha": "11.1.0",
    "ts-morph": "25.0.1",
    "ts-node": "10.9.2",
    "tsx": "4.19.3",
    "typescript": "5.8.3",
    "unocss": "66.0.0",
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
    "moduleResolution": "nodenext",
    "outDir": ".build",
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

const checkpoint1System: (File | Folder)[] = [
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
    content: checkpoint1Content['config/develop.ts']
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
    content: checkpoint1Content['plugins/app/pages/home.ts']
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
    content: checkpoint1Content['plugins/app/views/home.tsx']
  },
  {
    type: 'file',
    id: 'plugins/app/plugin.ts',
    name: 'plugin.ts',
    level: 2,
    content: checkpoint1Content['plugins/app/plugin.ts']
  },
  {
    type: 'file',
    id: 'package.json',
    name: 'package.json',
    level: 0,
    content: checkpoint1Content['package.json']
  },
  {
    type: 'file',
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    level: 0,
    content: checkpoint1Content['tsconfig.json']
  },
  {
    type: 'file',
    id: 'unocss.config.ts',
    name: 'unocss.config.ts',
    level: 0,
    content: checkpoint1Content['unocss.config.ts']
  }
];

const checkpoint2Content = {
//--------------------------------------------------------------------//
'config/develop.ts': `
import type { Config } from 'stackpress/types';
import unocss from 'unocss/vite';

export const config: Config = {
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
  }
};
`.trim(),
//--------------------------------------------------------------------//
'plugins/app/pages/home.ts': `
import type { ViewConfig, BrandConfig, LanguageConfig } from 'stackpress';
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
  StackpressProvider,
  useLanguage,
  Translate,
  useTheme,
  notify,
  flash,
  useModal,
  useConfirm
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
  //i18n
  const { _ } = useLanguage();
  //theme
  const { theme, toggle } = useTheme();
  //modal
  const modal = useModal();
  modal.title('Modal Title');
  modal.body(<span>Go Time?</span>);
  const { confirm } = useConfirm({
    label: 'Go time?',
    message: (<span>Are you sure you want to Go?</span>),
    action: () => alert('Gogogo!')
  });
  //render
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">
        {_('Welcome %s to Stackpress', name)}
      </h1>
      <Translate>Hello <span>{name}</span></Translate>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
      <button onClick={() => toggle()}>
        {theme}
      </button>
      <button onClick={() => notify('info', 'Welcome to Stackpress')}>
        Notify
      </button>
      <button onClick={() => {
        flash('info', 'Welcome to Stackpress');
        window.location.reload();
      }}>
        Flash
      </button>
      <button onClick={() => open(true)}>
        Modal
      </button>
      <button onClick={() => confirm()}>
        Confirm
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
'package.json': `
{
  "type": "module",
  "private": true,
  "plugins": [
    "./plugins/app/plugin",
    "stackpress"
  ],
  "scripts": {
    "dev": "stackpress config/develop serve -v"
  },
  "dependencies": {
    "frui": "0.1.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stackpress": "0.2.10"
  },
  "devDependencies": {
    "@stackpress/idea-transformer": "0.5.15",
    "@types/node": "22.14.1",
    "@types/react": "19.1.2",
    "@types/react-dom": "19.1.2",
    "@vitejs/plugin-react": "4.4.1",
    "fast-glob": "3.3.3",
    "prettier": "3.5.3",
    "ts-mocha": "11.1.0",
    "ts-morph": "25.0.1",
    "ts-node": "10.9.2",
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
    "moduleResolution": "nodenext",
    "outDir": ".build",
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

const checkpoint2System: (File | Folder)[] = [
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
    content: checkpoint2Content['config/develop.ts']
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
    content: checkpoint2Content['plugins/app/pages/home.ts']
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
    content: checkpoint2Content['plugins/app/views/home.tsx']
  },
  {
    type: 'file',
    id: 'plugins/app/plugin.ts',
    name: 'plugin.ts',
    level: 2,
    content: checkpoint2Content['plugins/app/plugin.ts']
  },
  {
    type: 'file',
    id: 'package.json',
    name: 'package.json',
    level: 0,
    content: checkpoint2Content['package.json']
  },
  {
    type: 'file',
    id: 'schema.idea',
    name: 'schema.idea',
    level: 0,
    content: checkpoint2Content['schema.idea']
  },
  {
    type: 'file',
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    level: 0,
    content: checkpoint2Content['tsconfig.json']
  },
  {
    type: 'file',
    id: 'unocss.config.ts',
    name: 'unocss.config.ts',
    level: 0,
    content: checkpoint2Content['unocss.config.ts']
  }
];