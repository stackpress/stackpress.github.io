//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, P, C } from '../../components/index.js';
import { Nav, Code, Note, Warn, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`export const config: Config = {
  //...
  session: {
    //name of the session cookie
    key: 'session',
    //used to generate the session id
    seed: seed,
    access: {}
  }
};`,
//1-------------------------------------------------------------------//
`export const config: Config = {
  //...
  session: {
    //name of the session cookie
    key: 'session',
    //used to generate the session id
    seed: seed,
    access: {
      ADMIN: [
        { method: 'ALL', route: '/' },
        { method: 'ALL', route: '/auth/**' },
        { method: 'ALL', route: '/admin/**' },
        { method: 'ALL', route: '/api/**' }
      ],
      USER: [
        { method: 'ALL', route: '/' },
        { method: 'ALL', route: '/auth/**' },
        { method: 'ALL', route: '/api/**' }
      ],
      GUEST: [
        { method: 'ALL', route: '/' },
        { method: 'ALL', route: '/auth/**' }
      ]
    }
  }
};`,
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Setup Permissions - Stackpress Documentation');
  const description = _(
    'Setup permissions using the session and access config.'
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

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Setup Permissions</H1>

      <P>
        Update the configuration file using the following session settings.
      </P>

      <Code>{examples[0]}</Code>

      <P>
        The session config required are the following parameters.
      </P>

      <div className="px-w-100-0 overflow-x-auto px-mb-20">
        <Table>
          <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
          <Thead className="theme-bg-bg2 text-left">Notes</Thead>
          <Trow>
            <Tcol noWrap className="text-left"><C>{'session'}</C></Tcol>
            <Tcol className="text-left">
              The name of the session cookie. This is used to identify 
              the session cookie in the browser.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'seed'}</C></Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              The seed used to generate the session ID. This is used to 
              create a unique session id for each user. This should be 
              a random string that is kept secret.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="text-left"><C>{'access'}</C></Tcol>
            <Tcol className="text-left">
              List of access routes for each role.
            </Tcol>
          </Trow>
        </Table>
      </div>

      <Warn>
        By default all routes are open to all users, but setting 
        the <C>access</C> parameter will automatically blacklist all 
        the routes that are not specified on the access list.
      </Warn>

      <P>
        Update the configuration file again, using the following 
        access settings.
      </P>

      <Code>{examples[1]}</Code>

      <P>
        The above configuration describes that admins have access to
        the home page, and all auth, admin, API routes. Regular users
        have access to the home page, and all auth, API routes. Guests 
        have access to the home page, and all auth routes.
      </P>

      <Note>
        You can set default roles for registered users in 
        the <C>auth</C> configuration.
      </Note>
      
      <Nav
        prev={{ 
          text: 'Setup Authentication', 
          href: '/docs/toolkit/setup-authentication' 
        }}
        next={{ 
          text: 'Setup API', 
          href: '/docs/toolkit/setup-api' 
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
    >
      <Body />
    </Layout>
  );
}