//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, C, A, SS } from '../../../components/index.js';
import { Nav, Code, Layout } from '../../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('View Router Class - References - Stackpress Documentation');
  const description = _(
    'The ViewRouter class is an extension of the main router, that '
    + 'handles actions that are filepath that export default a React '
    + 'component.'
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
        <a className="theme-tx0 block" href="#views">
          {_('views')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#action">
          {_('action()')}
        </a>
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
      <H1>View Router Class</H1>

      <P>
        The <SS>ViewRouter</SS> class is an extension of 
        the <A href="/docs/references/router-class">main router</A>, 
        that handles actions that are filepath 
        that <C>export default</C> a <SS>React</SS> component.
      </P>

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

        <Code>{`const views = router.view.views`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="action"></a>
      <H2>action()</H2>

      <section>
        <P>
          Makes an action from an entry pathname string. Registers the 
          entry, a provision for analytics and builders.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.action(event: string, action: string, priority = 0): Function`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.action('say-hello', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="all"></a>
      <H2>all()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('ALL', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.all(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.all('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="connect"></a>
      <H2>connect()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('CONNECT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.connect(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.connect('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="delete"></a>
      <H2>delete()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('DELETE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.delete(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.delete('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="get"></a>
      <H2>get()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('GET', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.get(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>
        
        <Code>{`router.view.get('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="head"></a>
      <H2>head()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('HEAD', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.head(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.head('/', '@/app/view')`}</Code>
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

        <Code>{`router.view.on('say-hello', '@/app/view', 1)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="options"></a>
      <H2>options()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('OPTIONS', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.options(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.options('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="patch"></a>
      <H2>patch()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('PATCH', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.patch(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.patch('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="post"></a>
      <H2>post()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('POST', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.post(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.post('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="put"></a>
      <H2>put()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('PUT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.put(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.put('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="route"></a>
      <H2>route()</H2>

      <section>
        <P>
          Registers a route with the router.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.route(method: Method, path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.route('GET', '/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="trace"></a>
      <H2>trace()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.view.route('TRACE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.view.trace(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.view.trace('/', '@/app/view')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="use"></a>
      <H2>use()</H2>

      <section>
        <P>
          Allows routes from other routers to apply here.
        </P>

        <H4>Usage</H4>

        <Code>{'use(router: ViewRouter): ViewRouter'}</Code>

        <H4>Example</H4>

        <Code>{'router.view.use(router2)'}</Code>
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