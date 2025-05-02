//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, C, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import { flash } from 'stackpress/view/client';

export function Body() {
  return (
    <button onClick={() => {
      flash('info', 'Welcome to Stackpress');
      window.location.reload();
    }}>
  )
}`,
//1-------------------------------------------------------------------//
`import { notify } from 'stackpress/view/client';

export function Body() {
  return (
    <button onClick={() => notify('info', 'Welcome to Stackpress')}>
      Notify
    </button>
  )
}`,
//2-------------------------------------------------------------------//
`server.get('/foobar', function Foobar(_req, res) {
  res.data.set(name, 'guest')
}`,
//3-------------------------------------------------------------------//
`import { useConfig } from 'stackpress/view/client'

export function Body() {
  const config = useConfig()
  return (
    <div>Hello {config.name}</div>
  )
}`,
//4-------------------------------------------------------------------//
`import { useConfirm } from 'stackpress/view/client'

export function Body() {
  const { confirm } = useConfirm({
    label: 'Go time?',
    message: (<span>Are you sure you want to Go?</span>),
    action: () => alert('Gogogo!')
  });
  return (
    <button onClick={() => confirm()}>Confirm</button>
  )
}`,
//5-------------------------------------------------------------------//
`import { useLanguage } from 'stackpress/view/client'

export function Body() {
  const { _ } = useLanguage();
  const name = 'guest';
  return (
    <h1>{_('Welcome %s to Stackpress', name)}</h1>
  )
}`,
//6-------------------------------------------------------------------//
`import { useModal } from 'stackpress/view/client'

export function Body() {
  const modal = useModal();
  modal.title('Modal Title');
  modal.body(<span>Go Time?</span>);
  return (
    <button onClick={() => open(true)}>Modal</button>
  )
}`,
//7-------------------------------------------------------------------//
`import { useRequest } from 'stackpress/view/client'

export function Body() {
  const { headers, url, session, method, mime, data } = useRequest()
  //render...
}`,
//8-------------------------------------------------------------------//
`import { useResponse } from 'stackpress/view/client'

export function Body() {
  const { code, status, error, errors, results, total } = useResponse()
  //render...
}`,
//9-------------------------------------------------------------------//
`import { useServer } from 'stackpress/view/client'

export function Body() {
  const { config, request, response, session } = useServer()
  //render...
}`,
//10------------------------------------------------------------------//
`import { useSession } from 'stackpress/view/client'

export function Body() {
  const { id, image, name, role } = useSession()
  //render...
}`,
//11------------------------------------------------------------------//
`import { useTheme } from 'stackpress/view/client'

export function Body() {
  const { theme, toggle } = useTheme();
  return (
    <div className={theme}>
      <button onClick={() => toggle()}>
        {theme}
      </button>
    </div>
  )
}`,
//12------------------------------------------------------------------//
`import { ModalProvider } from 'stackpress/view/client'

export default function Page() {
  return (
    <ModalProvider>
      <Body />
    </ModalProvider>
  )
}`,
//13------------------------------------------------------------------//
`import { NotifyProvider } from 'stackpress/view/client'

export default function Page() {
  const config = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  return (
    <NotifyProvider config={config}>
      <Body />
    </NotifyProvider>
  )
}`,
//14------------------------------------------------------------------//
`import type { ServerProviderProps } from 'stackpress/view/client'
import { ServerProvider } from 'stackpress/view/client'

export default function Page(props: ServerProviderProps) {
  const { 
    data,
    session,
    request,
    response
  } = props || {};
  return (
    <ServerProvider
      data={data}
      session={session}
      request={request}
      response={response}
    >
      <Body />
    </ServerProvider>
  )
}`,
//15------------------------------------------------------------------//
`import type { ServerPageProps } from 'stackpress/view/client'
import { StackpressProvider } from 'stackpress/view/client'

export default function Page(props: ServerPageProps) {
  const { data, session, request, response } = props;
  return (
    <StackpressProvider 
      data={data}
      session={session}
      request={request}
      response={response}
    >
      <Body />
      <NotifyContainer />
    </StackpressProvider>
  )
}`,
//16------------------------------------------------------------------//
`import { ThemeProvider } from 'stackpress/view/client'

export default function Page() {
  return (
    <ThemeProvider theme="dark">
      <Body />
    </ThemeProvider>
  )
}`,
//17------------------------------------------------------------------//
`import { Translate } from 'stackpress/view/client';

export function Body() {
  const name = 'guest';
  return (
    <div>
      <Translate>Hello <span>{name}</span></Translate>
    </div>
  )
}`,
//18------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('React API - References - Stackpress Documentation');
  const description = _(
    'The React API is a set of hooks and components that allow you to '
    + 'interact with the server and the Stackpress toolkit.'
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
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#flash">
          {_('flash()')}
        </a>
        <a className="theme-tx0 block" href="#notify">
          {_('notify()')}
        </a>
      </nav>
      
      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Hooks')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#use-config">
          {_('useConfig()')}
        </a>
        <a className="theme-tx0 block" href="#use-confirm">
          {_('useConfirm()')}
        </a>
        <a className="theme-tx0 block" href="#use-language">
          {_('useLanguage()')}
        </a>
        <a className="theme-tx0 block" href="#use-modal">
          {_('useModal()')}
        </a>
        <a className="theme-tx0 block" href="#use-request">
          {_('useRequest()')}
        </a>
        <a className="theme-tx0 block" href="#use-response">
          {_('useResponse()')}
        </a>
        <a className="theme-tx0 block" href="#use-server">
          {_('useServer()')}
        </a>
        <a className="theme-tx0 block" href="#use-session">
          {_('useSession()')}
        </a>
        <a className="theme-tx0 block" href="#use-theme">
          {_('useTheme()')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Components')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#modal-provider">
          {_('ModalProvider')}
        </a>
        <a className="theme-tx0 block" href="#notify-provider">
          {_('NotifyProvider')}
        </a>
        <a className="theme-tx0 block" href="#server-provider">
          {_('ServerProvider')}
        </a>
        <a className="theme-tx0 block" href="#stackpress-provider">
          {_('StackpressProvider')}
        </a>
        <a className="theme-tx0 block" href="#theme-provider">
          {_('ThemeProvider')}
        </a>
        <a className="theme-tx0 block" href="#translate">
          {_('Translate')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>React API</H1>

      <P>
        The React API is a set of hooks and components that allow you to 
        interact with the server and the <SS>Stackpress</SS> toolkit. 
      </P>

      {/*------------------------------------------------------------*/}

      <a id="flash"></a>
      <H2>flash()</H2>

      <section>
        <P>
          A flash message is a temporary message that is displayed to 
          the user after the next page load. It is typically used to 
          inform the user of a successful action or to provide feedback 
          on an operation.
        </P>

        <Code>{examples[0]}</Code>
        
        <P>
          In the example above, once the button is clicked, a flash 
          message will be set and shown on the next page load.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="notify"></a>
      <H2>notify()</H2>

      <section>
        <P>
          Shows a notification message to the user. This requires 
          the <C>{'<NotifyProvider />'}</C> component to be wrapped around
          the app.
        </P>

        <Code>{examples[1]}</Code>
        
        <P>
          The <C>notify()</C> method takes a type and a message as 
          arguments. The type can be one of the following.
        </P>

        <ul className="px-lh-30 px-px-20 px-pb-20">
          <li>• <C>info</C></li>
          <li>• <C>success</C></li>
          <li>• <C>warning</C></li>
          <li>• <C>error</C></li>
        </ul>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-config"></a>
      <H2>useConfig()</H2>

      <section>
        <P>
          Returns the <C>props.data</C> from the server props.
        </P>

        <Code>{examples[3]}</Code>
        
        <P>
          You can set the data in the server props in a route like this.
        </P>

        <Code>{examples[2]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-confirm"></a>
      <H2>useConfirm()</H2>

      <section>
        <P>
          Used to show a confirmation modal before executing an action.
        </P>

        <Code>{examples[4]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-language"></a>
      <H2>useLanguage()</H2>

      <section>
        <P>
          Used to tag text for translation.
        </P>

        <Code>{examples[5]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-modal"></a>
      <H2>useModal()</H2>

      <section>
        <P>
          Used to show a modal. This requires the <C>{'<ModalProvider />'}</C> 
          component to be wrapped around the app.
        </P>

        <Code>{examples[6]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-request"></a>
      <H2>useRequest()</H2>

      <section>
        <P>
          Returns the <C>props.request</C> from the server props.
        </P>

        <Code>{examples[7]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-response"></a>
      <H2>useResponse()</H2>

      <section>
        <P>
          Returns the <C>props.response</C> from the server props.
        </P>

        <Code>{examples[8]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-server"></a>
      <H2>useServer()</H2>

      <section>
        <P>
          Returns the <C>props.data</C>, <C>props.request</C>, 
          <C>props.response</C>, and <C>props.session</C> from the 
          server props.
        </P>

        <Code>{examples[9]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-session"></a>
      <H2>useSession()</H2>

      <section>
        <P>
          Returns the <C>props.session</C> from the server props.
        </P>

        <Code>{examples[10]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use-theme"></a>
      <H2>useTheme()</H2>

      <section>
        <P>
          Used to toggle the theme. This requires 
          the <C>{'<ThemeProvider />'}</C> component to be wrapped 
          around the app.
        </P>

        <Code>{examples[11]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="modal-provider"></a>
      <H2>ModalProvider</H2>

      <section>
        <P>
          Manages the modal state and provides the <C>useModal()</C>
          hook to the app.
        </P>

        <Code>{examples[12]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="notify-provider"></a>
      <H2>NotifyProvider</H2>

      <section>
        <P>
          Manages the notification state and provides the
          <C>notify()</C> and <C>flash()</C> methods to the app.
        </P>

        <Code>{examples[13]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="server-provider"></a>
      <H2>ServerProvider</H2>

      <section>
        <P>
          Manages the server state and provides 
          the <C>useConfig</C>, <C>useRequest</C>, <C>useResponse</C>, <C>useSession</C>, 
          and <C>useServer()</C> hooks to the app.
        </P>

        <Code>{examples[14]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="stackpress-provider"></a>
      <H2>StackpressProvider</H2>

      <section>
        <P>
          A wrapper for the <C>ModalProvider</C>, <C>NotifyProvider</C>, <C>ServerProvider</C>, 
          and <C>ThemeProvider</C> components.
        </P>

        <Code>{examples[15]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="theme-provider"></a>
      <H2>ThemeProvider</H2>

      <section>
        <P>
          Manages the theme state and provides the <C>useTheme()</C>
          hook to the app.
        </P>

        <Code>{examples[16]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="translate"></a>
      <H2>Translate</H2>

      <section>
        <P>
          Inline component used to tag text for translation.
        </P>

        <Code>{examples[17]}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Query Builder', 
          href: '/docs/references/query-builder' 
        }}
        next={{ 
          text: 'Request Class', 
          href: '/docs/references/request-class' 
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