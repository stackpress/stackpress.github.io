//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, C, E, H, S, SS } from '../../components/index.js';
import { Nav, Warn, Note, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import type { Config } from 'stackpress'
import { server } from 'stackpress/http'

const config: Config = {
  server: { mode: 'development' }
};

export default async function bootstrap() {
  const app = server();
  //set config
  app.config.set(config);
  //load plugins
  await app.bootstrap();
  //configure plugins
  await app.resolve('config');
  //add events
  await app.resolve('listen');
  //add routes
  await app.resolve('route');
  //return the app
  return app;
}`,
//1-------------------------------------------------------------------//
`//...
import type { Server } from 'stackpress/server';
import toolkit from 'stackpress/plugin'; 
import appkit from './app/plugin.js'; 

//...

export default async function bootstrap() {
  const app = server() as Server;
  //load plugins (manually)
  toolkit(app);
  appkit(app);
  //...
  return app;
}`,
//2-------------------------------------------------------------------//
`//...

import admin from 'stackpress/admin/plugin'; 
import api from 'stackpress/api/plugin'; 
import client from 'stackpress/client/plugin'; 
import email from 'stackpress/email/plugin'; 
import language from 'stackpress/language/plugin'; 
import session from 'stackpress/session/plugin'; 
import sql from 'stackpress/sql/plugin'; 
import terminal from 'stackpress/terminal/plugin'; 
import view from 'stackpress/view/plugin'; 

//...

export default async function bootstrap() {
  const app = server() as Server;
  //load plugins (manually)
  admin(app);
  api(app);
  client(app);
  email(app);
  language(app);
  session(app);
  sql(app);
  terminal(app);
  view(app);
  //...
  return app;
}`,
//3-------------------------------------------------------------------//
`{
  //...
  "plugins": [
    "stackpress/admin/plugin",
    "stackpress/api/plugin",
    "stackpress/client/plugin",
    "stackpress/email/plugin",
    "stackpress/language/plugin",
    "stackpress/session/plugin",
    "stackpress/sql/plugin",
    "stackpress/terminal/plugin",
    "stackpress/view/plugin"
  ],
  //...
}`,
//4-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Customize Bootstrap - Develop - Stackpress Documentation');
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

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Customize Bootstrap</H1>

      <P>
        Before a <SS>Stackpress</SS> application starts, it runs a 
        bootstrap process to load the configuration and plugins. 
      </P>

      <Warn>
        This page exists in case you want to customize the bootstrap
        process, but in most cases <S>you don't need to customize this 
        process</S>.
      </Warn>

      <P>
        If you want to customize the bootstrap process, you 
        can do so by creating a bootstrap file and passing it to the
        <C>stackpress</C> command line interface. The following is a 
        template for the default bootstrap process. You can use this as 
        a basis for your own bootstrap process.
      </P>

      <Code>{examples[0]}</Code>

      <P>
        In the default bootstrap logic, the following steps are 
        performed.
      </P>

      <ol className="px-lh-30 px-px-20">
        <li className="px-pb-20">
          1. <C>app.config.set(config)</C> - Set the configuration.
        </li>
        <li className="px-pb-20">
          2. <C>app.bootstrap()</C> - Load all the 
          plugins <E>(from package.json)</E>.
        </li>
        <li className="px-pb-20">
          3. <C>app.resolve('config')</C> - Let the plugins configure 
          themselves.
        </li>
        <li className="px-pb-20">
          4. <C>await app.resolve('listen')</C> - Let the plugins add 
          events. 
        </li>
        <li className="px-pb-20">
          4. <C>await app.resolve('route')</C> - Let the plugins add 
          routes. 
        </li>
      </ol>

      <P>
        Finally you should return the app instance. This is needed by 
        the <SS>Stackpress</SS> CLI to conduct business.
      </P>

      <Note>
        Make sure you <C>export default</C> the bootstrap function.
      </Note>

      <P>
        To use your custom bootstrap file you can run the following
        command in the terminal.
      </P>

      <Code lang="bash">{'npx stackpress serve --b config/develop'}</Code>

      <a id="manual-loading"></a>
      <H2>Manual Loading</H2>

      <P>
        Autoloading plugins involves setting the <C>plugins</C> in the 
        project <H>package.json</H> file. When <C>app.boostrap()</C> is
        called, the plugins are loaded automatically. This is the
        default behavior of <SS>Stackpress</SS>.
      </P>

      <P>
        You can disable this feature by importing the plugins manually 
        like the following example.
      </P>

      <Code>{examples[1]}</Code>

      <P>
        In the above example, we are importing the <C>toolkit</C> and 
        <C>appkit</C> plugins manually. This is useful if you want to 
        load the plugins in a specific order or if you want to load 
        only some of the plugins. The <C>toolkit</C> is a bundled set 
        of all the <SS>Stackpress</SS> plugins. The following example
        shows how break down these plugins.
      </P>

      <Code>{examples[2]}</Code>

      <P>
        You can also breakdown the <SS>Stackpress</SS> plugins in the 
        project <H>package.json</H> file like the following example.
      </P>

      <Code>{examples[3]}</Code>

      <Nav
        prev={{ 
          text: 'Configure Project', 
          href: '/docs/develop/configure-project' 
        }}
        next={{ 
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
    >
      <Body />
    </Layout>
  );
}