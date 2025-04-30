//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, H } from '../../../components/index.js';
import { Nav, Code, Layout } from '../../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`const builder = db.alter('user')
  .addField('name', {
    "type": "VARCHAR",
    "length": 255,
    "nullable": false
  })
  .addField('tags', {
    "type": "JSON",
    "default": "[]",
    "nullable": false
  })
  .addField('active', {
    "type": "BOOLEAN",
    "default": true,
    "nullable": false
  })
  .addField('created', {
    "type": "DATETIME",
    "default": "now()",
    "nullable": false
  });`,
//1-------------------------------------------------------------------//
`const builder = db.alter('address').addForeignKey(
  'address_user_id_foreign', 
  {
    "table": "user",
    "foreign": "id",
    "local": "user_id",
    "delete": "CASCADE",
    "update": "RESTRICT"
  }
);`,
//2-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Alter Builder - Query Builder - References - Stackpress Documentation');
  const description = _(
    'Query builder for the SQL ALTER statement.'
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
        <a className="theme-tx0 block" href="#add-field">
          {_('addField()')}
        </a>
        <a className="theme-tx0 block" href="#add-foreign-key">
          {_('addForeignKey()')}
        </a>
        <a className="theme-tx0 block" href="#add-key">
          {_('addKey()')}
        </a>
        <a className="theme-tx0 block" href="#add-primary-key">
          {_('addPrimaryKey()')}
        </a>
        <a className="theme-tx0 block" href="#add-unique-key">
          {_('addUniqueKey()')}
        </a>
        <a className="theme-tx0 block" href="#build">
          {_('build()')}
        </a>
        <a className="theme-tx0 block" href="#change-field">
          {_('changeField()')}
        </a>
        <a className="theme-tx0 block" href="#query">
          {_('query()')}
        </a>
        <a className="theme-tx0 block" href="#remove-field">
          {_('removeField()')}
        </a>
        <a className="theme-tx0 block" href="#remove-foreign-key">
          {_('removeForeignKey()')}
        </a>
        <a className="theme-tx0 block" href="#remove-key">
          {_('removeKey()')}
        </a>
        <a className="theme-tx0 block" href="#remove-primary-key">
          {_('removePrimaryKey()')}
        </a>
        <a className="theme-tx0 block" href="#remove-unique-key">
          {_('removeUniqueKey()')}
        </a>
        <a className="theme-tx0 block" href="#then">
          {_('then()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Alter Query Builder</H1>

      <P>
        Query builder for the SQL <H>ALTER</H> statement.
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
        
        <Code>{`db.alter.engine //same as db`}</Code>
        <Code>{`db.alter.engine = db`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="add-field"></a>
      <H2>addField()</H2>

      <section>
        <P>
          Add a field to the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`addField(name: string, field: Field): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{examples[0]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="add-foreign-key"></a>
      <H2>addForeignKey()</H2>

      <section>
        <P>
          Add a foreign key to the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`addForeignKey(name: string, foriegnKey: ForeignKey): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="add-key"></a>
      <H2>addKey()</H2>

      <section>
        <P>
          Add a key index to the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`addKey(name: string, field: string|string[]): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').addKey('idx_name', 'name')`}</Code>
        <Code>{`const builder = db.alter('user').addKey('idx_name_age', [ 'name', 'age' ])`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="add-primary-key"></a>
      <H2>addPrimaryKey()</H2>

      <section>
        <P>
          Add a primary key to the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`addPrimaryKey(name: string): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').addUPrimaryKey('name')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="add-unique-key"></a>
      <H2>addUniqueKey()</H2>

      <section>
        <P>
          Add a unique key to the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`addUniqueKey(name: string, field: string|string[]): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').addUniqueKey('idx_unique_name', 'name')`}</Code>

        <Code>{`const builder = db.alter('user').addUniqueKey('idx_unique_name_age', [ 'name', 'age' ])`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="build"></a>
      <H2>build()</H2>

      <section>
        <P>
          Converts the class data to object.
        </P>
        
        <Code>{`const { fields, foreign, keys, primary, table, unique } = db.alter('user').build()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="change-field"></a>
      <H2>changeField()</H2>

      <section>
        <P>
          Update a field in the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`changeField(name: string, field: Field): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').changeField('name', { type: 'TEXT' })`}</Code>
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
        
        <Code>{`const queries = db.alter('user').query()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="remove-field"></a>
      <H2>removeField()</H2>

      <section>
        <P>
          Remove a field from the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`removeField(name: string): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').removeField('name')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="remove-foreign-key"></a>
      <H2>removeForeignKey()</H2>

      <section>
        <P>
          Remove key from the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`removeForeignKey(name: string): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').removeForiegnKey('address_id')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="remove-key"></a>
      <H2>removeKey()</H2>

      <section>
        <P>
          Remove a key index from the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`removeKey(name: string): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').removeKey('name')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="remove-primary-key"></a>
      <H2>removePrimaryKey()</H2>

      <section>
        <P>
          Add a primary key to the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`removePrimaryKey(name: string): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').removePrimaryKey('id')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="remove-unique-key"></a>
      <H2>removeUniqueKey()</H2>

      <section>
        <P>
          Remove a unique key from the table.
        </P>
        
        <H4>Usage</H4>
        
        <Code>{`removeUniqueKey(name: string): AlterBuilder`}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const builder = db.alter('user').removeUniqueKey('name')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="then"></a>
      <H2>then()</H2>

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

      <Nav
        prev={{ 
          text: 'Query Builder', 
          href: '/docs/references/query-builder' 
        }}
        next={{ 
          text: 'Create Builder', 
          href: '/docs/references/query-builder/create-builder' 
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