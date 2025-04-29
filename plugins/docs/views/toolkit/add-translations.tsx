//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, H2, E, P, C, H } from '../../components/index.js';
import { Nav, Note, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`export const config: Config = {
  //...
  language: {
    //url flag (ie. ?locale) used to change the user's locale
    //this is also the name of the cookie used to store the locale
    key: 'locale',
    //default locale
    locale: 'en_US',
    //languages and translations
    languages: {}
  }
};`,
//1-------------------------------------------------------------------//
`export const config: Config = {
  //...
  language: {
    //url flag (ie. ?locale) used to change the user's locale
    //this is also the name of the cookie used to store the locale
    key: 'locale',
    //default locale
    locale: 'en_US',
    //languages and translations
    languages: {
      en_US: {
        label: 'EN',
        translations: {
          'Sign In': 'Signin',
          'Home Page': 'Home Page'
        }
      },
      th_TH: {
        label: 'TH',
        translations: {
          'Sign In': 'Signin',
          'Home Page': 'Home Pages'
        }
      }
    }
  }
};`,
//1-------------------------------------------------------------------//
`import type { LanguageConfig } from 'stackpress';

export default function plugin(server: Server) {
  //on listen, add language and translations to the template props
  server.on('listen', _ => {
    server.get('request', (_req, res, ctx) => {
      //get the language config
      const language = server.config.path<LanguageConfig>('language', {
        key: 'locale',
        locale: 'en_US',
        languages: {}
      });
      //add the language config to the template props
      res.data.set('language', { 
        key: language.key || 'locale',
        locale: language.locale || 'en_US',
        languages: language.languages || {}
      });
    });
  });
};`,
//2-------------------------------------------------------------------//
`//package.json
{
  //...
  plugins: [
    "plugins/i18n/plugin",
    //...
  ],
  //...
}`,
//3-------------------------------------------------------------------//
`//plugins/app/views/home.tsx
import { useLanguage, Translate } from 'stackpress/view/client';
//...
export function HomeBody() {
  //...
  //i18n
  const { _ } = useLanguage();
  //render
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">
        {_('Welcome %s to Stackpress', name)}
      </h1>
      <Translate>Hello <span>{name}</span></Translate>
      //...
    </div>
  )
}
//...`,
//4-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Add Translations - Stackpress Documentation');
  const description = _(
    'The following guide will go over setting up the translation '
    + 'system in your project.'
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
        <a className="theme-tx0 block" href="#language-config">
          {_('1. Language Config')}
        </a>
        <a className="theme-tx0 block" href="#i18n-plugin">
          {_('2. i18n Plugin')}
        </a>
        <a className="theme-tx0 block" href="#testing">
          {_('3. Testing')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Add Translations</H1>
      
      <P>
        Since audiences of your project can derive from across the globe,
        it is important to tag all the content with a translation provision
        to reduce any future technical debt. The following guide will go 
        over setting up the translation system in your project.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="language-config"></a>
      <H2>1. Language Config</H2>

      <section>
        <P>
          First let's update your configuration file using the following 
          language settings.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          The language config accept the following options.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead className="theme-bg-bg2 text-left">Option</Thead>
            <Thead noWrap className="theme-bg-bg2 text-left">Default</Thead>
            <Thead className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'key'}</C></Tcol>
              <Tcol noWrap className="text-left"><C>{'"locale"'}</C></Tcol>
              <Tcol className="text-left">
                URL flag <E>(ie. ?locale)</E> used to change the user's 
                locale this is also the name of the cookie used to store 
                the locale while visiting the application.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'locale'}</C></Tcol>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'"en_US"'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The default language used by the application.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'languages'}</C></Tcol>
              <Tcol noWrap className="text-left"><C>{'undefined'}</C></Tcol>
              <Tcol className="text-left">
                A map of possible languages and translations its 
                correlating translations.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <P>
          The following is an example set of languages and translations.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          Each language has the following required properties.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'label'}</C></Tcol>
              <Tcol className="text-left">
                The name of the language used by the frontend.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'translations'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                A key value of translations. 
              </Tcol>
            </Trow>
          </Table>
        </div>

        <Note>
          It's recommended to use english phrases as the key to make it 
          easier to map the translations.
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="i18n-plugin"></a>
      <H2>2. i18n Plugin</H2>

      <section>
        <P>
          Next create an <H>i18n</H> plugin file with the following code.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          What this will do is pass the language config to all view 
          templates on every <C>request</C>. The last thing to do is add
          this new i18n plugin to your <H>package.json</H> file like the 
          following example.
        </P>

        <Code>{examples[3]}</Code>

        <P>
          The above examples assumes your i18n plugin is located 
          in <C>plugins/i18n/plugin.ts</C>. Feel free to update 
          the <C>package.json</C> file to match your project structure.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="testing"></a>
      <H2>3. Testing</H2>

      <section>
        <P>
          In order to test the i18n plugin, we need to add a
          translation to the home page. The following example shows
          how to add a translation to the home page.
        </P>

        <Code>{examples[4]}</Code>

        <P>
          The above example uses the <C>useLanguage()</C> hook to get the 
          current language and the <C>_()</C> function to tag the string 
          for translating. Another way to tag strings is by around 
          a <C>Translate</C> component. In both examples, 
          the <C>name</C> variable will be applied to the overall phrase 
          after it is translated.
        </P>
      </section>
      
      <Nav
        prev={{ text: 'Toolkit Setup', href: '/docs/toolkit/setup' }}
        next={{ text: 'Setup Email', href: '/docs/toolkit/setup-email' }}
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