//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, C, E, A, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`//returns the entire config
const data = server.config()
//return the value where as { server: { cwd: '[cwd]' } }
const cwd = server.config('server', 'cwd')
//return the value where as { server: { mode: 'prod' } }, default is dev
const age = server.config.path('server.mode', 'dev')
//sets the data where as { server: { mode: 100 } }
server.config.set('server', 'mode', 100)
//remove part of the data 
//where as \`mode\` will be remove from \`server\`
server.config.delete('server', 'mode')
//returns true if the data has the key 
//where as if \`mode\` exists in \`server\`
const exists = server.config.has('server', 'mode')
//Map() functions, see Map API
const entries = server.config.entries()
const keys = server.config.keys()
const values = server.config.values()
const json = server.config.toString()`,
//1-------------------------------------------------------------------//
`server.on('say-hello', function SayHello(name: string) {
  console.log('Hello ' + name);
}, 1)`,
//2-------------------------------------------------------------------//
`type RequestOptions<R = unknown> = {
  resource: R,
  body?: Body,
  headers?: Headers,
  mimetype?: string,
  data?: Data,
  method?: Method,
  query?: Query,
  post?: Post,
  session?: Session,
  url?: string|URL
};`,
//3-------------------------------------------------------------------//
`type ResponseOptions<S = unknown> = {
  body?: Body,
  headers?: Headers,
  mimetype?: string,
  data?: Data,
  resource?: S
};`,
//3-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Server Class - References - Stackpress Documentation');
  const description = _(
    'The Server class is the main class for the server. It extends the '
    + 'Router class.'
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
        {_('Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#entries">
          {_('entries')}
        </a>
        <a className="theme-tx0 block" href="#imports">
          {_('imports')}
        </a>
        <a className="theme-tx0 block" href="#listeners">
          {_('listeners')}
        </a>
        <a className="theme-tx0 block" href="#routes">
          {_('routes')}
        </a>
        <a className="theme-tx0 block" href="#views">
          {_('views')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#all">
          {_('all()')}
        </a>
        <a className="theme-tx0 block" href="#connect">
          {_('connect()')}
        </a>
        <a className="theme-tx0 block" href="#delete">
          {_('delete()')}
        </a>
        <a className="theme-tx0 block" href="#emit">
          {_('emit()')}
        </a>
        <a className="theme-tx0 block" href="#get">
          {_('get()')}
        </a>
        <a className="theme-tx0 block" href="#head">
          {_('head()')}
        </a>
        <a className="theme-tx0 block" href="#on">
          {_('on()')}
        </a>
        <a className="theme-tx0 block" href="#options">
          {_('options()')}
        </a>
        <a className="theme-tx0 block" href="#patch">
          {_('patch()')}
        </a>
        <a className="theme-tx0 block" href="#post">
          {_('post()')}
        </a>
        <a className="theme-tx0 block" href="#put">
          {_('put()')}
        </a>
        <a className="theme-tx0 block" href="#request">
          {_('request()')}
        </a>
        <a className="theme-tx0 block" href="#resolve">
          {_('resolve()')}
        </a>
        <a className="theme-tx0 block" href="#response">
          {_('response()')}
        </a>
        <a className="theme-tx0 block" href="#route">
          {_('route()')}
        </a>
        <a className="theme-tx0 block" href="#trace">
          {_('trace()')}
        </a>
        <a className="theme-tx0 block" href="#use">
          {_('use()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Server Class</H1>

      <P>
        The <SS>Server</SS> class is the main class for the server. It 
        extends the <A href="/docs/references/router-class">Router</A> class.
        It serves the following purposes.
      </P>

      <ul className="px-lh-30 px-px-20">
        <li>
          • Define and manage routes for execution, analytics and 
          building purposes.
        </li>
        <li>
          • Providing a generic interface to handle requests from HTTP, 
          WHATWG, WebSocket, CLI, etc.
        </li>
        <li>
          • Being the main context of all event and route action 
          callbacks.
        </li>
        <li>
          • Manages all the project configurations.
        </li>
        <li>
          • Bootstrap plugins. Plugins can register and configure 
          themselves by listening to 
          the <C>config</C>, <C>listen</C>, and <C>route</C> events.
        </li>
        <li>
          • Resolve and load pathnames and filepaths.
        </li>
      </ul>

      {/*------------------------------------------------------------*/}
                  
      <a id="config"></a>
      <H2>config</H2>

      <section>
        <P>
          Generic arbitrary configuration map used by plugins to auto 
          configure itself.
        </P>

        <Code>{examples[0]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="gateway"></a>
      <H2>gateway</H2>

      <section>
        <P>
          Sets the gateway in which HTTP requests originate from and 
          how to handle them.
        </P>

        <Code>{`server.gateway = (options: ServerOptions) = {...}`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="entries"></a>
      <H2>entries</H2>

      <section>
        <P>
          Returns a map of route entries that are logged 
          using <C>server.entry.route()</C>. You can use this to compare 
          against the <C>listeners</C> and <C>expressions</C> properties 
          for analytics and building production code. Entries are mapped 
          like the following where entry is a filepath instead of an 
          action function. 
        </P>

        <Code>{`event -> [ ...{ entry, priority } ]`}</Code>

        <H4>Example</H4>

        <Code>{`const entries = server.entries`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="handler"></a>
      <H2>handler</H2>

      <section>
        <P>
          A callback that handles resource 
          requests <E>(ie. HTTP, WHATWG, WebSocket, CLI, etc.)</E>.
        </P>

        <Code>{`server.handler = (ctx: Server, req: R, res: S) => {...}`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="imports"></a>
      <H2>imports</H2>

      <section>
        <P>
          Returns a map of route imports that are logged 
          using <C>server.import.route()</C>. You can use this to compare
          against the <C>listeners</C> and <C>expressions</C> properties 
          for analytics and building production code. Imports are mapped 
          like the following where import is a no-argument callback that 
          returns an import ie. <C>{`() => import('./page.js')`}</C>.
        </P>

        <Code>{`event -> [ ...{ import, priority } ]`}</Code>

        <H4>Example</H4>

        <Code>{`const imports = server.imports`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="listeners"></a>
      <H2>listeners</H2>

      <section>
        <P>
          Returns a read-only shallow copy of the listeners. Listeners 
          are organized by events and events can have multiple listeners
          and listeners have priorities. The listeners are not 
          pre-organized by priority. This happens during the event loop.
        </P>

        <Code>{'const listeners = server.listeners'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="loader"></a>
      <H2>loader</H2>

      <section>
        <P>
          Returns the plugin loader.
        </P>

        <Code>{`const cwd = server.loader.cwd`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="plugins"></a>
      <H2>plugins</H2>

      <section>
        <P>
          Returns a map of plugin names to their respective interface.
        </P>

        <Code>{`const db = server.plugins['database']`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="routes"></a>
      <H2>routes</H2>

      <section>
        <P>
          Returns all the routes that are registered with the server.
          You can use this to compare against 
          the <C>listeners</C> and <C>expressions</C> properties for 
          analytics and building production code. Routes are mapped 
          like the following.
        </P>

        <Code>{`event -> [ ...{ method, path } ]`}</Code>

        <H4>Example</H4>

        <Code>{`const routes = server.routes`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="views"></a>
      <H2>views</H2>

      <section>
        <P>
          Returns a map of route views that are logged 
          using <C>server.views.route()</C>. You can use this to compare 
          against the <C>listeners</C> and <C>expressions</C> properties 
          for analytics and building production code. Views are mapped 
          like the following where entry is a filepath instead of an 
          action function. 
        </P>

        <Code>{`event -> [ ...{ entry, priority } ]`}</Code>

        <H4>Example</H4>

        <Code>{`const views = server.views`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="all"></a>
      <H2>all()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('ALL', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.all(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.all('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.all('/', () => import('./page.js'))`}</Code>
        <Code>{`server.all('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="bootstrap"></a>
      <H2>bootstrap()</H2>

      <section>
        <P>
          Loads the plugins and allows them to self 
          bootstrap <E>(config, listen to events, add routes, etc.)</E> and 
          configure themselves.
        </P>

        <Code>{`await server.bootstrap()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="connect"></a>
      <H2>connect()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('CONNECT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.connect(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.connect('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.connect('/', () => import('./page.js'))`}</Code>
        <Code>{`server.connect('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="create"></a>
      <H2>create()</H2>

      <section>
        <P>
          Creates a new Node.js HTTP server
        </P>

        <Code>{`server.create().listen(3000)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="delete"></a>
      <H2>delete()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('DELETE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.delete(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.delete('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.delete('/', () => import('./page.js'))`}</Code>
        <Code>{`server.delete('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="emit"></a>
      <H2>emit()</H2>

      <section>
        <P>
          Calls all the callbacks of the given event passing the given 
          arguments.
        </P>

        <H4>Usage</H4>

        <Code>{'emit(event: string, ...args: unknown[]): Status'}</Code>

        <H4>Example</H4>

        <Code>{`server.emit('say-hello', name)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="get"></a>
      <H2>get()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('GET', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.get(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.get('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.get('/', () => import('./page.js'))`}</Code>
        <Code>{`server.get('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="handle"></a>
      <H2>handle()</H2>

      <section>
        <P>
          Handles a raw request with 
          either Node.js HTTP <SS>IncomingMessage</SS>, 
          and <SS>ServerResponse</SS> or WHATWG <SS>Request</SS>, 
          and <SS>Response</SS>.
        </P>

        <Code>{`server.handle(request: R, response: S)`}</Code>

        <H4>Example</H4>

        <Code>{`server.handle(im, sr)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="head"></a>
      <H2>head()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('HEAD', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.head(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.head('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.head('/', () => import('./page.js'))`}</Code>
        <Code>{`server.head('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="on"></a>
      <H2>on()</H2>

      <section>
        <P>
          Adds an action callback to the given event listener.
        </P>

        <H4>Usage</H4>

        <Code>{'on(event: string|RegExp, action: Function, priority = 0): EventEmitter'}</Code>

        <H4>Example</H4>

        <Code>{examples[0]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="options"></a>
      <H2>options()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('OPTIONS', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.options(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.options('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.options('/', () => import('./page.js'))`}</Code>
        <Code>{`server.options('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="patch"></a>
      <H2>patch()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('PATCH', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.patch(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.patch('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.patch('/', () => import('./page.js'))`}</Code>
        <Code>{`server.patch('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="plugin"></a>
      <H2>plugin</H2>

      <section>
        <P>
          Returns a plugin interface
        </P>

        <Code>{`const db = server.plugin('database')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="post"></a>
      <H2>post()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('POST', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.post(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.post('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.post('/', () => import('./page.js'))`}</Code>
        <Code>{`server.post('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="put"></a>
      <H2>put()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('PUT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.put(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.put('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.put('/', () => import('./page.js'))`}</Code>
        <Code>{`server.put('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="register"></a>
      <H2>register</H2>

      <section>
        <P>
          Registers a plugin and its interface.
        </P>

        <Code>{`server.register('database', { query })`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="request"></a>
      <H2>request()</H2>

      <section>
        <P>
          Creates a new request.
        </P>

        <H4>Usage</H4>

        <Code>{`server.request(init: RequestOptions = {}): Request`}</Code>

        <H4>Example</H4>

        <Code>{`const request = server.request()`}</Code>
        <Code>{`const request = server.request({ query: {} })`}</Code>
        <Code>{`const request = server.request({ post: {} })`}</Code>
        <Code>{`const request = server.request({ url: 'http://example.com/foo/bar' })`}</Code>

        <P>
          Where as the <C>RequestOptions</C> are as follows.
        </P>

        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="resolve"></a>
      <H2>resolve()</H2>

      <section>
        <P>
          Resolves an event or route. Similar 
          to <C>{`server.emit('event', req, res)`}</C> except you can 
          pass an object as a request, and both request and response 
          are optional.
        </P>

        <H4>Usage</H4>

        <Code>{
          `server.resolve<T = unknown>(`
            + `event: string, `
            + `request?: Request<R> | Record<string, any>, `
            + `response?: Response<S>`
          +`): Promise<Partial<StatusResponse<T>>>`
        }</Code>

        <Code>{
          `server.resolve<T = unknown>(`
            + `method: Method | 'ALL', `
            + `path: string, `
            + `request?: Request<R> | Record<string, any>, `
            + `response?: Response<S>`
          +`): Promise<Partial<StatusResponse<T>>>`
        }</Code>

        <H4>Example</H4>

        <Code>{`await server.resolve('say-hello')`}</Code>
        <Code>{`await server.resolve('say-hello', { name: 'World' })`}</Code>
        <Code>{`await server.resolve('say-hello', { name: 'World' }, res)`}</Code>
        <Code>{`await server.resolve('say-hello', req, res)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="response"></a>
      <H2>response()</H2>

      <section>
        <P>
          Creates a new response.
        </P>

        <H4>Usage</H4>

        <Code>{`server.response(init: ResponseOptions = {}): Request`}</Code>

        <H4>Example</H4>

        <Code>{`const response = server.response()`}</Code>
        <Code>{`const response = server.request({ data: {} })`}</Code>
        <Code>{`const response = server.request({ mimetype: 'text/plain' })`}</Code>

        <P>
          Where as the <C>ResponseOptions</C> are as follows.
        </P>

        <Code>{examples[2]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="route"></a>
      <H2>route()</H2>

      <section>
        <P>
          Registers a route with the server.
        </P>

        <H4>Usage</H4>

        <Code>{`server.route(method: Method, path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.route('GET', '/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.route('GET', '/', () => import('./page.js'))`}</Code>
        <Code>{`server.route('GET', '/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="trace"></a>
      <H2>trace()</H2>

      <section>
        <P>
          A shortcut for <C>{`server.route('TRACE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`server.trace(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`server.trace('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`server.trace('/', () => import('./page.js'))`}</Code>
        <Code>{`server.trace('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="use"></a>
      <H2>use()</H2>

      <section>
        <P>
          Allows routes from other routers to apply here.
        </P>

        <H4>Usage</H4>

        <Code>{'use(router: Router): Router'}</Code>

        <H4>Example</H4>

        <Code>{'server.use(router2)'}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Response Class', 
          href: '/docs/references/response-class' 
        }}
        next={{ 
          text: 'Schema Specifications', 
          href: '/docs/references/schema-specifications' 
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