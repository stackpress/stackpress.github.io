//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, P, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

export const examples = [
//0-------------------------------------------------------------------//
`type Config = {
  //defaults to Stackpress brand
  brand?: {
    name?: string,
    logo?: string,
    icon?: string,a
    favicon?: string
  },
  server?: {
    //general location to put build files
    //not used by stackpress
    build?: string,
    //general use current working directory
    //used by \`stackpress/scripts/build\`
    //used by \`stackpress/view\`
    //defaults to \`process.cwd()\`
    cwd?: string,
    //production, development
    //used by \`stackpress/view\`
    //defaults to \`production\`
    mode?: string,
    //server port
    //not used by stackpress
    port?: number
  },
  //if client is not provided, disables \`stackpress/client\`
  //(no code will be generated)
  client?: { 
    //where to store the generated client code
    //used by \`stackpress/terminal\` (for generating client)
    build: string,
    //whether to compiler client in \`js\` or \`ts\`
    //used by client generator
    //defaults to \`js\`
    lang?: string,
    //used by \`stackpress/client\` to \`import()\` 
    //the generated client code to memory
    module: string,
    //where to store serialized idea json files for historical 
    //purposes. Revisions are used in conjuction with push and 
    //migrate to determine the changes between each idea change.
    //wont save if not provided (cant create migrations without this)
    revisions?: string,
    //what tsconfig file to base the typescript compiler on
    //used by \`stackpress/terminal\` (for generating client)
    tsconfig: string
  },
  //if not provided, disables \`stackpress/sql\`
  database?: {
    //where to store create and alter table migration files
    // - This is used in conjunction with \`revisions\`
    // - This doesn't update the database, it simply logs the changes
    //used by \`stackpress/scripts/migrate\`
    //wont save if not provided
    migrations?: string,
    //cascading rules used when generating the database schema
    //defaults to \`CASCADE\`
    //TODO
    schema?: {
      onDelete?: 'CASCADE'|'SET NULL'|'RESTRICT',
      onUpdate?: 'CASCADE'|'SET NULL'|'RESTRICT'
    }
  },
  //if not provided, disables \`stackpress/view\`
  view?: {
    //url flag (ie. ?json) used to disable template 
    //rendering and show the raw json data instead
    //defaults to \`json\`
    noview?: string,
    //used by vite and in development mode
    //to determine the root of the project
    //defaults to \`/\`
    base?: string,
    //frontend notification display settings
    //if not provided, defaults will apply
    //TODO
    notify?: {
      position: string,
      autoClose: number,
      hideProgressBar: boolean,
      closeOnClick: boolean,
      pauseOnHover: boolean,
      draggable: boolean,
      theme: string
    },
    //reactus settings
    engine?: {
      //path where to save assets (css, images, etc)
      // - used in build step
      assetPath?: string,
      //base path (used in vite)
      // - used in dev mode
      basePath?: string,
      //path where to save the client scripts (js)
      // - used in build step
      clientPath?: string,
      //client script route prefix used in the document markup
      //ie. /client/[id][extname]
      //<script type="module" src="/client/[id][extname]"></script>
      //<script type="module" src="/client/abc123.tsx"></script>
      // - used in dev mode and live server
      clientRoute?: string,
      //template wrapper for the client script (tsx)
      // - used in dev mode and build step
      clientTemplate?: string,
      //filepath to a global css file
      // - used in dev mode and build step
      cssFiles?: string[],
      //style route prefix used in the document markup
      //ie. /assets/[id][extname]
      //<link rel="stylesheet" type="text/css" href="/client/[id][extname]" />
      //<link rel="stylesheet" type="text/css" href="/assets/abc123.css" />
      // - used in live server
      cssRoute?: string,
      //template wrapper for the document markup (html)
      // - used in dev mode and live server
      documentTemplate?: string,
      //path where to save and load (live) the server script (js)
      // - used in build step and live server
      pagePath?: string,
      //template wrapper for the page script (tsx)
      // - used in build step
      pageTemplate?: string,
      //vite plugins
      plugins?: Plugins[],
      //original vite options (overrides other settings related to vite)
      vite?: ViteInlineConfig,
      //ignore files in watch mode
      // - used in dev mode
      watchIgnore: string[]
    }
  },
  //if not provided, disables \`stackpress/email\`
  email?: {
    host: string,
    port: number,
    secure: boolean,
    auth: {
      user: string,
      pass: string,
    }
  },
  //if not provided, disables all stackpress auth routes
  auth?: {
    //base route for signin, signout, signup pages
    base: string,
    //two factor authentication settings
    '2fa': {},
    //captcha settings
    captcha: {},
    //default roles for new users
    roles: string[],
    //allow signin with username
    username: boolean,
    //allow signin with email address
    email: boolean,
    //allow signin with phone
    phone: boolean,
    //password settings
    //defaults to no restrictions
    password?: {
      min: number,
      max: number,
      upper: boolean,
      lower: boolean,
      number: boolean,
      special: boolean
    }
  },
  //if not provided, disables \`stackpress/session\`
  session?: {
    //name of the session cookie
    //defaults
    key?: string,
    //used to generate the session id
    //also used to encrypt/decrypt data 
    //in the database
    seed: string,
    //route and event access white list (blacklisted by default)
    //mapped as role -> access entries[]
    access?: Record<string, (string|{ method: string, route: string })[]>
  },
  //see: https://github.com/jshttp/cookie?tab=readme-ov-file#options-1
  cookie?: {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    priority?: 'low'|'medium'|'high';
    sameSite?: boolean|'lax'|'strict'|'none';
    secure?: boolean;
  },
  //if not provided, no admin will be generated
  admin?: {
    //name of the admin section. shown on the top left of the page
    name?: string,
    //base route for the admin section
    base?: string,
    //static admin menu items
    menu?: {
      name: string,
      icon?: string,
      path: string,
      match: string
    }[]
  },
  //if not provided, disables \`stackpress/api\`
  api?: {
    //when sessions expire. this is used with \`session.created\` column
    //defaults to never expire
    expires?: number,
    //calls out external urls when specified events happen
    webhooks?: {
      //ie. auth-signin
      event: string, 
      //ie. http://localhost:3000/api/webhook
      uri: string,
      method: Method,
      validity: UnknownNest,
      data: UnknownNest
    }[],
    //scopes are used to limit access to certain endpoints
    //when creating the default application, make sure the 
    //following scopes are included, or you will get a 401 
    //error when trying to access the endpoints
    scopes?: Record<string, {
      icon?: string,
      name: string,
      description: string
    }>,
    endpoints?: {
      name?: string,
      description?: string,
      example?: string,
      method: Method,
      route: string,
      type: 'public'|'app'|'session',
      scopes?: string[],
      event: string,
      priority?: number,
      data: Record<string, Data>
    }[]
  },
  //if not provided, disables \`stackpress/language\`
  language?: {
    //url flag (ie. ?locale) used to change the user's locale
    //this is also the name of the cookie used to store the locale
    //defaults to \`locale\`
    key?: string,
    //default locale
    //defaults to \`en_US\`
    locale?: string,
    //languages and translations
    languages?: Record<string, {
      label: string,
      translations: Record<string, string>
    }>
  }
}`,
//1-------------------------------------------------------------------//
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
        <a className="theme-tx0 block" href="#api-config">
          {_('1. API Config')}
        </a>
        <a className="theme-tx0 block" href="#configure-scopes">
          {_('2. Configure Scopes')}
        </a>
        <a className="theme-tx0 block" href="#configure-endpoints">
          {_('3. Configure Endpoints')}
        </a>
        <a className="theme-tx0 block" href="#custom-endpoint">
          {_('4. Custom Endpoint')}
        </a>
        <a className="theme-tx0 block" href="#configure-webhooks">
          {_('5. Configure Webhooks')}
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
        versus setting specific configurations per plugin.
      </P>

      <Code>{examples[0]}</Code>
      
      <Nav
        prev={{ 
          text: 'Setup Permissions', 
          href: '/docs/toolkit/setup-permissions' 
        }}
        next={{ 
          text: 'Customize Terminal', 
          href: '/docs/toolkit/customize-terminal' 
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