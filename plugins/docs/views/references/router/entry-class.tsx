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
  const title = _('Entry Router Class - References - Stackpress Documentation');
  const description = _(
    'The EntryRouter class is an extension of the main router, that '
    + 'handles actions as filepaths that export default an action '
    + 'function.'
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
      <H1>Entry Router Class</H1>

      <P>
        The <SS>EntryRouter</SS> class is an extension of 
        the <A href="/docs/references/router-class">main router</A>, 
        that handles actions that are filepaths that <C>export default</C> an 
        action function. The action function itself accepts 
        a <A href="/docs/references/request-class">Request</A> object, 
        a <A href="/docs/references/request-class">Response</A> object, 
        and a <A href="/docs/references/request-class">Server</A> object 
        argument respectively.
      </P>

      <Code>{`router.entry.post('/', '/path/to/entry')`}</Code>

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

        <Code>{`const entries = router.entry.entries`}</Code>
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

        <Code>{`router.entry.action(event: string, action: string, priority = 0): Function`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.action('say-hello', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="all"></a>
      <H2>all()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('ALL', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.all(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.all('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="connect"></a>
      <H2>connect()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('CONNECT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.connect(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.connect('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="delete"></a>
      <H2>delete()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('DELETE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.delete(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.delete('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="get"></a>
      <H2>get()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('GET', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.get(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>
        
        <Code>{`router.entry.get('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="head"></a>
      <H2>head()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('HEAD', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.head(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.head('/', '/path/to/page')`}</Code>
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

        <Code>{`router.entry.on('say-hello', '/path/to/page', 1)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="options"></a>
      <H2>options()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('OPTIONS', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.options(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.options('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="patch"></a>
      <H2>patch()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('PATCH', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.patch(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.patch('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="post"></a>
      <H2>post()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('POST', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.post(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.post('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="put"></a>
      <H2>put()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('PUT', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.put(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.put('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="route"></a>
      <H2>route()</H2>

      <section>
        <P>
          Registers a route with the router.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.route(method: Method, path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.route('GET', '/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="trace"></a>
      <H2>trace()</H2>

      <section>
        <P>
          A shortcut for <C>{`router.entry.route('TRACE', ...)`}</C>.
        </P>

        <H4>Usage</H4>

        <Code>{`router.entry.trace(path: string, action: string, priority = 0)`}</Code>

        <H4>Example</H4>

        <Code>{`router.entry.trace('/', '/path/to/page')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                  
      <a id="use"></a>
      <H2>use()</H2>

      <section>
        <P>
          Allows routes from other routers to apply here.
        </P>

        <H4>Usage</H4>

        <Code>{'use(router: EntryRouter): EntryRouter'}</Code>

        <H4>Example</H4>

        <Code>{'router.entry.use(router2)'}</Code>
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