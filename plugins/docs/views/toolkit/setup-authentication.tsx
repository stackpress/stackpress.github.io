//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, H2, E, P, C, SS } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

export const examples = [
//0-------------------------------------------------------------------//
`export const config: Config = {
  //...
  auth: {
    //base route for signin, signout, signup pages
    base: '/auth',
    //default roles for new users
    roles: [ 'USER' ],
    //allow signin with username
    username: true,
    //allow signin with email address
    email: true,
    //allow signin with phone
    phone: true,
    //password settings
    password: {
      min: 8,
      max: 32,
      upper: true,
      lower: true,
      number: true,
      special: true
    }
  }
};`,
//1-------------------------------------------------------------------//
`server.all('/auth/signup', '@/path/to/signup/view');
server.all('/auth/signin', '@/path/to/signin/view');`,
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Setup Authentication - Stackpress Documentation');
  const description = _(
    'Stackpress provides a built-in authentication system that allows '
    + 'management of user accounts and works closely with sessions and '
    + 'roles &amp; permissions.'
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
        <a className="theme-tx0 block" href="#auth-config">
          {_('1. Auth Config')}
        </a>
        <a className="theme-tx0 block" href="#auth-pages">
          {_('2. Auth Pages')}
        </a>
        <a className="theme-tx0 block" href="#auth-events">
          {_('3. Auth Events')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Setup Authentication</H1>

      <P>
        <SS>Stackpress</SS> provides a built-in authentication system
        that allows management of user accounts and works closely with 
        sessions and roles &amp; permissions. The session system is 
        based on the <SS>JWT</SS> standard, which allows you to securely 
        transmit user information between the client and server. The 
        authentication system is designed to be flexible and extensible, 
        allowing you to customize it to fit your project needs.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="auth-config"></a>
      <H2>1. Auth Config</H2>

      <section>
        <P>
          Update the configuration file using the following auth settings.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          The auth config requires the following parameters.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'base'}</C></Tcol>
              <Tcol className="text-left">
                The base route for the auth pages. This is used to 
                determine the base route for the auth pages. For example, 
                if you set this to <C>"/auth"</C>, then the signin page 
                will be at <C>"/auth/signin"</C>.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'roles'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The default roles for new users. For example, if you set 
                this to <C>["USER"]</C>, then new users will be assigned 
                the <C>"USER"</C> role by default.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'username'}</C></Tcol>
              <Tcol className="text-left">
                Whether to allow signin with username. If this is set to 
                <C>true</C>, then users will be able to signin with their 
                username.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'email'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Whether to allow signin with email address. If this is set 
                to <C>true</C>, then users will be able to signin with 
                their email address.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'phone'}</C></Tcol>
              <Tcol className="text-left">
                Whether to allow signin with phone number. If this is set 
                to <C>true</C>, then users will be able to signin with 
                their phone number.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'password.min'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The minimum length of the password. For example, if you 
                set this to <C>8</C>, then the password must be at least 
                8 characters long.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'password.max'}</C></Tcol>
              <Tcol className="text-left">
                The maximum length of the password. For example, if you 
                set this to <C>32</C>, then the password must be at most 
                32 characters long.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'password.upper'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                When this is set to <C>true</C>, the password must contain
                at least one uppercase letter.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'password.lower'}</C></Tcol>
              <Tcol className="text-left">
                When this is set to <C>true</C>, the password must contain
                at least one lowercase letter.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'password.number'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                When this is set to <C>true</C>, the password must contain
                at least one number.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'password.special'}</C></Tcol>
              <Tcol className="text-left">
                When this is set to <C>true</C>, the password must contain
                at least one special character. For example, <C>!@#$.%^&*</C>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="auth-config"></a>
      <H2>2. Auth Pages</H2>

      <section>
        <P>
          Once an auth config is set, the following pages will be available
          at the base route.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li>• Signup: <C>{'/auth/signup'}</C></li>
          <li>• Signin: <C>{'/auth/signin'}</C></li>
          <li>• Signout: <C>{'/auth/signout'}</C></li>
        </ul>

        <P>
          You can override the view templates for these pages like the 
          following code.
        </P>

        <Code>{examples[1]}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="auth-events"></a>
      <H2>3. Auth Events</H2>

      <section>
        <P>
          You can also programmatically call the auth APIs using the 
          following events.
        </P>

        <div className="px-w-100-0 overflow-x-auto">
          <Table>
            <Thead className="theme-bg-bg2 text-left">Event</Thead>
            <Thead className="theme-bg-bg2 text-left">Parameters</Thead>
            <Thead className="theme-bg-bg2 text-left">Response</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'auth-signup'}</C></Tcol>
              <Tcol className="text-left">
                <ul className="px-lh-30">
                  <li>
                    • <C>{'name'}</C> - Name of the user
                  </li>
                  <li>
                    • <C>{'type'}</C> - Entity type <E>(.ie person)</E>
                  </li>
                  <li>
                    • <C>{'roles'}</C> - A string array of roles to 
                    assign to the user
                  </li>
                  <li>
                    • <C>{'email'}</C> - Email address of the user used 
                    for authentication purposes.
                  </li>
                  <li>
                    • <C>{'phone'}</C> - Phone number of the user used 
                    for authentication purposes.
                  </li>
                  <li>
                    • <C>{'username'}</C> - Username of the user used 
                    for authentication purposes.
                  </li>
                  <li>
                    • <C>{'secret'}</C> - User custom password
                  </li>
                </ul>
              </Tcol>
              <Tcol className="text-left">
                Returns the rows inserted in a <SS>Response</SS> object 
                format.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'auth-signin'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                <ul className="px-lh-30">
                  <li>
                    • <C>{'type'}</C> - Type of 
                    authentication <E>(.ie username, email, phone)</E>
                  </li>
                  <li>
                    • <C>{'token'}</C> - Depending on the authentication 
                    type, this can be a username, email or phone number.
                  </li>
                  <li>
                    • <C>{'secret'}</C> - User custom password used to 
                    compare against the secret in the database.
                  </li>
                </ul>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                If successful, returns session data in 
                a <SS>Response</SS> object format.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'auth-signout'}</C></Tcol>
              <Tcol className="text-left"><E>{'<none>'}</E></Tcol>
              <Tcol className="text-left">
                Returns a success object.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'authorize'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left"><E>{'<none>'}</E></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Will return an error <SS>Response</SS> object if the user,
                is unauthorized to access.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>
      
      <Nav
        prev={{ 
          text: 'Setup Email', 
          href: '/docs/toolkit/setup-email' 
        }}
        next={{ 
          text: 'Setup Permissions', 
          href: '/docs/toolkit/setup-permissions' 
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