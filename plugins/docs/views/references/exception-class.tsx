//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, H2, H4, E, P, C, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`type ErrorResponse = {
  code: number
  status: string
  error: string,
  errors?: NestedObject<string|string[]>,
  start?: number,
  end?: number,
  stack?: { 
    method: string, 
    file: string, 
    line: number, 
    char: number 
  }[],
}`,
//1-------------------------------------------------------------------//
`throw Exception.forErrors({
  name: 'Name is required',
  email: 'Email is required'
})`,
//2-------------------------------------------------------------------//
`throw Exception.forResponse({
  code: 500,
  status: 'Internal Server Error',
  error: 'Invalid parameters',
  errors: {
    name: 'Name is required',
    email: 'Email is required'
  }
})`,
//3-------------------------------------------------------------------//
`Exception.try<T = unknown, E = Exception>(callback: () => T): {
  catch: (error: E, type: string) => void
}`,
//4-------------------------------------------------------------------//
`const data = Exception.try(() => {
  return getData()
}).catch((error, type) => {
  return {}
})`,
//5-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Exception Class - References - Stackpress Documentation');
  const description = _(
    'An Exception is a special type of object that is used to represent '
    + 'an error or exceptional condition that occurs during the '
    + 'execution of a program.'
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
        <a className="theme-tx0 block" href="#code">
          {_('code')}
        </a>
        <a className="theme-tx0 block" href="#end">
          {_('end')}
        </a>
        <a className="theme-tx0 block" href="#errors">
          {_('errors')}
        </a>
        <a className="theme-tx0 block" href="#start">
          {_('start')}
        </a>
        <a className="theme-tx0 block" href="#type">
          {_('type')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#for">
          {_('Exception.for()')}
        </a>
        <a className="theme-tx0 block" href="#for-errors">
          {_('Exception.forErrors()')}
        </a>
        <a className="theme-tx0 block" href="#for-response">
          {_('Exception.forResponse()')}
        </a>
        <a className="theme-tx0 block" href="#require">
          {_('Exception.require()')}
        </a>
        <a className="theme-tx0 block" href="#try">
          {_('Exception.try()')}
        </a>
        <a className="theme-tx0 block" href="#upgrade">
          {_('Exception.upgrade()')}
        </a>
        <a className="theme-tx0 block" href="#to-json">
          {_('toJSON()')}
        </a>
        <a className="theme-tx0 block" href="#to-response">
          {_('toResponse()')}
        </a>
        <a className="theme-tx0 block" href="#trace">
          {_('trace()')}
        </a>
        <a className="theme-tx0 block" href="#with-code">
          {_('withCode()')}
        </a>
        <a className="theme-tx0 block" href="#with-errors">
          {_('withErrors()')}
        </a>
        <a className="theme-tx0 block" href="#with-position">
          {_('withPosition()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Exception Class</H1>

      <P>
        An <SS>Exception</SS> is a special type of object that is used to
        represent an error or exceptional condition that occurs during
        the execution of a program. Exceptions extend from 
        the <SS>Error</SS> class. Exceptions are used to handle 
        errors in a way that allows the program to continue running, 
        rather than crashing or terminating unexpectedly. 
        In <SS>Stackpress</SS>, exceptions are primarily used to handle 
        errors. Serialized exceptions are <C>ErrorResponse</C> objects 
        and is useful when interchanging between <C>Exception</C> and
        <C>Response</C> objects.
      </P>

      <Code>{examples[0]}</Code>

      {/*------------------------------------------------------------*/}
      
      <a id="code"></a>
      <H2>code</H2>

      <section>
        <P>
          The error code <E>(number)</E>. Defaults to <C>500</C>.
        </P>

        <Code>{'console.log(exception.code)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
      
      <a id="end"></a>
      <H2>end</H2>

      <section>
        <P>
          The end position in the code file where the error occurred.
        </P>

        <Code>{'console.log(exception.end)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="errors"></a>
      <H2>errors</H2>

      <section>
        <P>
          A map of sub errors. This is usually for form errors.
          This is a map of field names to error message.
        </P>

        <Code>{'console.log(exception.errors)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
      
      <a id="start"></a>
      <H2>start</H2>

      <section>
        <P>
          The start position in the code file where the error occurred.
        </P>

        <Code>{'console.log(exception.start)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
      
      <a id="type"></a>
      <H2>type</H2>

      <section>
        <P>
          The type of error. This is usually the Exception class name.
          For example types 
          like <SS>DatabaseException</SS> or <SS>ServerException</SS> can
          help troubleshooting.
        </P>

        <Code>{'console.log(exception.type)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
      
      <a id="for"></a>
      <H2>Exception.for()</H2>

      <section>
        <P>
          Expressive way to create an exception. 
        </P>

        <H4>Usage</H4>

        <Code>{'Exception.for(string, ...args: string[])'}</Code>

        <H4>Example</H4>

        <Code>{`throw Exception.for('Invalid parameters')`}</Code>
        <Code>{`throw Exception.for('Invalid %s', key)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="for-errors"></a>
      <H2>Exception.forErrors()</H2>

      <section>
        <P>
          Expressive way to throw an error given a map of sub-errors.
          This is usually for form errors. 
        </P>

        <H4>Usage</H4>

        <Code>{'Exception.forErrors(errors: Record<string, unknown>)'}</Code>

        <H4>Example</H4>

        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="for-response"></a>
      <H2>Exception.forResponse()</H2>

      <section>
        <P>
          Expressive way to throw an error given the response object. 
        </P>

        <H4>Usage</H4>

        <Code>{'Exception.forResponse(response: StatusResponse)'}</Code>

        <H4>Example</H4>

        <Code>{examples[2]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="require"></a>
      <H2>Exception.require()</H2>

      <section>
        <P>
          Requires that the condition is true. Otherwise throws an error.
        </P>

        <H4>Usage</H4>

        <Code>{'Exception.require(condition: boolean, message: string, ...args: any[])'}</Code>

        <H4>Example</H4>

        <Code>{`Exception.require(four === 4, 'Four is not equal to 4')`}</Code>
        <Code>{`Exception.require(four === 4, '%s is not equal to 4', four)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="try"></a>
      <H2>Exception.try()</H2>

      <section>
        <P>
          In house syncronous try catch.
        </P>

        <H4>Usage</H4>

        <Code>{examples[3]}</Code>

        <H4>Example</H4>

        <Code>{examples[4]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="upgrade"></a>
      <H2>Exception.upgrade()</H2>

      <section>
        <P>
          Upgrades an error to an exception
        </P>

        <H4>Usage</H4>

        <Code>{'Exception.upgrade(error: Error): Exception'}</Code>

        <H4>Example</H4>

        <Code>{'const exception = Exception.upgrade(error)'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="to-json"></a>
      <H2>toJSON()</H2>

      <section>
        <P>
          Converts exception to a JSON string
        </P>

        <H4>Usage</H4>

        <Code>{'exception.toJSON(): string'}</Code>

        <H4>Example</H4>

        <Code>{'const json = exception.toJSON()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="to-response"></a>
      <H2>toResponse()</H2>

      <section>
        <P>
          Converts error to Response object
        </P>

        <H4>Usage</H4>

        <Code>{'exception.toResponse(start = 0, end = 0): string'}</Code>

        <P>
          The <E>start</E> and <E>end</E> parameters are used to slice 
          the stack trace if available.
        </P>

        <H4>Example</H4>

        <Code>{'const response = exception.toResponse()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="trace"></a>
      <H2>trace()</H2>

      <section>
        <P>
          Returns the stack trace if available.
        </P>

        <H4>Usage</H4>

        <Code>{'exception.trace(start = 0, end = 0): string'}</Code>

        <P>
          The <E>start</E> and <E>end</E> parameters are used to slice 
          the stack trace if available.
        </P>

        <H4>Example</H4>

        <Code>{'const trace = exception.trace()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="with-code"></a>
      <H2>withCode()</H2>

      <section>
        <P>
          Expressive way to set an error code
        </P>

        <H4>Usage</H4>

        <Code>{'exception.withCode(code: number): Exception'}</Code>

        <H4>Example</H4>

        <Code>{`throw Exception.for('Not Found').withCode(404)`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="with-errors"></a>
      <H2>withErrors()</H2>

      <section>
        <P>
          Expressive way to add sub-errros
        </P>

        <H4>Usage</H4>

        <Code>{'exception.withErrors(errors: Record<string, unknown>): Exception'}</Code>

        <H4>Example</H4>

        <Code>{`throw Exception.for('Invalid').withErrors({ name: 'required' })`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="with-position"></a>
      <H2>withPosition()</H2>

      <section>
        <P>
          Expressive way to add syntax position
        </P>

        <H4>Usage</H4>

        <Code>{'exception.withPosition(start: number, end: number): Exception'}</Code>

        <H4>Example</H4>

        <Code>{`throw Exception.for('Invalid').withPosition(10, 100)`}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'EventEmitter Class', 
          href: '/docs/references/emitter-class' 
        }}
        next={{ 
          text: 'Query Builder', 
          href: '/docs/references/query-builder' 
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