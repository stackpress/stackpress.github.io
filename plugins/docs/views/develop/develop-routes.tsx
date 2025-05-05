//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'r22n';
//docs
import { H1, H2, P, C, H, E, S, A, SS } from '../../components/index.js';
import { Nav, Note, Warn, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import { server } from 'stackpress/http'
//create app
const app = server();
//create a route
app.get('/', (req, res) => {
  res.setBody('text/plain', 'Hello World')
})
//start server
app.create().listen(3000, () => {
  console.log('Listening on port 3000')
})`,
//1-------------------------------------------------------------------//
`app.get('/', (req, res) => {
  res.setBody('text/plain', 'GET request to the homepage')
})
app.post('/', (req, res) => {
  res.setBody('text/plain', 'POST request to the homepage')
})`,
//2-------------------------------------------------------------------//
`app.all('/', (req, res) => {
  res.setBody('text/plain', 'any method request to the homepage')
})`,
//3-------------------------------------------------------------------//
`app.route('MOVE', '/', (req, res) => {
  res.setBody('text/plain', 'GET request to the homepage')
})`,
//4-------------------------------------------------------------------//
`app.get('/blog/article', (req, res) => {
  res.setBody('text/plain', 'Article Home')
})`,
//5-------------------------------------------------------------------//
`app.get('/blog/:name/articles', (req, res) => {
  const name = req.data('name')
  res.setBody('text/plain', \`Blog \${name} articles\`)
})`,
//6-------------------------------------------------------------------//
`app.get('/blog/*/comments', (req, res) => {
  const name = req.data(0)
  res.setBody('text/plain', \`Blog \${name} comments\`)
})`,
//7-------------------------------------------------------------------//
`app.get('/blog/**', (req, res) => {
  const path = req.data(0)
  res.setBody('text/plain', \`Blog \${path}\`)
})`,
//8-------------------------------------------------------------------//
`app.get('/', (req, res) => {
  res.setBody('text/plain', 'Hello Before')
}, 100)
app.get('/', (req, res) => {
  res.setBody('text/plain', 'Hello World')
})
app.get('/', (req, res) => {
  res.setBody('text/plain', 'Hello After')
}, -100)`,
//9-------------------------------------------------------------------//
`app.get('/', (req, res) => {
  res.setBody('text/plain', 'Hello World')
})`,
//10------------------------------------------------------------------//
`app.get('/', () => import('./pages/home.js'))`,
//11------------------------------------------------------------------//
`import type { Request, Response, Server } from 'stackpress/server'

export default function HomePage(req: Request, res: Response, ctx: Server) {
  res.setBody('text/plain', 'Hello World')
}`,
//12------------------------------------------------------------------//
`import { action } from 'stackpress/server'

export default action(function HomePage(req, res, ctx) {
  res.setBody('text/plain', 'Hello World')
})`,
//13------------------------------------------------------------------//
`app.get('/', (req, res, ctx) => {
  const html = ctx.view.render('@/views/home', { name: 'john' })
  res.setHTML(html);
})`,
//14------------------------------------------------------------------//
`export default function HomePage() {
  return <h1>Hello World</h1>
}`,
//15------------------------------------------------------------------//
`app.get('/', '@/views/home')`,
//16------------------------------------------------------------------//
`app.get('/', () => import('./pages/home.js'), 100)
app.get('/', '@/views/home', -100)`,
//17------------------------------------------------------------------//
`import { action } from 'stackpress/server'

export default action(function HomePage(req, res, ctx) {
  const name = req.data('name')
  res.setResults({ name })
})`,
//18------------------------------------------------------------------//
`import type { ServerPageProps } from 'stackpress/view/client'

export default function HomePage(props: ServerPageProps) {
  const { response } = props
  const { name = 'guest' } = response.results || {}
  return <h1>Hello {name}</h1>
}`,
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Develop Routes - Develop - Stackpress Documentation');
  const description = _(
    'Routing is a popular server pattern to clearly define the accepted '
    + 'HTTP requests and how to handle their responses.'
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
        <a className="theme-tx0 block" href="#route-methods">
          {_('Route Methods')}
        </a>
        <a className="theme-tx0 block" href="#route-paths">
          {_('Route Paths')}
        </a>
        <a className="theme-tx0 block" href="#route-priority">
          {_('Route Priority')}
        </a>
        <a className="theme-tx0 block" href="#route-actions">
          {_('Route Actions')}
        </a>
        <a className="theme-tx0 block" href="#request-response">
          {_('Request & Response')}
        </a>
        <a className="theme-tx0 block" href="#rendering-views">
          {_('Rendering Views')}
        </a>
        <a className="theme-tx0 block" href="#server-props">
          {_('Server Props')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Develop Routes</H1>
      
      <P>
        Routing is a popular server pattern to clearly define the
        accepted HTTP requests and how to handle their responses.
        The following code is an example of creating an app, a very 
        basic route and starting the server.
      </P>

      <Code>{examples[0]}</Code>

      {/*------------------------------------------------------------*/}

      <a id="route-methods"></a>
      <H2>Route Methods</H2>

      <section>
        <P>
          A route method is derived from one of the HTTP methods, and 
          is attached to an instance of the <C>server</C> class. The 
          following code is an example of routes that are defined for 
          the <H>GET</H> and the <H>POST</H> methods to the root of the 
          app.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          The following route methods are supported.
        </P>

        <ul className="px-lh-30 flex flex-wrap">
          <li className="px-pb-20 px-px-10">• <C>app.connect()</C></li>
          <li className="px-pb-20 px-px-10">• <C>app.delete()</C></li>
          <li className="px-pb-20 px-px-10">• <C>app.get()</C></li>
          <li className="px-pb-20 px-px-10">• <C>app.head()</C></li>
          <li className="px-pb-20 px-px-10">• <C>app.options()</C></li>
          <li className="px-pb-20 px-px-10">• <C>app.patch()</C></li>
          <li className="px-pb-20 px-px-10">• <C>app.post()</C></li>
          <li className="px-pb-20 px-px-10">• <C>app.put()</C></li>
          <li className="px-pb-20 px-px-10">• <C>app.trace()</C></li>
        </ul>
      
        <P>
          To accept any HTTP method, you can use the <C>app.all()</C> method.
          The following code is an example of a route that accepts any
          HTTP method to the root of the app.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          For any other HTTP method not naturally supported, you can 
          still use the <C>app.route()</C>. All naturally supported 
          routes eventually use this method. The following code is an
          example of a route that accepts the <H>MOVE</H> method to the
          root of the app.
        </P>

        <Code>{examples[3]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
      
      <a id="route-paths"></a>
      <H2>Route Paths</H2>
      
      <section>
        <P>
          A route path is a string that defines the URL pathname for
          the accepted request. The following code is a very basic 
          example of a route path that accepts 
          the <C>'/blog/article'</C> path as is.
        </P>
        
        <Code>{examples[4]}</Code>
        
        <P>
          Route paths can also be formed as patterns to represent 
          dynamic variable pathing. The following code is an example of 
          a route path with a named variable called <C>':name'</C>.
        </P>
        
        <Code>{examples[5]}</Code>
        
        <P>
          The above example shows how the app accepts 
          the <C>GET</C> method of the <C>'/blog/:name/articles'</C> path.
          This means the following path examples are accepted.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">• <C>'/blog/john/articles'</C></li>
          <li className="px-pb-20">• <C>'/blog/jane/articles'</C></li>
        </ul>
        
        <P>
          Where as <C>':name'</C> would be <C>'john'</C>, 
          or <C>'jane'</C>. The <C>'name'</C> parameter is a variable 
          that can be extracted using 
          the <C>{`req.data('name')`}</C> method. 
          Another pattern called a wildcard <C>'*'</C> can be used to 
          match any single path segment.
        </P>

        <Code>{examples[6]}</Code>
        
        <P>
          The above code is an example of a route path that accepts
          the <H>GET</H> method to the <C>'/blog/*/comments'</C> path. 
          Unlike variable paths, the <C>*</C> wildcard matches are 
          nameless and thus denoted by numbers. This means the following 
          path examples are accepted.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">• <C>'/blog/john/comments'</C></li>
          <li className="px-pb-20">• <C>'/blog/jane/comments'</C></li>
        </ul>

        <P>
          Where as <C>'*'</C> would be <C>'john'</C>, or <C>'jane'</C>. 
          A more powerful pattern than the <C>'*'</C> is 
          the <C>'**'</C> rest pattern that matches any number of path 
          segments.
        </P>

        <Code>{examples[7]}</Code>

        <P>
          The above code is an example of a route path that accepts
          the <H>GET</H> method to the <C>'/blog/**'</C> path. In this 
          example, any requests pathnames that start 
          with <C>'/blog/'</C> will be accepted. This means the 
          following path examples are accepted <E>(but not limited to)</E>.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">• <C>'/blog/any'</C></li>
          <li className="px-pb-20">• <C>'/blog/any/thing/you/want'</C></li>
        </ul>

        <P>
          The <C>*</C> wildcard matches any single path segment, while
          the <C>**</C> wildcard matches any number of path segments.
          The <C>name</C> parameter is a variable that can be used to
          extract the value from the URL.
        </P>
      </section>

      {/*------------------------------------------------------------*/}
      
      <a id="route-priority"></a>
      <H2>Route Priority</H2>

      <section>
        <P>
          A route priority is a number that determines the order in 
          which the routes are executed. The higher the number, the 
          higher the priority. The following code is an example of 
          three routes with different priorities.
        </P>

        <Code>{examples[8]}</Code>
        
        <P>
          The above code is an example of three routes with different
          priorities. The first route has a priority of <C>100</C>,
          the second route has a priority of <C>0</C>, and the third
          route has a priority of <C>-100</C>. This means the first
          route will be executed first, followed by the second route,
          and finally the third route. The default priority is <C>0</C>.
        </P>
      </section>

      {/*------------------------------------------------------------*/}
      
      <a id="route-actions"></a>
      <H2>Route Actions</H2>

      <section>
        <P>
          A route action is a function that is executed when the 
          route is matched. The following shows an example of a
          basic route action. Where the <C>req</C> and
          <C>res</C> are 
          the <A href="/docs/references/request-class">Request</A>, 
          and <A href="/docs/references/response-class">Response</A> objects, 
          respectively.
        </P>

        <Code>{examples[9]}</Code>

        <P>
          The simplicity of the above code is what made this kind of 
          routing popular, but it comes with a few issues.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">
            • The actions are defined, but not necessarily used. Consider 
            a serverless environment.
          </li>
          <li className="px-pb-20">
            • No route mapping for bundlers. Cannot do tree shaking or 
            code splitting for example.
          </li>
          <li className="px-pb-20">
            • Cannot be used effectively with a module loader. The action
            is not a module, and thus cannot be loaded.
          </li>
        </ul>

        <P>
          Because of the reasons above, the <C>app.get()</C> method can
          also accept a function that returns an import. The following 
          code is an example of a route action that returns a module.
        </P>

        <Code>{examples[10]}</Code>

        <P>
          The above code is an example of a route action that returns
          a module. The module is lazily loaded when the route is 
          matched. Modules imported this way need 
          to <C>export default</C> a function that accepts 
          <C>Request</C>, <C>Response</C> and <C>Server</C> arguments.
        </P>

        <Code>{examples[11]}</Code>

        <P>
          An easier way to create a route action is to use the
          <C>action()</C> function like the following code.
        </P>

        <Code>{examples[12]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
      
      <a id="request-response"></a>
      <H2>Request &amp; Response</H2>

      <section>
        <P>
          Unlike most server frameworks, 
          the <A href="/docs/references/request-class">Request</A>, 
          and <A href="/docs/references/response-class">Response</A> objects 
          are not derrived from the 
          native <SS>IncomingMessage</SS> and <SS>ServerResponse</SS> objects 
          from <SS>NodeJS HTTP module</SS>. They are both designed to 
          be generic payloads considering that payloads can come from 
          different mediums. Take WebSockets, and CLI as well as HTTP, 
          Fetch/WHATWG for example.
        </P>

        <Note>
          Another example could be the fact that Vercel 
          sends <SS>WHATWG</SS> payloads 
          and <SS>Google Cloud Functions</SS> sends <SS>NodeJS HTTP</SS> payloads. 
          This means you would otherwise need to case for different scenarios.
        </Note>

        <P>
          Since the <C>Request</C> and <C>Response</C> objects act 
          independantly from any medium, it's better to strategize your 
          code to not assume one in order for it to work across different 
          sources.
        </P>

        <P>
          You can learn more about requests in 
          the <A href="/docs/references/request-class">Request Class</A> reference 
          and you can learn more about responses in 
          the <A href="/docs/references/response-class">Response Class</A> reference.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="rendering-views"></a>
      <H2>Rendering Views</H2>

      <section>
        <P>
          A route action can also return a view. The following code is
          an example of a route action that renders 
          a <SS>React</SS> template and sets the response with 
          its <C>html</C>.
        </P>

        <Code>{examples[13]}</Code>

        <P>
          The above code is an example of a route action that renders
          a <SS>React</SS> template and sets the response with 
          its <C>html</C>. The <C>ctx.view.render()</C> method accepts 
          the view path and the view data. The view path can be a 
          relative path or an absolute path. The <C>'@'</C> at the 
          start of <C>'@/views/home'</C> denotes the current working 
          directory <C>cwd</C>. The 
          view data is an object that contains the data to be passed to 
          the view.
        </P>

        <P>
          The file located at <C>{`'[cwd]/views/home.tsx'`}</C> itself 
          should <C>export default</C> a <SS>React</SS> component. The
          following code is an example of a <SS>React</SS> component
          that renders a simple <H>h1</H> element.
        </P>

        <Code>{examples[14]}</Code>

        <P>
          While this is also a popular pattern to render views, it also
          comes with a major issue.
        </P>

        <P>
          <S>
            The view is only known when the route is activated. This 
            means the view cannot be analyzed by bundlers.
          </S>
        </P>

        <P>
          If your project does require bundling, a better way to
          render views is to use the <C>app.get()</C> method with a
          string path to the view. The following code is an example of
          a route action that renders a view.
        </P>

        <Code>{examples[15]}</Code>  

        <Note>
          This is also a very efficient way to go from HTTP request to
          HTML response directly.
        </Note>  
      </section>

      {/*------------------------------------------------------------*/}

      <a id="server-props"></a>
      <H2>Server Props</H2>

      <section>
        <P>
          If you want to pass server props while being able to bundle 
          your views, a recommended routing strategy is to apply a 
          server action and a view action for the same route like the 
          following code.
        </P>

        <Code>{examples[16]}</Code>

        <P>
          In the above code, we define a route that lazily imports a 
          module that processes on the server side. Next we assign a
          view to the same route. We guarantee that the server action
          is executed before the view action using the priority 
          settings of each route. 
        </P>

        <Note>
          Setting the priorities this way will allow other plugins to 
          control when to inject their actions ie. before, between or 
          after your routes. 
        </Note>
        <br />
        <Warn>
          As long as you dont have <S>200 actions</S>, this should be safe...
        </Warn>

        <P>
          Next you can pass the server props to the view using the
          <C>res.setResults()</C> method. The following code is an
          example of a route action that sets the server props.
        </P>

        <Code>{examples[17]}</Code>

        <P>
          The above code retrieves data 
          from the <C>{`req.data('name')`}</C> method and sets the 
          results via <C>res.setResults()</C> method. The view can then 
          access the server props using the <C>props</C> argument.
        </P>

        <Code>{examples[18]}</Code>
        <P>
          The above code is an example of a <SS>React</SS> component that
          retrieves the server props from the <C>props</C> argument. The
          <C>props</C> argument is an object that contains the server
          props and is passed to the component when the component is 
          rendered. 
        </P>

        <P>
          You can learn more about server props in 
          the <A href="/docs/tutorial/4-server-props">tutorial</A> and
          you can also see more advance methods in 
          the <A href="/docs/references/router-class">Router Class</A> reference.
        </P>
      </section>
      
      <Nav
        prev={{ 
          text: 'Customize Bootstrap', 
          href: '/docs/develop/customize-bootstrap' 
        }}
        next={{ 
          text: 'Develop Events', 
          href: '/docs/develop/develop-events' 
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