//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, H4, P, C, E, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`type SuccessResponse<T = unknown> = {
  code: number
  status: string
  results: T,
  total?: number
}
type ErrorResponse = {
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
}
type StatusResponse<T = unknown> = Partial<ErrorResponse & SuccessResponse<T>>`,
//1-------------------------------------------------------------------//
`//data size
const size = response.data.size
//returns all the data
const data = response.data()
//return the value where as { filter: { name: 'value' } }
const name = response.data('filter', 'name')
//return the value where as { filter: { age: 100 } }, default is 50
const age = response.data.path('filter.age', 50)
//sets the data where as { filter: { price: 100 } }
response.data.set('filter', 'price', 100)
//remove part of the data 
//where as \`price\` will be remove from \`filter\`
response.data.delete('filter', 'price')
//returns true if the data has the key 
//where as if \`price\` exists in \`filter\`
const exists = response.data.has('filter', 'price')
//Map() functions, see Map API
const entries = response.data.entries()
const keys = response.data.keys()
const values = response.data.values()
const json = response.data.toString()`,
//2-------------------------------------------------------------------//
`response.dispatcher = (res) => {
  const response = new Response();
  //...
  return response;
}`,
//3-------------------------------------------------------------------//
`//returns a callable Map()
const headers = response.headers
//returns the value where as \`Content-Type\` is the key
const type = response.headers('Content-Type')
//Map() functions, see Map API
const entries = response.headers.entries()
const keys = response.headers.keys()
const values = response.headers.values()`,
//4-------------------------------------------------------------------//
`//returns a callable Map()
const session = response.session
//returns the value where as \`Content-Type\` is the key
const type = response.session('session')
//sets theme to dark
response.session.set('theme', 'dark')
//remove theme
response.session.delete('theme')
//returns true if the session has the key 
const exists = response.session.has('theme')
//Map() functions, see Map API
const entries = response.session.entries()
const keys = response.session.keys()
const values = response.session.values()`,
//5-------------------------------------------------------------------//
`//ie. 'string' | 'buffer' | 'uint8array' | 'object' | 'array' | 'string' | 'null'
const type = response.type `,
//6-------------------------------------------------------------------//
`response.fromStatusResponse({
  code: 200,
  results: { foo: 'bar' },
  total: 1
})`,
//7-------------------------------------------------------------------//
`response.setError({
  code: 500,
  status: 'Internal Server Error',
  error: 'Invalid parameters',
  errors: {
    name: 'Name is required',
    email: 'Email is required'
  }
})`,
//8-------------------------------------------------------------------//
`response.setError('Invalid parameters', {
  name: 'Name is required',
  email: 'Email is required'
})`,
//9-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Response Class - References - Stackpress Documentation');
  const description = _(
    'The Response class is a wrapper around the native response object '
    + 'that provides additional functionality and convenience methods.'
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
        <a className="theme-tx0 block" href="#header2">
          {_('body')}
        </a>
        <a className="theme-tx0 block" href="#code">
          {_('code')}
        </a>
        <a className="theme-tx0 block" href="#data">
          {_('data')}
        </a>
        <a className="theme-tx0 block" href="#dispatcher">
          {_('dispatcher')}
        </a>
        <a className="theme-tx0 block" href="#error">
          {_('error')}
        </a>
        <a className="theme-tx0 block" href="#errors">
          {_('errors')}
        </a>
        <a className="theme-tx0 block" href="#headers">
          {_('headers')}
        </a>
        <a className="theme-tx0 block" href="#mimetype">
          {_('mimetype')}
        </a>
        <a className="theme-tx0 block" href="#redirected">
          {_('redirected')}
        </a>
        <a className="theme-tx0 block" href="#resource">
          {_('resource')}
        </a>
        <a className="theme-tx0 block" href="#sent">
          {_('sent')}
        </a>
        <a className="theme-tx0 block" href="#session">
          {_('session')}
        </a>
        <a className="theme-tx0 block" href="#stack">
          {_('stack')}
        </a>
        <a className="theme-tx0 block" href="#status">
          {_('status')}
        </a>
        <a className="theme-tx0 block" href="#total">
          {_('total')}
        </a>
        <a className="theme-tx0 block" href="#type">
          {_('type')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#dispatch">
          {_('dispatch()')}
        </a>
        <a className="theme-tx0 block" href="#from-status-response">
          {_('fromStatusResponse()')}
        </a>
        <a className="theme-tx0 block" href="#redirect">
          {_('redirect()')}
        </a>
        <a className="theme-tx0 block" href="#set-body">
          {_('setBody()')}
        </a>
        <a className="theme-tx0 block" href="#set-error">
          {_('setError()')}
        </a>
        <a className="theme-tx0 block" href="#set-html">
          {_('setHTML()')}
        </a>
        <a className="theme-tx0 block" href="#set-json">
          {_('setJSON()')}
        </a>
        <a className="theme-tx0 block" href="#set-results">
          {_('setResults()')}
        </a>
        <a className="theme-tx0 block" href="#set-rows">
          {_('setRows()')}
        </a>
        <a className="theme-tx0 block" href="#set-status">
          {_('setStatus()')}
        </a>
        <a className="theme-tx0 block" href="#set-xml">
          {_('setXML()')}
        </a>
        <a className="theme-tx0 block" href="#stop">
          {_('stop()')}
        </a>
        <a className="theme-tx0 block" href="#to-exception">
          {_('toException()')}
        </a>
        <a className="theme-tx0 block" href="#to-status-response">
          {_('toStatusResponse()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Response Class</H1>

      <P>
        The <C>Response</C> class is a wrapper around the native 
        response object that provides additional functionality and 
        convenience methods. It can map to 
        either <SS>Node.js HTTP Server Response</SS> and <SS>WHATWG Response</SS> objects. 
        The primary purpose is to provide a consistent API for handling 
        responses, regardless of the underlying implementation. The 
        response class is designed to work with several mediums including 
        HTTP, WebSocket, CLI, etc. Serialized responses 
        are <C>StatusResponse</C> objects and is useful when 
        interchanging between <C>Exception</C> and <C>Response</C> objects.
      </P>

      <Code>{examples[0]}</Code>

      {/*------------------------------------------------------------*/}
            
      <a id="body"></a>
      <H2>body</H2>

      <section>
        <P>
          Returns the response body. You can also manually set the body.
        </P>

        <Code>{`response.body = { foo: 'bar' }`}</Code>
        <Code>{'const body = response.body'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="code"></a>
      <H2>code</H2>

      <section>
        <P>
          Returns the response code. Defaults to <C>0</C> <E>(zero)</E>.
          You can also manually set the code.
        </P>

        <Code>{`response.code = 200`}</Code>
        <Code>{'const code = response.code'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="data"></a>
      <H2>data</H2>

      <section>
        <P>
          Returns the response data controller. This is the data is 
          arbitrary data not part of the serialized response. This 
          is normally used as extra view props.
        </P>

        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="dispatcher"></a>
      <H2>dispatcher</H2>

      <section>
        <P>
          Sets the dispatcher function. This function is called when 
          the <C>res.dispatch()</C> is called.
        </P>

        <Code>{examples[2]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="error"></a>
      <H2>error</H2>

      <section>
        <P>
          Returns the error message. You can also manually set the error.
        </P>

        <Code>{`response.error = 'Invalid Parameters'`}</Code>
        <Code>{`const error = response.error`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="errors"></a>
      <H2>errors</H2>

      <section>
        <P>
          Returns a map of sub-errors.
        </P>

        <Code>{'const errors = response.errors'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="headers"></a>
      <H2>headers</H2>

      <section>
        <P>
          The response headers data controller. 
        </P>

        <Code>{examples[3]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="mimetype"></a>
      <H2>mimetype</H2>

      <section>
        <P>
          Returns the response mimetype. You can also manually set the 
          mimetype.
        </P>

        <Code>{`response.mimetype = 'text/plain'`}</Code>
        <Code>{'const mime = response.mimetype'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="redirected"></a>
      <H2>redirected</H2>

      <section>
        <P>
          Returns true if the response was redirected triggered by 
          the <C>res.redirect()</C> method.
        </P>

        <Code>{'const redirected = response.redirected'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="resource"></a>
      <H2>resource</H2>

      <section>
        <P>
          Returns the raw ServerResponse or Response object. It's 
          also possible that there is no resource at all.
        </P>

        <Code>{'const sr = response.resource'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="sent"></a>
      <H2>sent</H2>

      <section>
        <P>
          Returns true if the response was already dispatched.
        </P>

        <Code>{'const dispatched = response.dispatched'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="session"></a>
      <H2>session</H2>

      <section>
        <P>
          The response session data controller. When using 
          the <C>HTTP</C> or <C>WHATWG</C> dispatcher, will set the 
          cookies headers for the browser.
        </P>

        <Code>{examples[4]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="stack"></a>
      <H2>stack</H2>

      <section>
        <P>
          Returns an error stack <E>(if available)</E>. You can also 
          manually set the stack.
        </P>

        <Code>{`response.stack = exception.stack`}</Code>
        <Code>{'const stack = response.stack'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="status"></a>
      <H2>status</H2>

      <section>
        <P>
          Returns the status message. You can also manually set the
          status.
        </P>

        <Code>{`response.status = 'OK'`}</Code>
        <Code>{'const status = response.status'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="total"></a>
      <H2>total</H2>

      <section>
        <P>
          Returns the total number of rows. This is useful for array 
          results in order to figure out the pagination and other 
          purposes. You can also manually set the total. Defaults 
          to <C>0</C> <E>(zero)</E>.
        </P>

        <Code>{`response.total = 55`}</Code>
        <Code>{'const total = response.total'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="type"></a>
      <H2>type</H2>

      <section>
        <P>
          Returns the type of body. 
        </P>

        <Code>{examples[5]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="dispatch"></a>
      <H2>dispatch()</H2>

      <section>
        <P>
          Syncs the response with the native response if 
          the <C>res.dispatcher</C> is set. 
        </P>

        <Code>{'response.dispatch()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="from-status-response"></a>
      <H2>fromStatusResponse()</H2>

      <section>
        <P>
          Loads the response from a <C>StatusResponse</C> object. 
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.fromStatusResponse(response: StatusResponse): Response'}</Code>

        <H4>Example</H4>

        <Code>{examples[6]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="redirect"></a>
      <H2>redirect()</H2>

      <section>
        <P>
          Adds a redirect header to the response.
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.redirect(url: string, code = 302, status?: string): Response'}</Code>

        <H4>Example</H4>

        <Code>{`response.redirect('/foo/bar')`}</Code>
        <Code>{`response.redirect('/foo/bar', 301)`}</Code>
        <Code>{`response.redirect('/foo/bar', 301, 'Permanent Redirect')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="set-body"></a>
      <H2>setBody()</H2>

      <section>
        <P>
          Helper to rawly set the body of the response.
        </P>

        <H4>Usage</H4>
        
        <Code>{`response.setBody(type: string, body: Body, code = 200, status?: string): Response`}</Code>

        <H4>Example</H4>

        <Code>{`response.setBody('text/plain', 'Hello')`}</Code>
        <Code>{`response.setBody('text/plain', 'Oops... Not Found', 404)`}</Code>
        <Code>{`response.setBody('text/plain', 'Oops... Not Found', 404. 'Not Found')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="set-error"></a>
      <H2>setError()</H2>

      <section>
        <P>
          Helper to set the response as an error response.
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.setError(response: ErrorResponse)'}</Code>
        <Code>{'response.setError(error: string, errors: Record<string, unknown>, stack: Trace[], code = 400, status?: string)'}</Code>

        <H4>Example</H4>

        <Code>{examples[7]}</Code>
        <Code>{examples[8]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="set-html"></a>
      <H2>setHTML()</H2>

      <section>
        <P>
          Helper to set an HTML response.
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.setHTML(body: string, code = 200, status?: string): Response'}</Code>

        <H4>Example</H4>

        <Code>{`response.setHTML('<h1>Hello</h1>')`}</Code>
        <Code>{`response.setHTML('<h1>Not Found</h1>', 404)`}</Code>
        <Code>{`response.setHTML('<h1>Not Found</h1>', 404, 'Not Found')`}</Code>
      </section>
      
      {/*------------------------------------------------------------*/}
            
      <a id="set-json"></a>
      <H2>setJSON()</H2>

      <section>
        <P>
          Helper to set a JSON response.
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.setJSON(body: string|object, code = 200, status?: string): Response'}</Code>

        <H4>Example</H4>

        <Code>{`response.setJSON({ foo: 'bar' })`}</Code>
        <Code>{`response.setJSON({ error: 'not found' }, 404)`}</Code>
        <Code>{`response.setJSON({ error: 'not found' }, 404, 'Not Found')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="set-results"></a>
      <H2>setResults()</H2>

      <section>
        <P>
          Helper to set the results of the response as 
          a <C>StatusResponse</C> object as opposed 
          to <C>response.setJSON()</C> where the object is returned as 
          is.
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.setResults(body: object, code = 200, status?: string): Response'}</Code>

        <H4>Example</H4>

        <Code>{`response.setResults({ foo: 'bar' })`}</Code>
        <Code>{`response.setResults({ error: 'not found' }, 404)`}</Code>
        <Code>{`response.setResults({ error: 'not found' }, 404, 'Not Found')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="set-rows"></a>
      <H2>setRows()</H2>

      <section>
        <P>
          Helper to set the rows of the response as 
          a <C>StatusResponse</C> object.
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.setRows(body: array, code = 200, status?: string): Response'}</Code>

        <H4>Example</H4>

        <Code>{`response.setRows([ 1, 2, 3 ])`}</Code>
        <Code>{`response.setRows([ 'not', 'found' ], 404)`}</Code>
        <Code>{`response.setRows([ 'not', 'found' ], 404, 'Not Found')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="set-status"></a>
      <H2>setStatus()</H2>

      <section>
        <P>
          Helper to set the status of the response.
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.setStatus(code: number, status?: string)'}</Code>

        <H4>Example</H4>

        <Code>{'response.setStatus(200)'}</Code>
        <Code>{`response.setStatus(200, 'OK')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="set-xml"></a>
      <H2>setXML()</H2>

      <section>
        <P>
          Helper to set an XML response.
        </P>

        <H4>Usage</H4>
        
        <Code>{'response.setXML(body: string, code = 200, status?: string): Response'}</Code>

        <H4>Example</H4>

        <Code>{`response.setXML('<message>Hello</message>')`}</Code>
        <Code>{`response.setXML('<message>Not Found</message>', 404)`}</Code>
        <Code>{`response.setXML('<message>Not Found</message>', 404, 'Not Found')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="stop"></a>
      <H2>stop()</H2>

      <section>
        <P>
          When called, prevents the dispatcher from dispatching. This is 
          useful if you want to manually handle the dispatch.
        </P>

        <Code>{'res.stop()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="to-exception"></a>
      <H2>toException()</H2>

      <section>
        <P>
          Converts a response to an <C>Exception</C>.
        </P>

        <Code>{'throw response.toException()'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="to-status-response"></a>
      <H2>toStatusResponse()</H2>

      <section>
        <P>
          Converts the response to a <C>StatusResponse</C> object.
        </P>
        
        <Code>{'const status = response.toStatusResponse()'}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'Request Class', 
          href: '/docs/references/request-class' 
        }}
        next={{ 
          text: 'Router Class', 
          href: '/docs/references/router-class' 
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