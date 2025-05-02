//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, C, E } from '../../../components/index.js';
import { Nav, Note, Code, Layout } from '../../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import { PGlite } from '@electric-sql/pglite'
import { connect } from 'stackpress/pglite' 
import client from 'stackpress-client'

const db = await connect(async () => new PGlite('/path/to/db'))
const actions = client.model.profile.actions(db, '[seed]')`,
//1-------------------------------------------------------------------//
`import type { Server, ClientPlugin } from 'stackpress'

export default function plugin(server: Server) {
  const client = server.plugin<ClientPlugin>('client')
  const actions = client.model.profile.actions
}`,
//2-------------------------------------------------------------------//
`await actions.batch([
  { name: 'John Doe' },
  { name: 'Jane Doe' }
])`,
//3-------------------------------------------------------------------//
`type SearchParams = {
  q?: string,
  columns?: string[],
  include?: string[],
  filter?: Record<string, string|number|boolean>,
  span?: Record<string, (string|number|null|undefined)[]>,
  sort?: Record<string, any>,
  skip?: number,
  take?: number,
  total?: boolean
};`
//4-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Client Actions - Client API - References - Stackpress Documentation');
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
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#batch">
          {_('batch()')}
        </a>
        <a className="theme-tx0 block" href="#create">
          {_('create()')}
        </a>
        <a className="theme-tx0 block" href="#detail">
          {_('detail()')}
        </a>
        <a className="theme-tx0 block" href="#get">
          {_('get()')}
        </a>
        <a className="theme-tx0 block" href="#remove">
          {_('remove()')}
        </a>
        <a className="theme-tx0 block" href="#restore">
          {_('restore()')}
        </a>
        <a className="theme-tx0 block" href="#search">
          {_('search()')}
        </a>
        <a className="theme-tx0 block" href="#update">
          {_('update()')}
        </a>
        <a className="theme-tx0 block" href="#upsert">
          {_('upsert()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Client Actions</H1>

      <P>
        Client actions allow you to work with the generated models 
        directly. Client events wrap around these action methods. You 
        can use the following way to manually access these methods.
      </P>

      <Code>{examples[0]}</Code>

      <Note><C>'stackpress-client'</C> depends on your configuration.</Note>

      <P>
        You can also access these action easier through a plugin like 
        the following.
      </P>

      <Code>{examples[1]}</Code>

      {/*------------------------------------------------------------*/}

      <a id="batch"></a>
      <H2>batch()</H2>

      <section>
        <P>
          Bulk insert or update records. This method is useful for
          importing functionality. It will use the upsert logic to 
          determine if the record already exists. If it does, it will
          update the record. If it does not, it will insert the record.
        </P>

        <Code>{examples[2]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="create"></a>
      <H2>create()</H2>

      <section>
        <P>
          Inserts a new record into the database.
        </P>

        <Code>{`await actions.create({ name: 'John Doe' })`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="detail"></a>
      <H2>detail()</H2>

      <section>
        <P>
          Retrieves a single record from the database given the primary 
          key/s.
        </P>

        <Code>{'await actions.detail({ id: 4 })'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="get"></a>
      <H2>get()</H2>

      <section>
        <P>
          Retrieves the first record from the database given the column 
          name and value.
        </P>

        <Code>{`await actions.get('id', 4)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="remove"></a>
      <H2>remove()</H2>

      <section>
        <P>
          Removes a single record from the database given the primary 
          key/s.
        </P>

        <Code>{'await actions.remove({ id: 4 })'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="restore"></a>
      <H2>restore()</H2>

      <section>
        <P>
          Restores a single record from the database given the primary 
          key/s <E>(if the table is restorable)</E>.
        </P>

        <Code>{'await actions.restore({ id: 4 })'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="search"></a>
      <H2>search()</H2>

      <section>
        <P>
          Searches the database for records that match the given search 
          parameters.
        </P>

        <Code>{`await actions.search({ q: 'john' })`}</Code>

        <P>
          The following describes the search parameters.
        </P>

        <Code>{examples[3]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="update"></a>
      <H2>update()</H2>

      <section>
        <P>
          Updates a single record in the database given the primary
          key/s and the new values.
        </P>

        <Code>{`await actions.update({ id: 4 }, { name: 'jane' })`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="upsert"></a>
      <H2>upsert()</H2>

      <section>
        <P>
          Inserts a new record into the database if it does not exist. 
          If it does exist, it will update the record. It will use the 
          existence of the primary key/s given to determine if the 
          record exists.
        </P>

        <Code>{`await actions.upsert({ id: 4, name: 'jane' })`}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Client API', 
          href: '/docs/references/client-api' 
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