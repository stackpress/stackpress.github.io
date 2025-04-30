//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, H, A, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import type { ViewPlugin } from 'stackpress/view';
const view = server.plugin<ViewPlugin>('view')`,
//1-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('View Engine - References - Stackpress Documentation');
  const description = _(
    'The view engine provides a comprehensive set of methods to render '
    + 'and build React template views for both server and client.'
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
        <a className="theme-tx0 block" href="#builder">
          {_('builder')}
        </a>
        <a className="theme-tx0 block" href="#config">
          {_('config')}
        </a>
        <a className="theme-tx0 block" href="#paths">
          {_('paths')}
        </a>
        <a className="theme-tx0 block" href="#production">
          {_('production')}
        </a>
        <a className="theme-tx0 block" href="#routes">
          {_('routes')}
        </a>
        <a className="theme-tx0 block" href="#size">
          {_('size')}
        </a>
        <a className="theme-tx0 block" href="#templates">
          {_('templates')}
        </a>
        <a className="theme-tx0 block" href="#vite-config">
          {_('viteConfig')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Resource Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#build">
          {_('build()')}
        </a>
        <a className="theme-tx0 block" href="#dev">
          {_('dev()')}
        </a>
        <a className="theme-tx0 block" href="#http">
          {_('http()')}
        </a>
        <a className="theme-tx0 block" href="#middlewares">
          {_('middlewares()')}
        </a>
        <a className="theme-tx0 block" href="#plugins">
          {_('plugins()')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Loader Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#fetch">
          {_('fetch()')}
        </a>
        <a className="theme-tx0 block" href="#import">
          {_('import()')}
        </a>
        <a className="theme-tx0 block" href="#resolve">
          {_('resolve()')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Manifest Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#build-all-assets">
          {_('buildAllAssets()')}
        </a>
        <a className="theme-tx0 block" href="#build-all-clients">
          {_('buildAllClients()')}
        </a>
        <a className="theme-tx0 block" href="#build-all-pages">
          {_('buildAllPages()')}
        </a>
        <a className="theme-tx0 block" href="#all">
          {_('enries()')}
        </a>
        <a className="theme-tx0 block" href="#find">
          {_('find()')}
        </a>
        <a className="theme-tx0 block" href="#for-each">
          {_('forEach()')}
        </a>
        <a className="theme-tx0 block" href="#get">
          {_('get()')}
        </a>
        <a className="theme-tx0 block" href="#has">
          {_('has()')}
        </a>
        <a className="theme-tx0 block" href="#load">
          {_('load()')}
        </a>
        <a className="theme-tx0 block" href="#open">
          {_('open()')}
        </a>
        <a className="theme-tx0 block" href="#map">
          {_('map()')}
        </a>
        <a className="theme-tx0 block" href="#save">
          {_('save()')}
        </a>
        <a className="theme-tx0 block" href="#set">
          {_('set()')}
        </a>
        <a className="theme-tx0 block" href="#to-json">
          {_('toJSON()')}
        </a>
        <a className="theme-tx0 block" href="#values">
          {_('values()')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Pathing Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#absolute">
          {_('absolute()')}
        </a>
        <a className="theme-tx0 block" href="#id">
          {_('id()')}
        </a>
        <a className="theme-tx0 block" href="#import-page">
          {_('importPage()')}
        </a>
        <a className="theme-tx0 block" href="#relative">
          {_('relative()')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Build Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#build-assets">
          {_('buildAssets()')}
        </a>
        <a className="theme-tx0 block" href="#build-client">
          {_('buildClient()')}
        </a>
        <a className="theme-tx0 block" href="#build-page">
          {_('buildPage()')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Server Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#render-hmr">
          {_('renderHMR()')}
        </a>
        <a className="theme-tx0 block" href="#render">
          {_('render()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>View Engine</H1>

      <P>
        The view engine provides a comprehensive set of methods to
        render and build <SS>React</SS> template views for both server 
        and client. You can get the view engine like the following.
      </P>

      <Code>{examples[0]}</Code>

      {/*------------------------------------------------------------*/}

      <a id="builder"></a>
      <H2>builder</H2>

      <section>
        <P>
          Returns the view builder
        </P>

        <Code>{'view.builder'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="config"></a>
      <H2>config</H2>

      <section>
        <P>
          The final computed configuation for the view engine.
        </P>

        <Code>{'view.config'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="paths"></a>
      <H2>paths</H2>

      <section>
        <P>
          The final computed configuation for the view engine.
        </P>

        <Code>{'view.paths.assets //where assets are saved (css, images, etc)'}</Code>
        <Code>{'view.paths.client //where final client scripts are saved (js)'}</Code>
        <Code>{'view.paths.css //list of css filepaths'}</Code>
        <Code>{'view.paths.head //global head component path'}</Code>
        <Code>{'view.paths.page //where final page scripts are saved (js)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="production"></a>
      <H2>production</H2>

      <section>
        <P>
          Returns true if mode is production
        </P>

        <Code>{'view.production'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="routes"></a>
      <H2>routes</H2>

      <section>
        <P>
          Returns the route prefixes
        </P>

        <Code>{'view.routes.client //client route prefix used in the document markup'}</Code>
        <Code>{'view.routes.css //style route prefix used in the document markup'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="size"></a>
      <H2>size</H2>

      <section>
        <P>
          Returns the size of the manifest
        </P>

        <Code>{'view.size'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="templates"></a>
      <H2>templates</H2>

      <section>
        <P>
          Returns the templates
        </P>

        <Code>{'view.templates.client //template wrapper for the client script (tsx)'}</Code>
        <Code>{'view.templates.document //template wrapper for the document markup (html)'}</Code>
        <Code>{'view.templates.pages //template wrapper for the page script (tsx)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="vite-config"></a>
      <H2>viteConfig</H2>

      <section>
        <P>
          Returns the computed vite configuration
        </P>

        <Code>{'view.viteConfig'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="build"></a>
      <H2>build()</H2>

      <section>
        <P>
          Tries to return the vite build callback
        </P>

        <Code>{'view.build()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="dev"></a>
      <H2>dev()</H2>

      <section>
        <P>
          Tries to return the raw vite dev server
        </P>

        <Code>{'view.dev()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="http"></a>
      <H2>http()</H2>

      <section>
        <P>
          Returns the HTTP middleware needed to serve the assets in 
          dev mode.
        </P>

        <H4>Usage</H4>

        <Code>{'http(req: IncomingMessage, res: ServerResponse): void'}</Code>

        <H4>Example</H4>

        <Code>{'view.http(im, sr)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="middlewares"></a>
      <H2>middlewares()</H2>

      <section>
        <P>
          Returns the raw Vite middlewares used to serve the assets in 
          dev mode.
        </P>

        <Code>{'view.middlewares()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="plugins"></a>
      <H2>plugins()</H2>

      <section>
        <P>
          Returns the raw Vite plugins.
        </P>

        <Code>{'view.plugins()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="fetch"></a>
      <H2>fetch()</H2>

      <section>
        <P>
          Imports a URL using the dev server.
        </P>

        <Code>{`await view.fetch(file:///project/views/home.tsx)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="import"></a>
      <H2>import()</H2>

      <section>
        <P>
          Imports the page component to runtime for dev mode
        </P>

        <Code>{`await view.import(file:///project/views/home)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="resolve"></a>
      <H2>resolve()</H2>

      <section>
        <P>
          Returns the absolute filepath to the entry file. Throws 
          an <A href="/docs/references/exception-class">Exception</A> if 
          the file is not found.
        </P>

        <Code>{`await view.resolve(file:///project/views/home)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="build-all-assets"></a>
      <H2>buildAllAssets()</H2>

      <section>
        <P>
          Builds and saves the assets used from all the documents.
        </P>

        <Code>{`await view.buildAllAssets()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="build-all-clients"></a>
      <H2>buildAllClients()</H2>

      <section>
        <P>
          Builds and saves the client entries from all the documents
        </P>

        <Code>{`await view.buildAllClients()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="build-all-pages"></a>
      <H2>buildAllPages()</H2>

      <section>
        <P>
          Builds and saves the pages scripts from all the documents
        </P>

        <Code>{`await view.buildAllPages()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="entries"></a>
      <H2>entries()</H2>

      <section>
        <P>
          Returns a list of manifest entries
        </P>

        <Code>{'view.entries()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="find"></a>
      <H2>find()</H2>

      <section>
        <P>
          Returns a Document by ID
        </P>

        <Code>{`const document = view.find('home-abc123')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                              
      <a id="for-each"></a>
      <H2>forEach()</H2>

      <section>
        <P>
          Calls a function for each key/value pair in the manifest. The
          function is called with the value, key and the map itself
          as arguments. 
        </P>

        <Code>{`view.forEach((value, key, map) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="get"></a>
      <H2>get()</H2>

      <section>
        <P>
          Returns the Document associated with the entry file. If the 
          entry file does not exist in the manifest, it will 
          return <H>undefined</H>.
        </P>

        <Code>{`view.get('@/view/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="has"></a>
      <H2>has()</H2>

      <section>
        <P>
          Returns <H>true</H> if the entry file exists in the manifest, 
          otherwise it will return <H>false</H>.
        </P>

        <Code>{`view.has('@/view/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="load"></a>
      <H2>load()</H2>

      <section>
        <P>
          Sets the manifest from given object
        </P>

        <Code>{`view.load({ '@/view/home': 'home-abc123' })`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="open"></a>
      <H2>open()</H2>

      <section>
        <P>
          Loads the manifest from disk
        </P>

        <Code>{`view.open('/path/to/manifest.json')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="map"></a>
      <H2>map()</H2>

      <section>
        <P>
          Loop through the manifest and re-assigns the values
        </P>

        <Code>{`view.map(document => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="save"></a>
      <H2>save()</H2>

      <section>
        <P>
          Saves the manifest to disk.
        </P>

        <Code>{`view.save('/path/to/manifest.json')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="set"></a>
      <H2>set()</H2>

      <section>
        <P>
          Sets an entry in the manifest and returns a document
        </P>

        <Code>{`const document = view.set('@/view/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="to-json"></a>
      <H2>toJSON()</H2>

      <section>
        <P>
          Converts the manifest to hash
        </P>

        <Code>{`const json = view.toJSON()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="absolute"></a>
      <H2>absolute()</H2>

      <section>
        <P>
          Returns the absolute path to the entry file
        </P>

        <Code>{`const absolute = view.absolute('@/views/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="id"></a>
      <H2>id()</H2>

      <section>
        <P>
          Generates an id for the entry file
        </P>

        <Code>{`const id = view.id('@/views/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="import-page"></a>
      <H2>importPage()</H2>

      <section>
        <P>
          Imports the page component to runtime
        </P>

        <Code>{`const component = await view.importPage('@/views/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="relative"></a>
      <H2>relative()</H2>

      <section>
        <P>
          Returns the absolute path to the entry file
        </P>

        <Code>{`const pathname = await view.relative('@/views/home', '@/views/about')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="build-assets"></a>
      <H2>buildAssets()</H2>

      <section>
        <P>
          Returns the final client entry source code (js) and assets
        </P>

        <Code>{`const results = await view.buildAssets('@/views/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="build-client"></a>
      <H2>buildClient()</H2>

      <section>
        <P>
          Returns the final client entry assets
        </P>

        <Code>{`const results = await view.buildClient('@/views/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="build-page"></a>
      <H2>buildPage()</H2>

      <section>
        <P>
          Returns the final page component source code (js)
        </P>

        <Code>{`const results = await view.buildPage('@/views/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="render-hmr"></a>
      <H2>renderHMR()</H2>

      <section>
        <P>
          Returns the client entry for HMR (js)
        </P>

        <H4>Usage</H4>

        <Code>{`renderHMR(entry: string): Promise<string>`}</Code>
        
        <H4>example</H4>

        <Code>{`const script = await view.renderHMR('@/views/home')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="render"></a>
      <H2>render()</H2>

      <section>
        <P>
          Returns the final document markup (html)
        </P>

        <H4>Usage</H4>

        <Code>{`render(entry: string): Promise<string>`}</Code>
        
        <H4>example</H4>

        <Code>{`const html = await view.render('@/views/home', { name })`}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Server Class', 
          href: '/docs/references/server-class' 
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