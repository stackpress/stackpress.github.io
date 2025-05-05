//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H3, P, C, A, H, E, S, SS } from '../../components/index.js';
import { Nav, Note, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`// with .js
{ foo: 'bar', bar: \`foo\` }
[ "foo", "bar" ]
// with .idea
{ foo "bar" bar "foo" }
[ "foo" "bar" ]`,
//1-------------------------------------------------------------------//
`//comment line
prop X {} //right comment`,
//2-------------------------------------------------------------------// 
`prop X ✅ 
prop XY ✅ 
prop X1 ✅ 
prop Xy_z1 ✅ 
prop aBc1 ❌ //cannot start with a lower case
prop 1aBc ❌ //cannot start with a number
prop X-yz1 ❌ //dash is invalid`,
//3-------------------------------------------------------------------//
`//example of an Input field
prop Input { type "text" placeholder null hidden false }
//example of Shirt settings
prop Shirts { sizes ["xl" "sm" "md"] price 100.50 }
//example of a Price format
prop Price { min 0 max 100 step 0.01 }
//example of a list of countries
props Countries {
  options [
    { label "United States" value "US" }
    { label "Mexico" value "MX" }
    { label "Canada" value "CA" }
  ]
}`,
//4-------------------------------------------------------------------//
`model User {
  name String @field.input(Input)
}`,
//5-------------------------------------------------------------------//
`function transform({ schema }) {
  schema.props.Input //--> { type: "text", step: 1, placeholder: null, hidden: false }
}`,
//6-------------------------------------------------------------------//
`enum Roles {
  ADMIN "admin"
  MANAGER "manager"
  USER "user"
}

model User {
  roles Roles
}`,
//7-------------------------------------------------------------------//
`//currency is optional
currency String? 
//currencies is many string values
currencies String[]`,
//8-------------------------------------------------------------------//
`//a column named \`role\` that can be one of the valid roles in \`enum Role\`
role Roles @default("USER")
//a column named \`products\` containing a list of products in a \`Product\` model
products Product[]
//a column named \`author\` expressing the relation to a \`User\` model
author User @relation({ local "userId" foreign "id" })`,
//9-------------------------------------------------------------------//
`type Address {
  street       String   @label("Street Address")
                        @field.text
                        @is.required("Street is required")
                        @list.text @view.text

  city         String   @label("City")
                        @filterable
                        @field.text
                        @is.required("City is required")
                        @list.text @view.text
  
  country      String?  @label("Country")
                        @filterable @default("USA")
                        @field.country
                        @list.text @view.text
  
  postal       String   @label("Postal Code")
                        @filterable
                        @field.text
                        @is.required("Postal Code is required")
                        @list.text @view.text
}`,
//10------------------------------------------------------------------//
`model User @label("User" "Users") {
  addresses Address[] @label("Addresses")
}`,
//11------------------------------------------------------------------//
`model User @label("User" "Users") @icon("user") {
  id          String   @label("ID") 
                       @id @generated @default("cuid()")
                       @list.char({ hellip false length 8 })
  
  name        String   @label("Name") 
                       @searchable
                       @field.text
                       @is.required("Name is required")
                       @list.detail @view.text

  image       String?  @label("Image") 
                       @field.url
                       @list.image({ width 20 height 20 }) 
                       @view.image({ width 100 height 100 })
  
  role        Role     @label("Roles") 
                       @filterable @default("USER")
                       @field.select(Role)
                       @list.lower @view.lower
  
  tags        String[] @label("Tags") 
                       @field.tags
                       @list.hide
                       @view.tags
  
  references  Hash?    @label("References") 
                       @field.metadata
                       @list.hide
                       @view.metadata
  
  active      Boolean  @label("Active") 
                       @generated @active @default(true) 
                       @list.hide @view.yesno
  
  created     Datetime @label("Created") 
                       @generated @created @spanable @sortable @default("now()") 
                       @list.date("m d, Y h:iA") 
                       @view.date("m d, Y h:iA")
  
  updated     Datetime @label("Updated") 
                       @generated @updated @spanable @sortable @default("now()")
                       @list.date("m d, Y h:iA") 
                       @view.date("m d, Y h:iA")
    
  files       File[]       @label("Files")
  addresses   Address[]    @label("Addresses") @default("[]")
}`,
//12------------------------------------------------------------------//
`plugin "./docs/transform" {}`,
//13------------------------------------------------------------------//
`plugin "stackpress/sql/transform" {}`,
//14------------------------------------------------------------------//
`plugin "./docs/transform" {
  title "Documentation"
}`,
//13------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Form an Idea - Transform - Stackpress Documentation');
  const description = _(
    'The idea schema format is a loose meta language with simple and '
    + 'flexible syntax that any transformer can use as a basis to '
    + 'render code.'
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
        <a className="theme-tx0 block" href="#syntax">
          {_('Syntax')}
        </a>
        <a className="theme-tx0 block" href="#use">
          {_('Use')}
        </a>
        <a className="theme-tx0 block" href="#prop">
          {_('Props')}
        </a>
        <a className="theme-tx0 block" href="#enums">
          {_('Enums')}
        </a>
        <a className="theme-tx0 block" href="#attributes">
          {_('Attributes')}
        </a>
        <a className="theme-tx0 block" href="#columns">
          {_('Columns')}
        </a>
        <a className="theme-tx0 block" href="#types">
          {_('Types')}
        </a>
        <a className="theme-tx0 block" href="#models">
          {_('Models')}
        </a>
        <a className="theme-tx0 block" href="#plugins">
          {_('Plugins')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Form an Idea</H1>

      <P>
        The <SS>Idea</SS> schema format is a loose meta language with 
        simple and flexible syntax that any transformer can use as a 
        basis to render code. The following describes how to write an 
        idea using the schema format.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="syntax"></a>
      <H2>Syntax</H2>

      <section>
        <P>
          The syntax does not require the use of separators like 
          commas <H>,</H> and colons <H>:</H> because the parser can 
          logically make a determination of separations. To simplify 
          further, only double quotes <H>"</H> are used to represent 
          strings. Consider the following example.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          Use the double forward slash <H>//</H> to add a comment. 
          The parser will ignore anything after the slashes until the 
          next line. The following example shows how add comments.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          <SS>Idea</SS> has 6 block declarations including the following.
        </P>

        <ul className="px-lh-30 flex flex-wrap">
          <li className="px-pb-20 px-px-10">• <C>use</C></li>
          <li className="px-pb-20 px-px-10">• <C>prop</C></li>
          <li className="px-pb-20 px-px-10">• <C>enum</C></li>
          <li className="px-pb-20 px-px-10">• <C>type</C></li>
          <li className="px-pb-20 px-px-10">• <C>model</C></li>
          <li className="px-pb-20 px-px-10">• <C>plugin</C></li>
        </ul>

        <P>
          Every block declaration should start with one of these and 
          each have their own block syntax <E>(though most are similar)</E>.
        </P>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="use"></a>
      <H2>Use</H2>

      <section>
        <P>
          The <C>use</C> block is used to import other ideas into the 
          main idea. The syntax is as follows.
        </P>

        <Code>{'use "./another.idea"'}</Code>

        <P>
          The above example imports the <C>another.idea</C> file into
          the current idea. This is assuming the file is in the same
          directory as the current idea. You can also import ideas from 
          the <H>node_modules</H> directory in the following way.
        </P>

        <Code>{'use "stackpress/stackpress.idea"'}</Code>

        <P>
          The above example imports 
          the <C>stackpress/stackpress.idea</C> file into the current 
          idea where this file is a published package found in one of 
          your <H>node_modules</H> directories. If you have a serialized 
          idea in json format, you can import it as well like the 
          following example.
        </P>

        <Code>{'use "./another-idea.json"'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="prop"></a>
      <H2>Props</H2>

      <section>
        <P>
          A prop is a generic property that can be defined and referenced 
          in other props and attributes. Consider the following prop 
          definitions.
        </P>

        <Code>{`prop Input { type "text" step 1 placeholder null hidden false }`}</Code>

        <P>
          The above example explains attributes you would put in 
          an <C>{'<input />'}</C> field. In JavaScript, the above prop 
          would look like the following.
        </P>

        <Code>{`const Input = { type: "text", step: 1, placeholder: null, hidden: false }`}</Code>

        <P>
          A prop starts with the block declaration <C>prop</C> followed 
          by a name. A prop name is a string that starts with a capital
          letter followed by any letter <E>(upper or lower case)</E>, 
          number and underscore. The following several examples of valid 
          and invalid prop names.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          All props are represened as a key value pairs. For each pair, 
          the key name starts with a letter <E>(upper or lower case)</E>,
          followed by any letter <E>(upper or lower case)</E>, number,
          and underscore. A pair starts with the key name, followed by 
          a space, and then the value. A value can be a string, number,
          boolean, null, array, or object. The following examples show
          how to define props with different types of values.
        </P>

        <Code>{examples[3]}</Code>

        <P>
          Once a prop is defined, it can be used in other props and 
          attributes. The following example of a <C>User</C> model shows 
          using the <C>Input</C> prop in an attribute.
        </P>

        <Code>{examples[4]}</Code>

        <P>
          Props can also be extracted from a plugin like the following 
          example.
        </P>

        <Code>{examples[5]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="enums"></a>
      <H2>Enums</H2>

      <section>
        <P>
          An enum is a pretermined list of values. Enums can be used as 
          a property type. Consider the following example.
        </P>

        <Code>{examples[6]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="attributes"></a>
      <H2>Attributes</H2>

      <section>
        <P>
          Attributes can be attached 
          to <A href="#columns">columns</A>, <A href="#types">types</A>, 
          and <A href="#models">models</A>. Attributes always start with 
          the at symbol <C>@</C> followed by letters, numbers and 
          periods. Attributes can also be expressed as a function with 
          multiple arguments. Consider the following basic attribute.
        </P>

        <Code>{'@filterable'}</Code>

        <P>
          The above example is a simple attribute 
          called <C>filterable</C>. Attributes not expressed as 
          functions like this are evaluated as <C>true</C>. The 
          following are examples of attribute functions.
        </P>

        <Code>{'@is.gt(4 "Should be greater than 4")'}</Code>
        <Code>{'@field.input({ placeholder "Enter name" })'}</Code>

        <P>
          The above examples show how to use attributes as functions. 
          The first example is a function called <C>is.gt</C> with two 
          arguments. The first argument is a number and the second is a 
          string. The second example is a function called 
          <C>field.input</C> with an object as an argument. The object 
          has a single key value pair.
        </P>

        <Note>
          You can add any kind of arbitrary attribute you want in an 
          idea file, but it is up to transformers to recognize and 
          process it. This means you can provision future attributes.
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="columns"></a>
      <H2>Columns</H2>

      <section>
        <P>
          Columns are found in the body 
          of <A href="#types">types</A> and <A href="#models">models</A>. 
          The column syntax starts with a name, then a type, and any 
          combination of attributes. Consider the following example 
          where currency is an arbitrary name, and String is a type.
        </P>

        <Code>{`currency String @filterable @default("USD")`}</Code>

        <P>
          Column types can be expressed as optional or multiple like 
          the following example.
        </P>

        <Code>{examples[7]}</Code>

        <P>
          While types are technically arbitrary as well, most transformers 
          would know how to process natural and referenced column types.
        </P>

        <H3>Natural Types</H3>

        <P>
          Transformers <E>(like database and typesafe transformers)</E> rely 
          on column types that are both generic and predictable enough to 
          expect to generate code.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">
            • <S>String</S> - A short string usually under 255 characters
          </li>
          <li className="px-pb-20">
            • <S>Text</S> - A long string usually over 255 characters
          </li>
          <li className="px-pb-20">
            • <S>Number</S> - An integer or a float
          </li>
          <li className="px-pb-20">
            • <S>Integer</S> - Strictly an integer value
          </li>
          <li className="px-pb-20">
            • <S>Float</S> - Strictly a float or decimal value
          </li>
          <li className="px-pb-20">
            • <S>Boolean</S> - Specifically <C>true</C> or <C>false</C>
          </li>
          <li className="px-pb-20">
            • <S>Date</S> - A Date object or valid date string
          </li>
          <li className="px-pb-20">
            • <S>Datetime</S> - A Date object or valid datetime string
          </li>
          <li className="px-pb-20">
            • <S>Time</S> - A Date object or valid time string
          </li>
          <li className="px-pb-20">
            • <S>Json</S> - An object
          </li>
          <li className="px-pb-20">
            • <S>Object</S> - An object
          </li>
          <li className="px-pb-20">
            • <S>Hash</S> - An object
          </li>
        </ul>

        <H3>Referenced Types</H3>

        <P>
          Types can also reference <A href="#enums">enums</A>, 
          other <A href="#types">types</A> and models. Consider the 
          following example.
        </P>

        <Code>{examples[8]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="types"></a>
      <H2>Types</H2>

      <section>
        <P>
          A composite type is used to define specifics of a JSON column 
          in a model. Consider the following example.
        </P>

        <Code>{examples[9]}</Code>
        
        <P>
          Types can also be used in models. The following example
          shows how to use the <C>Address</C> type in a <C>User</C>
          model.
        </P>

        <Code>{examples[10]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="models"></a>
      <H2>Models</H2>

      <section>
        <P>
          A model is a representation of a database table or collection. 
          It uses <A href="#prop">props</A> and <A href="#types">types</A>. 
          Consider the following example.
        </P>

        <Code>{examples[11]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="plugins"></a>
      <H2>Plugins</H2>

      <section>
        <P>
          A plugin is a way to tell <SS>Idea</SS> to run which 
          transformers once the <SS>Idea</SS> file parses down to JSON. 
          The following example shows how to declare a plugin.
        </P>

        <Code>{examples[12]}</Code>
        <P>
          The above example shows how to declare a plugin in the
          current directory where as <C>"./docs/transform"</C> would 
          try to resolve to one of the following possibilities. 
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">
            • <H>[cwd]/docs/transform.js</H>
          </li>
          <li className="px-pb-20">
            • <H>[cwd]/docs/transform/index.js</H>
          </li>
        </ul>

        <P>
          The following example shows how to
          declare a plugin in the <H>node_modules</H> directory.
        </P>

        <Code>{examples[13]}</Code>
        
        <P>
          The above example shows how to declare a 
          plugin <C>"stackpress/sql/transform"</C> which is 
          an <SS>Idea</SS> plugin found in 
          the <H>node_modules</H> directory. Each plugin declared can 
          accept configuration options. The following example shows how 
          to declare a plugin with options.
        </P>

        <Code>{examples[14]}</Code>

        <P>
          The above example shows how to declare a plugin with 
          configuration options. The options are passed as an object 
          with key value pairs. 
        </P>
      </section>

      <Nav
        next={{ 
          text: 'Generate an Idea', 
          href: '/docs/transform/generate-idea' 
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