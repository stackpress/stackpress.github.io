//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, C, A, E } from '../../components/index.js';
import { Nav, Note, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import { EventEmitter } from 'stackpress/lib'
//create emitter
const emitter = new EventEmitter()
//create listener
app.on('say-hello', name => {
  console.log('Hello', name)
})
//emit event
emitter.emit('say-hello', 'john')
`,
//1-------------------------------------------------------------------//
`import { server } from 'stackpress/http'
//create app
const app = server()
//create listener
app.on('say-hello', (req, res, ctx) => {
  res.setBody('text/plain', 'Hello World')
})`,
//2-------------------------------------------------------------------//
`import { server } from 'stackpress/http'
//create app
const app = server()
//create a route
app.get('/', (req, res, ctx) => {
  console.log('TODO: log in database')
  res.setBody('text/plain', 'Hello World')
  //do something else...
  //do something else...
  //do something else...
})
//start server
app.create().listen(3000, () => {
  console.log('Listening on port 3000')
})`,
//3-------------------------------------------------------------------//
`import { server } from 'stackpress/http'
//create app
const app = server()
//create listeners
app.on('log-view', (req, res, ctx) => {
  console.log('TODO: log in database')
})
app.on('say-hello', (req, res) => {
  res.setBody('text/plain', 'Hello World')
})
//create a route
app.get('/', (req, res, ctx) => {
  await ctx.emit('log-view', req, res)
  await ctx.emit('say-hello', req, res)
})
//start server
app.create().listen(3000, () => {
  console.log('Listening on port 3000')
})`,
//4-------------------------------------------------------------------//
`app.on('say-hello', (req, res) => {
  res.setBody('text/plain', 'Hello World')
})`,
//5-------------------------------------------------------------------//
`app.on('say/:name/hello', (req, res) => {
  const name = req.data('name')
  res.setBody('text/plain', \`Hello \${name}\`)
})`,
//6-------------------------------------------------------------------//
`app.on('say/*/hello', (req, res) => {
  const name = req.data(0)
  res.setBody('text/plain', \`Hello \${name}\`)
})`,
//7-------------------------------------------------------------------//
`app.on('say/**', (req, res) => {
  const path = req.data(0)
  res.setBody('text/plain', \`Hello \${path}\`)
})`,
//8-------------------------------------------------------------------//
`app.on(/^say\-(.+)$/, (req, res) => {
  const path = req.data(0)
  res.setBody('text/plain', \`Hello \${path}\`)
})`,
//9-------------------------------------------------------------------//
`app.on('say-hello', (req, res) => {
  res.setBody('text/plain', 'Hello Before')
}, 100)
app.on('say-hello', (req, res) => {
  res.setBody('text/plain', 'Hello World')
})
app.on('say-hello', (req, res) => {
  res.setBody('text/plain', 'Hello After')
}, -100)`,
//10------------------------------------------------------------------//
`app.on('say-hello', (req, res) => {
  res.setBody('text/plain', 'Hello World')
})`,
//11------------------------------------------------------------------//
`app.on('say-hello', () => import('./events/hello.js'))`,
//12------------------------------------------------------------------//
`import type { Request, Response, Server } from 'stackpress/server'

export default function SayHello(req: Request, res: Response, ctx: Server) {
  res.setBody('text/plain', 'Hello World')
}`,
//13------------------------------------------------------------------//
`import { action } from 'stackpress/server'

export default action(function SayHello(req, res, ctx) {
  res.setBody('text/plain', 'Hello World')
})`,
//14------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Develop Events - Develop - Stackpress Documentation');
  const description = _(
    'An event emitter is a pattern for making different parts of a '
    + 'program talk to each other by sending and receiving messages.'
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
        <a className="theme-tx0 block" href="#with-server">
          {_('With Server')}
        </a>
        <a className="theme-tx0 block" href="#with-routing">
          {_('With Routing')}
        </a>
        <a className="theme-tx0 block" href="#event-names">
          {_('Event Names')}
        </a>
        <a className="theme-tx0 block" href="#event-priority">
          {_('Event Priority')}
        </a>
        <a className="theme-tx0 block" href="#event-actions">
          {_('Event Actions')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>EventEmitter Class</H1>

      <P>
        An event emitter is a pattern for making different parts of 
        a program talk to each other by sending and receiving messages. 
        It's a way to create responsive and interactive applications.
        The <A href="/docs/references/server-class">Server</A>, 
        and <A href="/docs/references/router-class">Router</A> class 
        extends from this class. The following code is an example of 
        creating an emitter, a very basic listener and emitting the 
        event.
      </P>

      <Code>{examples[0]}</Code>

      <P>
        Where as <C>'say-hello'</C> is the name of the event and
        <C>{`name => {}`}</C> is the action function that will
        be executed when the event is emitted. 
      </P>

      {/*------------------------------------------------------------*/}

      <a id="with-server"></a>
      <H2>With Server</H2>

      <section>
        <P>
          In relation to the server, you can listen to events in the 
          following way.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          The differences are the server will always pass 
          a <A href="/docs/references/request-class">
            Request
          </A> <E>{'(req)'}</E>, <A href="/docs/references/response-class">
            Response
          </A> <E>{'(res)'}</E>, and <A href="/docs/references/server-class">
            Server
          </A> <E>{'(ctx)'}</E> object, respectively and events provides 
          a good abstraction strategy for routes.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="with-routing"></a>
      <H2>With Routing</H2>

      <section>
        <P>
          To explain the problem, consider the following route.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          The example above describes a route with several steps 
          involved and overtime can lead to issues. Setting up an 
          event driven design where an events are designed as units of 
          function could manage the technical debt later down the line.
          Consider the following usage of events with routing.
        </P>

        <Code>{examples[3]}</Code>

        <P>
          The example above shows how to create a home page route that 
          emits several events. The <C>'log-view'</C> event is used to 
          log the view in the database and the <C>'say-hello'</C> event 
          is used to send a response to the client. This way, you can 
          separate the concerns of logging and responding from the 
          route.
        </P>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="event-names"></a>
      <H2>Event Names</H2>
      
      <section>
        <P>
          A basic event name is just a string. The following code is a 
          very basic example of an event that will listen to 
          the <C>'say-hello'</C> event name as is.
        </P>
        
        <Code>{examples[4]}</Code>
        
        <P>
          Event names can also be formed as patterns to represent 
          dynamic variable pathing. The following code is an example of 
          an event name with a named variable called <C>':name'</C>.
        </P>
        
        <Code>{examples[5]}</Code>
        
        <P>
          The above example shows how the app listens to 
          the <C>'say/:name/hello'</C> event name.
          This means the following path examples are accepted.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">• <C>say/john/hello</C></li>
          <li className="px-pb-20">• <C>say/jane/hello</C></li>
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
          The above code is an example of an event that listens to 
          the <C>'say/*/hello'</C> event name. Unlike variable paths, 
          the <C>*</C> wildcard matches are nameless and thus denoted 
          by numbers. This means the following event names examples 
          will trigger.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">• <C>'say/john/hello'</C></li>
          <li className="px-pb-20">• <C>'say/jane/hello'</C></li>
        </ul>

        <P>
          Where as <C>'*'</C> would be <C>'john'</C>, or <C>'jane'</C>. 
          A more powerful pattern than the <C>'*'</C> is 
          the <C>'**'</C> rest pattern that matches any number of path 
          segments.
        </P>

        <Code>{examples[7]}</Code>

        <P>
          The above code is an example of a route path that listens to 
          the <C>'say/**'</C> path. In this example, any names that start 
          with <C>'say/'</C> will be triggered. This means the 
          following path examples are triggered <E>(but not limited to)</E>.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">• <C>'say/any'</C></li>
          <li className="px-pb-20">• <C>'say/any/thing/you/want'</C></li>
        </ul>

        <P>
          Lastly an event name can also be a regular expression. The
          following code is an example of an event name that listens to
          the <C>/^say-(.+)$/</C> event expression.
        </P>

        <Code>{examples[8]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="event-priority"></a>
      <H2>Event Priority</H2>

      <section>
        <P>
          An event priority is a number that determines the order in 
          which the event actions are executed. The higher the number, 
          the higher the priority. The following code is an example of 
          three events with different priorities.
        </P>

        <Code>{examples[9]}</Code>
        
        <P>
          The above code is an example of three events with different
          priorities. The first event has a priority of <C>100</C>,
          the second event has a priority of <C>0</C>, and the third
          event has a priority of <C>-100</C>. This means the first
          event will be executed first, followed by the second event,
          and finally the third event. The default priority is <C>0</C>.
        </P>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="event-actions"></a>
      <H2>Event Actions</H2>

      <section>
        <P>
          An event action is a function that is executed when the 
          route is matched. The following shows an example of a
          basic route action. When an event is emitted from the server 
          the <C>req</C>, <C>res</C> and <C>ctx</C> are 
          the <A href="/docs/references/request-class">Request</A>, 
          and <A href="/docs/references/response-class">Response</A>, 
          and <A href="/docs/references/server-class">Server</A> objects, 
          respectively.
        </P>

        <Code>{examples[10]}</Code>

        <P>
          The simplicity of the above code is what made this kind of 
          pattern popular, but it comes with a few issues.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">
            • The actions are defined, but not necessarily used. Consider 
            a serverless environment.
          </li>
          <li className="px-pb-20">
            • No event mapping for bundlers. Cannot do tree shaking or 
            code splitting for example.
          </li>
          <li className="px-pb-20">
            • Cannot be used effectively with a module loader. The action
            is not a module, and thus cannot be loaded.
          </li>
        </ul>

        <Note>
          Basically the same issues 
          as <A href="/docs/develop/develop-routes#route-actions">route actions</A>.
        </Note>

        <P>
          Because of the reasons above, the <C>app.on()</C> method can
          also accept a function that returns an import. The following 
          code is an example of an event action that returns a module.
        </P>

        <Code>{examples[11]}</Code>

        <P>
          The above code is an example of an event action that returns
          a module. The module is lazily loaded when the route is 
          matched. Modules imported this way need 
          to <C>export default</C> a function that accepts 
          <C>Request</C>, <C>Response</C> and <C>Server</C> arguments.
        </P>

        <Code>{examples[12]}</Code>

        <P>
          An easier way to create an event action is to use the
          <C>action()</C> function like the following code.
        </P>

        <Code>{examples[13]}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Develop Routes', 
          href: '/docs/develop/develop-routes' 
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