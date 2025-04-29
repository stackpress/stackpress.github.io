//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, A, P, Nav } from '../../../components/index.js';
import { Note, Layout } from '../../../components/index.js';
import { Checkpoint as LastCheckpoint } from '../../tutorial/5-view-engine.js';

export const Checkpoint = LastCheckpoint;

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  //i18n
  const { _ } = useLanguage();
  //variables
  const title = _('1. Project Setup - Tookit - Stackpress Tutorial');
  const description = _(
    'Setting up the project for the Stackpress toolkit.'
  );
  //render
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
  //render
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>1. Project Setup</H1>

      <P>
        Let's make sure your project looks like the setup 
        from the <A href="/docs/tutorial">main tutorial</A>.
      </P>

      <LastCheckpoint />

      <Note>
        Stackpress remains unopinionated and the plugin architecture is 
        just one of many ways on how one can structure a project.
      </Note>

      <P>
        The following sections will build on top of this setup to 
        prevent re-explaining the core concepts.
      </P>

      <Nav
        prev={{ text: 'Toolkit Setup', href: '/docs/toolkit/setup' }}
        next={{ text: '2. Client Engine', href: '/docs/toolkit/setup/2-client-engine' }}
      />
    </article>
  );
}

export default function Page(props: ServerPageProps<ServerConfigProps>) {
  const { data, session, request, response } = props;
  //render
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