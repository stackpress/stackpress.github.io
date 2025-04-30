//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, H2, P, C } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
``,
//1-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Query Builder - References - Stackpress Documentation');
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

export function Right() {
  const { _ } = useLanguage();
  return (
    <menu className="px-m-0 px-px-10 px-py-20 px-h-100-40 overflow-auto">
      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-0 px-pb-10 uppercase">
        {_('On this page')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#header2">
          {_('1. Header2')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Query Builder</H1>

      <P>
        desc
      </P>

      <a id="header2"></a>
      <H2>1. Header2</H2>

      <section>
        <P>
          desc
        </P>

        <Code>{examples[0]}</Code>

        <P>
          desc
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead wrap3 className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left">
                <C>{''}</C>
              </Tcol>
              <Tcol className="text-left">
                desc
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{''}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                desc
              </Tcol>
            </Trow>
          </Table>
        </div>

        <P>
          desc
        </P>
      </section>

      <Nav
        prev={{ 
          text: 'Exception Class', 
          href: '/docs/references/exception-class' 
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