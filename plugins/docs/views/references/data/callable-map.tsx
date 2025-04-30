//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, H } from '../../../components/index.js';
import { Nav, Code, Layout } from '../../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import { map } from 'stackpress/lib'
const data = map()
const data = map([['foo', 'bar'], ['bar', 'foo']])
const data = map<string, string>()`,
//1-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Callable Map - Data - Stackpress Documentation');
  const description = _(
    'A callable map is a type of callable class. In this case it\'s '
    + 'a Map() class that can be called as a function.'
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
        <a className="theme-tx0 block" href="#size">
          {_('size')}
        </a>
      </nav>

      <h6 className="theme-muted px-fs-14 px-mb-0 px-mt-40 px-pb-10 uppercase">
        {_('Methods')}
      </h6>
      <nav className="px-fs-14 px-lh-32">
        <a className="theme-tx0 block" href="#clear">
          {_('clear()')}
        </a>
        <a className="theme-tx0 block" href="#delete">
          {_('delete()')}
        </a>
        <a className="theme-tx0 block" href="#entries">
          {_('entries()')}
        </a>
        <a className="theme-tx0 block" href="#for-each">
          {_('forEach()')}
        </a>
        <a className="theme-tx0 block" href="#get">
          {_('get()')}
        </a>
        <a className="theme-tx0 block" href="#has">
          {_('has()')}
        </a>
        <a className="theme-tx0 block" href="#keys">
          {_('keys()')}
        </a>
        <a className="theme-tx0 block" href="#set">
          {_('set()')}
        </a>
        <a className="theme-tx0 block" href="#values">
          {_('values()')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Callable Map</H1>

      <P>
        A callable map is a type of callable class. In this case it's 
        a <H>Map()</H> class that can be called as a function. It 
        can be created in the following ways.
      </P>

      <Code>{examples[0]}</Code>

      <P>
        Once created you can use it as a function. The callable map
        will return the value of the key passed as an argument. If
        the key does not exist in the map, it will 
        return <H>undefined</H>.
      </P>

      <Code>{`data('foo')`}</Code>

      {/*------------------------------------------------------------*/}
                        
      <a id="size"></a>
      <H2>size</H2>

      <section>
        <P>
          Returns the number of key/value pairs in the map. This is
          the same as the <H>length</H> property for arrays.
        </P>

        <Code>{`data.size`}</Code>
      </section>
      
      {/*------------------------------------------------------------*/}
                        
      <a id="clear"></a>
      <H2>clear()</H2>

      <section>
        <P>
          Clears the map. This will remove all the keys and values
          from the map.
        </P>

        <Code>{`data.clear()`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="delete"></a>
      <H2>delete()</H2>

      <section>
        <P>
          Deletes the key/value pair from the map. If the key does
          not exist in the map, it will do nothing.
        </P>

        <Code>{`data.delete('foo')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="entries"></a>
      <H2>entries()</H2>

      <section>
        <P>
          Returns an iterator object that contains the key/value
          pairs for each element in the map. 
        </P>

        <Code>{`for (const [ key, value ] of data.entries()) {...}`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="for-each"></a>
      <H2>forEach()</H2>

      <section>
        <P>
          Calls a function for each key/value pair in the map. The
          function is called with the value, key and the map itself
          as arguments. 
        </P>

        <Code>{`data.forEach((value, key, map) => {...})`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="get"></a>
      <H2>get()</H2>

      <section>
        <P>
          Returns the value associated with the key. If the key
          does not exist in the map, it will return <H>undefined</H>.
        </P>

        <Code>{`data.get('foo')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="has"></a>
      <H2>has()</H2>

      <section>
        <P>
          Returns <H>true</H> if the key exists in the map, 
          otherwise it will return <H>false</H>.
        </P>

        <Code>{`data.has('foo')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="keys"></a>
      <H2>keys()</H2>

      <section>
        <P>
          Returns an iterator object that contains the keys for
          each element in the map.
        </P>

        <Code>{`for (const key of data.keys()) {...}`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="set"></a>
      <H2>set()</H2>

      <section>
        <P>
          Returns an iterator object that contains the keys for
          each element in the map.
        </P>

        <Code>{`data.set('foo', 'bar')`}</Code>
      </section>

      {/*------------------------------------------------------------*/}
                        
      <a id="values"></a>
      <H2>values()</H2>

      <section>
        <P>
          Returns an iterator object that contains the values for
          each element in the map.
        </P>

        <Code>{`for (const value of data.values()) {...}`}</Code>
      </section>

      <Nav
        next={{ 
          text: 'Callable Nest', 
          href: '/docs/references/data/callable-nest' 
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