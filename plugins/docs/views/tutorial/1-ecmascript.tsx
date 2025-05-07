//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import type { File, Folder } from '../../components/index.js';
import { H1, H2, P, H, E, S, SS, C } from '../../components/index.js';
import { Nav, Code, Editor, Layout } from '../../components/index.js';


const content = {
//--------------------------------------------------------------------//
'package.json': `
{
  "type": "module",
  "private": true,
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stackpress": "0.2.14"
  },
  "devDependencies": {
    "@stackpress/idea-transformer": "0.5.17",
    "@types/node": "22.14.1",
    "@types/react": "19.1.2",
    "@types/react-dom": "19.1.2",
    "@vitejs/plugin-react": "4.4.1",
    "fast-glob": "3.3.3",
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

const system: (File | Folder)[] = [
  {
    type: 'file',
    id: 'package.json',
    name: 'package.json',
    level: 0,
    content: content['package.json']
  },
  {
    type: 'file',
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    level: 0,
    content: content['tsconfig.json']
  }
];

export function Checkpoint() {
  //render
  return (
    <Editor 
      title="PROJECT"
      files={system}
      value="package.json"
      className="px-h-400 px-fs-13"
      leftClassName="px-w-140"
      topClassName="px-l-140"
      mainClassName="px-l-140"
    />
  );
}

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  //i18n
  const { _ } = useLanguage();
  //variables
  const title = _('1. EcmaScript - Stackpress Tutorial');
  const description = _(
    'Setting up the project using the ESM standard.'
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

export function Right() {
  //i18n
  const { _ } = useLanguage();
  //render
  return (
    <menu className="px-m-0 px-px-10 px-py-20 overflow-auto">
      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-0 px-pb-10 uppercase">
        {_('On this page')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx1 block" href="#configure-package">
          {_('1.1. Configure Package')}
        </a>
        <a className="theme-tx1 block" href="#configure-typescript">
          {_('1.2. Configure Typescript')}
        </a>
        <a className="theme-tx1 block" href="#checkpoint">
          {_('1.3. Check Point')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  //render
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>1. EcmaScript</H1>

      <section>
        <P>
          For years, Node.js has been on a on-going transition from 
          CommonJS <E>(CJS)</E> to EcmaScript Modules <E>(ESM)</E>. 
          While <SS>ESM</SS> has already been adopted by all major browsers, 
          there are still many <SS>NPM</SS> packages that are not fully 
          compatible with the standard. The following describes the limbo 
          caused by this "on-going transition".
        </P>

        <ul className="px-lh-30 px-px-20">
          <li>
            • CJS uses <C>require()</C> and <C>module.exports</C> while 
            ESM uses <C>import</C> and <C>export</C>. These are fundamentally 
            incompatible at the syntax level.
          </li>
          <li>
            • CJS is synchronous and ESM is asynchronous. Code that assumes 
            synchronous module loading can break under ESM.
          </li>
          <li>
            • It is not possible to import ESM modules into CJS. While 
            it is possible to import CJS modules into ESM, it's more of a 
            backwards compatible feature for now, not a long-term solution.
          </li>
          <li>
            • ESM has this wierd rule of adding the <C>.js</C> extension 
            to all imports that dont have a <H>package.json</H> export 
            rule. This gets even more confusing when developing 
            in <H>Typescript</H>.
          </li>
          <li>
            • ESM cannot import <C>.json</C> files.
          </li>
          <li>
            • Bundlers blur the line between CJS and ESM making it more 
            confusing to understand the differences and fully transition 
            to ESM.
          </li>
        </ul>

        <P>
          While <SS>Stackpress</SS> publishes in both ESM and CJS, it
          hasn't been an easy road marrying the two. The following 
          explains our findings while developing and testing the 
          framework.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li>
            • <SS>Stackpress</SS> distributables have both CJS and ESM, 
            because it is unclear which one works better depending on the 
            end use case.
          </li>
          <li>
            • You can setup your project as CJS, if your project is not 
            using the default <SS>Reactus</SS> view engine 
            because <SS>Reactus</SS> uses <SS>Vite</SS> to build the 
            server and client views that can be used on a production 
            environment. And, because <SS>Vite</SS> only generates ESM, 
            it's generally better to setup your project root as ESM.
          </li>
          <li>
            • Projects using <SS>Stackpress</SS> with the 
            latest <SS>Vercel</SS> needs to be strictly ESM.
          </li>
        </ul>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="configure-package"></a>
      <H2>1.1. Configure Package</H2>

      <section>
        <P>
          From the project root create or update 
          the <H>package.json</H> file with the following configuration.
        </P>

        <Code>{content['package.json']}</Code>

        <P>
          To make a project ESM, you need to set the <C>type</C>
          property to <C>"module"</C>. This tells Node.js to treat 
          all <H>.js</H> files in the project as ESM. 
          The <C>dependencies</C> provided in the example are the 
          minimal provisions needed by <SS>Stackpress</SS> to complete 
          this tutorial. 
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="configure-typescript"></a>
      <H2>1.2. Configure Typescript</H2>

      <section>
        <P>
          Next, from the project root create or update 
          the <H>tsconfig.json</H> file with the following configuration.
        </P>

        <Code>{content['tsconfig.json']}</Code>

        <P>
          <SS>Stackpress</SS> has a general ESM configuration 
          at <H>stackpress/tsconfig/esm</H>. Adding the 
          <C>nodenext</C> value emphasizes the use of ESM rules 
          in <SS>Typescript</SS>.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="checkpoint"></a>
      <H2>1.3. Check Point</H2>

      <section>
        <P>
          In case you got lost along the way, here is a checkpoint of what
          your project should look like.
        </P>

        <Checkpoint />

        <P>
          Setting your project like this, sets your project to a 
          strict <SS>ESM</SS> standard and provisions packages that will 
          be used in later tutorials. The next section will cover setting 
          up your project using a <S>plugin architecture</S>.
        </P>
      </section>

      <Nav
        prev={{ 
          text: 'Getting Started', 
          href: '/docs/getting-started' 
        }}
        next={{ 
          text: '2. Plugin Architecture', 
          href: '/docs/tutorial/2-plugin-architecture' 
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
      right={<Right />}
    >
      <Body />
    </Layout>
  );
}