//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, C } from '../../../components/index.js';
import { Nav, Code, Layout } from '../../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`router.action.on('say-hello', function SayHello(name: string) {
  console.log('Hello ' + name);
}, 1)`,
//1-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Router Action Class - References - Stackpress Documentation');
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
        <a className="theme-tx0 block" href="#header2">
          {_('1. Header2')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Router Action Class</H1>

      <P>
        desc
      </P>

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

        <Code>{'const listeners = router.action.listeners'}</Code>
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

        <Code>{`const routes = router.action.routes`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="all"></a>
      <H2>all()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('ALL', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.all(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.all('/', (req, res, ctx) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="connect"></a>
      <H2>connect()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('CONNECT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.connect(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.connect('/', (req, res, ctx) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="delete"></a>
      <H2>delete()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('DELETE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.delete(path: string, action: string|Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.delete('/', (req, res, ctx) => {...})`}</Code>
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

        <Code>{`router.action.emit('say-hello', name)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="event-name"></a>
      <H2>eventName()</H2>

      <section>
        <P>
          Determines the event name given a method and path. This also 
          sets the route in the routes map. This also sets the expression 
          in the expressions map.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.eventName(event: string|RegExp): string`}</Code>
        <Code>{`router.action.eventName(method: Method, path: string): string`}</Code>

        <H4>Example</H4>

        <Code>{`const event = router.action.eventName('say-hello')`}</Code>
        <Code>{`const event = router.action.eventName(/say\\-hello/)`}</Code>
        <Code>{`const event = router.action.eventName('GET', '/say/hello')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="get"></a>
      <H2>get()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('GET', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.get(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.get('/', (req, res, ctx) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="head"></a>
      <H2>head()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('HEAD', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.head(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.head('/', (req, res, ctx) => {...})`}</Code>
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
          A shortcut for <C>{`router.action.route('OPTIONS', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.options(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.options('/', (req, res, ctx) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="patch"></a>
      <H2>patch()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('PATCH', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.patch(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.patch('/', (req, res, ctx) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="post"></a>
      <H2>post()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('POST', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.post(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.post('/', (req, res, ctx) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="put"></a>
      <H2>put()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('PUT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.put(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.put('/', (req, res, ctx) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="route"></a>
      <H2>route()</H2>

      <section>
        <P>
          Registers a route with the router.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.route(method: Method, path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.route('GET', '/', (req, res, ctx) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="trace"></a>
      <H2>trace()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.action.route('TRACE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.action.trace(path: string, action: Function, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.action.trace('/', (req, res, ctx) => {...})`}</Code>
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

        <Code>{'router.action.use(router2)'}</Code>
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