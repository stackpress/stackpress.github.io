//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, H2, P, C, B, H, SS, Nav, Note } from '../../components/index.js';
import { Code, Editor, Layout } from '../../components/index.js';
import { Checkpoint as LastCheckpoint } from './2-plugin-architecture.js';

const examples = [
//0-------------------------------------------------------------------//
`//plugins/app/pages/home.ts
import { action } from 'stackpress/server';

export default action(function HomePage(req, res) {
  const name = req.data<string>('name');
  res.setResults({ name });
});`,
//1-------------------------------------------------------------------//
`POST /user/:id?name=John&age=30
{
  name: 'Jamille',
  country: 'USA'
}`,
//2-------------------------------------------------------------------//
`//plugins/app/plugin.ts
import type { Server } from 'stackpress/server';

export default function plugin(server: Server) {
  //on route, add app routes
  server.on('route', async _ => {
    server.get('/api/home', () => import('./pages/home.js'));
    server.get('/', () => import('./pages/home.js'));
    server.get('/', '@/plugins/app/views/home', -100);
  });
};`,
//3-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
//...
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
      <button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}`
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
'plugins/app/pages/home.ts': `
import { action } from 'stackpress/server';

export default action(function HomePage(req, res) {
  const name = req.data<string>('name');
  res.setResults({ name });
});
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
  //response
  const { response } = props;
  const { name = 'guest' } = response.results || {};
  //basic count state
  const [ count, setCount ] = useState(0)
  //render
  return (
    <div>
      <h1>Welcome {name} to Stackpress</h1>
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
  }
];

export function Checkpoint() {
  //render
  return (
    <Editor 
      title="PROJECT"
      files={system}
      value="plugins/app/views/home.tsx"
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
  const title = _('3. Server Routes - Stackpress Tutorial');
  const description = _(
    'How to add a page route to your application and how a view can '
    + 'optionally consume the response.'
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
        <a className="theme-tx1 block" href="#add-page-route">
          {_('3.1. Add Page Route')}
        </a>
        <a className="theme-tx1 block" href="#register-page-route">
          {_('3.2. Register Page Route')}
        </a>
        <a className="theme-tx1 block" href="#consume-page-route">
          {_('3.3. Consume Page Route')}
        </a>
        <a className="theme-tx1 block" href="#check-page-route">
          {_('3.4. Check Page Route')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('3.5. Check Point')}
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
          The last section covered a basic <SS>plugin architecture</SS>, 
          designed to separate the project code by unit feature and 
          allowing developers to progressively toggle each one at any 
          given time. Get caught up by making sure your project looks 
          like the following.
        </P>

        <LastCheckpoint />

        <P>
          If you are all caught up, then you can proceed to the next 
          section.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <H1>3. Server Routes</H1>

      <P>
        The following section wil continue exploring the possibilities 
        demonstrated within the <H>app</H> plugin by adding a page 
        route to the project and how a view can consume the response. 
        Page routes are a type of server route and server routes are 
        also used to develop API endpoints.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="add-page-route"></a>
      <H2>3.1. Add Page Route</H2>

      <section>
        <P>
          From the project root, create a file 
          called <H>plugins/app/pages/home.ts</H> with 
          the following code.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          This basically consumes the data from the request. Data from a 
          request is a merge of query params, POST data, and URL params 
          respectively. Consider the following request.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          In the example above, assuming the requested pathname 
          is <C>{'/user/4'}</C>, the return of <C>req.data()</C> will be 
          computed as <C>{
            JSON.stringify({
              id: 4,
              name: 'Jamille',
              age: 30,
              country: 'USA'
            })
            .replaceAll('{', '{ ')
            .replaceAll('}', ' }')
            .replaceAll(':', ': ')
            .replaceAll(',', ', ')
          }</C> where as URL params has priority over POST data which has 
          priority over query params. Lastly, the <C>name</C> is passed to 
          the response via <C>{'res.setResults({ name });'}</C>.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="register-page-route"></a>
      <H2>3.2. Register Page Route</H2>

      <section>
        <P>
          Next let's change the <H>plugins/app/plugin.ts</H> file with the 
          following code.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          Now in the <C>route</C> handler a route has been added that will 
          lazily load the page when the path <C>'/'</C> is requested. Similar 
          to React suspense loading, the reason why lazily loading page 
          routes is recommended is because it will allow bundlers to 
          theoretically analyze the code and possibly split it into 
          smaller chunks. We also want to de-prioritize 
          the <C>'@/plugins/app/views/home'</C> view by adding 
          a <C>-100</C> priority to ensure it loads last. This allows 
          other plugins to inject themselves in the routing phase.
        </P>

        <Note>
          You could also use the 
          traditional <C>{`server.view.render('@/plugins/app/views/home', props)`}</C> in 
          your <H>plugins/app/pages/home.ts</H> to render 
          the view, but the Plugin Architecture encourages decoupling the 
          view from the page route. This way, you can progressively toggle 
          everything in the <H>plugins/app/plugin.ts</H> file.
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="consume-page-route"></a>
      <H2>3.3. Consume Page Route</H2>

      <section>
        <P>
          To consume the <C>{'res.setResults({ name });'}</C> in the view, 
          you can use the <C>props</C> argument in the following way.
        </P>

        <Code>{examples[3]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="check-page-route"></a>
      <H2>3.4. Check Page Route</H2>

      <section>
        <ol className="px-px-10 px-lh-30 px-py-20">
          <li>1. In Terminal, restart <B>npm run dev</B></li>
          <li>2. On your browser, visit <H>http://localhost:3000/</H></li>
          <li>3. Then, visit <H>http://localhost:3000/?json</H></li>
          <li>4. Then, visit <H>http://localhost:3000/api/home</H></li>
        </ol>

        <P>
          You should observe that by adding the <C>{'?json'}</C> flag you 
          can check the server props being sent to your view. This is 
          different from <H>{'/api/home'}</H> where the home page route is 
          treated as an API endpoint.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="checkpoint"></a>
      <H2>3.5. Check Point</H2>

      <section>
        <P>
          In case you got lost along the way, here is a checkpoint of what
          your project should look like.
        </P>

        <Checkpoint />
        
        <P>
          The next section will cover how server props works, how to send 
          custom template data and how the view consumes it.
        </P>
      </section>

      <Nav
        prev={{ 
          text: '2. Plugin Architecture', 
          href: '/docs/tutorial/2-plugin-architecture' 
        }}
        next={{ 
          text: '4. Server Props', 
          href: '/docs/tutorial/4-server-props' 
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