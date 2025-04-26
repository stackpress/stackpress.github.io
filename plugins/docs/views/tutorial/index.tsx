//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, P, H, S, SS, Nav } from '../../components/index.js';
import { Editor, Layout } from '../../components/index.js';

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
        This tutorial will guide you through the process of setting up 
        and using and maximizing the framework ideally for your own 
        applications. The tutorial is divided into several sections, 
        each covering a different aspect of the framework. You can 
        follow the tutorial in order, or you can jump to a specific 
        section if you are already familiar with some of the concepts. 
        The tutorial is designed to be interactive, so you can follow 
        along with the examples and try them out for yourself. You
        will also find links to additional resources and documentation
        throughout the tutorial, so you can learn more about specific 
        topics if you are interested. By the end of the tutorial, you 
        will have a solid understanding of the <S>Stackpress</S> framework 
        and how to use it to build your own applications. 
      </P>

      <P>
        Before we begin, make sure 
        your <H>package.json</H> and <H>tsconfig.json</H> looks 
        like the following.
      </P>

      <Editor 
        title="PROJECT"
        files={checkpointSystem}
        value="package.json"
        className="px-h-400 px-fs-13"
        leftClassName="px-w-140"
        topClassName="px-l-140"
        mainClassName="px-l-140"
      />

      <P>
        Setting your project like this, sets your project to a 
        strict <SS>EcmaScript Module</SS> standard and provisions 
        packages that will be used in later tutorials. The next section 
        will cover setting up your project using a <S>plugin architecture</S>.
      </P>

      <Nav
        prev={{ text: 'Getting Started', href: '/docs/getting-started' }}
        next={{ text: '1. Plugin Architecture', href: '/docs/tutorial/plugin-architecture' }}
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

const checkpointContent = {
//--------------------------------------------------------------------//
'package.json': `
{
  "type": "module",
  "private": true,
  "dependencies": {
    "frui": "0.1.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stackpress": "0.2.10"
  },
  "devDependencies": {
    "@stackpress/idea-transformer": "0.5.15",
    "@types/node": "22.14.1",
    "@types/react": "19.1.2",
    "@types/react-dom": "19.1.2",
    "@vitejs/plugin-react": "4.4.1",
    "fast-glob": "3.3.3",
    "prettier": "3.5.3",
    "ts-mocha": "11.1.0",
    "ts-morph": "25.0.1",
    "ts-node": "10.9.2",
    "tsx": "4.19.3",
    "typescript": "5.8.3",
    "vite": "6.3.2"
  }
}
`.trim(),
//--------------------------------------------------------------------//
'tsconfig.json': `
{
  "extends": "stackpress/tsconfig/esm",
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext"
  },
  "include": [ 
    "config/**/*.ts", 
    "plugins/**/*.ts", 
    "plugins/**/*.tsx"
  ],
  "exclude": [ "node_modules" ]
}
`.trim()
//--------------------------------------------------------------------//
};

const checkpointSystem: (File | Folder)[] = [
  {
    type: 'file',
    id: 'package.json',
    name: 'package.json',
    level: 0,
    content: checkpointContent['package.json']
  },
  {
    type: 'file',
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    level: 0,
    content: checkpointContent['tsconfig.json']
  }
];