//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, C, SS } from '../../components/index.js';
import { Nav, Code, Warn, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`type Event<A extends Array<unknown>> = {
  //name of event triggered
  event: string;
  //event listener pattern
  pattern: string;
  //event handler
  action: Function;
  //event handler arguments
  args: A[];
  //event handler priority
  priority: number;
  data: {
    //arguments extracted from the event pattern
    args: string[];
    //parameters extracted from the event pattern
    params: Record<string, string>;
  };
}`,
//1-------------------------------------------------------------------//
`emitter.after = function (event: Event) {
  console.log(event);
}`,
//2-------------------------------------------------------------------//
`emitter.before = function (event: Event) {
  console.log(event);
}`,
//3-------------------------------------------------------------------//
`emitter.on('say-hello', function (name) {
  console.log(emitter.event);
}`,
//4-------------------------------------------------------------------//
`//{ event -> [ ...{ item, priority } ] }
console.log(emitter.listeners)`,
//5-------------------------------------------------------------------//
`emitter.clear('say-hello')`,
//6-------------------------------------------------------------------//
`await emitter.emit('say-hello', name)`,
//7-------------------------------------------------------------------//
`emitter.match('say-hello')`,
//8-------------------------------------------------------------------//
`emitter.on('say-hello', function SayHello(name: string) {
  console.log('Hello ' + name);
}, 1)`,
//9-------------------------------------------------------------------//
`const queue = emitter.tasks('say-hello')
queue.run(name)`,
//10------------------------------------------------------------------//
`emitter.unbind('say-hello', SayHello)`,
//11------------------------------------------------------------------//
`emitter.use(emitter2)`,
//11------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('EventEmitter Class - References - Stackpress Documentation');
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
        {_('Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#after">
          {_('after')}
        </a>
        <a className="theme-tx0 block" href="#before">
          {_('before')}
        </a>
        <a className="theme-tx0 block" href="#listeners">
          {_('listeners')}
        </a>
        <a className="theme-tx0 block" href="#event">
          {_('event')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#clear">
          {_('clear()')}
        </a>
        <a className="theme-tx0 block" href="#emit">
          {_('emit()')}
        </a>
        <a className="theme-tx0 block" href="#match">
          {_('match()')}
        </a>
        <a className="theme-tx0 block" href="#on">
          {_('on()')}
        </a>
        <a className="theme-tx0 block" href="#tasks">
          {_('tasks()')}
        </a>
        <a className="theme-tx0 block" href="#unbind">
          {_('unbind()')}
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
      <H1>EventEmitter Class</H1>

      <P>
        The following describes the properties and methods of the
        <SS>EventEmitter</SS> class. The <SS>EventEmitter</SS> class 
        is a base class for creating event-driven applications. It works 
        by managing the following event object during each event loop. 
      </P>

      <Code>{examples[0]}</Code>

      {/*------------------------------------------------------------*/}

      <a id="after"></a>
      <H2>after</H2>

      <section>
        <P>
          Sets a hook function that will be called after each event 
          handler is called. This is useful for analytical purposes.
        </P>

        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="before"></a>
      <H2>before</H2>

      <section>
        <P>
          Sets a hook function that will be called before each event 
          handler is called. This is useful for analytical purposes.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          The callback takes in an <C>Event</C> argument same as 
          the <C>after</C> method.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="event"></a>
      <H2>event</H2>

      <section>
        <P>
          Returns the event object of the current event being emitted.
          You can only really access this object in an event handler or 
          one of the event hooks.
        </P>

        <Code>{examples[3]}</Code>
        
        <Warn>
          Event objects are short lived. Meaning they only exist during
          the event loop. If you need to store them, you should copy
          them to a new object.
        </Warn>
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

        <Code>{examples[4]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="clear"></a>
      <H2>{'clear()'}</H2>

      <section>
        <P>
          Removes an event and all its actions from the <C>listeners</C>.
        </P>

        <H4>Usage</H4>

        <Code>{'clear(event: string): EventEmitter'}</Code>

        <H4>Example</H4>

        <Code>{examples[5]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="emit"></a>
      <H2>{'emit()'}</H2>

      <section>
        <P>
          Calls all the callbacks of the given event passing the given 
          arguments.
        </P>

        <H4>Usage</H4>

        <Code>{'emit(event: string, ...args: unknown[]): Status'}</Code>

        <H4>Example</H4>

        <Code>{examples[6]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="match"></a>
      <H2>{'match()'}</H2>

      <section>
        <P>
          Compares the given event with the event in the <C>listeners</C>. 
          Returns a <C>{'Map'}</C> of all possible event matches.
        </P>

        <H4>Usage</H4>

        <Code>{'match(event: string): Map<String, Event>'}</Code>

        <H4>Example</H4>

        <Code>{examples[7]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="on"></a>
      <H2>{'on()'}</H2>

      <section>
        <P>
          Adds an action callback to the given event listener.
        </P>

        <H4>Usage</H4>

        <Code>{'on(event: string|RegExp, action: Function, priority = 0): EventEmitter'}</Code>

        <H4>Example</H4>

        <Code>{examples[8]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="tasks"></a>
      <H2>{'tasks()'}</H2>

      <section>
        <P>
          Sorts all the action callbacks by priority and returns a task queue.
        </P>

        <H4>Usage</H4>

        <Code>{'tasks(event: string): TaskQueue'}</Code>

        <H4>Example</H4>

        <Code>{examples[9]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="unbind"></a>
      <H2>{'unbind()'}</H2>

      <section>
        <P>
          Removes an action callback from the given event listener.
        </P>

        <H4>Usage</H4>

        <Code>{'unbind(event: string, action: Function): EventEmitter'}</Code>

        <H4>Example</H4>

        <Code>{examples[10]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use"></a>
      <H2>{'use()'}</H2>

      <section>
        <P>
          Allows events from other emitters to apply here.
        </P>

        <H4>Usage</H4>

        <Code>{'use(emitter: EventEmitter): EventEmitter'}</Code>

        <H4>Example</H4>

        <Code>{examples[11]}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Configuration', 
          href: '/docs/references/configuration' 
        }}
        next={{ 
          text: 'Exception Class', 
          href: '/docs/references/exception-class' 
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