//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'r22n';
//docs
import {
  Header1,
  Header2,
  Header3,
  Paragraph,
  Nav
} from '../../components/index.js';
import Layout from '../../components/Layout.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Status Map');
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
        <a className="theme-tx0 block" href="#item1">
          {_('item1')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <main className="px-h-100-0 overflow-auto">
      <Header1>Status Map</Header1>
      <Paragraph>
        describe
      </Paragraph>
      <a id="item1"></a>
      <Header2>Section</Header2>
      <Header3>Subsection</Header3>
      
      <Nav
        prev={{ text: 'prev', href: '/docs/' }}
        next={{ text: 'next', href: '/docs/' }}
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