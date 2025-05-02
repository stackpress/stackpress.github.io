//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, C, A, SS } from '../../../components/index.js';
import { Nav, Note, Code, Layout } from '../../../components/index.js';

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Client API - References - Stackpress Documentation');
  const description = _(
    'The client API is a set of methods and properties generated from '
    + 'an Idea file as a guide. Depending on the models and types '
    + 'defined in an Idea file, the client API will be different.'
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
        <a className="theme-tx0 block" href="#header2">
          {_('1. Header2')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Client API</H1>

      <P>
        The client API is a set of methods and properties generated from 
        an <SS>Idea</SS> file as a guide. Depending on the models and 
        types defined in an <SS>Idea</SS> file, the client API will be
        different. 
      </P>

      <Code>{`import client from 'stackpress-client'`}</Code>

      <Note><C>'stackpress-client'</C> depends on your configuration.</Note>

      {/*------------------------------------------------------------*/}

      <a id="config"></a>
      <H2>config</H2>

      <section>
        <P>
          Returns the entire client configuration object.
        </P>

        <Code>{'client.config'}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="registry"></a>
      <H2>registry</H2>

      <section>
        <P>
          Returns the registry object that manages the models, types, 
          enums and props.
        </P>

        <Code>{`client.registry.enum.Roles //--> { user: 'USER', admin: 'ADMIN' }`}</Code>
        <Code>{`client.registry.fieldset.Address //--> Fieldset { name: 'Address' }`}</Code>
        <Code>{`client.registry.model.Profile //--> Model { name: 'Profile' }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="model"></a>
      <H2>model</H2>

      <section>
        <P>
          Returns a map of all the <A href="/docs/references/client-api/config/model">
            models
          </A> in the registry. Each model contains an <A href="/docs/references/client-api/actions">
            action set
          </A> and a <A href="/docs/references/client-api/config/model">
            config
          </A> object.
        </P>

        <Code>{`client.model.profile.config //--> Model { name: 'Profile' }`}</Code>
        <Code>{`client.model.profile.actions //--> { create, remove, update, search, ... }`}</Code>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="fieldset"></a>
      <H2>fieldset</H2>

      <section>
        <P>
          Returns a map of all the <A href="/docs/references/client-api/config/fieldset">
            fieldsets
          </A> in the registry.
        </P>

        <Code>{`client.fieldset.address.config //--> Fieldset { name: 'Address' }`}</Code>
      </section>

      <Nav
        next={{ 
          text: 'Configuration', 
          href: '/docs/references/configuration' 
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