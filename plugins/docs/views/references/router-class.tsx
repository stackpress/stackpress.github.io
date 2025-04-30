//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, C, A, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`router.on('say-hello', function SayHello(name: string) {
  console.log('Hello ' + name);
}, 1)`,
//1-------------------------------------------------------------------//
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
//2-------------------------------------------------------------------//
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
  const title = _('Router Class - References - Stackpress Documentation');
  const description = _(
    'The router class allows the registration of routes and handles requests.'
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
      <H1>Router Class</H1>

      <P>
        The router class allows the registration of routes and handles 
        requests. It extends 
        the <A href="/docs/references/emitter-class">EventEmitter</A> class. 
        For predictability, the router only passes 
        a <A href="/docs/references/request-class">Request</A> object, 
        a <A href="/docs/references/request-class">Response</A> object, 
        and a <A href="/docs/references/request-class">Server</A> object 
        argument respectively. objects to each action 
        function. <SS>Stackpress</SS> route actions can be defined in 
        four ways.
      </P>

      <ul className="px-lh-30 px-px-20">
        <li>
          • <A href="/docs/references/router/action-class">Action routing</A>
        </li>
        <li>
          • <A href="/docs/references/router/entry-class">Entry routing</A>
        </li>
        <li>
          • <A href="/docs/references/router/import-class">Import routing</A>
        </li>
        <li>
          • <A href="/docs/references/router/view-class">View routing</A>
        </li>
      </ul>

      {/*------------------------------------------------------------*/}
                  
      <a id="entries"></a>
      <H2>entries</H2>

      <section>
        <P>
          Returns a map of route entries that are logged 
          using <C>router.entry.route()</C>. You can use this to compare 
          against the <C>listeners</C> and <C>expressions</C> properties 
          for analytics and building production code. Entries are mapped 
          like the following where entry is a filepath instead of an 
          action function. 
        </P>

        <Code>{`event -> [ ...{ entry, priority } ]`}</Code>

        <H4>Example</H4>

        <Code>{`const entries = router.entries`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="imports"></a>
      <H2>imports</H2>

      <section>
        <P>
          Returns a map of route imports that are logged 
          using <C>router.import.route()</C>. You can use this to compare
          against the <C>listeners</C> and <C>expressions</C> properties 
          for analytics and building production code. Imports are mapped 
          like the following where import is a no-argument callback that 
          returns an import ie. <C>{`() => import('./page.js')`}</C>.
        </P>

        <Code>{`event -> [ ...{ import, priority } ]`}</Code>

        <H4>Example</H4>

        <Code>{`const imports = router.imports`}</Code>
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

        <Code>{'const listeners = router.listeners'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="routes"></a>
      <H2>routes</H2>

      <section>
        <P>
          Returns all the routes that are registered with the router.
          You can use this to compare against 
          the <C>listeners</C> and <C>expressions</C> properties for 
          analytics and building production code. Routes are mapped 
          like the following.
        </P>

        <Code>{`event -> [ ...{ method, path } ]`}</Code>

        <H4>Example</H4>

        <Code>{`const routes = router.routes`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="views"></a>
      <H2>views</H2>

      <section>
        <P>
          Returns a map of route views that are logged 
          using <C>router.views.route()</C>. You can use this to compare 
          against the <C>listeners</C> and <C>expressions</C> properties 
          for analytics and building production code. Views are mapped 
          like the following where entry is a filepath instead of an 
          action function. 
        </P>

        <Code>{`event -> [ ...{ entry, priority } ]`}</Code>

        <H4>Example</H4>

        <Code>{`const views = router.views`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="all"></a>
      <H2>all()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('ALL', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.all(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.all('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.all('/', () => import('./page.js'))`}</Code>
        <Code>{`router.all('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="connect"></a>
      <H2>connect()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('CONNECT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.connect(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.connect('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.connect('/', () => import('./page.js'))`}</Code>
        <Code>{`router.connect('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="delete"></a>
      <H2>delete()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('DELETE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.delete(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.delete('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.delete('/', () => import('./page.js'))`}</Code>
        <Code>{`router.delete('/', '@/app/view')`}</Code>
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

        <Code>{`router.emit('say-hello', name)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="get"></a>
      <H2>get()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('GET', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.get(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.get('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.get('/', () => import('./page.js'))`}</Code>
        <Code>{`router.get('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="head"></a>
      <H2>head()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('HEAD', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.head(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.head('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.head('/', () => import('./page.js'))`}</Code>
        <Code>{`router.head('/', '@/app/view')`}</Code>
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
          A shortcut for <C>{`router.route('OPTIONS', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.options(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.options('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.options('/', () => import('./page.js'))`}</Code>
        <Code>{`router.options('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="patch"></a>
      <H2>patch()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('PATCH', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.patch(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.patch('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.patch('/', () => import('./page.js'))`}</Code>
        <Code>{`router.patch('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="post"></a>
      <H2>post()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('POST', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.post(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.post('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.post('/', () => import('./page.js'))`}</Code>
        <Code>{`router.post('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="put"></a>
      <H2>put()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('PUT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.put(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.put('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.put('/', () => import('./page.js'))`}</Code>
        <Code>{`router.put('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="request"></a>
      <H2>request()</H2>

      <section>
        <P>
          Creates a new request.
        </P>

        <H4>Usage</H4>

        <Code>{`router.request(init: RequestOptions = {}): Request`}</Code>

        <H4>Example</H4>

        <Code>{`const request = router.request()`}</Code>
        <Code>{`const request = router.request({ query: {} })`}</Code>
        <Code>{`const request = router.request({ post: {} })`}</Code>
        <Code>{`const request = router.request({ url: 'http://example.com/foo/bar' })`}</Code>

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
          to <C>{`router.emit('event', req, res)`}</C> except you can 
          pass an object as a request, and both request and response 
          are optional.
        </P>

        <H4>Usage</H4>

        <Code>{
          `router.resolve<T = unknown>(`
            + `event: string, `
            + `request?: Request<R> | Record<string, any>, `
            + `response?: Response<S>`
          +`): Promise<Partial<StatusResponse<T>>>`
        }</Code>

        <Code>{
          `router.resolve<T = unknown>(`
            + `method: Method | 'ALL', `
            + `path: string, `
            + `request?: Request<R> | Record<string, any>, `
            + `response?: Response<S>`
          +`): Promise<Partial<StatusResponse<T>>>`
        }</Code>

        <H4>Example</H4>

        <Code>{`await router.resolve('say-hello')`}</Code>
        <Code>{`await router.resolve('say-hello', { name: 'World' })`}</Code>
        <Code>{`await router.resolve('say-hello', { name: 'World' }, res)`}</Code>
        <Code>{`await router.resolve('say-hello', req, res)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="response"></a>
      <H2>response()</H2>

      <section>
        <P>
          Creates a new response.
        </P>

        <H4>Usage</H4>

        <Code>{`router.response(init: ResponseOptions = {}): Request`}</Code>

        <H4>Example</H4>

        <Code>{`const response = router.response()`}</Code>
        <Code>{`const response = router.request({ data: {} })`}</Code>
        <Code>{`const response = router.request({ mimetype: 'text/plain' })`}</Code>

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
          Registers a route with the router.
        </P>

        <H4>Usage</H4>

        <Code>{`router.route(method: Method, path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.route('GET', '/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.route('GET', '/', () => import('./page.js'))`}</Code>
        <Code>{`router.route('GET', '/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="trace"></a>
      <H2>trace()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.route('TRACE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.trace(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.trace('/', (req, res, ctx) => {...})`}</Code>
        <Code>{`router.trace('/', () => import('./page.js'))`}</Code>
        <Code>{`router.trace('/', '@/app/view')`}</Code>
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

        <Code>{'router.use(router2)'}</Code>
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