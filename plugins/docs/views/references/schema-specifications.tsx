//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, H2, C, P, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Schema Specifications - Stackpress Documentation');
  const description = _(
    'The following attributes used in an Idea file are accepted by '
    + 'Stackpress'
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
        <a className="theme-tx0 block" href="#admin-config">
          {_('1. Admin Config')}
        </a>
        <a className="theme-tx0 block" href="#api-config">
          {_('2. API Config')}
        </a>
        <a className="theme-tx0 block" href="#auth-config">
          {_('3. Auth Config')}
        </a>
        <a className="theme-tx0 block" href="#brand-config">
          {_('4. Brand Config')}
        </a>
        <a className="theme-tx0 block" href="#client-config">
          {_('5. Client Config')}
        </a>
        <a className="theme-tx0 block" href="#cookie-config">
          {_('6. Cookie Config')}
        </a>
        <a className="theme-tx0 block" href="#database-config">
          {_('7. Database Config')}
        </a>
        <a className="theme-tx0 block" href="#email-config">
          {_('8. Email Config')}
        </a>
        <a className="theme-tx0 block" href="#language-config">
          {_('9. Language Config')}
        </a>
        <a className="theme-tx0 block" href="#server-config">
          {_('10. Server Config')}
        </a>
        <a className="theme-tx0 block" href="#session-config">
          {_('11. Session Config')}
        </a>
        <a className="theme-tx0 block" href="#view-config">
          {_('12. View Config')}
        </a>
        <a className="theme-tx0 block" href="#typings">
          {_('13. Typings')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Schema Specifications</H1>

      <P>
        The following attributes can be used in an <SS>Idea</SS> file  
        in which will be accepted and processed in 
        a <SS>Stackpress</SS> project.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="model-spec"></a>
      <H2>1. Model Spec</H2>

      <section>
        <P>
          The following attributes can be applied to model types in an 
          idea file.
        </P>

        <Code>{'model User @icon("user") @label("User" "Users") {}'}</Code>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attribute</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Description</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attributes</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Example</Thead>
            <Trow>
              <Tcol className="text-left"><C>{'@icon(string)'}</C></Tcol>
              <Tcol className="text-left">An icon representation of a model. Uses font awesome names.</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left"><C>{'@icon("user")'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@template(string)'}</C></Tcol>
              <Tcol className="text-left">Used to describe each row in a model</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left"><C>{'@template("User {{name}}")'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@label(string string)'}</C></Tcol>
              <Tcol className="text-left">A friendly name that represents the model</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left"><C>{'@label("User" "Users")'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@active'}</C></Tcol>
              <Tcol className="text-left">
                A flag that represents the active field. Active fields are 
                changed when deleting or restoring a row, as an alternative to 
                actually deleting the row in the database.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@default(string|number|boolean)'}</C></Tcol>
              <Tcol className="text-left">
                The default value applied when creating a row if no value 
                was provided.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">
                <C>{'@default(1)'}</C>
                <br /><C>{'@default("user")'}</C>
                <br /><C>{'@default(true)'}</C>
                <br /><C>{'@default("now()")'}</C>
                <br /><C>{'@default("nanoid()")'}</C>
                <br /><C>{'@default("nanoid(10)")'}</C>
                <br /><C>{'@default("cuid()")'}</C>
                <br /><C>{'@default("cuid(10)")'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@generated'}</C></Tcol>
              <Tcol className="text-left">
                A flag that represents that the value of this column is 
                generated, bypassing the need to be validated
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@id'}</C></Tcol>
              <Tcol className="text-left">
                A flag that represents the models identifier. If multiple ids 
                then the combination will be used to determine each rows 
                uniqueness.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@searchable'}</C></Tcol>
              <Tcol className="text-left">
                A flag deonoting this column is searchable and will be 
                considered in a search field for example. Also used to know 
                which columns need to be optimized in the database.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@sortable'}</C></Tcol>
              <Tcol className="text-left">
                A flag deonoting this column is sortable. Also used to know 
                which columns need to be optimized in the database.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@label(string)'}</C></Tcol>
              <Tcol className="text-left">
                A label that will be shown to represent this column instead of 
                the actual column name.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left"><C>{'@label("Name")'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@min(number)'}</C></Tcol>
              <Tcol className="text-left">
                The minimum number value that will be accepted. This is also a 
                consideration when determining the database type.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left"><C>{'@min(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@max(number)'}</C></Tcol>
              <Tcol className="text-left">
                The maximum number value that will be accepted. This is also a 
                consideration when determining the database type.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left"><C>{'@max(100)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@step(number)'}</C></Tcol>
              <Tcol className="text-left">
                The incremental amount value that will be used when changing 
                the columns value. This is also a consideration when determining 
                the database type.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">
                <C>{'@step(1)'}</C>
                <br /><C>{'@step(0.01)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@relation(config)'}</C></Tcol>
              <Tcol className="text-left">Maps columns in the model that is related to another model.</Tcol>
              <Tcol className="text-left">
                local: string
                <br />foreign: string
                <br />name?: string
              </Tcol>
              <Tcol className="text-left">
                <C>{'@relation({ local "userId" foreign "id" })'}</C>
                <br /><C>{'@relation({ name "memberships" local "ownerId" foreign "id" })'}</C>
                <br /><C>{'@relation({ name "connections" local "memberId" foreign "id" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@unique'}</C></Tcol>
              <Tcol className="text-left">
                A flag that ensures no duplicate value can be added to the model
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@updated'}</C></Tcol>
              <Tcol className="text-left">
                A flag that will automatically update the timestamp whenever 
                a row is changed.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="validation-spec"></a>
      <H2>2. Validation Spec</H2>

      <section>
        <P>
          The following validation attributes can be applied to model 
          columns in an idea file.
        </P>

        <Code>{'name String @is.required @is.cgt(10)'}</Code>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attribute</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Description</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Example</Thead>
            <Trow>
              <Tcol className="text-left"><C>{'@is.required'}</C></Tcol>
              <Tcol className="text-left">Validates that a value must be given before being inserted.</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.notempty'}</C></Tcol>
              <Tcol className="text-left">
                Validates that a value is something as opposed to an empty string.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.eq(string|number)'}</C></Tcol>
              <Tcol className="text-left">
                Validates that the value is explicitly equal to the given argument
              </Tcol>
              <Tcol className="text-left">
                <C>{'@is.eq(10)'}</C>
                <br /><C>{'@is.eq("foobar")'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.ne(string|number)'}</C></Tcol>
              <Tcol className="text-left">
                Validates that the value is explicitly not equal to the given argument
              </Tcol>
              <Tcol className="text-left">
                <C>{'@is.neq(10)'}</C>
                <br /><C>{'@is.neq("foobar")'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.option(string|number[])'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is one of the given options</Tcol>
              <Tcol className="text-left"><C>{'@is.option([ 1 2 "foo" 3 "bar" ])'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.regex(string)'}</C></Tcol>
              <Tcol className="text-left">
                Validates that the value matches the given regular expression
              </Tcol>
              <Tcol className="text-left"><C>{'@is.regex("[a-z]$")'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.date'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a date</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.future'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a future date</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.past'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a past date</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.present'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is the present date</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.gt(number)'}</C></Tcol>
              <Tcol className="text-left">Validate that the value is greater than the given number</Tcol>
              <Tcol className="text-left"><C>{'@is.gt(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.ge(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the value is greater than or equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.ge(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.lt(number)'}</C></Tcol>
              <Tcol className="text-left">Validate that the value is less than the given number</Tcol>
              <Tcol className="text-left"><C>{'@is.lt(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.le(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the value is less than or equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.le(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.ceq(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the character count of the value 
                is equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.ceq(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.cgt(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the character count of the value is greater 
                than or equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.cle(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.cge(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the character count of the value is 
                less than the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.cge(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.clt(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the character count of the value is 
                less than or equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.clt(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.cle(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the character count of the value is less 
                than or equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.cle(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.weq(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the word count of the value is 
                equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.weq(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.wgt(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the word count of the value is greater 
                than or equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.wle(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.wge(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the word count of the value is less 
                than the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.wge(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.wlt(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the word count of the value is less than 
                or equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.wlt(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.wle(number)'}</C></Tcol>
              <Tcol className="text-left">
                Validate that the word count of the value is less than 
                or equal to the given number
              </Tcol>
              <Tcol className="text-left"><C>{'@is.wle(10)'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.cc'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a credit card</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.color'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a color value (color name or hex)</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.email'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is an email</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.hex'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a hexidecimal</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.price'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a price number (ie. 2 decimal numbers)</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.url'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a URL</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.boolean'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a boolean</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.number'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a number format</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.float'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is a float format</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.integer'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is an integer format</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@is.object'}</C></Tcol>
              <Tcol className="text-left">Validates that the value is an object</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="field-spec"></a>
      <H2>3. Field Spec</H2>

      <section>
        <P>
          The following fields can be applied to model columns in an 
          idea file.
        </P>

        <Code>{'name String @field.text'}</Code>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attribute</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Description</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attributes</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Example</Thead>
            <Trow>
              <Tcol className="text-left"><C>{'@field.color'}</C></Tcol>
              <Tcol className="text-left">Use a color field to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.checkbox(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a checkbox to represent this column in a form</Tcol>
              <Tcol className="text-left">
                label: string 
                <br />check: boolean 
                <br />circle: boolean
                <br />square: boolean
                <br />rounded: boolean
                <br />blue: boolean
                <br />orange: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@field.checkbox'}</C>
                <br /><C>{'@field.checkbox({ label "Enabled" circle true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.country(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a country dropdown to represent this column in a form</Tcol>
              <Tcol className="text-left">placeholder: string</Tcol>
              <Tcol className="text-left">
                <C>{'@field.country'}</C>
                <br /><C>{'@field.country({ placeholder "Select Country" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.currency(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a currency dropdown to represent this column in a form</Tcol>
              <Tcol className="text-left">placeholder: string</Tcol>
              <Tcol className="text-left">
                <C>{'@field.currency'}</C>
                <br /><C>{'@field.currency({ placeholder "Select Currency" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.date'}</C></Tcol>
              <Tcol className="text-left">Use a date field to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.datetime'}</C></Tcol>
              <Tcol className="text-left">Use a date time field to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.editor(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a code editor to represent this column in a form</Tcol>
              <Tcol className="text-left">
                lang: html|md|css|js|ts
                <br />numbers: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@field.editor'}</C>
                <br /><C>{'@field.editor({ lang "html" numbers true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.file'}</C></Tcol>
              <Tcol className="text-left">Use a file input to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.filelist'}</C></Tcol>
              <Tcol className="text-left">Use a file list fieldset to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.input'}</C></Tcol>
              <Tcol className="text-left">Use an input field to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.markdown(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a markdown editor to represent this column in a form</Tcol>
              <Tcol className="text-left">numbers: boolean</Tcol>
              <Tcol className="text-left">
                <C>{'@field.markdown'}</C>
                <br /><C>{'@field.markdown({ numbers true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.mask(attributes)'}</C></Tcol>
              <Tcol className="text-left">Use an input mask to represent this column in a form</Tcol>
              <Tcol className="text-left">mask: string</Tcol>
              <Tcol className="text-left">
                <C>{'@field.mask'}</C>
                <br /><C>{'@field.mask({ mask "999-999-999" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.metadata'}</C></Tcol>
              <Tcol className="text-left">Use a key value fieldset to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.number(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a number field to represent this column in a form</Tcol>
              <Tcol className="text-left">
                min: number
                <br />max: number
                <br />step: number
                <br />separator: string 
                <br />decimal: string
                <br />absolute: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@field.number'}</C>
                <br /><C>{'@field.number({ min 0 max 10 step 0.01 separator "," decimal "." absolute true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.password'}</C></Tcol>
              <Tcol className="text-left">Uses a password field to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.range(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a range field to represent this column in a form</Tcol>
              <Tcol className="text-left">
                min: number
                <br />max: number
                <br />step: number
                <br />width: number
              </Tcol>
              <Tcol className="text-left">
                <C>{'@field.range'}</C>
                <br /><C>{'@field.range({ min 0 max 10 step 0.01 width 100 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.rating(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a rating field to represent this column in a form</Tcol>
              <Tcol className="text-left">max: number</Tcol>
              <Tcol className="text-left">
                <C>{'@field.rating'}</C>
                <br /><C>{'@field.rating({ max 5 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.select(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a select dropdown to represent this column in a form</Tcol>
              <Tcol className="text-left">placeholder: string</Tcol>
              <Tcol className="text-left">
                <C>{'@field.select'}</C>
                <br /><C>{'@field.select({ placeholder "Select Country" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.slug'}</C></Tcol>
              <Tcol className="text-left">
                Uses an input field that transforms the value 
                into a slug to represent this column in a form
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.switch(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a switch toggle to represent this column in a form</Tcol>
              <Tcol className="text-left">
                rounded: boolean
                <br />onoff: boolean
                <br />yesno: boolean
                <br />checkex: boolean
                <br />sunmoon: boolean
                <br />ridge: boolean
                <br />smooth: boolean
                <br />blue: boolean
                <br />orange: boolean
                <br />green: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@field.switch'}</C>
                <br /><C>{'@field.switch({ label "Enabled" yesno true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.textarea(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a textarea field to represent this column in a form</Tcol>
              <Tcol className="text-left">rows: number</Tcol>
              <Tcol className="text-left">
                <C>{'@field.textarea'}</C>
                <br /><C>{'@field.textarea({ rows 10 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.taglist'}</C></Tcol>
              <Tcol className="text-left">Uses a tag field to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.textlist'}</C></Tcol>
              <Tcol className="text-left">Uses a text list fieldset to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.time'}</C></Tcol>
              <Tcol className="text-left">Uses a time field to represent this column in a form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@field.wysiwyg(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a WYSIWYG to represent this column in a form</Tcol>
              <Tcol className="text-left">
                history: boolean
                <br />font: boolean
                <br />size: boolean
                <br />format: boolean
                <br />paragraph: boolean
                <br />blockquote: boolean
                <br />style: boolean
                <br />color: boolean
                <br />highlight: boolean
                <br />text: boolean
                <br />remove: boolean
                <br />indent: boolean
                <br />align: boolean
                <br />rule: boolean
                <br />list: boolean
                <br />lineheight: boolean
                <br />table: boolean
                <br />link: boolean
                <br />image: boolean
                <br />video: boolean
                <br />audio: boolean
                <br />fullscreen: boolean
                <br />showblocks: boolean
                <br />code: boolean
                <br />dir: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@field.wysiwyg'}</C>
                <br /><C>{'@field.wysiwyg({ font true size true format true })'}</C>
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="filter-spec"></a>
      <H2>4. Filter Spec</H2>

      <section>
        <P>
          The following filter fields can be applied to model columns in 
          an idea file.
        </P>

        <Code>{'name String @field.text'}</Code>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attribute</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Description</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attributes</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Example</Thead>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.color'}</C></Tcol>
              <Tcol className="text-left">Use a color field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.checkbox(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a checkbox to represent this column in a filter form</Tcol>
              <Tcol className="text-left">
                label: string 
                <br />check: boolean 
                <br />circle: boolean
                <br />square: boolean
                <br />rounded: boolean
                <br />blue: boolean
                <br />orange: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@filter.checkbox'}</C>
                <br /><C>{'@filter.checkbox({ label "Enabled" circle true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.country(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a country dropdown to represent this column in a filter form</Tcol>
              <Tcol className="text-left">placeholder: string</Tcol>
              <Tcol className="text-left">
                <C>{'@filter.select'}</C>
                <br /><C>{'@filter.select({ placeholder "Select Country" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.currency(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a currency dropdown to represent this column in a filter form</Tcol>
              <Tcol className="text-left">placeholder: string</Tcol>
              <Tcol className="text-left">
                <C>{'@filter.currency'}</C>
                <br /><C>{'@filter.currency({ placeholder "Select Currency" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.date'}</C></Tcol>
              <Tcol className="text-left">Use a date field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.datetime'}</C></Tcol>
              <Tcol className="text-left">Use a date time field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.file'}</C></Tcol>
              <Tcol className="text-left">Use a file input to represent this column in a filter form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.input'}</C></Tcol>
              <Tcol className="text-left">Use an input field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.mask(attributes)'}</C></Tcol>
              <Tcol className="text-left">Use an input mask to represent this column in a filter form</Tcol>
              <Tcol className="text-left">mask: string</Tcol>
              <Tcol className="text-left">
                <C>{'@filter.mask'}</C>
                <br /><C>{'@filter.mask({ mask "999-999-999" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.number(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a number field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">
                min: number
                <br />max: number
                <br />step: number
                <br />separator: string 
                <br />decimal: string
                <br />absolute: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@filter.number'}</C>
                <br /><C>{'@filter.number({ min 0 max 10 step 0.01 separator "," decimal "." absolute true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.password'}</C></Tcol>
              <Tcol className="text-left">Uses a password field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.range(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a range field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">
                min: number
                <br />max: number
                <br />step: number
                <br />width: number
              </Tcol>
              <Tcol className="text-left">
                <C>{'@filter.range'}</C>
                <br /><C>{'@filter.range({ min 0 max 10 step 0.01 width 100 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.rating(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a rating field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">max: number</Tcol>
              <Tcol className="text-left">
                <C>{'@filter.rating'}</C>
                <br /><C>{'@filter.rating({ max 5 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.select(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a select dropdown to represent this column in a filter form</Tcol>
              <Tcol className="text-left">placeholder: string</Tcol>
              <Tcol className="text-left">
                <C>{'@filter.select'}</C>
                <br /><C>{'@filter.select({ placeholder "Select Country" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.slug'}</C></Tcol>
              <Tcol className="text-left">
                Uses an input field that transforms the value into a slug to 
                represent this column in a filter form
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.switch(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a switch toggle to represent this column in a filter form</Tcol>
              <Tcol className="text-left">
                rounded: boolean
                <br />onoff: boolean
                <br />yesno: boolean
                <br />checkex: boolean
                <br />sunmoon: boolean
                <br />ridge: boolean
                <br />smooth: boolean
                <br />blue: boolean
                <br />orange: boolean
                <br />green: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@filter.switch'}</C>
                <br /><C>{'@filter.switch({ label "Enabled" yesno true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@filter.time'}</C></Tcol>
              <Tcol className="text-left">Uses a time field to represent this column in a filter form</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="spans"></a>
      <H2>5. Spans</H2>

      <section>
        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attribute</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Description</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attributes</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Example</Thead>
            <Trow>
              <Tcol className="text-left"><C>{'@span.date'}</C></Tcol>
              <Tcol className="text-left">
                Use a pair of date fields as a span to represent 
                this column in a filter form
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@span.datetime'}</C></Tcol>
              <Tcol className="text-left">
                Use a pair of date time fields as a span to represent 
                this column in a filter form
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@span.input'}</C></Tcol>
              <Tcol className="text-left">
                Use a pair of input fields as a span to represent 
                this column in a filter form
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@span.number(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Use a pair of number fields as a span to represent 
                this column in a filter form
              </Tcol>
              <Tcol className="text-left">
                min: number
                <br />max: number
                <br />step: number
                <br />separator: string 
                <br />decimal: string
                <br />absolute: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@span.number'}</C>
                <br /><C>{'@span.number({ min 0 max 10 step 0.01 separator "," decimal "." absolute true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@span.range(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a range field as a span to represent this column in a filter form</Tcol>
              <Tcol className="text-left">
                min: number
                <br />max: number
                <br />step: number
                <br />width: number
              </Tcol>
              <Tcol className="text-left">
                <C>{'@span.range'}</C>
                <br /><C>{'@span.range({ min 0 max 10 step 0.01 width 100 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@span.rating(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Use a pair of rating fields as a span to represent 
                this column in a filter form
              </Tcol>
              <Tcol className="text-left">max: number</Tcol>
              <Tcol className="text-left">
                <C>{'@span.rating'}</C>
                <br /><C>{'@span.rating({ max 5 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@span.select(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Use a pair of select dropdowns as a span to represent this column in a filter form</Tcol>
              <Tcol className="text-left">placeholder: string</Tcol>
              <Tcol className="text-left">
                <C>{'@span.select'}</C>
                <br /><C>{'@span.select({ placeholder "Select Country" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@span.time'}</C></Tcol>
              <Tcol className="text-left">
                Use a pair of time fields as a span to represent this 
                column in a filter form
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="list-spec"></a>
      <H2>6. List Spec</H2>

      <section>
        <P>
          The following list format fields can be applied to model columns 
          in an idea file.
        </P>

        <Code>{'created Datetime @list.date({ locale "en" })'}</Code>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attribute</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Description</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attributes</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Example</Thead>
            <Trow>
              <Tcol className="text-left"><C>{'@list.hide'}</C></Tcol>
              <Tcol className="text-left">Hides this column in a formatted list of results</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.code(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a code format to represent this column in a 
                formatted list of results
              </Tcol>
              <Tcol className="text-left">
                lang: string
                <br />numbers: boolean 
                <br />inline: boolean
                <br />trim: boolean
                <br />ltrim: boolean
                <br />rtrim: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.code'}</C>
                <br /><C>{'@list.code(lang "en" trim true)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.color(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a code color to represent this column in a 
                formatted list of results
              </Tcol>
              <Tcol className="text-left">box: boolean<br />text: boolean</Tcol>
              <Tcol className="text-left">
                <C>{'@list.color'}</C>
                <br /><C>{'@list.color(box true text true)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.country(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a country format to represent this column 
                in a formatted list of results
              </Tcol>
              <Tcol className="text-left">flag: boolean<br />text: boolean</Tcol>
              <Tcol className="text-left">
                <C>{'@list.country'}</C>
                <br /><C>{'@list.country(flag true text true)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.currency(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a currency format to represent this column 
                in a formatted list of results
              </Tcol>
              <Tcol className="text-left">
                flag: boolean
                <br />text: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.currency'}</C>
                <br /><C>{'@list.currency(flag true text true)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.date(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a date format to represent this column 
                in a formatted list of results
              </Tcol>
              <Tcol className="text-left">
                locale: string
                <br />format: string
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.date'}</C>
                <br /><C>{'@list.date(locale "en" format "MMMM D, YYYY, h:mm:ss a")'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.email'}</C></Tcol>
              <Tcol className="text-left">
                Uses an email format to represent this column in a 
                formatted list of results
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.formula(attributes)'}</C></Tcol>
              <Tcol className="text-left">
                Outputs the value of the given formula in a formatted list of results
              </Tcol>
              <Tcol className="text-left">
                formula: string
                <br />data: object
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.formula(formula "{x} + {this} + {y}" data { x 3 y 4 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.html(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a raw HTML format to represent this 
                column in a formatted list of results
              </Tcol>
              <Tcol className="text-left">
                ordered: boolean
                <br />indent: number
                <br />spacing: number
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.html'}</C>
                <br /><C>{'@list.html({ ordered true indent 10 spacing 10 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.image'}</C></Tcol>
              <Tcol className="text-left">
                Uses a image format to represent this column 
                in a formatted list of results
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.imagelist'}</C></Tcol>
              <Tcol className="text-left">
                Uses an image carousel to represent this column in a 
                formatted list of results. Ideally for an array of strings.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.json'}</C></Tcol>
              <Tcol className="text-left">
                Uses a json format to represent this column in a formatted 
                list of results. Ideally for arrays or objects.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.link'}</C></Tcol>
              <Tcol className="text-left">
                Uses a clickable link to represent this column 
                in a formatted list of results
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.list'}</C></Tcol>
              <Tcol className="text-left">
                Uses a list (ordered or unordered) to represent this 
                column in a formatted list of results. Ideally for an 
                array of strings
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.markdown'}</C></Tcol>
              <Tcol className="text-left">
                Converts the column value from markdown to raw HTML 
                to represent this column in a formatted list of results
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.metadata(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Outputs the keys and values of the columns value in 
                tabular format. Ideally for a key value object.
              </Tcol>
              <Tcol className="text-left">
                padding: number
                <br />align: left|right|center
                <br />format: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.metadata'}</C>
                <br /><C>{'@list.metadata({ padding 10 align "left" format true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.number(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a number format to represent this column in 
                a formatted list of results
              </Tcol>
              <Tcol className="text-left">
                separator: string
                <br />decimal: string
                <br />decimals: number
                <br />absolute: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.number'}</C>
                <br /><C>{'@list.number({ separator "," decimal "." decimals 4 absolute true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.overflow(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a format that considers text overflows to represent 
                this column in a formatted list of results
              </Tcol>
              <Tcol className="text-left">
                length: number
                <br />words: boolean
                <br />hellip: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.overflow'}</C>
                <br /><C>{'@list.overflow({ length 10 words true hellip true})'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.phone(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a phone format to represent this column in a 
                formatted list of results
              </Tcol>
              <Tcol className="text-left">label: string</Tcol>
              <Tcol className="text-left">
                <C>{'@list.phone'}</C>
                <br /><C>{'@list.phone({ label "Call Me Maybe" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.rating(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a rating format to represent this column 
                in a formatted list of results
              </Tcol>
              <Tcol className="text-left">
                max: number
                <br />remainder: boolean
                <br />round: round|ceil|floor
                <br />spacing: number
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.rating'}</C>
                <br /><C>{'@list.rating({ max 5 remainder true round "floor" spacing 10 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.separated(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a separator format to represent this column in a 
                formatted list of results. Ideally for an array of strings.
              </Tcol>
              <Tcol className="text-left">separator: string</Tcol>
              <Tcol className="text-left">
                <C>{'@list.separated'}</C>
                <br /><C>{'@list.separated({ separator ", " })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.table(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a tablular format to represent this column in a formatted 
                list of results. Ideally for an array of objects.
              </Tcol>
              <Tcol className="text-left">
                top: boolean
                <br />left: boolean
                <br />right: boolean
                <br />padding: number
                <br />align: left|right|center
                <br />background: color
                <br />border: color
                <br />header: color
                <br />stripe: color
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.table'}</C>
                <br /><C>{'@list.table({ align "left" top true padding 100 background "blue" header "#CCC" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.taglist(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a tag list format to represent this column in a formatted 
                list of results. Ideally for an array of strings.
              </Tcol>
              <Tcol className="text-left">
                curved: boolean
                <br />rounded: boolean
                <br />pill: boolean
                <br />info: boolean
                <br />warning: boolean
                <br />success: boolean
                <br />error: boolean
                <br />muted: boolean
                <br />primary: boolean
                <br />color: color
                <br />secondary: boolean
                <br />outline: boolean
                <br />solid: boolean
                <br />transparent: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.taglist'}</C>
                <br /><C>{'@list.taglist({ curved true info true outline true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.template(attributes)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a template to generate a text to represent 
                this column in a formatted list of results
              </Tcol>
              <Tcol className="text-left">template: string</Tcol>
              <Tcol className="text-left"><C>{'@list.template({ template "{{foo}} and {{bar}}" })'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.text(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a text format to represent this column in 
                a formatted list of results
              </Tcol>
              <Tcol className="text-left">
                upper: boolean
                <br />lower: boolean
                <br />capital: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@list.text'}</C>
                <br /><C>{'@list.text({ upper true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@list.yesno(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Converts a boolean to a string representation to 
                represent this column in a formatted list of results
              </Tcol>
              <Tcol className="text-left">yes: string<br />no: string</Tcol>
              <Tcol className="text-left">
                <C>{'@list.yesno'}</C>
                <br /><C>{'@list.yesno({ yes "Yep" no "Nah" })'}</C>
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>
      
      {/*------------------------------------------------------------*/}

      <a id="view-spec"></a>
      <H2>7. View Spec</H2>

      <section>
        <P>
          The following view format fields can be applied to model columns 
          in an idea file.
        </P>

        <Code>{'created Datetime @view.date({ locale "en" })'}</Code>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attribute</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Description</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Attributes</Thead>
            <Thead wrap2 className="theme-bg-bg2 text-left">Example</Thead>
            <Trow>
              <Tcol className="text-left"><C>{'@view.hide'}</C></Tcol>
              <Tcol className="text-left">Hides this column in a view</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.code(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a code format to represent this column in a view</Tcol>
              <Tcol className="text-left">
                lang: string
                <br />numbers: boolean 
                <br />inline: boolean
                <br />trim: boolean
                <br />ltrim: boolean
                <br />rtrim: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.code'}</C>
                <br /><C>{'@view.code(lang "en" trim true)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.color(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a code color to represent this column in a view</Tcol>
              <Tcol className="text-left">box: boolean<br />text: boolean</Tcol>
              <Tcol className="text-left">
                <C>{'@view.color'}</C>
                <br /><C>{'@view.color(box true text true)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.country(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a country format to represent this column in a view</Tcol>
              <Tcol className="text-left">flag: boolean<br />text: boolean</Tcol>
              <Tcol className="text-left">
                <C>{'@view.country'}</C>
                <br /><C>{'@view.country(flag true text true)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.currency(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a currency format to represent this column in a view</Tcol>
              <Tcol className="text-left">flag: boolean<br />text: boolean</Tcol>
              <Tcol className="text-left">
                <C>{'@view.currency'}</C>
                <br /><C>{'@view.currency(flag true text true)'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.date(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a date format to represent this column in a view</Tcol>
              <Tcol className="text-left">locale: string<br />format: string</Tcol>
              <Tcol className="text-left">
                <C>{'@view.date'}</C>
                <br /><C>{'@view.date(locale "en" format "MMMM D, YYYY, h:mm:ss a")'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.email'}</C></Tcol>
              <Tcol className="text-left">Uses an email format to represent this column in a view</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.formula(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Outputs the value of the given formula in a view</Tcol>
              <Tcol className="text-left">formula: string</Tcol>
              <Tcol className="text-left"><C>{'@view.formula(formula "{x} + {this} + {y}" data { x 3 y 4 })'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.html(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a raw HTML format to represent this column in a view</Tcol>
              <Tcol className="text-left">
                ordered: boolean
                <br />indent: number
                <br />spacing: number
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.html'}</C>
                <br /><C>{'@view.html({ ordered true indent 10 spacing 10 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.image'}</C></Tcol>
              <Tcol className="text-left">Uses a image format to represent this column in a view</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.imagelist'}</C></Tcol>
              <Tcol className="text-left">
                Uses an image carousel to represent this column in 
                a view. Ideally for an array of strings.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.json'}</C></Tcol>
              <Tcol className="text-left">
                Uses a json format to represent this column in a view. 
                Ideally for arrays or objects.
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.link'}</C></Tcol>
              <Tcol className="text-left">Uses a clickable link to represent this column in a view</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.list'}</C></Tcol>
              <Tcol className="text-left">
                Uses a list (ordered or unordered) to represent this 
                column in a view. Ideally for an array of strings
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.markdown'}</C></Tcol>
              <Tcol className="text-left">
                Converts the column value from markdown to raw HTML 
                to represent this column in a view
              </Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
              <Tcol className="text-left">&nbsp;</Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.metadata(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Outputs the keys and values of the columns value 
                in tabular format. Ideally for a key value object.
              </Tcol>
              <Tcol className="text-left">
                padding: number
                <br />align: left|right|center
                <br />format: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.metadata'}</C>
                <br /><C>{'@view.metadata({ padding 10 align "left" format true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.number(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a number format to represent this column in a view</Tcol>
              <Tcol className="text-left">
                separator: string
                <br />decimal: string
                <br />decimals: boolean
                <br />absolute: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.number'}</C>
                <br /><C>{'@view.number({ separator "," decimal "." decimals 4 absolute true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.overflow(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a format that considers text overflows to represent 
                this column in a view
              </Tcol>
              <Tcol className="text-left">
                length: number
                <br />words: boolean
                <br />hellip: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.overflow'}</C>
                <br /><C>{'@view.overflow({ length 10 words true hellip true})'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.phone(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a phone format to represent this column in a view</Tcol>
              <Tcol className="text-left">label: string</Tcol>
              <Tcol className="text-left">
                <C>{'@view.phone'}</C>
                <br /><C>{'@view.phone({ label "Call Me Maybe" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.rating(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a rating format to represent this column in a view</Tcol>
              <Tcol className="text-left">
                max: number
                <br />remainder: boolean
                <br />round: round|ceil|floor
                <br />spacing: number
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.rating'}</C>
                <br /><C>{'@view.rating({ max 5 remainder true round "floor" spacing 10 })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.separated(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a separator format to represent this column in a 
                view. Ideally for an array of strings.
              </Tcol>
              <Tcol className="text-left">separator: string</Tcol>
              <Tcol className="text-left">
                <C>{'@view.separated'}</C>
                <br /><C>{'@view.separated({ separator ", " })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.table(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a tablular format to represent this column 
                in a view. Ideally for an array of objects.
              </Tcol>
              <Tcol className="text-left">
                top: boolean
                <br />left: boolean
                <br />right: boolean
                <br />padding: number
                <br />align: left|right|center
                <br />background: color
                <br />border: color
                <br />header: color
                <br />stripe: color
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.table'}</C>
                <br /><C>{'@view.table({ align "left" top true padding 100 background "blue" header "#CCC" })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.taglist(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Uses a tag list format to represent this column in 
                a view. Ideally for an array of strings.
              </Tcol>
              <Tcol className="text-left">
                curved: boolean
                <br />rounded: boolean
                <br />pill: boolean
                <br />info: boolean
                <br />warning: boolean
                <br />success: boolean
                <br />error: boolean
                <br />muted: boolean
                <br />primary: boolean
                <br />color: boolean
                <br />secondary: boolean
                <br />outline: boolean
                <br />solid: boolean
                <br />transparent: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.taglist'}</C>
                <br /><C>{'@view.taglist({ curved true info true outline true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.template(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a template to generate a text to represent this column in a view</Tcol>
              <Tcol className="text-left">template: string</Tcol>
              <Tcol className="text-left"><C>{'@view.template({ template "{{foo}} and {{bar}}" })'}</C></Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.text(attributes?)'}</C></Tcol>
              <Tcol className="text-left">Uses a text format to represent this column in a view</Tcol>
              <Tcol className="text-left">
                upper: boolean
                <br />lower: boolean
                <br />capital: boolean
              </Tcol>
              <Tcol className="text-left">
                <C>{'@view.text'}</C>
                <br /><C>{'@view.text({ upper true })'}</C>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol className="text-left"><C>{'@view.yesno(attributes?)'}</C></Tcol>
              <Tcol className="text-left">
                Converts a boolean to a string representation to 
                represent this column in a view
              </Tcol>
              <Tcol className="text-left">yes: string<br />no: string</Tcol>
              <Tcol className="text-left">
                <C>{'@view.yesno'}</C>
                <br /><C>{'@view.yesno({ yes "Yep" no "Nah" })'}</C>
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>
      
      <Nav
        prev={{
          text: 'Router Class',
          href: '/docs/references/router-class'
        }}
        next={{ 
          text: 'Server Class', 
          href: '/docs/references/server-class' 
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