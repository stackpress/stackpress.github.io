//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { createContext, useContext, useState } from 'react';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4,  P, C, A, SS } from '../../components/index.js';
import { Nav, Note, Code, Layout } from '../../components/index.js';

const setup = [
//0-------------------------------------------------------------------//
`{
  //...
  "dependencies": {
    "@stackpress/inquire-pg": "^0.5.27",
    "pg": "8.13.1",
    //...
  }
  //...
}`,
//1-------------------------------------------------------------------//
`{
  //...
  "dependencies": {
    "@stackpress/inquire-pglite": "^0.5.27",
    "@electric-sql/pglite": "0.2.17",
    //...
  }
  //...
}`,
//2-------------------------------------------------------------------//
`{
  //...
  "dependencies": {
    "@stackpress/inquire-mysql": "^0.5.27",
    "mysql2": "3.11.5",
    //...
  }
  //...
}`,
//3-------------------------------------------------------------------//
`{
  //...
  "dependencies": {
    "@stackpress/inquire-sqlite3": "^0.5.27",
    "better-sqlite3": "11.7.0",
    //...
  },
  //...
}`,
//4-------------------------------------------------------------------//
`import { Pool } from 'pg'
import { connect } from 'stackpress/pg'

const db = await connect(async () => {
  const pool = new Pool({...})
  return await pool.connect()
})`,
//5-------------------------------------------------------------------//
`import { PGlite } from '@electric-sql/pglite'
import { connect } from 'stackpress/pglite'

const db = await connect(async () => new PGlite('/path/to/db'))`,
//6-------------------------------------------------------------------//
`import mysql from 'mysql2/promise'
import { connect } from 'stackpress/mysql'

const db = await connect(async () => await mysql.createConnection({...}))`,
//7-------------------------------------------------------------------//
`import sqlite from 'better-sqlite3'
import { connect } from 'stackpress/sqlite'

const db = await connect(async () => sqlite(':memory:'))`,
//8-------------------------------------------------------------------//
`import type { Server } from 'stackpress/server'
import type { DatabasePlugin } from 'stackpress/sql'

export default function plugin(server: Server) {
  const db = server.plugin<DatabasePlugin>('database')
}`,
//9-------------------------------------------------------------------//
`import type { DatabasePlugin } from 'stackpress/sql'
import { action } from 'stackpress/server'

export default action(function Action(req, res, ctx) {
  const db = ctx.plugin<DatabasePlugin>('database')
})`
//10------------------------------------------------------------------//
];

const examples = [
//0-------------------------------------------------------------------//
`import mysql from 'mysql2/promise';
import { connect } from 'stackpress/mysql';
const db = await connect(async () => await mysql.createConnection({...}));`,
//1-------------------------------------------------------------------//
`import { Pool } from 'pg';
import { connect } from 'stackpress/pg';
const db = await connect(async () => {
  const pool = new Pool({...});
  return await pool.connect();
});`,
//2-------------------------------------------------------------------//
`import { PGlite } from '@electric-sql/pglite';
import { connect } from 'stackpress/pglite';
const db = await connect(async () => new PGlite('/path/to/db'));`,
//3-------------------------------------------------------------------//
`import sqlite from 'better-sqlite3';
import { connect } from 'stackpress/sqlite';
const db = await connect(async () => sqlite(':memory:'));`,
//4-------------------------------------------------------------------//
`interface Connection<R = unknown> {
  //sql language dialect
  dialect: Dialect;

  /**
   * Formats the query to what the database connection understands
   * Formats the values to what the database connection accepts 
   */
  format(request: QueryObject): QueryObject;

  /**
   * Query the database. Should return just the expected 
   * results, because the raw results depends on the 
   * native database engine connection. Any code that uses
   * this library should not care about the kind of database.
   */
  query<R = unknown>(request: QueryObject): Promise<R[]>;

  /**
   * Returns the resource
   */
  resource(): Promise<R>;

  /**
   * Common pattern to invoke a transaction
   */
  transaction<R = unknown>(callback: Transaction<R>): Promise<R>;
}`,
//5-------------------------------------------------------------------//
`type Dialect = {
  q: string,
  alter(builder: Alter): QueryObject[];
  create(builder: Create): QueryObject[];
  delete(builder: Delete): QueryObject;
  drop(table: string): QueryObject;
  insert(builder: Insert): QueryObject;
  rename(from: string, to: string): QueryObject;
  select(builder: Select): QueryObject;
  truncate(table: string, cascade?: boolean): QueryObject;
  update(builder: Update): QueryObject;
}`,
//6-------------------------------------------------------------------//
`const alterQueries = db.dialect.alter(alterBuilder)
const createQueries = db.dialect.create(createBuilder)
const { query, value } = db.dialect.delete(deleteBuilder)
const { query, value } = db.dialect.drop('user')
const { query, value } = db.dialect.insert(insertBuilder)
const { query, value } = db.dialect.rename('user', 'users')
const { query, value } = db.dialect.select(selectBuilder)
const { query, value } = db.dialect.truncate('user')
const { query, value } = db.dialect.update(updateBuilder)`,
//7-------------------------------------------------------------------//
`await db.alter('user')
  .addField('id', { type: 'INTEGER' })
  .addPrimaryKey('id')`,
//8-------------------------------------------------------------------//
`await db.create('user')
  .addField('id', { type: 'INTEGER' })
  .addField('name', { type: 'VARCHAR', length: 255 })
  .addPrimaryKey('id');`,
//9-------------------------------------------------------------------//
`await db.select('*')
  .from('user')
  .join('inner', 'address', 'user.id = address.user_id')
  .where('id = ?', [ '1' ])
  .order('id', 'DESC')
  .limit(10)
  .offset(0)`,
//10------------------------------------------------------------------//
`await db.transaction(async tx => {
  await tx.query('UPDATE user SET name = ?', [ 'John Doe' ])
  await db.insert('user').values({ id: '1', name: 'John Doe' })
})`,
//11------------------------------------------------------------------//
];

export const DBContext = createContext<{ db: string, change: Function }>({
  db: 'pgsql', 
  change: () => {}
});

export function DBProvider({ children }: { children: React.ReactNode }) {
  const [ db, change ] = useState('pgsql');
  return (
    <DBContext.Provider value={{ db, change }}>
      {children}
    </DBContext.Provider>
  );
}

export function DBTabs({ mysql, pglite, pgsql, sqlite }: { 
  mysql: React.ReactNode, 
  pglite: React.ReactNode,
  pgsql: React.ReactNode,
  sqlite: React.ReactNode
}) {
  const { db, change } = useContext(DBContext);
  return (
    <div className="rounded-lg px-pb-20">
      <div className="theme-bg-bg3 flex items-center px-w-100-0 overflow-x-auto">
        {[ 'pgsql', 'pglite', 'mysql', 'sqlite' ].map(engine => (
          <div 
            key={engine}
            className={`px-py-10 px-px-30 cursor-pointer ${db === engine ? 'theme-bg-bg1' : 'theme-bg-bg2'}`}
            onClick={() => change(engine)}
          >
            {engine}
          </div>
        ))}
      </div>
      <div className={`theme-bg-bg1 ${db === 'pgsql' ? '' : 'hidden'}`}>
        {pgsql}
      </div>
      <div className={`theme-bg-bg1 ${db === 'pglite' ? '' : 'hidden'}`}>
        {pglite}
      </div>
      <div className={`theme-bg-bg1 ${db === 'mysql' ? '' : 'hidden'}`}>
        {mysql}
      </div>
      <div className={`theme-bg-bg1 ${db === 'sqlite' ? '' : 'hidden'}`}>
        {sqlite}
      </div>
    </div>
  );
}

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Query Builder - References - Stackpress Documentation');
  const description = _(
    'Stackpress provides a super lightweight generic typed SQL query '
    + 'builder, SQL dialects and sql composite engine.'
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
        <a className="theme-tx0 block" href="#connection">
          {_('connection')}
        </a>
        <a className="theme-tx0 block" href="#dialect">
          {_('dialect')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#alter">
          {_('alter()')}
        </a>
        <a className="theme-tx0 block" href="#create">
          {_('create()')}
        </a>
        <a className="theme-tx0 block" href="#delete">
          {_('delete()')}
        </a>
        <a className="theme-tx0 block" href="#diff">
          {_('diff()')}
        </a>
        <a className="theme-tx0 block" href="#drop">
          {_('drop()')}
        </a>
        <a className="theme-tx0 block" href="#insert">
          {_('insert()')}
        </a>
        <a className="theme-tx0 block" href="#query">
          {_('query()')}
        </a>
        <a className="theme-tx0 block" href="#rename">
          {_('rename()')}
        </a>
        <a className="theme-tx0 block" href="#select">
          {_('select()')}
        </a>
        <a className="theme-tx0 block" href="#sql">
          {_('sql()')}
        </a>
        <a className="theme-tx0 block" href="#transaction">
          {_('transaction()')}
        </a>
        <a className="theme-tx0 block" href="#truncate">
          {_('truncate()')}
        </a>
        <a className="theme-tx0 block" href="#update">
          {_('update()')}
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
        <SS>Stackpress</SS> provides a super lightweight generic typed 
        SQL query builder, SQL dialects and sql composite engine. In 
        order to use the SQL query builder you need to install the
        following packages depending on the SQL engine you are trying 
        to use.
      </P>

      <section>
        <DBTabs
          pgsql={(<Code>{setup[0]}</Code>)}
          pglite={(<Code>{setup[1]}</Code>)}
          mysql={(<Code>{setup[2]}</Code>)}
          sqlite={(<Code>{setup[3]}</Code>)}
        />

        <P>
          Once you have installed the required packages, the following
          examples show how to setup the database connection would look 
          like depending on the SQL engine you are trying to use.
        </P>

        <DBTabs
          pgsql={(<Code>{setup[4]}</Code>)}
          pglite={(<Code>{setup[5]}</Code>)}
          mysql={(<Code>{setup[6]}</Code>)}
          sqlite={(<Code>{setup[7]}</Code>)}
        />

        <Note>
          It's recommended to setup the database as described in 
          the <A href="/docs/toolkit/setup/3-database-engine">
            Toolkit Setup
          </A> tutorial.
        </Note>

        <P>
          In a plugin you can access the database connection using 
          the <C>server.plugin()</C> method like the following.
        </P>

        <Code>{setup[8]}</Code>

        <P>
          In a route or event you can access the database connection 
          using the <C>ctx.plugin()</C> method like the 
          following.
        </P>

        <Code>{setup[9]}</Code>
      </section>



      {/*------------------------------------------------------------*/}

      <a id="connection"></a>
      <H2>connection</H2>

      <section>
        <P>
          Returns the SQL connection. This is a secondary wrapper that 
          provides access to the resource designed around a common interface.
        </P>
        
        <Code>{examples[4]}</Code>
        
        <H4>Example</H4>
        
        <Code>{`const connection = db.connection`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="dialect"></a>
      <H2>dialect</H2>

      <section>
        <P>
          Returns the SQL dialect. A dialect is a set of functions
          that are used to format the SQL queries depending on the 
          SQL database engine. The following is the interface of an SQL
          dialect.
        </P>
        
        <Code>{examples[5]}</Code>
        
        <H4>Example</H4>
        
        <Code>{examples[6]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="alter"></a>
      <H2>alter()</H2>

      <section>
        <P>
          Return an alter table query builder. 
          See <A href="/docs/references/query-builder/alter-builder">AlterBuilder</A>.
        </P>

        <H4>Usage</H4>

        <Code>{'alter<R = unknown>(table: string)'}</Code>

        <H4>Example</H4>

        <Code>{examples[7]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="create"></a>
      <H2>create()</H2>

      <section>
        <P>
          Return a create table query builder.
          See <A href="/docs/references/query-builder/create-builder">CreateBuilder</A>.
        </P>

        <H4>Usage</H4>

        <Code>{'create<R = unknown>(table: string)'}</Code>

        <H4>Example</H4>

        <Code>{examples[8]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="delete"></a>
      <H2>delete()</H2>

      <section>
        <P>
          Return a delete query builder.
          See <A href="/docs/references/query-builder/delete-builder">DeleteBuilder</A>.
        </P>

        <H4>Usage</H4>

        <Code>{'delete<R = unknown>(table: string)'}</Code>

        <H4>Example</H4>

        <Code>{`await db.delete('profile').where('id = ?', [ '1' ])`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="diff"></a>
      <H2>diff()</H2>

      <section>
        <P>
          Compares two create builders and generates an alter builder.
        </P>

        <Note>This does not compare table names</Note>

        <H4>Usage</H4>

        <Code>{'diff(from: Create, to: Create)'}</Code>

        <H4>Example</H4>

        <Code>{'const alterBuilder = db.diff(createBuilder1, createBuilder2)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="drop"></a>
      <H2>drop()</H2>

      <section>
        <P>
          Drops a table.
        </P>

        <H4>Usage</H4>

        <Code>{'drop(table: string)'}</Code>

        <H4>Example</H4>

        <Code>{`await db.drop('user')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="insert"></a>
      <H2>insert()</H2>

      <section>
        <P>
          Return an insert query builder.
          See <A href="/docs/references/query-builder/insert-builder">InsertBuilder</A>.
        </P>

        <H4>Usage</H4>

        <Code>{'insert<R = unknown>(table: string)'}</Code>

        <H4>Example</H4>

        <Code>{`await db.insert('profile').values({ id: '1', name: 'John Doe' })`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="query"></a>
      <H2>query()</H2>

      <section>
        <P>
          Query the database. Should return just the expected results, 
          because the raw results depends on the native database engine 
          connection. 
        </P>

        <Note>
          Any code that uses this library should not care about the kind 
          of database.
        </Note>

        <H4>Usage</H4>

        <Code>{'query<R = unknown>(query: QueryObject): Promise<R[]>'}</Code>
        <Code>{'query<R = unknown>(query: string, values?: Value[]): Promise<R[]>'}</Code>

        <H4>Example</H4>

        <Code>{`await db.query('SELECT * from user')`}</Code>
        <Code>{`await db.query('SELECT * from user WHERE id = ?', [ '4' ])`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="rename"></a>
      <H2>rename()</H2>

      <section>
        <P>
          Renames a table.
        </P>

        <H4>Usage</H4>

        <Code>{'rename(from: string, to: string)'}</Code>

        <H4>Example</H4>

        <Code>{`await db.rename('user', 'users')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="select"></a>
      <H2>select()</H2>

      <section>
        <P>
          Return a select query builder.
          See <A href="/docs/references/query-builder/select-builder">SelectBuilder</A>.
        </P>

        <H4>Usage</H4>

        <Code>{'select<R = unknown>(columns?: string|string[])'}</Code>

        <H4>Example</H4>

        <Code>{examples[9]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="sql"></a>
      <H2>sql()</H2>

      <section>
        <P>
          Template string query builder.
        </P>

        <H4>Usage</H4>

        <Code>{'sql(strings: string[], ...values: Value[])'}</Code>

        <H4>Example</H4>

        <Code>{'await db.sql`SELECT * FROM table WHERE id = ${id}`'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="transaction"></a>
      <H2>transaction()</H2>

      <section>
        <P>
          Common pattern to invoke a transaction. The callback function 
          accepts a <A href="#connection">Connection</A> interface 
          argument.
        </P>

        <H4>Usage</H4>

        <Code>{'transaction<R = unknown>(callback: Transaction<R>)'}</Code>

        <H4>Example</H4>

        <Code>{examples[10]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="truncate"></a>
      <H2>truncate()</H2>

      <section>
        <P>
          Truncate a table.
        </P>

        <H4>Usage</H4>

        <Code>{'truncate(table: string, cascade = false)'}</Code>

        <H4>Example</H4>

        <Code>{`await db.truncate('user')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="update"></a>
      <H2>update()</H2>

      <section>
        <P>
          Return an update query builder.
          See <A href="/docs/references/query-builder/update-builder">UpdateBuilder</A>.
        </P>

        <H4>Usage</H4>

        <Code>{'update<R = unknown>(table: string)'}</Code>

        <H4>Example</H4>

        <Code>{`await db.update('user').set({ name: 'Jane Doe' }).where('id = ?', [ '1' ])`}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Exception Class', 
          href: '/docs/references/exception-class' 
        }}
        next={{ 
          text: 'React API', 
          href: '/docs/references/react-api' 
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
      <DBProvider>
        <Body />
      </DBProvider>
    </Layout>
  );
}