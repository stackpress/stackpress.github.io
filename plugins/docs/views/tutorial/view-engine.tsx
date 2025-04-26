//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, H2, A, P, B, C, H, SS, Nav } from '../../components/index.js';
import { Code, Editor, Layout } from '../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  //i18n
  const { _ } = useLanguage();
  //variables
  const title = _('5. View Engine - Stackpress Tutorial');
  const description = _(
    'The view engine of Stackpress uses Reactus built on top of Vite '
    + 'allowing to use React as a template engine.'
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
        <a className="theme-tx1 block" href="#install-unocss">
          {_('5.1. Install UnoCSS')}
        </a>
        <a className="theme-tx1 block" href="#configure-unocss">
          {_('5.2. Configure UnoCSS')}
        </a>
        <a className="theme-tx1 block" href="#configure-view-engine">
          {_('5.3. Configure View Engine')}
        </a>
        <a className="theme-tx1 block" href="#update-view">
          {_('5.4. Update View')}
        </a>
        <a className="theme-tx1 block" href="#run-server">
          {_('5.5. Run the Server')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('5.6. Check Point')}
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
        The last section covered the <SS>Stackpress</SS> context 
        provider, that enables the toolset to be usable in the frontend. 
        Before we begin, make sure your code generally syncs up with the 
        project panel below.
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

      <H1>5. View Engine</H1>

      <P>
        The view engine of <SS>Stackpress</SS> uses a sub-project 
        called <A blank href="/reactus">Reactus</A> which is 
        built on top 
        of <A blank href="https://vite.dev/">Vite</A>.
        The project allows to use <SS>React</SS> as a template engine.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="install-unocss"></a>
      <H2>5.1. Install UnoCSS</H2>

      <P>
        First thing to do is to install the <SS>UnoCSS</SS> package. 
        Open up the <H>package.json</H> file and add the following package.
      </P>

      <Code>{examples[0]}</Code>

      <P>
        <A blank href="https://unocss.dev/">UnoCSS</A> is a 
        utility-first CSS engine that allows you to use atomic classes 
        in your project. It is a very powerful tool that allows you to 
        write CSS in a very efficient way and better APIs to create 
        custom classes.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="configure-unocss"></a>
      <H2>5.2. Configure UnoCSS</H2>

      <P>
        Next, let's create a <H>unocss.config.ts</H> file in the root of
        the project with the following code. This file will contain the 
        configuration for the <SS>UnoCSS</SS> engine. 
      </P>

      <Code>{examples[1]}</Code>

      <P>
        <C>presetWind3</C> adds the <SS>Tailwind CSS v3</SS> class name
        rules to the project and <C>presetStackpress</C> adds pixel, 
        hex, rgb, theme, and desktop first rules to the project.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="configure-view-engine"></a>
      <H2>5.3. Configure View Engine</H2>

      <P>
        Next, let's configure the view engine to use 
        the <SS>UnoCSS</SS> by adding the following code to the
        <H>config/develop.ts</H> file.
      </P>

      <Code>{examples[2]}</Code>

      <P>
        <C>view.engine.cssFiles</C> is an array of css files that will be
        computed by every view in the project. This is different from 
        styles found in the <H>public</H> folder, which are static files
        you can add in the <C>Head</C> component per view. These static 
        files are loaded before the client app script, 
        and <C>view.engine.cssFiles</C> are loaded with the client app 
        script.
      </P>

      <P>
        <C>view.engine.plugins</C> is an array of plugins that 
        will be used by the view engine. This is where you can 
        theoretically add any vite plugins you want to use in your 
        project. 
      </P>

      {/*------------------------------------------------------------*/}

      <a id="update-view"></a>
      <H2>5.4. Update View</H2>

      <P>
        Before we run the server, let's update the <H>plugins/app/views/home.tsx</H>
        file to use the <SS>UnoCSS</SS> classes. The following code
        will add the <SS>UnoCSS</SS> classes to the <C>HomeBody</C>
        component. 
      </P>

      <Code>{examples[3]}</Code>

      <P>
        The <C>'p-4'</C> class will add padding all around the
        component, the <C>'text-3xl'</C> class will increase the font 
        size, and the <C>'font-bold'</C> class will bold the text.
        weight to the component. All of these afformentioned classes
        are <A blank href="https://tailwindcss.com/">Tailwind CSS</A> classes.
      </P>

      {/*------------------------------------------------------------*/}
      
      <a id="run-server"></a>
      <H2>5.5. Run the Server</H2>
      
      <ol className="px-px-10 px-lh-30 px-py-20">
        <li>1. In Terminal, run <B>npm run dev</B></li>
        <li>2. On your browser, visit <H>http://localhost:3000/</H></li>
      </ol>

      {/*------------------------------------------------------------*/}

      <a id="checkpoint"></a>
      <H2>5.6. Check Point</H2>

      <P>
        In case you got lost, you can sync up your code with the project 
        panel below.
      </P>

      <Editor 
        title="PROJECT"
        files={checkpoint2System}
        value="config/develop.ts"
        className="px-h-400 px-fs-13"
        leftClassName="px-w-150"
        topClassName="px-l-150"
        mainClassName="px-l-150"
      />

      <P>
        The next section will briefly introduce the client engine as it 
        pertains to enabling the <SS>Stackpress</SS> toolset.
      </P>

      <Nav
        prev={{ text: '4. Context Provider', href: '/docs/tutorial/context-provider' }}
        next={{ text: '6. Client Engine', href: '/docs/tutorial/client-engine' }}
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
`//package.json
{
  //...
  "devDependencies": {
    //...
    "unocss": "66.0.0"
  },
  //...
}`,
//1-------------------------------------------------------------------//
`//unocss.config.ts
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
});`,
//2-------------------------------------------------------------------//
`//config/develop.ts
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
};`,
//3-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
//...
export function HomeBody() {
  //...
  //render
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">
        {_('Welcome %s to Stackpress', name)}
      </h1>
      //...
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
  },
  {
    type: 'file',
    id: 'unocss.config.ts',
    name: 'unocss.config.ts',
    level: 0,
    content: checkpoint2Content['unocss.config.ts']
  }
];