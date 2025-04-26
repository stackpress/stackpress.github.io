//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, H2, P, C, H, SS, Nav, Note } from '../../components/index.js';
import { Code, Editor, Layout } from '../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  //i18n
  const { _ } = useLanguage();
  //variables
  const title = _('4. Context Provider - Stackpress Tutorial');
  const description = _(
    'Adding a React context provider enables the toolset to be usable '
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
        <a className="theme-tx1 block" href="#add-provider">
          {_('4.1. Add Provider')}
        </a>
        <a className="theme-tx1 block" href="#server-hooks">
          {_('4.2. Server Hooks')}
        </a>
        <a className="theme-tx1 block" href="#i18n-hooks">
          {_('4.3. i18n Hooks')}
        </a>
        <a className="theme-tx1 block" href="#theme-hooks">
          {_('4.4. Theme Hooks')}
        </a>
        <a className="theme-tx1 block" href="#notifications">
          {_('4.5. Notifications')}
        </a>
        <a className="theme-tx1 block" href="#modals">
          {_('4.6. Modals')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('4.7. Check Point')}
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
        The last section went through the process of setting up the 
        server side of <SS>Stackpress</SS> as well as demonstrating the 
        server side interaction with the client side. Before we begin, 
        make sure your code generally syncs up with the project panel 
        below.
      </P>

      <Editor 
        title="PROJECT"
        files={checkpoint1System}
        value="plugins/app/views/home.tsx"
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

      <H1>4. Context Provider</H1>

      <P>
        Adding a <SS>React</SS> context provider enables the toolset to 
        be usable in the frontend. Context providers need to be included 
        per view.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="add-provider"></a>
      <H2>4.1. Add Provider</H2>

      <P>
        Let's first setup the Provider in 
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

      {/*------------------------------------------------------------*/}

      <a id="server-hooks"></a>
      <H2>4.2. Server Hooks</H2>

      <P>
        The following server props hooks are available when using 
        the <C>StackpressProvider</C> component.
      </P>

      <ul className="px-lh-30 px-px-20">
        <li>
          • <C>{'useConfig<DataMap?>()'}</C> - Template only data
        </li>
        <li>
          • <C>{'useRequest<InputMap?>()'}</C> - Serialized request data
        </li>
        <li>
          • <C>{'useResponse<ResultsMap?>()'}</C> - Serialized response data
        </li>
        <li>
          • <C>useSession()</C> - Serialized session data
        </li>
        <li>
          • <C>useServer()</C> - All the server props
        </li>
      </ul>

      {/*------------------------------------------------------------*/}

      <a id="i18n-hooks"></a>
      <H2>4.3. i18n Hooks</H2>

      <P>
        Add the <C>useLanguage()</C> hook and/or 
        the <C>Translate</C> component in the following manner.
      </P>

      <Code>{examples[1]}</Code>

      <P>
        Right now, this will only tag all the texts that will need to 
        be translated eventually. We will go through the actual 
        translations in a later article.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="theme-hooks"></a>
      <H2>4.4. Theme Hooks</H2>

      <P>
        Add the <C>useTheme()</C> hook like the following example.
      </P>

      <Code>{examples[2]}</Code>

      <P>
        If you click on the newly created button, you should see the 
        theme toggle from light to dark. If you add the theme variable
        in a className, you can style depending on the mode.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="notifications"></a>
      <H2>4.5. Notifications</H2>

      <P>
        Wrap a button around the <C>notify()</C> and 
        the <C>flash()</C> methods like the following.
      </P>

      <Code>{examples[3]}</Code>

      <Note> 
        Flashing a notification will show only when a new page is loaded.
      </Note>

      {/*------------------------------------------------------------*/}

      <a id="modals"></a>
      <H2>4.6. Modals</H2>

      <P>
        Implement the <C>useModal()</C> and the <C>useConfirm()</C> hooks 
        in the following manner.
      </P>

      <Code>{examples[4]}</Code>

      {/*------------------------------------------------------------*/}
      
      <a id="checkpoint"></a>
      <H2>4.7. Check Point</H2>

      <P>
        In case you got lost, you can sync up your code with the project 
        panel below.
      </P>

      <Editor 
        title="PROJECT"
        files={checkpoint2System}
        value="plugins/app/views/home.tsx"
        className="px-h-400 px-fs-13"
        leftClassName="px-w-140"
        topClassName="px-l-140"
        mainClassName="px-l-140"
      />

      <P>
        The next section will provide a guide to setup a style engine.
      </P>

      <Nav
        prev={{ text: '3. Server Props', href: '/docs/tutorial/server-props' }}
        next={{ text: '5. View Engine', href: '/docs/tutorial/view-engine' }}
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
    <div>
      <h1>Welcome {name} to Stackpress</h1>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
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
`//plugins/app/views/home.tsx
//...
import { 
  //...
  useLanguage,
  Translate
} from 'stackpress/view/client';

//...

export function HomeBody() {
  //...
  //i18n
  const { _ } = useLanguage();
  //render
  return (
    <div>
      <h1>{_('Welcome %s to Stackpress', name)}</h1>
      <Translate>Hello <span>{name}</span></Translate>
      //...
    </div>
  )
}
//...`,
//2-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
//...
import { 
  //...
  useTheme
} from 'stackpress/view/client';

//...

export function HomeBody() {
  //...
  //theme
  const { theme, toggle } = useTheme();
  //render
  return (
    <div className={theme}>
      //...
      <button onClick={() => toggle()}>
        {theme}
      </button>
    </div>
  )
}
//...`,
//3-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
//...
import { 
  //...
  notify,
  flash
} from 'stackpress/view/client';

//...

export function HomeBody() {
  //...
  //render
  return (
    <div className={theme}>
      //...
      <button onClick={() => notify('info', 'Welcome to Stackpress')}>
        Notify
      </button>
      <button onClick={() => {
        flash('info', 'Welcome to Stackpress');
        window.location.reload();
      }}>
    </div>
  )
}
//...`,
//4-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
//...
import { 
  //...
  useModal,
  useConfirm
} from 'stackpress/view/client';

//...

export function HomeBody() {
  //...
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
    <div className={theme}>
      //...
      <button onClick={() => open(true)}>
        Modal
      </button>
      <button onClick={() => confirm()}>
        Confirm
      </button>
    </div>
  )
}
//...`,
];

const checkpoint1Content = {
//--------------------------------------------------------------------//
'config/develop.ts': `
import type { Config } from 'stackpress/types';
//placeholder for eventual development configuration
export const config: Config = {};
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
    <div>
      <h1>Welcome {name} to Stackpress</h1>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
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
  }
];

const checkpoint2Content = {
//--------------------------------------------------------------------//
'config/develop.ts': `
import type { Config } from 'stackpress/types';
//placeholder for eventual development configuration
export const config: Config = {};
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
    <div>
      <h1>{_('Welcome %s to Stackpress', name)}</h1>
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
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    level: 0,
    content: checkpoint2Content['tsconfig.json']
  }
];