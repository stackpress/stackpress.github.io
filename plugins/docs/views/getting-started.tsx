//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useState } from 'react';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H3, P, C, Nav } from '../components/index.js';
import Code from '../components/Code.js';
import Layout from '../components/Layout.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Getting Started');
  const description = _(
    'describe'
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
        <a className="theme-tx0 block" href="#system-requirements">
          {_('1. System Requirements')}
        </a>
        <a className="theme-tx0 block" href="#manual-installation">
          {_('2. Manual Installation')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  const [ install, setInstall ] = useState('npm');
  return (
    <main className="px-h-100-0 overflow-auto px-p-10">
      <H1>Getting Started</H1>
      <P>
        The following is a guide to get you started with Stackpress.
      </P>
      
      <a id="system-requirements"></a>
      <H2>1. System Requirements</H2>

      <P>
        Before you begin, make sure your system meets the following 
        requirements.
      </P>

      <ul className="px-lh-30 px-px-20">
        <li>• Node.js 22</li>
        <li>• macOS, Windows (including WSL), or Linux.</li>
      </ul>

      <a id="manual-installation"></a>
      <H2>2. Manual Installation</H2>

      <P>
        To manually create a new Stackpress project, install the 
        following packages. These are needed for development, the build 
        process and live server.
      </P>

      <div className="rounded-lg px-mx-10">
        <div className="theme-bg-bg3 flex items-center">
          <div 
            className={`px-py-10 px-px-30 ${install === 'npm' ? 'theme-bg-bg1' : 'theme-bg-bg2'}`}
            onClick={() => setInstall('npm')}
          >
            <i className="px-fs-20 fab fa-fw fa-npm" />
          </div>
          <div 
            className={`px-py-10 px-px-30 ${install === 'yarn' ? 'theme-bg-bg1' : 'theme-bg-bg2'}`}
            onClick={() => setInstall('yarn')}
          >
            <i className="px-fs-20 fab fa-fw fa-yarn" />
          </div>
        </div>
        <Code copy language="bash" className={`theme-bg-bg1 ${install === 'npm' ? '' : 'hidden'}`}>{
          'npm -i stackpress frui react react-dom'
        }</Code>
        <Code copy language="bash" className={`theme-bg-bg1 ${install === 'yarn' ? '' : 'hidden'}`}>{
          'yarn add stackpress frui react react-dom'
        }</Code>
      </div>

      <P>
        Next install the following development packages. These are 
        needed for development and the build process.
      </P>

      <div className="rounded-lg px-mx-10 px-mb-20">
        <div className="theme-bg-bg3 flex items-center">
          <div 
            className={`px-py-10 px-px-30 ${install === 'npm' ? 'theme-bg-bg1' : 'theme-bg-bg2'}`}
            onClick={() => setInstall('npm')}
          >
            <i className="px-fs-20 fab fa-fw fa-npm" />
          </div>
          <div 
            className={`px-py-10 px-px-30 ${install === 'yarn' ? 'theme-bg-bg1' : 'theme-bg-bg2'}`}
            onClick={() => setInstall('yarn')}
          >
            <i className="px-fs-20 fab fa-fw fa-yarn" />
          </div>
        </div>
        <Code copy language="bash" className={`theme-bg-bg1 ${install === 'npm' ? '' : 'hidden'}`}>{
          'npm -i -D @types/node @types/react @types/react-dom typescript tsx @stackpress/idea-transformer fast-glob prettier ts-morph @vitejs/plugin-react unocss vite'
        }</Code>
        <Code copy language="bash" className={`theme-bg-bg1 ${install === 'yarn' ? '' : 'hidden'}`}>{
          'yarn add --dev @types/node @types/react @types/react-dom typescript tsx @stackpress/idea-transformer fast-glob prettier ts-morph @vitejs/plugin-react unocss vite'
        }</Code>
      </div>

      <P>
        Currently, the stable packages and versions that are recommended 
        to use include the following.
      </P>

      <Code copy language="javascript" className="bg-black text-white px-mx-10 px-mb-20">{
        JSON.stringify({
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
            "unocss": "66.0.0",
            "vite": "6.3.2"
          }
        }, null, 2)
      }</Code>

      <H3>2.1. Create Typescript Configuration</H3>

      <P>
        In your project root, create a new file called
        <C>tsconfig.json</C> with the following code. 
        This file will configure your project to use the latest Ecmascript 
        Module Standard.
      </P>

      <Code copy language="javascript" className="bg-black text-white px-mx-10 px-mb-20">{
        JSON.stringify({
          "extends": "stackpress/tsconfig/esm",
          "compilerOptions": {
            "module": "nodenext",
            "moduleResolution": "nodenext",
          },
          "include": [ 
            "index.ts"
          ],
          "exclude": [ "node_modules" ]
        }, null, 2)
      }</Code>

      <H3>2.2. Create Entry File</H3>

      <P>
        In your project root, create a new file called
        <C>index.ts</C> with the following code. This 
        file will be the entry point for your application, for now.
      </P>

      <Code copy language="javascript" className="bg-black text-white px-mx-10 px-mb-20">{
        examples[0]
      }</Code>

      <H3>2.3. Run the Server</H3>

      <ol className="px-px-10 px-lh-30 px-pb-20">
        <li>2.3.1. In Terminal, run <C>npx tsx index.ts</C></li>
        <li>2.3.2. On your browser, visit <C>http://localhost:3000?name=John</C></li>
      </ol>

      <P>
        This is enough to explore the Stackpress documentation, but to 
        learn how to maximize the framework it's recommended to peruse 
        the tutorials.
      </P>
      
      <Nav
        prev={{ text: 'Introduction', href: '/docs/introduction' }}
        next={{ text: 'Tutorial', href: '/docs/tutorial' }}
      />
    </main>
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

const examples = [
`
//index.ts
import { server } from 'stackpress/http'

const app = server()

app.get('/', (req, res) => {
  const name = req.data.path('name', 'guest')
  res.setBody('text/plain', \`Hello \${name}\`)
})

app.create().listen(3000, () => {
  console.log('Server is running on port 3000')
})
`.trim()
];