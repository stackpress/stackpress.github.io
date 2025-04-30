//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, H } from '../../../components/index.js';
import { Nav, Code, Layout } from '../../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Delete Builder - Query Builder - References - Stackpress Documentation');
  const description = _(
    'Query builder for the SQL DELETE statement.'
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
        {_('Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#engine">
          {_('engine')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#build">
          {_('build()')}
        </a>
        <a className="theme-tx0 block" href="#query">
          {_('query()')}
        </a>
        <a className="theme-tx0 block" href="#then">
          {_('then()')}
        </a>
        <a className="theme-tx0 block" href="#where">
          {_('where()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Delete Query Builder</H1>

      <P>
        Query builder for the SQL <H>DELETE</H> statement.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="engine"></a>
      <H2>engine</H2>

      <section>
        <P>
          Returns the database engine used by this query builder. This 
          is used to execute the query directly from this builder. You
          can also set this property manually.
        </P>
        
        <Code>{`db.delete.engine //same as db`}</Code>
        <Code>{`db.delete.engine = db`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="build"></a>
      <H2>build()</H2>

      <section>
        <P>
          Converts the class data to object.
        </P>
        
        <Code>{`const { table, filters } = db.delete('user').build()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="query"></a>
      <H2>query()</H2>

      <section>
        <P>
          Convert the builder to a query object.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`query(dialect?: Dialect): Query`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const queries = db.delete('user').query()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="then"></a>
      <H2>then</H2>

      <section>
        <P>
          Makes class awaitable. Should get the query and values and 
          call the action.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`then(resolve: Resolve<R[]>, reject: Reject = () => {})`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`await builder`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="where"></a>
      <H2>where</H2>

      <section>
        <P>
          <H>WHERE</H> clause.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`where(query: string, values: FlatValue[] = []): DeleteBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.delete('user').where('id = ?', [ '4' ])`}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Create Builder', 
          href: '/docs/references/query-builder/create-builder' 
        }}
        next={{ 
          text: 'Insert Builder', 
          href: '/docs/references/query-builder/insert-builder' 
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