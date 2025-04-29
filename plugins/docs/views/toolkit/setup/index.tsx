//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import Button from 'frui/form/Button';
//docs
import { H1, P, A, SS, Nav } from '../../../components/index.js';
import { Layout } from '../../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  //i18n
  const { _ } = useLanguage();
  //variables
  const title = _('Toolkit Setup - Stackpress Tutorial');
  const description = _(
    'This tutorial will guide you through the process of setting up '
    + 'the Stackpress toolkit.'
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
      <H1>Toolkit Setup</H1>
      <P>
        This tutorial will guide you through the process of setting up 
        the <SS>Stackpress</SS> toolkit. Its specific objectives are the 
        following.
      </P>

      <ul className="px-lh-30 px-px-20">
        <li>
          • Building on top of the <SS>Plugin Architecture</SS> described 
          in the <A href="/docs/tutorial">main tutorial</A>.
        </li>
        <li>
          • Setting up the <SS>Stackpress</SS> client engine.
        </li>
        <li>
          • Setting up an SQL database engine.
        </li>
        <li>
          • Setting up the <SS>Stackpress</SS> context provider.
        </li>
      </ul>

      <P>
        By the end of this tutorial, the entire toolkit including 
        database, authentication, sessions, roles &amp; permissions, 
        i18n, API, and more will be available when building web 
        applications. You can use the following blocks to skip around 
        the tutorial.
      </P>
      
      <div className="flex flex-wrap">
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              1. Project Setup
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              Setting up the project structure and node packages.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/toolkit/setup/1-project-setup"
            >
              Read On
            </Button>
          </div>
        </div>
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              2. Client Engine
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              Setting up the client engine.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/toolkit/setup/2-client-engine"
            >
              Read On
            </Button>
          </div>
        </div>
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              3. Database Engine
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              Setting up an SQL database engine.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/toolkit/setup/3-database-engine"
            >
              Read On
            </Button>
          </div>
        </div>
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              4. Context Provider
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              Setting up the <SS>React</SS> context provider.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/tutorial/4-context-provider"
            >
              Read On
            </Button>
          </div>
        </div>
      </div>

      <Nav
        next={{ 
          text: '1. Project Setup', 
          href: '/docs/toolkit/setup/1-project-setup' 
        }}
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