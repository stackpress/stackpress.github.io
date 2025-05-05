//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, H2, E, S, A, P, H, C, SS } from '../../components/index.js';
import { Nav, Note, Warn, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`import type { Method } from 'stackpress/types';
export type APIType = 'app'|'public'|'session';

export const config: Config = {
  //...
  api: {
    //when sessions expire. this is used with \`session.created\` column
    expires: 1000 * 60 * 60 * 24 * 365,
    //scopes are used to limit access to certain endpoints
    //when creating the default application, make sure the 
    //following scopes are included, or you will get a 401 
    //error when trying to access the endpoints
    scopes: {},
    //the actual API endpoints. These simply act as gateways 
    //straight to events.
    endpoints: [],
    //calls out external urls when specified events happen
    webhooks: []
  }
};`,
//1-------------------------------------------------------------------//
`import type { Method } from 'stackpress/types';
export type APIType = 'app'|'public'|'session';

export const config: Config = {
  //...
  api: {
    //...
    scopes: {
      'user': { 
        name: 'User API Service',
        description: 'Profile Endpoints' 
      }
    },
    //...
  }
};`,
//2-------------------------------------------------------------------//
`import type { Method } from 'stackpress/types';
export type APIType = 'app'|'public'|'session';

export const config: Config = {
  //...
  api: {
    //...
    endpoints: [
      {
        method: 'GET' as Method,
        route: '/api/profile/search',
        type: 'public' as APIType,
        scopes: [ 'user' ],
        event: 'profile-search',
        data: {}
      },
      {
        method: 'GET' as Method,
        route: '/api/profile/detail/:id',
        type: 'app' as APIType,
        scopes: [ 'user' ],
        event: 'profile-detail',
        data: {}
      },
      {
        method: 'GET' as Method,
        route: '/api/session/detail',
        type: 'user' as APIType,
        scopes: [ 'user' ],
        event: 'hello-api',
        data: {}
      }
    ],
    //...
  }
};`,
//3-------------------------------------------------------------------//
`import type { Server } from 'stackpress/server';
import type { Profile } from 'stackpress/types';

export default function plugin(server: Server) {
  server.on('listen', (req, res, ctx) => {
    server.on('hello-api', (req, res, ctx) => {
      //get the profile id
      const profileId = req.data('profileId');
      //get the profile with the profile id
      const profile = await server.resolve<Profile>(
        'profile-detail', 
        { id: profileId }
      );
      //if error
      if (profile.code !== 200) {
        //set the error response
        res.fromStatusResponse(profile);
        return;
      }
      const name = profile.results?.name || 'guest';
      res.setBody('text/plain', \`Hello \${name}\`)
    });
  })
}`,
//4-------------------------------------------------------------------//
`import type { Method } from 'stackpress/types';
export type APIType = 'app'|'public'|'session';

export const config: Config = {
  //...
  api: {
    //...
    webhooks: [
      {
        event: 'auth-signout',
        uri: 'http://localhost:3000/api/webhook',
        method: 'POST' as Method,
        validity: {},
        data: {}
      }
    ],
  }
};`,
//5-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Setup API - Stackpress Documentation');
  const description = _(
    'Stackpress API is a configuration that ultimately act as gateways '
    + 'to events. The API follows the 2-legged and 3-legged OAuth 2.0 '
    + 'specifications. '
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
        <a className="theme-tx0 block" href="#api-config">
          {_('1. API Config')}
        </a>
        <a className="theme-tx0 block" href="#configure-scopes">
          {_('2. Configure Scopes')}
        </a>
        <a className="theme-tx0 block" href="#configure-endpoints">
          {_('3. Configure Endpoints')}
        </a>
        <a className="theme-tx0 block" href="#custom-endpoint">
          {_('4. Custom Endpoint')}
        </a>
        <a className="theme-tx0 block" href="#configure-webhooks">
          {_('5. Configure Webhooks')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Setup API</H1>

      <P>
        <SS>Stackpress</SS> API is a configuration that ultimately act as
        gateways to events. The API follows the 2-legged and 3-legged 
        OAuth 2.0 specifications. It also includes a webhook system that
        allows you to call external URLs when certain events happen.
      </P>

      {/*------------------------------------------------------------*/}

      <a id="api-config"></a>
      <H2>1. API Config</H2>

      <section>
        <P>
          Update the configuration file with the <C>api</C> settings 
          using the following as a guide.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          The API config includes the following options.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'expires'}</C></Tcol>
              <Tcol className="text-left">
                When API sessions expire. This is used
                with <H>created</H> column in the <H>session</H> table.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'scopes'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Map of scopes to be used with the API following the OAuth 
                specificaitons.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'endpoints'}</C></Tcol>
              <Tcol className="text-left">
                List of API endpoint configurations.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'webhooks'}</C></Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                List of webhook configurations.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="configure-scopes"></a>
      <H2>2. Configure Scopes</H2>

      <section>
        <P>
          Scopes are used to limit access to certain endpoints
          and can be toggled per application. Let's update the 
          <C>api</C> confifguration with the 
          following <C>'user'</C> scope.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          The scope configuration, mainly used for documentation 
          purposes, are as follows.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'name'}</C></Tcol>
              <Tcol className="text-left">
                Readable friendly name of the scope.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'description'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Readable friendly description of the scope.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <Note>
          Scopes work in conjunction with the <C>endpoints</C>. The 
          configuration itself is mainly for documentation purposes.
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="configure-endpoints"></a>
      <H2>3. Configure Endpoints</H2>

      <section>
        <P>
          API endpoints over configuraton act as a gateway that collects 
          the input, calls events and returns its response. Update the 
          <C>api</C> confifguration with the 
          following <C>endpoints</C> configurations.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          The above configuration allows for searching profiles, 
          accessing a profile, and session. Searching profiles is open 
          for anyone to use, while accessing a profile, and session 
          require tokens. In order to test, the client tokens can be 
          acquired through the following command.
        </P>

        <Code lang="bash">{
          'npx stackpress config/develop emit application-search'
        }</Code>

        <Note>
          If you got an empty result, 
          see <A href="/docs/toolkit/setup/3-database-engine#populate-database">
            Populating database
          </A>.
        </Note>

        <P>
          Each endpoint configuration requires the following parameters.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'method'}</C></Tcol>
              <Tcol className="text-left">
                The HTTP method to listen to.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'route'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The route pattern to listen to.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'type'}</C></Tcol>
              <Tcol className="text-left">
                <ul className="px-lh-30">
                  <li>
                    • <C>{'public'}</C> - An open endpoint that does not
                    require any tokens.
                  </li>
                  <li>
                    • <C>{'app'}</C> - An endpoint that requires a 
                    client token for <S>GET</S> endpoints and a client 
                    token/secret for anything else. <E>(2-legged)</E>
                  </li>
                  <li>
                    • <C>{'user'}</C> - An endpoint that requires a 
                    session for <S>GET</S> endpoints and a token/secret 
                    for anything else. Auto populates 
                    the <C>profileId</C> in the request data based on 
                    the session. <E>(3-legged)</E>
                  </li>
                </ul>
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'scopes'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                A list of scope names that can access this endpoint.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'event'}</C></Tcol>
              <Tcol className="text-left">
                The name of the event to emit when the endpoint is
                requested. 
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'data'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                An object of static data that will add to and override 
                the input keys <E>(if they exist)</E>.
              </Tcol>
            </Trow>
          </Table>
        </div>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="custom-endpoint"></a>
      <H2>4. Custom Endpoint</H2>

      <section>
        <P>
          The last endpoint in the section above configuration calls an
          event called <C>hello-api</C>. Let's create a custom event
          that will return a hello message. The event will be called 
          when the endpoint is called.
        </P>

        <Code>{examples[3]}</Code>

        <Note>
          Make sure to add the plugin to the <C>plugins</C> list in 
          the <C>package.json</C> file.
        </Note>

        <P>
          The above code is a plugin file that listens to the
          <C>hello-api</C> event. It gets the <C>profileId</C> from the
          request data and calls the <C>profile-detail</C> event to get
          the profile. If the profile is found, it returns a hello
          message with the name of the profile. If not, it returns an
          error message.
        </P>

        <Note>
          In order to test this, you need to populate the session table 
          first. You can also use the command line to populate using 
          the <C>session-create</C> or database <C>query</C> event.
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="configure-webhooks"></a>
      <H2>5. Configure Webhooks</H2>

      <section>
        <P>
          Webhooks are automated notifications sent from one application 
          to another when a specific event occurs, like a new order, a 
          user signup, or a payment transaction. They act as a 
          lightweight, event-driven communication method, similar to 
          reverse APIs. Instead of constantly polling for updates, the 
          receiving application gets notified instantly when something 
          happens in real-time. 
        </P>

        <Code>{examples[4]}</Code>

        <P>
          Each webhook configuration requires the following parameters.
        </P>

        <div className="px-w-100-0 overflow-x-auto px-mb-20">
          <Table>
            <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
            <Thead className="theme-bg-bg2 text-left">Notes</Thead>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'event'}</C></Tcol>
              <Tcol className="text-left">
                The event to listen to.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'uri'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                The external URL to call when the event is triggered.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'method'}</C></Tcol>
              <Tcol className="text-left">
                The HTTP method to use when calling the URL.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="theme-bg-bg1 text-left">
                <C>{'validity'}</C>
              </Tcol>
              <Tcol className="theme-bg-bg1 text-left">
                Checks the results of the event against the validity
                object. If the results are not valid, the webhook will
                not be called. The validity object is a map of keys to
                values. The keys are the names of the columns in the
                results object. The values are the values to check
                against.
              </Tcol>
            </Trow>
            <Trow>
              <Tcol noWrap className="text-left"><C>{'data'}</C></Tcol>
              <Tcol className="text-left">
                Data to include in the results of the event. This adds 
                and overrides the output keys <E>(if they exist)</E>.
              </Tcol>
            </Trow>
          </Table>
        </div>

        <Warn>
          Calling an internal URL may cause an infinite loop if the 
          event listening to is emitted in the internal URL.
        </Warn>
      </section>
      
      <Nav
        prev={{ 
          text: 'Setup Permissions', 
          href: '/docs/toolkit/setup-permissions' 
        }}
        next={{ 
          text: 'Customize Terminal', 
          href: '/docs/toolkit/customize-terminal' 
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