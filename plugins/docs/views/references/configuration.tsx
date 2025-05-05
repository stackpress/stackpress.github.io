//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, H2, H3, H, C, P, E, S, SS } from '../../components/index.js';
import { Warn, Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`{
  admin?: {
    name?: string,
    base?: string,
    menu?: {
      name: string,
      icon?: string,
      path: string,
      match: string
    }[]
  }
}`,
//1-------------------------------------------------------------------//
`{
  api?: {
    expires?: number,
    webhooks?: {
      event: string, 
      uri: string,
      method: Method,
      validity: UnknownNest,
      data: UnknownNest
    }[],
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
  }
}`,
//2-------------------------------------------------------------------//
`{
  api?: {
    scopes?: Record<string, {
      icon?: string,
      name: string,
      description: string
    }>
  }
}`,
//3-------------------------------------------------------------------//
`{
  api?: {
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
  }
}`,
//4-------------------------------------------------------------------//
`{
  api?: {
    webhooks?: {
      event: string, 
      uri: string,
      method: Method,
      validity: UnknownNest,
      data: UnknownNest
    }[]
  }
}`,
//5-------------------------------------------------------------------//
`{
  auth?: {
    base: string,
    '2fa': {},
    captcha: {},
    roles: string[],
    username: boolean,
    email: boolean,
    phone: boolean,
    password?: {
      min: number,
      max: number,
      upper: boolean,
      lower: boolean,
      number: boolean,
      special: boolean
    }
  }
}`,
//6-------------------------------------------------------------------//
`{
  brand?: {
    name?: string,
    logo?: string,
    icon?: string,
    favicon?: string
  }
}`,
//7-------------------------------------------------------------------//
`{
  client?: { 
    build: string,
    lang?: string,
    module: string,
    revisions?: string,
    tsconfig: string
  }
}`,
//8-------------------------------------------------------------------//
`{
  cookie?: {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    priority?: 'low'|'medium'|'high';
    sameSite?: boolean|'lax'|'strict'|'none';
    secure?: boolean;
  }
}`,
//9-------------------------------------------------------------------//
`{
  database?: {
    seed: string,
    migrations?: string,
    schema?: {
      onDelete?: 'CASCADE'|'SET NULL'|'RESTRICT',
      onUpdate?: 'CASCADE'|'SET NULL'|'RESTRICT'
    }
  }
}`,
//10------------------------------------------------------------------//
`{
  email?: {
    host: string,
    port: number,
    secure: boolean,
    auth: {
      user: string,
      pass: string,
    }
  }
}`,
//11------------------------------------------------------------------//
`{
  language?: {
    key?: string,
    locale?: string,
    languages?: Record<string, {
      label: string,
      translations: Record<string, string>
    }>
  }
}`,
//12------------------------------------------------------------------//
`{
  server?: {
    build?: string,
    cwd?: string,
    mode?: string,
    port?: number
  }
}`,
//13------------------------------------------------------------------//
`{
  session?: {
    key?: string,
    seed: string,
    access?: Record<string, (string|{ method: string, route: string })[]>
  }
}`,
//14------------------------------------------------------------------//
`{
  session: {
    //...
    access: {
      ADMIN: [
        { method: 'ALL', route: '/' },
        { method: 'ALL', route: '/auth/**' },
        { method: 'ALL', route: '/admin/**' },
        { method: 'ALL', route: '/api/**' }
      ],
      USER: [
        { method: 'ALL', route: '/' },
        { method: 'ALL', route: '/auth/**' },
        { method: 'ALL', route: '/api/**' }
      ],
      GUEST: [
        { method: 'ALL', route: '/' },
        { method: 'ALL', route: '/auth/**' }
      ]
    },
  }
}`,
//15------------------------------------------------------------------//
`{
  view?: {
    noview?: string,
    base?: string,
    notify?: {
      position: string,
      autoClose: number,
      hideProgressBar: boolean,
      closeOnClick: boolean,
      pauseOnHover: boolean,
      draggable: boolean,
      theme: string
    },
    engine?: {
      assetPath?: string,
      basePath?: string,
      clientPath?: string,
      clientRoute?: string,
      clientTemplate?: string,
      cssFiles?: string[],
      cssRoute?: string,
      documentTemplate?: string,
      pagePath?: string,
      pageTemplate?: string,
      plugins?: Plugins[],
      vite?: ViteInlineConfig,
      watchIgnore: string[]
    }
  }
}`,
//16------------------------------------------------------------------//
`type Config = {
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
  //defaults to Stackpress brand
  brand?: {
    name?: string,
    logo?: string,
    icon?: string,a
    favicon?: string
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
  }
}`,
//17------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Configuration - References - Stackpress Documentation');
  const description = _(
    'The following documents the possible configurations of Stackpress.'
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
        <a className="theme-tx0 block" href="#admin-config">
          {_('1. Admin Config')}
        </a>
        <a className="theme-tx0 block" href="#api-config">
          {_('2. API Config')}
        </a>
        <a className="theme-tx0 block" href="#auth-config">
          {_('3. Auth Config')}
        </a>
        <a className="theme-tx0 block" href="#brand-config">
          {_('4. Brand Config')}
        </a>
        <a className="theme-tx0 block" href="#client-config">
          {_('5. Client Config')}
        </a>
        <a className="theme-tx0 block" href="#cookie-config">
          {_('6. Cookie Config')}
        </a>
        <a className="theme-tx0 block" href="#database-config">
          {_('7. Database Config')}
        </a>
        <a className="theme-tx0 block" href="#email-config">
          {_('8. Email Config')}
        </a>
        <a className="theme-tx0 block" href="#language-config">
          {_('9. Language Config')}
        </a>
        <a className="theme-tx0 block" href="#server-config">
          {_('10. Server Config')}
        </a>
        <a className="theme-tx0 block" href="#session-config">
          {_('11. Session Config')}
        </a>
        <a className="theme-tx0 block" href="#view-config">
          {_('12. View Config')}
        </a>
        <a className="theme-tx0 block" href="#typings">
          {_('13. Typings')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Configuration</H1>

      <P>
        The following documents the possible configurations 
        of <SS>Stackpress</SS>. 
      </P>

      {/*------------------------------------------------------------*/}

      <a id="admin-config"></a>
      <H2>1. Admin Config</H2>

      <section>
        <P>
          The admin configuration is used to brand the admin, change the 
          base URL, and customize the admin menu.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          The following describes the admin configuration options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'name'}</C>
              </Tcol>
              <Tcol className="text-left">
                Name of the admin that will be found on the top left of 
                each admin page. It's recommended to use a short name 
                for mobile responsive purposes. Defaults 
                to <C>'admin'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'base'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The base URL for the admin section. Defaults 
                to <C>'/admin'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'menu'}</C>
              </Tcol>
              <Tcol className="text-left">
                A list of menu items to be displayed in the left side 
                of each admin page. Each item is an object with the 
                following properties.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'menu[].name'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Menu item display name
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'menu[].icon'}</C>
              </Tcol>
              <Tcol className="text-left">
                Menu item icon
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'menu[].path'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Menu item link path URL
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'menu[].match'}</C>
              </Tcol>
              <Tcol className="text-left">
                Compares the current URL pathname with the 
                given <C>match</C>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="api-config"></a>
      <H2>2. API Config</H2>

      <section>
        <P>
          The API configuration acts as a gateway between routes and 
          events without any extra coding necessary.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          The API config includes the following options.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'expires'}</C></Tcol>
              <Tcol className="text-left">
                When API sessions expire. This is used
                with <H>created</H> column in the <H>session</H> table.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'scopes'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Map of scopes to be used with the API following the OAuth 
                specificaitons.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'endpoints'}</C></Tcol>
              <Tcol className="text-left">
                List of API endpoint configurations.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'webhooks'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                List of webhook configurations.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <H3>2.1. Scope Config</H3>

        <P>
          Scopes are used to limit access to certain endpoints
          and can be toggled per application. 
        </P>

        <Code>{examples[2]}</Code>

        <P>
          The scope configuration, mainly used for documentation 
          purposes, are as follows.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'name'}</C></Tcol>
              <Tcol className="text-left">
                Readable friendly name of the scope.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'description'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Readable friendly description of the scope.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <H3>2.2. Endpoint Config</H3>

        <P>
          API endpoints over configuraton act as a gateway that collects 
          the input, calls events and returns its response. 
        </P>

        <Code>{examples[3]}</Code>

        <P>
          Each endpoint configuration requires the following parameters.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'method'}</C></Tcol>
              <Tcol className="text-left">
                The HTTP method to listen to.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'route'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The route pattern to listen to.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'type'}</C></Tcol>
              <Tcol className="text-left">
                <ul className="px-lh-30">
                  <li>
                    • <C>{'public'}</C> - An open endpoint that does not
                    require any tokens.
                  </li>
                  <li>
                    • <C>{'app'}</C> - An endpoint that requires a 
                    client token for <S>GET</S> endpoints and a client 
                    token/secret for anything else. <E>(2-legged)</E>
                  </li>
                  <li>
                    • <C>{'user'}</C> - An endpoint that requires a 
                    session for <S>GET</S> endpoints and a token/secret 
                    for anything else. Auto populates 
                    the <C>profileId</C> in the request data based on 
                    the session. <E>(3-legged)</E>
                  </li>
                </ul>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'scopes'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                A list of scope names that can access this endpoint.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'event'}</C></Tcol>
              <Tcol className="text-left">
                The name of the event to emit when the endpoint is
                requested. 
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'data'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                An object of static data that will add to and override 
                the input keys <E>(if they exist)</E>.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <H3>2.3. Webhook Config</H3>

        <P>
          Webhooks are automated notifications sent from one application 
          to another when a specific event occurs, like a new order, a 
          user signup, or a payment transaction. They act as a 
          lightweight, event-driven communication method, similar to 
          reverse APIs. Instead of constantly polling for updates, the 
          receiving application gets notified instantly when something 
          happens in real-time. 
        </P>

        <Code>{examples[4]}</Code>

        <P>
          Each webhook configuration requires the following parameters.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'event'}</C></Tcol>
              <Tcol className="text-left">
                The event to listen to.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'uri'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The external URL to call when the event is triggered.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'method'}</C></Tcol>
              <Tcol className="text-left">
                The HTTP method to use when calling the URL.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'validity'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Checks the results of the event against the validity
                object. If the results are not valid, the webhook will
                not be called. The validity object is a map of keys to
                values. The keys are the names of the columns in the
                results object. The values are the values to check
                against.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'data'}</C></Tcol>
              <Tcol className="text-left">
                Data to include in the results of the event. This adds 
                and overrides the output keys <E>(if they exist)</E>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="auth-config"></a>
      <H2>3. Auth Config</H2>

      <section>
        <P>
          The auth configuration is used to customize the functionality
          of the default auth pages from the <SS>Stackpress</SS> toolkit.
        </P>

        <Code>{examples[5]}</Code>

        <P>
          The auth config requires the following parameters.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'base'}</C></Tcol>
              <Tcol className="text-left">
                The base route for the auth pages. This is used to 
                determine the base route for the auth pages. For example, 
                if you set this to <C>"/auth"</C>, then the signin page 
                will be at <C>"/auth/signin"</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'roles'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The default roles for new users. For example, if you set 
                this to <C>["USER"]</C>, then new users will be assigned 
                the <C>"USER"</C> role by default.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'username'}</C></Tcol>
              <Tcol className="text-left">
                Whether to allow signin with username. If this is set to 
                <C>true</C>, then users will be able to signin with their 
                username.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'email'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Whether to allow signin with email address. If this is set 
                to <C>true</C>, then users will be able to signin with 
                their email address.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'phone'}</C></Tcol>
              <Tcol className="text-left">
                Whether to allow signin with phone number. If this is set 
                to <C>true</C>, then users will be able to signin with 
                their phone number.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'password.min'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The minimum length of the password. For example, if you 
                set this to <C>8</C>, then the password must be at least 
                8 characters long.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'password.max'}</C></Tcol>
              <Tcol className="text-left">
                The maximum length of the password. For example, if you 
                set this to <C>32</C>, then the password must be at most 
                32 characters long.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'password.upper'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                When this is set to <C>true</C>, the password must contain
                at least one uppercase letter.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'password.lower'}</C></Tcol>
              <Tcol className="text-left">
                When this is set to <C>true</C>, the password must contain
                at least one lowercase letter.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'password.number'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                When this is set to <C>true</C>, the password must contain
                at least one number.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'password.special'}</C></Tcol>
              <Tcol className="text-left">
                When this is set to <C>true</C>, the password must contain
                at least one special character. For example, <C>!@#$.%^&*</C>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="brand-config"></a>
      <H2>4. Brand Config</H2>

      <section>
        <P>
          Brand Config is used on all auth and admin pages allowing you 
          to white label everything. This includes the name, logo, icon 
          and favicon. 
        </P>

        <Code>{examples[6]}</Code>

        <P>
          The following describes the brand configuration options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'name'}</C>
              </Tcol>
              <Tcol className="text-left">
                Brand name of the project. Defaults 
                to <C>'Stackpress'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'logo'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Brand logo <E>(long)</E> of the project. Defaults 
                to <C>'/logo.png'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'icon'}</C>
              </Tcol>
              <Tcol className="text-left">
                Brand icon <E>(square)</E> of the project. Defaults 
                to <C>'/icon.png'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'favicon'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The favicon of the project. Defaults 
                to <C>'/favicon.ico'</C>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="client-config"></a>
      <H2>5. Client Config</H2>

      <section>
        <P>
          The client configuration is used to customize the client
          build process. This includes the build path, the client,
          language, module name, revision path and tsconfig filepath.
        </P>

        <Code>{examples[7]}</Code>

        <P>
          The following describes the client configuration options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'build'}</C>
              </Tcol>
              <Tcol className="text-left">
                Where to save the generated client files. Defaults 
                to <C>'[cwd]/.build'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'lang'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Language to compile to <E>(ts, js)</E>. Defaults
                to <C>'js'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'module'}</C>
              </Tcol>
              <Tcol className="text-left">
                Name of the client module. Defaults 
                to <C>'stackpress-client'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'revisions'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Pathname of where to save schema revisions. Defaults 
                to <C>'[cwd]/.build/revisions'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'tsconfig'}</C>
              </Tcol>
              <Tcol className="text-left">
                Filepath to a tsconfig file. This is used to
                compile the client code. Defaults 
                to <C>'[cwd]/tsconfig.json'</C>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="cookie-config"></a>
      <H2>6. Cookie Config</H2>

      <section>
        <P>
          The cookie configuration is used to customize the cookie
          settings. This is used by the sessions, theme and i18n 
          toolkit. 
        </P>

        <Code>{examples[8]}</Code>

        <P>
          The following describes the cookie configuration options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'domain'}</C>
              </Tcol>
              <Tcol className="text-left">
                The domain to set the cookie for. This is used to 
                determine the domain for the cookie. For example, if 
                you set this to <C>'example.com'</C>, then the cookie 
                will be set for <C>'example.com'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'expires'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The expiration date of the cookie. This is used to 
                determine when the cookie will expire. For example, 
                if you set this to <C>'2023-01-01'</C>, then the cookie 
                will expire on <C>'2023-01-01'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'httpOnly'}</C>
              </Tcol>
              <Tcol className="text-left">
                When this is set to <C>true</C>, the cookie will be 
                marked as HTTP only. This means that the cookie will 
                not be accessible from JavaScript. This is used to 
                prevent cross-site scripting attacks.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'maxAge'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The maximum age of the cookie. This is used to 
                determine how long the cookie will be valid for. For 
                example, if you set this to <C>3600</C>, then the 
                cookie will be valid for 1 hour.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'path'}</C>
              </Tcol>
              <Tcol className="text-left">
                The path to set the cookie for. This is used to 
                determine the path for the cookie. For example, if 
                you set this to <C>'/'</C>, then the cookie will be 
                set for the root path.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'priority'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The priority of the cookie. This is used to determine 
                the priority of the cookie. For example, if you set 
                this to <C>'High'</C>, then the cookie will be set with 
                high priority.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'sameSite'}</C>
              </Tcol>
              <Tcol className="text-left">
                The same site setting of the cookie. This is used to 
                determine the same site setting for the cookie. For 
                example, if you set this to <C>'Strict'</C>, then the 
                cookie will be set with strict same site setting.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'secure'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                When this is set to <C>true</C>, the cookie will be 
                marked as secure. This means that the cookie will only 
                be sent over HTTPS. 
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="database-config"></a>
      <H2>7. Database Config</H2>

      <section>
        <P>
          The database configuration is used to help encrypt/decrypt, 
          generate migrations, and configure the overall database 
          constraints.
        </P>

        <Code>{examples[9]}</Code>

        <P>
          The following describes the database configuration options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'seed'}</C>
              </Tcol>
              <Tcol className="text-left">
                The seed phrase used to encrypt/decrypt certain values 
                in the database. These columns are marked with either 
                the <C>encrypted</C> or <C>secret</C> property in the 
                schema. Where as <C>secret</C> represents a one-way hash
                and <C>encrypted</C> represents a two-way hash.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'migrations'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Pathname of where to save the generated migration files.
                Defaults to <C>'[cwd]/.build/migrations'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'schema.onDelete'}</C>
              </Tcol>
              <Tcol className="text-left">
                The default <C>onDelete</C> constraint for the database. 
                This is used to determine what happens when a row is 
                deleted. For example, if you set this 
                to <C>'CASCADE'</C>, then the row will be deleted from 
                all tables that reference it. Defaults 
                to <C>'CASCADE'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'schema.onUpdate'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The default <C>onUpdate</C> constraint for the database. 
                This is used to determine what happens when a row is 
                updated. For example, if you set this 
                to <C>'CASCADE'</C>, then the row will be updated in all 
                tables that reference it. Defaults to <C>'RESTRICT'</C>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="email-config"></a>
      <H2>8. Email Config</H2>

      <section>
        <P>
          The email configuration is used by the <C>'email-send'</C> 
          send event found in the email plugin of 
          the <SS>Stackpress</SS> toolkit.
        </P>

        <Code>{examples[10]}</Code>

        <P>
          The following describes the email configuration options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'host'}</C>
              </Tcol>
              <Tcol className="text-left">
                The host of the email server. This is used to determine 
                the host for the email server. For example, if you set 
                this to <C>'smtp.example.com'</C>, then the email server 
                will be set to <C>'smtp.example.com'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'port'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The port of the email server. This is used to determine 
                the port for the email server. For example, if you set 
                this to <C>587</C>, then the email server will be set to 
                <C>587</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'secure'}</C>
              </Tcol>
              <Tcol className="text-left">
                When this is set to <C>true</C>, the email server will 
                be set to use SSL. This is used to determine if the email 
                server should use SSL or not. For example, if you set 
                this to <C>true</C>, then the email server will be set 
                to use SSL.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'auth.user'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The username of the email server. This is used to 
                determine the username for the email server. This is 
                usually the email address of the user. 
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'auth.pass'}</C>
              </Tcol>
              <Tcol className="text-left">
                The password of the email server. This is used to 
                determine the password for the email server. This is 
                usually the password of the user.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="language-config"></a>
      <H2>9. Language Config</H2>

      <section>
        <P>
          desc
        </P>

        <Code>{examples[11]}</Code>

        <P>
          The language config accept the following options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap3 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead noWrap className="theme-bg-bg2 text-left">Default</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'key'}</C></Tcol>
              <Tcol noWrap className="text-left"><C>{'"locale"'}</C></Tcol>
              <Tcol className="text-left">
                URL flag <E>(ie. ?locale)</E> used to change the user's 
                locale this is also the name of the cookie used to store 
                the locale while visiting the application.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'locale'}</C></Tcol>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'"en_US"'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The default language used by the application.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'languages'}</C></Tcol>
              <Tcol noWrap className="text-left"><C>{'undefined'}</C></Tcol>
              <Tcol className="text-left">
                A map of possible languages and translations its 
                correlating translations.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <P>
          Each language has the following required properties.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'label'}</C></Tcol>
              <Tcol className="text-left">
                The name of the language used by the frontend.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'translations'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                A key value of translations. 
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="server-config"></a>
      <H2>10. Server Config</H2>

      <section>
        <P>
          The server config is generally used 
          the <SS>Stackpress</SS> toolkit.
        </P>

        <Code>{examples[12]}</Code>

        <P>
          The server config accept the following options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'build'}</C>
              </Tcol>
              <Tcol className="text-left">
                Pathname of where to generally save the build files.
                Defaults to <C>'[cwd]/.build'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'cwd'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Pathname of the current working directory. This 
                defaults to <C>process.cwd()</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'mode'}</C>
              </Tcol>
              <Tcol className="text-left">
                Used to determine the mode for the server. This can be 
                any string value but the <SS>Stackpress</SS> toolkit 
                only cases for <C>'production'</C> and 
                not <C>'production'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'port'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The port to run the server on. This is used to determine 
                the port for the server. Defaults to <C>3000</C>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="session-config"></a>
      <H2>11. Session Config</H2>

      <section>
        <P>
          The session configuration is used to customize the session
          settings. This is used by auth and roles &amp; permissions in 
          the <SS>Stackpress</SS> toolkit. 
        </P>

        <Code>{examples[13]}</Code>

        <P>
          The session config required are the following parameters.
        </P>
  
        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'session'}</C></Tcol>
              <Tcol className="text-left">
                The name of the session cookie. This is used to identify 
                the session cookie in the browser.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'seed'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The seed used to generate the session ID. This is used to 
                create a unique session id for each user. This should be 
                a random string that is kept secret.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'access'}</C></Tcol>
              <Tcol className="text-left">
                List of access routes for each role.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <Warn>
          By default all routes are open to all users, but setting 
          the <C>access</C> parameter will automatically blacklist all 
          the routes that are not specified on the access list.
        </Warn>

        <P>
          Each access config required are the following parameters.
        </P>
  
        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'method'}</C>
              </Tcol>
              <Tcol className="text-left">
                The HTTP method of the route to white-list.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'route'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The route pattern to white-list.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <P>
          For example, the following configuration describes that admins 
          have access to the home page, and all auth, admin, API routes. 
          Regular users have access to the home page, and all auth, API 
          routes. Guests have access to the home page, and all auth 
          routes.
        </P>

        <Code>{examples[14]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="view-config"></a>
      <H2>12. View Config</H2>

      <section>
        <P>
          The view configuration is used to customize everything 
          specifically related to views.
        </P>

        <Code>{examples[15]}</Code>

        <P>
          The view config accept the following options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'noview'}</C>
              </Tcol>
              <Tcol className="text-left">
                URL query flag <E>(ie. ?json)</E> used to disable 
                template rendering and show the raw json data instead.
                Defaults to <C>'json'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'base'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Used by vite and in development mode to determine the 
                root of the project. Defaults to <C>'/'</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'notify.position'}</C>
              </Tcol>
              <Tcol className="text-left">
                One of <C>top-right</C>, <C>top-center</C>, <C>top-left</C>, <C>bottom-right</C>, <C>bottom-center</C>, <C>bottom-left</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'notify.autoClose'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Delay in ms to close the toast. If set to false, the 
                notification needs to be closed manually.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'notify.hideProgressBar'}</C>
              </Tcol>
              <Tcol className="text-left">
                Display or not the progress bar below the 
                toast <E>(remaining time)</E>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'notify.closeOnClick'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Dismiss toast on click
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'notify.pauseOnHover'}</C>
              </Tcol>
              <Tcol className="text-left">
                Keep the timer running or not on hover
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'notify.draggable'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Allow toast to be draggable
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'notify.theme'}</C>
              </Tcol>
              <Tcol className="text-left">
                One of <C>light</C>, <C>dark</C>, <C>colored</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'engine.assetPath'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Pathname where to save assets (css, images, etc)
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'engine.basePath'}</C>
              </Tcol>
              <Tcol className="text-left">
                Base pathname <E>(used in vite)</E>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'engine.clientPath'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Pathname where to save the client scripts <E>(js)</E>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'engine.clientRoute'}</C>
              </Tcol>
              <Tcol className="text-left">
                Client script route prefix used in the document markup.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'engine.clientTemplate'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Template wrapper for the client script <E>(tsx)</E>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'engine.cssFiles'}</C>
              </Tcol>
              <Tcol className="text-left">
                List of CSS files to include in all views.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'engine.cssRoute'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Style route prefix used in the document markup.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'engine.documentTemplate'}</C>
              </Tcol>
              <Tcol className="text-left">
                Template wrapper for the document markup <E>(html)</E>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'engine.pagePath'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Pathname where to save and load the server 
                script <E>(js)</E>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'engine.pageTemplate'}</C>
              </Tcol>
              <Tcol className="text-left">
                Template wrapper for the page script <E>(tsx)</E>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'engine.plugins'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Vite plugins
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{'engine.vite'}</C>
              </Tcol>
              <Tcol className="text-left">
                Original vite 
                options <E>(overrides other settings related to vite)</E>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'engine.watchIgnore'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Ignore files in watch mode
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="typings"></a>
      <H2>13. Typings</H2>

      <section>
        <P>
          The following describes the configuration typings.
        </P>

        <Code>{examples[16]}</Code>
      </section>
      
      <Nav
        prev={{ 
          text: 'Client API', 
          href: '/docs/references/client-api' 
        }}
        next={{ 
          text: 'EventEmitter Class', 
          href: '/docs/references/emitter-class' 
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