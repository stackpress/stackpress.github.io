//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, H2, A, P, B, C, H, S, SS, Nav } from '../../components/index.js';
import { Code, Editor, Congrats, Layout } from '../../components/index.js';
import { Checkpoint as LastCheckpoint } from './4-server-props.js';

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
  }
};
//export configuration
export default config;`,
//3-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
//...
export default function HomePage(props: ServerPageProps)
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
}`,
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
    "dev": "stackpress serve -b config/develop -v"
  },
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stackpress": "0.2.19"
  },
  "devDependencies": {
    "@types/node": "22.14.1",
    "@types/react": "19.1.2",
    "@types/react-dom": "19.1.2",
    "@vitejs/plugin-react": "4.4.1",
    "fast-glob": "3.3.3",
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
      value="config/develop.ts"
      className="px-h-400 px-fs-13 px-mb-20"
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

      <section>
        <P>
          The last section went through the process of setting up the 
          server side of <SS>Stackpress</SS> as well as demonstrating the 
          server side interaction with the client side. Before we begin, 
          make sure your code generally syncs up with the project explorer 
          below.
        </P>

        <LastCheckpoint />

        <P>
          If you are all caught up, then you can proceed to the next 
          section.
        </P>
      </section>

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

      <section>
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
      </section>

      {/*------------------------------------------------------------*/}

      <a id="configure-unocss"></a>
      <H2>5.2. Configure UnoCSS</H2>

      <section>
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
      </section>

      {/*------------------------------------------------------------*/}

      <a id="configure-view-engine"></a>
      <H2>5.3. Configure View Engine</H2>

      <section>
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
      </section>

      {/*------------------------------------------------------------*/}

      <a id="update-view"></a>
      <H2>5.4. Update View</H2>

      <section>
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
      </section>

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

      <section>
        <P>
          So far this project demonstrates how a pluggable project 
          structure that can be used to build a web application with the 
          following objectives achieved.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li>
            • The project to uses the <SS>EcmaScript Module</SS> standard.
          </li>
          <li>
            • The project demonstrates a <S>plugin architecture</S> with 
            defined folders for use as a plugin.
          </li>
          <li>
            • The example plugin <H>app</H> containing an example page 
            controller and view.
          </li>
          <li>
            • The example plugin <H>app</H> demonstrating how a view is 
            rendered from a server side router.
          </li>
          <li>
            • The example plugin <H>app</H> demonstrating how props are 
            passed to the view.
          </li>
          <li>
            • The project is configured to use a style engine.
          </li>
        </ul>

        <P>
          If your final files and project code look like the following, 
          then...
        </P>

        <Checkpoint />

        <Congrats>You have completed this tutorial.</Congrats>

        <P>
          Relax and take a break and when ready, the next tutorial will 
          cover setting up the <SS>Stackpress</SS> toolkit with many 
          goodies like database, authentication, sessions, 
          roles &amp; permissions, i18n, API, and more.
        </P>
      </section>

      <Nav
        prev={{ 
          text: '4. Server Props', 
          href: '/docs/tutorial/4-server-props' 
        }}
        next={{ 
          text: 'Toolkit Setup', 
          href: '/docs/toolkit/setup' 
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