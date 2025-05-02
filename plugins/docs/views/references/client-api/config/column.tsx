//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, C, A, S, SS } from '../../../../components/index.js';
import { Nav, Code, Layout } from '../../../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`enum Roles {
  admin "ADMIN"
  user "USER"
}

model Profile { 
  role Roles @default("USER") 
}`,
//1-------------------------------------------------------------------//
`enum Roles {
  admin "ADMIN"
  user "USER"
}

model Profile { 
  role Roles @default("USER") 
}`,
//2-------------------------------------------------------------------//
`type Contact {
  name String @field.text
  email String @field.email
  phone String @field.mask("(999) 999-9999")
}

model Profile { 
  contact Contact @field.fieldset
}`,
//3-------------------------------------------------------------------//
`model Profile { 
  id String @id
  address Address
}
model Address {
  profileId String @unique
  profile @relation({ local "profileId" foreign "id" })
}`,
//4-------------------------------------------------------------------//
`column.related //--> { 
  parent: { 
    model: Model, //Profile
    column: Column, //address Address
    key: string, //id
    type: number //1
  }, 
  child: { 
    model: models.child, //address
    column: columns.child, //profile @relation(...)
    key: keys.child, //profileId
    type: types.child //1
  } 
}`,
//5-------------------------------------------------------------------//
`column.relation //--> { 
  parent: { 
    model: models.child, //address
    column: columns.child, //profile @relation(...)
    key: keys.child, //profileId
    type: types.child //1
  } 
  child: { 
    model: Model, //Profile
    column: Column, //address Address
    key: string, //id
    type: number //1
  }
}`,
//6-------------------------------------------------------------------//
`column.typemap //--> {
  type: string,
  model: string,
  format: string,
  method: string,
  literal: string,
  mysql: string,
  pgsql: string,
  sqlite: string,
  helper: string
}`
//7-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Column Configuration - Client API - References - Stackpress Documentation');
  const description = _(
    'The Column class can be accessed from any Model or Fieldset class. '
    + 'It gives access to the each column metadata that was derrived '
    + 'from the projects main Idea file. This can be used to dynamically '
    + 'generate code.'
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
        <a className="theme-tx0 block" href="#active">
          {_('active')}
        </a>
        <a className="theme-tx0 block" href="#assertions">
          {_('assertions')}
        </a>
        <a className="theme-tx0 block" href="#attributes">
          {_('attributes')}
        </a>
        <a className="theme-tx0 block" href="#clen">
          {_('clen')}
        </a>
        <a className="theme-tx0 block" href="#dash">
          {_('dash')}
        </a>
        <a className="theme-tx0 block" href="#enum">
          {_('enum')}
        </a>
        <a className="theme-tx0 block" href="#encrypted">
          {_('encrypted')}
        </a>
        <a className="theme-tx0 block" href="#field">
          {_('field')}
        </a>
        <a className="theme-tx0 block" href="#fieldset">
          {_('fieldset')}
        </a>
        <a className="theme-tx0 block" href="#filter">
          {_('filter')}
        </a>
        <a className="theme-tx0 block" href="#hash">
          {_('hash')}
        </a>
        <a className="theme-tx0 block" href="#id">
          {_('id')}
        </a>
        <a className="theme-tx0 block" href="#indexable">
          {_('indexable')}
        </a>
        <a className="theme-tx0 block" href="#label">
          {_('label')}
        </a>
        <a className="theme-tx0 block" href="#list">
          {_('list')}
        </a>
        <a className="theme-tx0 block" href="#max">
          {_('max')}
        </a>
        <a className="theme-tx0 block" href="#min">
          {_('min')}
        </a>
        <a className="theme-tx0 block" href="#model">
          {_('model')}
        </a>
        <a className="theme-tx0 block" href="#multiple">
          {_('multiple')}
        </a>
        <a className="theme-tx0 block" href="#name">
          {_('name')}
        </a>
        <a className="theme-tx0 block" href="#related">
          {_('related')}
        </a>
        <a className="theme-tx0 block" href="#relation">
          {_('relation')}
        </a>
        <a className="theme-tx0 block" href="#required">
          {_('required')}
        </a>
        <a className="theme-tx0 block" href="#searchable">
          {_('searchable')}
        </a>
        <a className="theme-tx0 block" href="#schema">
          {_('schema')}
        </a>
        <a className="theme-tx0 block" href="#sortable">
          {_('sortable')}
        </a>
        <a className="theme-tx0 block" href="#snake">
          {_('snake')}
        </a>
        <a className="theme-tx0 block" href="#span">
          {_('span')}
        </a>
        <a className="theme-tx0 block" href="#step">
          {_('step')}
        </a>
        <a className="theme-tx0 block" href="#title">
          {_('title')}
        </a>
        <a className="theme-tx0 block" href="#type">
          {_('type')}
        </a>
        <a className="theme-tx0 block" href="#typemap">
          {_('typemap')}
        </a>
        <a className="theme-tx0 block" href="#unique">
          {_('unique')}
        </a>
        <a className="theme-tx0 block" href="#view">
          {_('view')}
        </a>
        <a className="theme-tx0 block" href="#zindex">
          {_('zindex')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#assert">
          {_('assert()')}
        </a>
        <a className="theme-tx0 block" href="#attribute">
          {_('attribute()')}
        </a>
        <a className="theme-tx0 block" href="#serialize">
          {_('serialize()')}
        </a>
        <a className="theme-tx0 block" href="#unserialize">
          {_('unserialize()')}
        </a>
      </nav>
    </menu>
  );
}
                                                                                
export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Column Configuration</H1>

      <P>
        The <C>Column</C> class can be accessed from 
        any <A href="/docs/references/client-api/config/model">Model</A>, 
        or <A href="/docs/references/client-api/config/fieldset">Fieldset</A> class. 
        It gives access to the each column metadata that was derrived 
        from the projects main <SS>Idea</SS> file. This can be used to 
        dynamically generate code.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="active"></a>
      <H2>active</H2>

      <section>
        <P>
          Returns <C>true</C> if this column is an <C>@active</C> column. 
          Active columns will be make the rows in the 
          table <S>restorable</S>, in that when the row is deleted, it 
          will be marked as inactive instead of being actually removed 
          from the database. In turn the row can be set to active again 
          to make it part of the system again.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @active'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.active //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="assertions"></a>
      <H2>assertions</H2>

      <section>
        <P>
          Returns a list of validation metadata to be used to validate 
          this column. You can find all the validation attributes in 
          the <A href="/docs/references/schema-specifications#validation-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @is.cgt(4 "Should be > 4")'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.assertions //--> [ { method: 'cgt', args: [4], message: 'Should be > 4' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="attributes"></a>
      <H2>attributes</H2>

      <section>
        <P>
          A <C>Map()</C> of attributes extracted from 
          the <C>Idea</C> file. You can use this for other arbitrary
          attributes that are not used by the <C>Column</C> class.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name @foo @bar(4) @zoo("foobar" { foo "bar" })'}</Code>

        <H4>Code Example</H4>

        <Code>{`map.attributes.get('foo') //--> true`}</Code>
        <Code>{`map.attributes.get('bar') //--> [ 4 ]`}</Code>
        <Code>{`map.attributes.get('zoo') //--> [ 'foobar', { foo: 'bar' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="clen"></a>
      <H2>clen</H2>

      <section>
        <P>
          Calculates the character length of the column. Defaults 
          to <C>255</C>. This is useful for <C>String</C> columns 
          converting to <C>VARCHAR</C> in SQL.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @is.clt(50)'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.clen //--> 49`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="dash"></a>
      <H2>dash</H2>

      <section>
        <P>
          Returns the dashed version of the column name.
        </P>

        <Code>{`column.dash //--> 'name'`}</Code>
        <Code>{`column.dash //--> 'address-book'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="enum"></a>
      <H2>enum</H2>

      <section>
        <P>
          Returns the <C>enum</C> associated with this column 
          or <C>null</C> if the column is not an <C>enum</C>.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[1]}</Code>

        <H4>Code Example</H4>

        <Code>{`column.enum //--> { user: 'USER', admin: 'ADMIN' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="encrypted"></a>
      <H2>encrypted</H2>

      <section>
        <P>
          Returns <C>true</C> if this column has an <C>@encrypted</C> attribute. 
          Encrypted columns will automatically be encrypted when
          inserted into the database and decrypted when read from the
          database. 
        </P>

        <H4>Schema Example</H4>

        <Code>{'email String @encrypted'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.encrypted //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="field"></a>
      <H2>field</H2>

      <section>
        <P>
          Returns a field object. Field columns are used in the create 
          and update forms. You can find all the field attributes in 
          the <A href="/docs/references/schema-specifications#field-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @field.text({ placeholder "Enter name." })'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.field //--> { method: 'text', component: 'Text', attributes: { placeholder: 'Enter name.' } }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="fieldset"></a>
      <H2>fieldset</H2>

      <section>
        <P>
          Returns the <A href="/docs/references/client-api/config/fieldset">
            fieldset
          </A> associated with this column 
          or <C>null</C> if the column is not a fieldset.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[2]}</Code>

        <H4>Code Example</H4>

        <Code>{`column.fieldset //--> Fieldset { name: 'Contact' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="filter"></a>
      <H2>filter</H2>

      <section>
        <P>
          Returns a filter object. Filter columns are used in the search 
          filter form. You can find all the filter attributes in 
          the <A href="/docs/references/schema-specifications#filter-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @filter.text'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.filter //--> { method: 'text', component: 'Text', attributes: {} }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="hash"></a>
      <H2>hash</H2>

      <section>
        <P>
          Returns <C>true</C> if this column has a <C>@hash</C> attribute. 
          Hash columns will automatically be encrypted when
          inserted into the database. This is a one-way hash. 
        </P>

        <H4>Schema Example</H4>

        <Code>{'password String @hash'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.hash //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="id"></a>
      <H2>id</H2>

      <section>
        <P>
          Returns <C>true</C> if this column has an <C>@id</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'id String @id'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.id //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="indexable"></a>
      <H2>indexable</H2>

      <section>
        <P>
          Returns <C>true</C> if the column has either 
          the <C>@filter.*</C>, <C>@searchable</C>, 
          or <C>@sortable</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @searchable'}</Code>
        <Code>{'role String @filter.text'}</Code>
        <Code>{'created Datetime @sortable'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.searchable //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="label"></a>
      <H2>label</H2>

      <section>
        <P>
          Returns the value from the <C>@label</C> attribute. If none 
          set, will return the column name.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @label("Name")'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.label //--> 'Name'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="list"></a>
      <H2>list</H2>

      <section>
        <P>
          Returns a list object. Listable columns are used in the search 
          results. You can find all the list attributes in 
          the <A href="/docs/references/schema-specifications#list-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @list.text'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.list //--> { method: 'text', component: 'Text', attributes: {} }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="max"></a>
      <H2>max</H2>

      <section>
        <P>
          Returns the value from the <C>@max</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'age Integer @max(100)'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.max //--> 100`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="min"></a>
      <H2>min</H2>

      <section>
        <P>
          Returns the value from the <C>@min</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'age Integer @min(0)'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.min //--> 0`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="model"></a>
      <H2>model</H2>

      <section>
        <P>
          Returns the <A href="/docs/references/client-api/config/model">
            model
          </A> associated with this column 
          or <C>null</C> if the column is not a model.
        </P>

        <H4>Schema Example</H4>

        <Code>{'user User'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.model //--> Model { name: 'User' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="multiple"></a>
      <H2>multiple</H2>

      <section>
        <P>
          Returns <C>true</C> if this column has 
          an <C>@multiple</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'tags String[]'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.multiple //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="name"></a>
      <H2>name</H2>

      <section>
        <P>
          Returns the name of the column.
        </P>

        <Code>{`column.name`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="related"></a>
      <H2>related</H2>

      <section>
        <P>
          Returns a list of relation objects collected from other 
          models referencing this column. This is useful for
          generating the reverse relations for this column.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[3]}</Code>

        <H4>Code Example</H4>

        <Code>{examples[4]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="relation"></a>
      <H2>relation</H2>

      <section>
        <P>
          Returns a relation objects. This is useful for
          generating the relations for this column.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[3]}</Code>

        <H4>Code Example</H4>

        <Code>{examples[5]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="required"></a>
      <H2>required</H2>

      <section>
        <P>
          Returns <C>true</C> if this column is required.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String'}</Code>
        <Code>{'name String @is.required'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.required`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="searchable"></a>
      <H2>searchable</H2>

      <section>
        <P>
          Returns <C>true</C> if this column has a
          <C>@searchable</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @searchable'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.searchable //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="schema"></a>
      <H2>schema</H2>

      <section>
        <P>
          Returns information on how this column should look like in a 
          database schema. This is useful for generating the database 
          schema and migration files.
        </P>

        <Code>{`column.schema //--> { type, length, defaults, unsigned, increment, index }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="sortable"></a>
      <H2>sortable</H2>

      <section>
        <P>
          Returns <C>true</C> if this column has a
          <C>@sortable</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'created Datetime @sortable'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.sortable //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="snake"></a>
      <H2>snake</H2>

      <section>
        <P>
          Returns the snake version of the column name.
        </P>

        <Code>{`column.snake //--> 'profile'`}</Code>
        <Code>{`column.snake //--> 'address_book'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="span"></a>
      <H2>span</H2>

      <section>
        <P>
          Returns a span object. Span columns are used in the search 
          filter form. You can find all the span attributes in 
          the <A href="/docs/references/schema-specifications#span-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'created Datetime @span.datetime'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.span //--> { method: 'datetime', component: 'Datetime', attributes: {} }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="step"></a>
      <H2>step</H2>

      <section>
        <P>
          Returns the value from the <C>@step</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'price Float @step(0.01)'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.step //--> 0.01`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="title"></a>
      <H2>title</H2>

      <section>
        <P>
          Returns the title version of the column name.
        </P>

        <Code>{`column.title //--> 'Name'`}</Code>
        <Code>{`column.title //--> 'AddressBook'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="type"></a>
      <H2>type</H2>

      <section>
        <P>
          Returns the type of the column.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.type //--> String`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="typemap"></a>
      <H2>typemap</H2>

      <section>
        <P>
          Returns a map of types for this column.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String'}</Code>

        <H4>Code Example</H4>

        <Code>{examples[6]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="unique"></a>
      <H2>unique</H2>

      <section>
        <P>
          Returns <C>true</C> if this column has a
          <C>@unique</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'email String @unique'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.unique //--> true`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="view"></a>
      <H2>view</H2>

      <section>
        <P>
          Returns a view object. Viewable columns are used in the detail 
          page. You can find all the view attributes in 
          the <A href="/docs/references/schema-specifications#view-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name String @view.text'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.view //--> { method: 'text', component: 'Text', attributes: {} }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="zindex"></a>
      <H2>zindex</H2>

      <section>
        <P>
          Returns the value from the <C>@zindex</C> attribute. This is 
          used to set the z-index of the column in the UI to control 
          the overlap with other columns.
        </P>

        <H4>Schema Example</H4>

        <Code>{'role Roles @field.select @zindex(10)'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.zindex //--> 10`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="assert"></a>
      <H2>assert()</H2>

      <section>
        <P>
          Asserts a value and returns an error. If no errors, will 
          return <C>null</C>.
        </P>

        <Code>{`column.assert('john')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="attribute"></a>
      <H2>attribute()</H2>

      <section>
        <P>
          Returns the value of the given attribute name.
        </P>

        <H4>Schema Example</H4>

        <Code>{'name @foo @bar(4) @zoo("foobar" { foo "bar" })'}</Code>

        <H4>Code Example</H4>

        <Code>{`column.attribute.get('foo') //--> true`}</Code>
        <Code>{`column.attribute.get('bar') //--> [ 4 ]`}</Code>
        <Code>{`column.attribute.get('zoo') //--> [ 'foobar', { foo: 'bar' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="serialize"></a>
      <H2>serialize()</H2>

      <section>
        <P>
          Serializes value to be inserted into the database
        </P>

        <Code>{`column.serialize(true) //--> 1`}</Code>
        <Code>{`column.serialize(new Date) //--> '2025-01-01T00:00:00Z'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="unserialize"></a>
      <H2>unserialize()</H2>

      <section>
        <P>
          Unserializes value coming from the database.
        </P>

        <Code>{`column.unserialize(1) //--> true`}</Code>
        <Code>{`column.unserialize('2025-01-01T00:00:00Z') //--> Date`}</Code>
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