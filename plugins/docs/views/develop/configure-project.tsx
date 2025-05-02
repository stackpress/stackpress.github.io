//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, A, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

export const examples = [
//0-------------------------------------------------------------------//
`import path from 'node:path';

export type { Config } from 'stackpress/types';
export type Cascade = 'CASCADE'|'RESTRICT'|'SET NULL';
export type APIType = 'app'|'public'|'session';

export const cwd = process.cwd();
export const build = path.join(cwd, '.build');
export const assets = path.join(cwd, 'public');
export const modules = path.join(cwd, 'node_modules');

export const seed = process.env.SESSION_SEED || 'abc123';

export const admin = {
  //name of the admin section. shown on the top left of the page
  name: 'Admin',
  //base route for the admin section
  base: '/admin',
  //static admin menu items
  menu: [
    {
      name: 'Profiles',
      icon: 'user',
      path: '/admin/profile/search',
      match: '/admin/profile'
    },
    {
      name: 'Auth',
      icon: 'lock',
      path: '/admin/auth/search',
      match: '/admin/auth'
    },
    {
      name: 'Apps',
      icon: 'laptop',
      path: '/admin/application/search',
      match: '/admin/application'
    },
    {
      name: 'Sessions',
      icon: 'coffee',
      path: '/admin/session/search',
      match: '/admin/session'
    }
  ]
};

export const api = {
  //when sessions expire. this is used with \`session.created\` column
  expires: 1000 * 60 * 60 * 24 * 365,
  //scopes are used to limit access to certain endpoints
  //when creating the default application, make sure the 
  //following scopes are included, or you will get a 401 
  //error when trying to access the endpoints
  scopes: {},
  endpoints: [],
  //calls out external urls when specified events happen
  webhooks: []
};

export const auth = {
  //base route for signin, signout, signup pages
  base: '/auth',
  //two factor authentication settings
  '2fa': {},
  //captcha settings
  captcha: {},
  //default roles for new users
  roles: [ 'USER' ],
  //allow signin with username
  username: true,
  //allow signin with email address
  email: true,
  //allow signin with phone
  phone: true,
  //password settings
  password: {
    min: 8,
    max: 32,
    upper: true,
    lower: true,
    number: true,
    special: true
  }
};

export const brand = {
  name: 'Stackpress',
  logo: '/logo.png',
  icon: '/icon.png',
  favicon: '/favicon.ico'
};

export const cli = {
  label: '[EXAMPLE]',
  idea: path.join(cwd, 'schema.idea')
};

export const client = { 
  //whether to compiler client in \`js\` or \`ts\`
  lang: 'js',
  //used by \`stackpress/client\` to \`import()\` 
  //the generated client code to memory
  module: 'stackpress-client',
  //name of the client package used in package.json
  package: 'app-client',
  //where to store serialized idea json files for historical 
  //purposes. Revisions are used in conjuction with push and 
  //migrate to determine the changes between each idea change.
  revisions: path.join(build, 'revisions'),
  //where to store the generated client code
  build: path.join(cwd, 'node_modules', 'stackpress-client'),
  //what tsconfig file to base the typescript compiler on
  tsconfig: path.join(cwd, 'tsconfig.json')
};

export const cookie = { 
  //see: https://github.com/jshttp/cookie?tab=readme-ov-file#options-1
  path: '/' 
};

export const database = {
  //used to encrypt/decrypt data in the database
  seed: seed,
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
};

export const email = {
  host: 'smtp.example.com',
  port: 587,
  // upgrade later with STARTTLS
  secure: false, 
  auth: {
    user: 'username',
    pass: 'password',
  }
};

export const language = {
  //url flag (ie. ?json) used to change the user's locale
  //this is also the name of the cookie used to store the locale
  key: 'locale',
  //default locale
  locale: 'en_US',
  //languages and translations
  languages: {
    en_US: {
      label: 'EN',
      translations: {
        'Sign In': 'Signin',
        'Home Page': 'Home Page'
      }
    }
  }
};

export const view = {
  //url flag (ie. ?json) used to disable template 
  //rendering and show the raw json data instead
  noview: 'json',
  //used by vite and in development mode
  //to determine the root of the project
  base: '/',
  //frontend notification display settings
  notify: {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
};

export const server = {
  port: 3000,
  cwd: cwd
};

export const session = {
  //name of the session cookie
  key: 'session',
  //used to generate the session id
  seed: seed,
  access: {
    ADMIN: [
      //page routes
      { method: 'ALL', route: '/' },
      { method: 'ALL', route: '/auth/**' },
      { method: 'ALL', route: '/admin/**' },
      { method: 'ALL', route: '/api/**' }
    ],
    USER: [
      //page routes
      { method: 'ALL', route: '/' },
      { method: 'ALL', route: '/auth/**' },
      { method: 'ALL', route: '/api/**' }
    ],
    GUEST: [
      //page routes
      { method: 'ALL', route: '/' },
      { method: 'ALL', route: '/auth/**' },
      { method: 'ALL', route: '/api/**' }
    ]
  }
};`,
//1-------------------------------------------------------------------//
`import unocss from 'unocss/vite';
import { server as http } from 'stackpress/http';
import type { Config } from './common.js';
import * as common from './common.js';

export const config: Config = {
  server: {
    ...common.server,
    mode: 'development',
    //where to store the build files
    build: common.build
  },
  view: {
    ...common.view,
    //reactus specific settings
    engine: {
      //base path (used in vite)
      basePath: '/',
      //client script route prefix used in the document markup
      //ie. /client/[id][extname]
      //<script type="module" src="/client/[id][extname]"></script>
      //<script type="module" src="/client/abc123.tsx"></script>
      clientRoute: '/client',
      //filepath to a global css file
      cssFiles: [ 
        'frui/frui.css', 
        'stackpress/stackpress.css', 
        'virtual:uno.css' 
      ],
      //vite plugins
      plugins: [ unocss() ]
    }
  },
  session: {
    ...common.session,
    access: {
      ADMIN: [
        ...common.session.access.ADMIN,
        //dev routes
        { method: 'ALL', route: '/@vite/client' },
        { method: 'ALL', route: '/@react-refresh' },
        { method: 'ALL', route: '/@fs/**' },
        { method: 'ALL', route: '/node_modules/**' },
        { method: 'ALL', route: '/__uno.css' },
        { method: 'ALL', route: '/plugins/**' },
        { method: 'ALL', route: '/react.svg' },
        //public routes
        { method: 'GET', route: '/assets/**' },
        { method: 'GET', route: '/client/**' },
        { method: 'GET', route: '/images/**' },
        { method: 'GET', route: '/styles/**' },
        { method: 'GET', route: '/favicon.ico' },
        { method: 'GET', route: '/favicon.png' },
      ],
      USER: [
        ...common.session.access.USER,
        //dev routes
        { method: 'ALL', route: '/@vite/client' },
        { method: 'ALL', route: '/@react-refresh' },
        { method: 'ALL', route: '/@fs/**' },
        { method: 'ALL', route: '/node_modules/**' },
        { method: 'ALL', route: '/__uno.css' },
        { method: 'ALL', route: '/plugins/**' },
        { method: 'ALL', route: '/react.svg' },
        //public routes
        { method: 'GET', route: '/assets/**' },
        { method: 'GET', route: '/client/**' },
        { method: 'GET', route: '/images/**' },
        { method: 'GET', route: '/styles/**' },
        { method: 'GET', route: '/favicon.ico' },
        { method: 'GET', route: '/favicon.png' },
      ],
      GUEST: [
        ...common.session.access.GUEST,
        //dev routes
        { method: 'ALL', route: '/@vite/client' },
        { method: 'ALL', route: '/@react-refresh' },
        { method: 'ALL', route: '/@fs/**' },
        { method: 'ALL', route: '/node_modules/**' },
        { method: 'ALL', route: '/__uno.css' },
        { method: 'ALL', route: '/plugins/**' },
        { method: 'ALL', route: '/react.svg' },
        //public routes
        { method: 'GET', route: '/assets/**' },
        { method: 'GET', route: '/client/**' },
        { method: 'GET', route: '/images/**' },
        { method: 'GET', route: '/styles/**' },
        { method: 'GET', route: '/favicon.ico' },
        { method: 'GET', route: '/favicon.png' },
      ]
    }
  },
  admin: common.admin,
  api: common.api,
  auth: common.auth,
  brand: common.brand,
  cli: common.cli,
  client: common.client,
  cookie: common.cookie,
  database: common.database,
  email: common.email,
  language: common.language
};`,
//2-------------------------------------------------------------------//
`import path from 'node:path';
import unocss from 'unocss/vite';
import { server as http } from 'stackpress/http';
//config
import type { Config } from './common.js';
import * as common from './common.js';

export const config: Config = {
  server: {
    ...common.server,
    mode: 'production',
    //where to store the build files
    build: common.build
  },
  view: {
    ...common.view,
    //reactus specific settings
    engine: {
      //path where to save assets (css, images, etc)
      assetPath: path.join(common.assets, 'assets'),
      //path where to save the client scripts (js)
      clientPath: path.join(common.assets, 'client'),
      //filepath to a global css file
      cssFiles: [ 
        'frui/frui.css', 
        'stackpress/stackpress.css', 
        'virtual:uno.css' 
      ],
      //path where to save and load (live) the server script (js)
      pagePath: path.join(common.cwd, '.build/views'),
      //vite plugins
      plugins: [ unocss() ],
      //original vite options (overrides other settings related to vite)
      vite: undefined
    }
  },
  admin: common.admin,
  api: common.api,
  auth: common.auth,
  brand: common.brand,
  cli: common.cli,
  client: common.client,
  database: common.database,
  email: common.email,
  cookie: common.cookie,
  language: common.language,
  session: common.session
};`,
//3-------------------------------------------------------------------//
`import path from 'node:path';
import type { Server } from 'stackpress/server';
import { server as http } from 'stackpress/http';
import type { Config } from './common.js';
import * as common from './common.js';

export const config: Config = {
  assets: common.assets,
  server: {
    ...common.server,
    mode: 'production'
  },
  view: {
    ...common.view,
    //reactus specific settings
    engine: {
      //client script route prefix used in the document markup
      //ie. /client/[id][extname]
      //<script type="module" src="/client/[id][extname]"></script>
      //<script type="module" src="/client/abc123.tsx"></script>
      clientRoute: '/client',
      //style route prefix used in the document markup
      //ie. /assets/[id][extname]
      //<link rel="stylesheet" type="text/css" href="/client/[id][extname]" />
      //<link rel="stylesheet" type="text/css" href="/assets/abc123.css" />
      cssRoute: '/assets',
      //path where to save and load (live) the server script (js)
      pagePath: path.join(common.cwd, '.build/views')
    }
  },
  session: {
    ...common.session,
    access: {
      ADMIN: [
        ...common.session.access.ADMIN,
        //public routes
        { method: 'GET', route: '/assets/**' },
        { method: 'GET', route: '/client/**' },
        { method: 'GET', route: '/images/**' },
        { method: 'GET', route: '/styles/**' },
        { method: 'GET', route: '/icon.png' },
        { method: 'GET', route: '/logo.png' },
        { method: 'GET', route: '/favicon.ico' },
        { method: 'GET', route: '/favicon.png' },
      ],
      USER: [
        ...common.session.access.USER,
        //public routes
        { method: 'GET', route: '/assets/**' },
        { method: 'GET', route: '/client/**' },
        { method: 'GET', route: '/images/**' },
        { method: 'GET', route: '/styles/**' },
        { method: 'GET', route: '/icon.png' },
        { method: 'GET', route: '/logo.png' },
        { method: 'GET', route: '/favicon.ico' },
        { method: 'GET', route: '/favicon.png' },
      ],
      GUEST: [
        ...common.session.access.GUEST,
        //public routes
        { method: 'GET', route: '/assets/**' },
        { method: 'GET', route: '/client/**' },
        { method: 'GET', route: '/images/**' },
        { method: 'GET', route: '/styles/**' },
        { method: 'GET', route: '/icon.png' },
        { method: 'GET', route: '/logo.png' },
        { method: 'GET', route: '/favicon.ico' },
        { method: 'GET', route: '/favicon.png' },
      ]
    }
  },
  admin: common.admin,
  api: common.api,
  auth: common.auth,
  brand: common.brand,
  cli: common.cli,
  client: common.client,
  cookie: common.cookie,
  database: common.database,
  email: common.email,
  language: common.language
};`,
//4-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Configure Project - Stackpress Documentation');
  const description = _(
    'desc'
  );
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
  const { _ } = useLanguage();
  return (
    <menu className="px-m-0 px-px-10 px-py-20 px-h-100-40 overflow-auto">
      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-0 px-pb-10 uppercase">
        {_('On this page')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#common-configuration">
          {_('Common Configuration')}
        </a>
        <a className="theme-tx0 block" href="#development-configuration">
          {_('Development Configuration')}
        </a>
        <a className="theme-tx0 block" href="#build-configuration">
          {_('Build Configuration')}
        </a>
        <a className="theme-tx0 block" href="#preview-configuration">
          {_('Preview Configuration')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Configure Project</H1>

      <P>
        <SS>Stackpress</SS> prefers configuration over code, in that 
        plugins with a shared config, can auto-configure themselves 
        versus setting specific configurations per plugin. We can 
        identify the usual development stages of a project as follows.
      </P>

      <ul className="px-lh-30 px-px-20">
        <li className="px-pb-20">
          • <SS>Development</SS> - The project needs to have 
          specific configuration to support the development server.
        </li>
        <li className="px-pb-20">
          • <SS>Building</SS> - The project needs to have specific
          configuration to support the compiling of the code and 
          distribution of files.
        </li>
        <li className="px-pb-20">
          • <SS>Preview</SS> - The project needs to have specific 
          configuration to test the code distribution before 
          deploying.
        </li>
        <li className="px-pb-20">
          • <SS>Deploy</SS> - The project needs to have specific 
          configuration for build servers to deploy to the final server.
        </li>
        <li className="px-pb-20">
          • <SS>Production</SS> - The project needs to have specific 
          configuration that runs on the production server.
        </li>
      </ul>

      <P>
        Though we can already identify what kind of configuration 
        would be specific to each stage, we can also identify
        what kind of configuration would be shared across all stages.
        To get a detailed overview of all the configuration options,
        please refer to the <A href="/docs/reference/configuration">
          Configuration
        </A> section of the documentation. 
      </P>

      {/*------------------------------------------------------------*/}

      <a id="common-configuration"></a>
      <H2>Common Configuration</H2>

      <P>
        The following configuration example options are "safe" to add 
        in any stage. You should set these in a separate file.
      </P>

      <Code>{examples[0]}</Code>

      {/*------------------------------------------------------------*/}

      <a id="development-configuration"></a>
      <H2>Development Configuration</H2>

      <P>
        The following configuration example options are designed for the 
        development stage.
      </P>

      <Code>{examples[1]}</Code>

      {/*------------------------------------------------------------*/}

      <a id="build-configuration"></a>
      <H2>Build Configuration</H2>

      <P>
        The following configuration example options are designed for the 
        build stage.
      </P>

      <Code>{examples[2]}</Code>

      {/*------------------------------------------------------------*/}

      <a id="preview-configuration"></a>
      <H2>Preview Configuration</H2>

      <P>
        The following configuration example options are designed for the 
        preview stage.
      </P>

      <Code>{examples[3]}</Code>

      <Nav
        next={{ 
          text: 'Customize Bootstrap', 
          href: '/docs/develop/customize-bootstrap' 
        }}
      />
    </article>
  );
}

export default function Page(props: ServerPageProps<ServerConfigProps>) {
  const { data, session, request, response } = props;
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