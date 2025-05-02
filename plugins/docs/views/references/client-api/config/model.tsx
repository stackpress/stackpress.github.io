//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, C, E, A, S, SS } from '../../../../components/index.js';
import { Nav, Note, Code, Layout } from '../../../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import client from 'stackpress-client'

const model = client.model.profile.config`,
//1-------------------------------------------------------------------//
`import type { Server, ClientPlugin } from 'stackpress'

export default function plugin(server: Server) {
  const client = server.plugin<ClientPlugin>('client')
  const model = client.model.profile.config
}`,
//2-------------------------------------------------------------------//
`enum Roles {
  admin "ADMIN"
  user "USER"
}

model Profile { 
  role Roles @default("USER") 
}`,
//3-------------------------------------------------------------------//
`type Contact {
  name String @field.text
  email String @field.email
  phone String @field.mask("(999) 999-9999")
}

model Profile { 
  contact Contact @field.fieldset
}`,
//4-------------------------------------------------------------------//
`model Profile { 
  name String @searchable 
  role String @filter.text
  created Datetime @sortable
}`,
//5-------------------------------------------------------------------//
`model Profile { 
  id String @id
  address Address
}
model Address {
  profileId String @unique
  profile @relation({ local "profileId" foreign "id" })
}`,
//6-------------------------------------------------------------------//
`model Profile { 
  userId String
  user @relation({ local "userId" foreign "id" })
}`,
//7-------------------------------------------------------------------//
`model Profile { 
  name String @field.text
  email String 
}`,
//8-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Model Configuration - Client API - References - Stackpress Documentation');
  const description = _(
    'The config property gives access to the metadata that was '
    + 'derrived from the projects main Idea file. This can be used to '
    + 'dynamically generate code.'
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
        {_('Label Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#icon">
          {_('icon')}
        </a>
        <a className="theme-tx0 block" href="#label">
          {_('label')}
        </a>
        <a className="theme-tx0 block" href="#plural">
          {_('plural')}
        </a>
        <a className="theme-tx0 block" href="#singular">
          {_('singular')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Naming Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#camel">
          {_('camel')}
        </a>
        <a className="theme-tx0 block" href="#dash">
          {_('dash')}
        </a>
        <a className="theme-tx0 block" href="#lower">
          {_('lower')}
        </a>
        <a className="theme-tx0 block" href="#name">
          {_('name')}
        </a>
        <a className="theme-tx0 block" href="#snake">
          {_('snake')}
        </a>
        <a className="theme-tx0 block" href="#title">
          {_('title')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Type Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#enums">
          {_('enums')}
        </a>
        <a className="theme-tx0 block" href="#fieldsets">
          {_('fieldsets')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Index Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#ids">
          {_('ids')}
        </a>
        <a className="theme-tx0 block" href="#indexables">
          {_('indexables')}
        </a>
        <a className="theme-tx0 block" href="#searchables">
          {_('searchables')}
        </a>
        <a className="theme-tx0 block" href="#sortables">
          {_('sortables')}
        </a>
        <a className="theme-tx0 block" href="#uniques">
          {_('uniques')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Relation Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#related">
          {_('related')}
        </a>
        <a className="theme-tx0 block" href="#relations">
          {_('relations')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Find Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#active">
          {_('active')}
        </a>
        <a className="theme-tx0 block" href="#created">
          {_('created')}
        </a>
        <a className="theme-tx0 block" href="#updated">
          {_('updated')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Component Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#fields">
          {_('fields')}
        </a>
        <a className="theme-tx0 block" href="#filters">
          {_('filters')}
        </a>
        <a className="theme-tx0 block" href="#lists">
          {_('lists')}
        </a>
        <a className="theme-tx0 block" href="#spans">
          {_('spans')}
        </a>
        <a className="theme-tx0 block" href="#views">
          {_('views')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Other Properties')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#assertions">
          {_('assertions')}
        </a>
        <a className="theme-tx0 block" href="#attributes">
          {_('attributes')}
        </a>
        <a className="theme-tx0 block" href="#columns">
          {_('columns')}
        </a>
        <a className="theme-tx0 block" href="#defaults">
          {_('defaults')}
        </a>
        <a className="theme-tx0 block" href="#encrypted">
          {_('encrypted')}
        </a>
        <a className="theme-tx0 block" href="#query">
          {_('query')}
        </a>
        <a className="theme-tx0 block" href="#restorable">
          {_('restorable')}
        </a>
        <a className="theme-tx0 block" href="#template">
          {_('template')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#assert">
          {_('assert()')}
        </a>
        <a className="theme-tx0 block" href="#column">
          {_('column()')}
        </a>
        <a className="theme-tx0 block" href="#filter">
          {_('filter()')}
        </a>
        <a className="theme-tx0 block" href="#from-snake">
          {_('fromSnake()')}
        </a>
        <a className="theme-tx0 block" href="#input">
          {_('input()')}
        </a>
        <a className="theme-tx0 block" href="#render">
          {_('render()')}
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
      <H1>Model Configuration</H1>

      <P>
        The <C>config</C> property gives access to the metadata that 
        was derrived from the projects main <SS>Idea</SS> file. This 
        can be used to dynamically generate code.
      </P>

      <Code>{examples[0]}</Code>

      <Note><C>'stackpress-client'</C> depends on your configuration.</Note>

      <P>
        You can also access these action easier through a plugin like 
        the following.
      </P>

      <Code>{examples[1]}</Code>

      {/*------------------------------------------------------------*/}

      <a id="icon"></a>
      <H2>icon</H2>

      <section>
        <P>
          Returns the <C>@icon</C> value. These names are 
          from <A blank href="https://fontawesome.com/">Font Awesome</A>.
          For example, <C>'user'</C> would be used as <C>'fa-user'</C>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile @icon("user") {}'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.icon //--> 'user'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="label"></a>
      <H2>label</H2>

      <section>
        <P>
          Returns the model <C>@label</C> names. This is an array of 
          strings that consist of the singular and plural name of the 
          model.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile @label("Profile" "Profiles") {}'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.label //--> [ 'Profile', 'Profiles' ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="plural"></a>
      <H2>plural</H2>

      <section>
        <P>
          Returns the model plural <C>@label</C>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile @label("Profile" "Profiles") {}'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.plural //--> 'Profiles'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="singular"></a>
      <H2>singular</H2>

      <section>
        <P>
          Returns the schema singular <C>@label</C>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile @label("Profile" "Profiles") {}'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.singular //--> 'Profile'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="camel"></a>
      <H2>camel</H2>

      <section>
        <P>
          Returns the camel cased version of the model name.
        </P>

        <Code>{`model.camel //--> 'profile'`}</Code>
        <Code>{`model.camel //--> 'addressBook'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="dash"></a>
      <H2>dash</H2>

      <section>
        <P>
          Returns the dashed version of the model name.
        </P>

        <Code>{`model.dash //--> 'profile'`}</Code>
        <Code>{`model.dash //--> 'address-book'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="lower"></a>
      <H2>lower</H2>

      <section>
        <P>
          Returns the lower case version of the model name.
        </P>

        <Code>{`model.lower //--> 'profile'`}</Code>
        <Code>{`model.lower //--> 'addressbook'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="snake"></a>
      <H2>snake</H2>

      <section>
        <P>
          Returns the snake version of the model name.
        </P>

        <Code>{`model.snake //--> 'profile'`}</Code>
        <Code>{`model.snake //--> 'address_book'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="title"></a>
      <H2>title</H2>

      <section>
        <P>
          Returns the title version of the model name.
        </P>

        <Code>{`model.title //--> 'Profile'`}</Code>
        <Code>{`model.title //--> 'AddressBook'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="enums"></a>
      <H2>enums</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with types that are <C>enum</C>.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[2]}</Code>

        <H4>Code Example</H4>

        <Code>{`model.enums //--> [ Column { name: 'role' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="fieldsets"></a>
      <H2>fieldsets</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with types that are fieldsets.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[3]}</Code>

        <H4>Code Example</H4>

        <Code>{`model.fieldsets //--> [ Column { name: 'contact' } ]`}</Code>
      </section>


      {/*------------------------------------------------------------*/}

      <a id="ids"></a>
      <H2>ids</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@id</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{`model Profile { id String @id }`}</Code>

        <H4>Code Example</H4>

        <Code>{`model.ids //--> [ Column { name: 'id' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="indexables"></a>
      <H2>indexables</H2>

      <section>
        <P>
          Returns all <A href="/docs/references/client-api/config/column">
            columns
          </A> that with either 
          the <C>@filter.*</C>, <C>@searchable</C>, 
          or <C>@sortable</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[4]}</Code>

        <H4>Code Example</H4>

        <Code>{`model.indexables //--> [ Column { name: 'name' }, Column { name: 'role' }, Column { name: 'created' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="searchables"></a>
      <H2>searchables</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@searchable</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{`model Profile { name String @searchable }`}</Code>

        <H4>Code Example</H4>

        <Code>{`model.searchables //--> [ Column { name: 'name' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="sortables"></a>
      <H2>sortables</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@sortable</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{`model Profile { created Datetime @sortable }`}</Code>

        <H4>Code Example</H4>

        <Code>{`model.sortables //--> [ Column { name: 'created' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="uniques"></a>
      <H2>uniques</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@unique</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{`model Profile { email String @unique }`}</Code>

        <H4>Code Example</H4>

        <Code>{`model.uniques //--> [ Column { name: 'email' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="related"></a>
      <H2>related</H2>

      <section>
        <P>
          Returns all the models with <A href="/docs/references/client-api/config/column">
            columns
          </A> related to this model. 
          This is like <C>relation</C> except it returns the column of 
          the other model that it has a <C>relation</C> to.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[5]}</Code>

        <H4>Code Example</H4>

        <Code>{`model.related //--> [ Column { name: 'profile' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="relations"></a>
      <H2>relations</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@relation</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[6]}</Code>

        <H4>Code Example</H4>

        <Code>{`model.relations //--> [ Column { name: 'user' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="active"></a>
      <H2>active</H2>

      <section>
        <P>
          Returns the <A href="/docs/references/client-api/config/column">
            column
          </A> with the <C>@active</C> attribute. If 
          there is one column with this attribute, it will be make the 
          rows in the table <S>restorable</S>, in that when the row is
          deleted, it will be marked as inactive instead of being
          actually removed from the database. In turn the row can be 
          set to active again to make it part of the system again.
        </P>

        <Note>
          There should only be at most one column with this attribute. 
          This property will only return the first one found.
        </Note>

        <H4>Schema Example</H4>

        <Code>{'model Profile { enabled Boolean @active }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.active //--> Column { name: 'enabled' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="created"></a>
      <H2>created</H2>

      <section>
        <P>
          Returns the <A href="/docs/references/client-api/config/column">
            column
          </A> with the <C>@created</C> attribute. 
          Columns marked with this attribute are automatically
          set to the current date and time when the table row is 
          created.
        </P>

        <Note>
          There should only be at most one column with this attribute. 
          This property will only return the first one found.
        </Note>

        <H4>Schema Example</H4>

        <Code>{'model Profile { createdAt Datetime @created }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.created //--> Column { name: 'createdAt' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="updated"></a>
      <H2>updated</H2>

      <section>
        <P>
          Returns the <A href="/docs/references/client-api/config/column">
            column
          </A> with the <C>@updated</C> attribute. 
          Columns marked with this attribute are automatically
          updated to the current date and time when the table row is 
          updated.
        </P>

        <Note>
          There should only be at most one column with this attribute. 
          This property will only return the first one found.
        </Note>

        <H4>Schema Example</H4>

        <Code>{'model Profile { updatedAt Datetime @updated }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.updated //--> Column { name: 'updatedAt' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="fields"></a>
      <H2>fields</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@field.*</C> attribute.
          Field columns are used in the create and update forms. You 
          can find all the field attributes in 
          the <A href="/docs/references/schema-specifications#field-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { name String @field.text }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.fields //--> [ Column { name: 'name' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="filters"></a>
      <H2>filters</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@filter.*</C> attribute.
          Filter columns are used in the search filter form. You 
          can find all the filter attributes in 
          the <A href="/docs/references/schema-specifications#filter-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { name String @filter.text }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.filters //--> [ Column { name: 'name' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="lists"></a>
      <H2>lists</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with that are listable. Listable 
          columns are used in the search results. You 
          can find all the list attributes in 
          the <A href="/docs/references/schema-specifications#list-attributes">
            Schema Specifications
          </A>.
        </P>

        <Note>
          All columns by default are listable. This property will only
          return the columns that are not hidden.
        </Note>

        <P>
          To make a column not listable, use the <C>@list.hide</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { name String }'}</Code>
        <Code>{'model Profile { name String @list.text }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.lists //--> [ Column { name: 'name' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="spans"></a>
      <H2>spans</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@span.*</C> attribute.
          Span columns are used in the search filter form. You 
          can find all the span attributes in 
          the <A href="/docs/references/schema-specifications#span-attributes">Schema Specifications</A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { date Datetime @span.datetime }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.spans //--> [ Column { name: 'date' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="views"></a>
      <H2>views</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with that are viewable. Viewable 
          columns are used in detail pages. You 
          can find all the view attributes in 
          the <A href="/docs/references/schema-specifications#view-attributes">
            Schema Specifications
          </A>.
        </P>

        <Note>
          All columns by default are viewable. This property will only
          return the columns that are not hidden.
        </Note>

        <P>
          To make a column not viewable, use the <C>@view.hide</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { name String }'}</Code>
        <Code>{'model Profile { name String @view.text }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.views //--> [ Column { name: 'name' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="assertions"></a>
      <H2>assertions</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@is.*</C> attribute.
          Validation columns are used validate insertions and updates.
          You can find all the validation attributes in 
          the <A href="/docs/references/schema-specifications#validation-attributes">
            Schema Specifications
          </A>.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { name String @is.requried("Required") @is.cgt(4 "Should be > 4") }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.assertions //--> [ Column { name: 'name' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="defaults"></a>
      <H2>defaults</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@default</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { type String @default("person") }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.defaults //--> [ Column { name: 'type' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="encrypted"></a>
      <H2>encrypted</H2>

      <section>
        <P>
          Returns all the <A href="/docs/references/client-api/config/column">
            columns
          </A> with the <C>@encrypted</C> attribute.
          Encrypted columns will automatically be encrypted when
          inserted into the database and decrypted when read from the
          database. 
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { email String @encrypted }'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.encrypted //--> [ Column { name: 'email' } ]`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="query"></a>
      <H2>query</H2>

      <section>
        <P>
          Returns the <C>@query</C> value. These are used to configure 
          the query builder by defining what column you want to return. 
          For example you may want to join tables in the results.
        </P>

        <H4>Schema Example</H4>

        <P>
          The following example will add the <C>user.*</C> columns to the
          query builder. This means that when you query 
          the <C>Profile</C> model, it will also return 
          the <C>user</C> columns joined per row. This is assuming that 
          the <C>Profile</C> model has a relation to 
          the <C>User</C> model.
        </P>

        <Code>{'model Profile @query([ "*" "user.*" ]) {}'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.query //--> [ '*', 'user.*' ]`}</Code>
        <Code>{`const results = await db.search({ columns: model.query })`}</Code>
        <Code>{`await server.resolve('profile-search', { columns: model.query })`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="restorable"></a>
      <H2>restorable</H2>

      <section>
        <P>
          Returns true if the model is restorable. This is determined 
          if at least one column has the <C>@active</C> attribute.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile { active Boolean @active }'}</Code>

        <H4>Code Example</H4>

        <Code>{'model.restorable //--> true'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="template"></a>
      <H2>template</H2>

      <section>
        <P>
          Returns the <C>@template</C> value. This value is used to 
          compute the label that will be represented for each row. This
          is useful for autocompletes fields and drop downs.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile @template("{{name}}") {}'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.template //--> '{{name}}'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="assert"></a>
      <H2>assert()</H2>

      <section>
        <P>
          Asserts the values and returns errors. If no errors, will 
          return <C>null</C>.
        </P>

        <Code>{`model.assert({ name: 'john' })`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="column"></a>
      <H2>column()</H2>

      <section>
        <P>
          Returns a column by name. If no column is found, it will return
          <C>undefined</C>.
        </P>

        <Code>{`model.column('name') //--> Column { name: 'name' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="filter"></a>
      <H2>filter()</H2>

      <section>
        <P>
          Removes values that are not columns
        </P>

        <Code>{`model.assert({ name: 'john', foo: bar }) //--> { name: 'john' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="from-snake"></a>
      <H2>fromSnake()</H2>

      <section>
        <P>
          Finds a column by snake case name. This was added to map 
          database column names to the model column names.
        </P>

        <Code>{`model.fromSnake('created_at') //--> Column { name: 'createdAt' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="input"></a>
      <H2>input()</H2>

      <section>
        <P>
          Removes values that are not columns or <E>(strict)</E> input 
          fields. This is useful for forms that only allow certain 
          fields to be submitted.
        </P>

        <H4>Schema Example</H4>

        <Code>{examples[7]}</Code>

        <H4>Code Example</H4>

        <Code>{`model.input({ name: 'john', email: 'john@email.com', foo: bar }) //--> { name, email }`}</Code>
        <Code>{`model.input({ name: 'john', email: 'john@email.com', foo: bar }, true) //--> { name }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="render"></a>
      <H2>render()</H2>

      <section>
        <P>
          Renders a template given the data.
        </P>

        <H4>Schema Example</H4>

        <Code>{'model Profile @template("Hi {{name}}") {}'}</Code>

        <H4>Code Example</H4>

        <Code>{`model.render({ name: 'john' }) //--> 'Hi john'`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="serialize"></a>
      <H2>serialize()</H2>

      <section>
        <P>
          Serializes values to be inserted into the database
        </P>

        <Code>{`model.serialize({ active: true, created: new Date }) //--> { active: 1, created: '2025-01-01T00:00:00Z' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="unserialize"></a>
      <H2>unserialize()</H2>

      <section>
        <P>
          Unserializes all values coming from the database.
        </P>

        <Code>{`model.unserialize({ active: 1, created: '2025-01-01T00:00:00Z' }) //--> { active: true, created: Date }`}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Client API', 
          href: '/docs/references/client-api' 
        }}
        next={{ 
          text: 'Column Configuration', 
          href: '/docs/references/client-api/config/column' 
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