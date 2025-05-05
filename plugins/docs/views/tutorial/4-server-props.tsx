//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, H2, P, C, H, Nav } from '../../components/index.js';
import { Code, Editor, Layout } from '../../components/index.js';
import { Checkpoint as LastCheckpoint } from './3-server-routes.js';

const examples = [
//0-------------------------------------------------------------------//
`{
  data: { [key: string]: unknown },
  session: {
    token: string,
    permits: SessionPermission[],
    id: string | number,
    name?: string | undefined,
    image?: string,
    roles: string[]
  },
  request: {
    url: {
      hash: string,
      host: string,
      hostname: string,
      href: string,
      origin: string,
      pathname: string,
      port: string,
      protocol: string,
      search: string
    },
    headers: { [key: string]: string | string[] },
    session: { [key: string]: string | string[] },
    method: string,
    mime: string,
    data: { [key: string]: unknown }
  },
  response: {
    code: number,
    status: string,
    error?: string,
    errors?: { [key: string]: string },
    start?: number,
    end?: number,
    stack?: Trace[],
    results?: unknown,
    total?: number
  },
  styles: string[]
}`,
//1-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
//...
export default function HomePage(props: ServerPageProps) {
  const { data, session, request, response } = props;
  //...
}`,
//2-------------------------------------------------------------------//
`//plugins/app/pages/home.ts
import { action } from 'stackpress/server';

export default action(function HomePage(req, res) {
  const name = req.data<string>('name');
  res.setResults({ name });
  res.data.set('title', 'Home Page');
});`,
//3-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
//...
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
//...`,
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
  const title = _('4. Server Props - Stackpress Tutorial');
  const description = _(
    'Stackpress passes a standard set of server props to all views '
    + 'in order to make it predictable and thus templating easier.'
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
        <a className="theme-tx1 block" href="#get-server-props">
          {_('4.1. Get Server Props')}
        </a>
        <a className="theme-tx1 block" href="#custom-server-props">
          {_('4.2. Custom Server Props')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('4.3. Check Point')}
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
          The last section covered how to add a page route in 
          the <H>app</H> plugin and how a view can consume the response. 
          Get caught up by making sure your project looks like the 
          following.
        </P>

        <LastCheckpoint />

        <P>
          If you are all caught up, then you can proceed to the next 
          section.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <H1>4. Server Props</H1>

      <section>
        <P>
          By default, Stackpress will pass the following props to both 
          the <C>export default</C> and the <C>Head</C> function component 
          for all views.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li>
            • <C>session</C> - User session data. <C>GUEST</C> by default.
          </li>
          <li>
            • <C>request</C> - Serialized version of the request object
          </li>
          <li>
            • <C>response</C> - Serialized version of the response object
          </li>
          <li>
            • <C>data</C> - Template only data to pass to the view
          </li>
          <li>
            • <C>styles</C> - A list of styles that should be added to 
            the <C>Head</C> function component
          </li>
        </ul>

        <P>
          The following describes the exact type specifics of the server 
          props.
        </P>

        <Code>{examples[0]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="get-server-props"></a>
      <H2>4.1. Get Server Props</H2>

      <section>
        <P>
          In your view files, you can access the server props like this.
        </P>

        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="custom-server-props"></a>
      <H2>4.2. Custom Server Props</H2>

      <section>
        <P>
          Let's change the <H>plugins/app/pages/home.ts</H> file with the 
          following code.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          Adding <C>{`res.data.set('title', 'Home Page');`}</C> will 
          add a new key to the data object that will be passed to
          the view. You can add any other key to the data object in the 
          same fashion for the view to consume it. This is useful for
          passing all template related data to the view that is not 
          necessarily part of the request or response objects. In your 
          view file, you can access the template related props like this.
        </P>

        <Code>{examples[3]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
    
      <a id="checkpoint"></a>
      <H2>4.3. Check Point</H2>

      <section>
        <P>
          In case you got lost along the way, here is a checkpoint of what
          your project should look like.
        </P>

        <Checkpoint />
        
        <P>
          The next section will provide a guide to setting up the view engine.
        </P>
      </section>
      
      <Nav
        prev={{ 
          text: '3. Server Routes', 
          href: '/docs/tutorial/3-server-routes' 
        }}
        next={{ 
          text: '5. View Engine', 
          href: '/docs/tutorial/5-view-engine' 
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