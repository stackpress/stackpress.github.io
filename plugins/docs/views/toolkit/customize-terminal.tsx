//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, B, P, C, SS } from '../../components/index.js';
import { Nav, Code, Note, Layout } from '../../components/index.js';

export const examples = [
//0-------------------------------------------------------------------//
`import type { Server } from 'stackpress/server';
import { terminalControls } from 'stackpress/terminal';

export default function plugin(server: Server) {
  server.on('listen', (req, res, ctx) => {
    server.on('hello-age', (req, res, ctx) => {
      //try to get the label from the config
      const label = ctx.config.path('cli.label', '[EXAMPLE]');
      //setup the terminal controls
      const control = terminalControls(label);
      //get the name from the cli args
      const name = req.data.path('name', 'guest');
      //ask for the age
      const age = await control.input('Age?', '0');
      //output
      control.info(\`Hello \${name}, you are \${age} years old\`);
    });
  })
}`,
//1-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Customize Terminal - Stackpress Documentation');
  const description = _(
    'Stackpress command line interface is powered by events, allowing '
    + 'you to create your own commands and customize the terminal output.'
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

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Customize Terminal</H1>

      <P>
        <SS>Stackpress</SS> command line interface is powered by events, 
        allowing you to create your own commands and customize the
        terminal output. This is useful for creating custom commands
        that can be used in your own applications.
      </P>

      <Code>{examples[0]}</Code>

      <Note>
        Make sure to add the plugin to the <C>plugins</C> list in 
        the <C>package.json</C> file.
      </Note>

      <P>
        In Terminal, run 
        <B>npx stackpress config/develop hello-age --name John</B> to 
        see your command execute.
      </P>
      
      <Nav
        prev={{ 
          text: 'Setup API', 
          href: '/docs/toolkit/setup-api' 
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
    >
      <Body />
    </Layout>
  );
}