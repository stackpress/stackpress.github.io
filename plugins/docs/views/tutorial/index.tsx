//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import Button from 'frui/form/Button';
//docs
import { H1, P, H, S, SS, Nav } from '../../components/index.js';
import { Layout } from '../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  //i18n
  const { _ } = useLanguage();
  //variables
  const title = _('Stackpress Tutorial');
  const description = _(
    'This tutorial will guide you through the process of setting up '
    + 'and using and maximizing the framework ideally for your own '
    + 'applications.'
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
      <H1>Tutorial</H1>
      <P>
        <SS>Stackpress</SS> is a vast library with built-in toolkits 
        and many features, making it difficult to explain in one go. 
        The purpose of this tutorial is to get a basic understanding 
        of the core framework and give ideas on how to structure 
        projects. Its specific objectives are the following.
      </P>

      <ul className="px-lh-30 px-px-20">
        <li>
          • Setting up the project to use 
          the <SS>EcmaScript Module</SS> standard.
        </li>
        <li>
          • Structuring the project around 
          a <S>plugin architecture</S> that defines folders for use as 
          a plugin.
        </li>
        <li>
          • Setting up an example plugin called <H>app</H> which 
          contains an example page controller and view.
        </li>
        <li>
          • Demonstrate how the view is rendered from the server side 
          router.
        </li>
        <li>
          • Demonstrate how props are passed to the view.
        </li>
        <li>
          • Configuring the view to enable a style engine.
        </li>
      </ul>
      
      <P>
        By the end of this tutorial, the end result is a pluggable 
        project structure that can be used to build a web application. 
        You can use the following blocks to skip around the tutorial.
      </P>

      <div className="flex flex-wrap">
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              1. EcmaScript
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              Setting up <SS>EcmaScript Module</SS> standard.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/tutorial/1-ecmascript"
            >
              Read On
            </Button>
          </div>
        </div>
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              2. Plugin Architecture
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              Creating the first example <H>app</H> plugin.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/tutorial/2-plugin-architecture"
            >
              Read On
            </Button>
          </div>
        </div>
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              3. Server Routes
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              Adding a page controller route.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/tutorial/3-server-routes"
            >
              Read On
            </Button>
          </div>
        </div>
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              4. Server Props
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              How server props are passed to the view.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/tutorial/4-server-props"
            >
              Read On
            </Button>
          </div>
        </div>
        <div className="basis-1/2 rmd-basis-full">
          <div className="theme-bc-bd1 px-p-10 border px-m-2">
            <h3 className="font-semibold">
              5. View Engine
            </h3>
            <p className="px-py-10 px-fs-13 px-lh-24">
              Configure and style engine.
            </p>
            <Button info 
              className="inline-block px-fs-12" 
              href="/docs/tutorial/5-view-engine"
            >
              Read On
            </Button>
          </div>
        </div>
      </div>

      <Nav
        prev={{ text: 'Getting Started', href: '/docs/getting-started' }}
        next={{ text: '1. EcmaScript', href: '/docs/tutorial/1-ecmascript' }}
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