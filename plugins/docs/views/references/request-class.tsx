//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, C, A, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`//data size
const size = request.data.size
//returns all the data
const data = request.data()
//return the value where as { filter: { name: 'value' } }
const name = request.data('filter', 'name')
//return the value where as { filter: { age: 100 } }, default is 50
const age = request.data.path('filter.age', 50)
//sets the data where as { filter: { price: 100 } }
request.data.set('filter', 'price', 100)
//remove part of the data 
//where as \`price\` will be remove from \`filter\`
request.data.delete('filter', 'price')
//returns true if the data has the key 
//where as if \`price\` exists in \`filter\`
const exists = request.data.has('filter', 'price')
//Map() functions, see Map API
const entries = request.data.entries()
const keys = request.data.keys()
const values = request.data.values()
const json = request.data.toString()`,
//1-------------------------------------------------------------------//
`//returns a callable Map()
const headers = request.headers
//returns the value where as \`Content-Type\` is the key
const type = request.headers('Content-Type')
//Map() functions, see Map API
const entries = request.headers.entries()
const keys = request.headers.keys()
const values = request.headers.values()`,
//2-------------------------------------------------------------------//
`request.loader = (request: Request) => {
  return {
    body: {},
    post: {}
  }
}`,
//3-------------------------------------------------------------------//
`//post size
const size = request.post.size
//returns all the post data
const post = request.post()
//return the value where as { filter: { name: 'value' } }
const name = request.post('filter', 'name')
//return the value where as { filter: { age: 100 } }, default is 50
const age = request.post.path('filter.age', 50)
//sets the post data where as { filter: { price: 100 } }
request.post.set('filter', 'price', 100)
//remove part of the post data 
//where as \`price\` will be remove from \`filter\`
request.post.delete('filter', 'price')
//returns true if the post data has the key 
//where as if \`price\` exists in \`filter\`
const exists = request.post.has('filter', 'price')
//Map() functions, see Map API
const entries = request.post.entries()
const keys = request.post.keys()
const values = request.post.values()
const json = request.post.toString()`,
//4-------------------------------------------------------------------//
`//query size
const size = request.query.size
//returns all the query data
const query = request.query()
//return the value where as { filter: { name: 'value' } }
const name = request.query('filter', 'name')
//return the value where as { filter: { age: 100 } }, default is 50
const age = request.query.path('filter.age', 50)
//sets the query data where as { filter: { price: 100 } }
request.query.set('filter', 'price', 100)
//remove part of the query data 
//where as \`price\` will be remove from \`filter\`
request.query.delete('filter', 'price')
//returns true if the query data has the key 
//where as if \`price\` exists in \`filter\`
const exists = request.query.has('filter', 'price')
//Map() functions, see Map API
const entries = request.query.entries()
const keys = request.query.keys()
const values = request.query.values()
const json = request.query.toString()`,
//5-------------------------------------------------------------------//
`//returns a callable Map()
const session = request.session
//returns the value where as \`Content-Type\` is the key
const type = request.session('session')
//Map() functions, see Map API
const entries = request.session.entries()
const keys = request.session.keys()
const values = request.session.values()`,
//6-------------------------------------------------------------------//
`//ie. 'string' | 'buffer' | 'uint8array' | 'object' | 'array' | 'string' | 'null'
const type = request.type `,
//7-------------------------------------------------------------------//
`//returns URL() object
const url = request.url `,
//8-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Request Class - References - Stackpress Documentation');
  const description = _(
    'The request class is a wrapper around the native request object '
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
        <a className="theme-tx0 block" href="#body">
          {_('body')}
        </a>
        <a className="theme-tx0 block" href="#data">
          {_('data')}
        </a>
        <a className="theme-tx0 block" href="#headers">
          {_('headers')}
        </a>
        <a className="theme-tx0 block" href="#loaded">
          {_('loaded')}
        </a>
        <a className="theme-tx0 block" href="#loader">
          {_('loader')}
        </a>
        <a className="theme-tx0 block" href="#method">
          {_('method')}
        </a>
        <a className="theme-tx0 block" href="#mimetype">
          {_('mimetype')}
        </a>
        <a className="theme-tx0 block" href="#post">
          {_('post')}
        </a>
        <a className="theme-tx0 block" href="#query">
          {_('query')}
        </a>
        <a className="theme-tx0 block" href="#resource">
          {_('resource')}
        </a>
        <a className="theme-tx0 block" href="#session">
          {_('session')}
        </a>
        <a className="theme-tx0 block" href="#type">
          {_('type')}
        </a>
        <a className="theme-tx0 block" href="#url">
          {_('url')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#load">
          {_('load()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Request Class</H1>

      <P>
        The request class is a wrapper around the native request object
        that provides additional functionality and convenience methods.
        It can map to 
        either <SS>Node.js HTTP Incoming Message</SS> and <SS>WHATWG Request</SS> objects. 
        The primary purpose is to provide a consistent API for handling 
        requests, regardless of the underlying implementation. The 
        request class is designed to work with several mediums including 
        HTTP requests, WebSocket requests, CLI requests, etc.
      </P>

      {/*------------------------------------------------------------*/}
            
      <a id="body"></a>
      <H2>body</H2>

      <section>
        <P>
          The raw request body. The body can be a type 
          of <C>string</C>, <C>Buffer</C>, <C>UInt8Array</C>, <C>Object</C>, <C>Array</C>, 
          or <C>null</C>.
        </P>

        <Code>{'const body = request.body'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="data"></a>
      <H2>data</H2>

      <section>
        <P>
          A <A href="/docs/references/data/callable-nest">callable nest</A> that 
          manages the request data. This combines the inputs from URL 
          search queries, POST data and URL parameters respectively.
        </P>

        <Code>{examples[0]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="headers"></a>
      <H2>headers</H2>

      <section>
        <P>
        A <A href="/docs/references/data/callable-map">callable map</A> that 
        manages the request headers. 
        </P>

        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="loaded"></a>
      <H2>loaded</H2>

      <section>
        <P>
          Returns true if the body is loaded
        </P>

        <Code>{'const body = request.loaded ? request.body : null'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="loader"></a>
      <H2>loader</H2>

      <section>
        <P>
          Sets the loader. This function is called when 
          the <C>req.load()</C> is called.
        </P>

        <Code>{examples[2]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="method"></a>
      <H2>method</H2>

      <section>
        <P>
          The request HTTP method. 
        </P>

        <Code>{'request.method'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="mimetype"></a>
      <H2>mimetype</H2>

      <section>
        <P>
          Returns the request mimetype.
        </P>

        <Code>{'const type = request.mimetype'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="post"></a>
      <H2>post</H2>

      <section>
        <P>
          A <A href="/docs/references/data/callable-nest">callable nest</A> that 
          manages the request POST data. 
        </P>

        <Code>{examples[3]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="query"></a>
      <H2>query</H2>

      <section>
        <P>
        A <A href="/docs/references/data/callable-nest">callable nest</A> that 
        manages the request query. 
        </P>

        <Code>{examples[4]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="resource"></a>
      <H2>resource</H2>

      <section>
        <P>
          Returns the raw IncomingMessage or Request object. It's 
          also possible that there is no resource at all.
        </P>

        <Code>{'const im = request.resource'}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="session"></a>
      <H2>session</H2>

      <section>
        <P>
          A <A href="/docs/references/data/callable-session">callable session</A> that 
          manages the request session data. 
        </P>

        <Code>{examples[5]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="type"></a>
      <H2>type</H2>

      <section>
        <P>
          Returns the type of body. 
        </P>

        <Code>{examples[6]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="url"></a>
      <H2>url</H2>

      <section>
        <P>
          The request URL. 
        </P>

        <Code>{examples[7]}</Code>
      </section>

      {/*------------------------------------------------------------*/}
            
      <a id="load"></a>
      <H2>load()</H2>

      <section>
        <P>
          Loads the body if <C>request.loader</C> was set. 
        </P>

        <Code>{'request.load()'}</Code>
      </section>

      <Nav
        prev={{ 
          text: 'React API', 
          href: '/docs/references/react-api' 
        }}
        next={{ 
          text: 'Response Class', 
          href: '/docs/references/response-class' 
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