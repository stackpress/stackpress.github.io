//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
import { useLanguage } from 'r22n';
//docs
import {
  Header1,
  Header2,
  Paragraph,
  Nav
} from '../Typography.js';
import Layout from '../Layout.js';

export function DocumentationHead(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const url = request.url?.pathname || '/docs';
  const title = _('Welcome to Stackpress');
  const description = _(
    'In order to get access to these static APIs, you will need to have an API key.'
  );
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content="/images/icon.png" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content="/images/icon.png" />

      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/styles/global.css" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  )
}

export function DocumentationBody() {
  return (
    <main className="px-h-100-0 overflow-auto px-p-10">
      <Header1>Welcome to Stackpress</Header1>
      
      <Paragraph>
        Stackpress is a content management framework built on Typescript 
        following the Ecmascript Module standard, used to develop content 
        focused web applications. Design patterns that are implemented 
        on Stackpress surround event driven and pluggable, allowing 
        developers to build applications that are modular, reusable 
        and progressive.
      </Paragraph> 

      <Paragraph>
        The goal of Stackpress is to fast forward idea to product in 
        days versus months. To get to days, Stackpress has built-in app
        essentials like authentication, roles &amp; permissions, i18n, 
        email, API as well as a generator that transforms model designs
        to client code in a matter of seconds. The second goal of 
        Stackpress is to be able to add, change and/or remove features 
        on the fly. This is achieved by organizing code into plugins, 
        and developing generators in order to render code on the fly.
      </Paragraph>

      <Paragraph>
        The ideal use case for Stackpress includes spending a couple 
        hours modeling, a couple seconds generating, a few minutes 
        configuring and the rest of the time designing the application.
      </Paragraph>

      <Header2>Features</Header2>

      <Paragraph>
        Some of main Stackpress Features include the following.
      </Paragraph>

      <Table>
        <Thead className="theme-bg-bg2 text-left">Feature</Thead>
        <Thead className="theme-bg-bg2 text-left">Description</Thead>
        <Trow>
          <Tcol className="font-bold">Routing</Tcol>
          <Tcol>
            Express-like routing with mapping & analytics for bundlers. 
            Lazy & Priority routing. Customizable view engine.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="theme-bg-bg1 font-bold">Plugins</Tcol>
          <Tcol className="theme-bg-bg1">
            Create and publish your own plugins. Toggle built-in plugins.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="font-bold">Theming</Tcol>
          <Tcol>
            Light & Dark mode. Use Tailwind style & CSS variables.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="theme-bg-bg1 font-bold">Language</Tcol>
          <Tcol className="theme-bg-bg1">
            Static i18n & translations for backend & frontend.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="font-bold">CLI</Tcol>
          <Tcol>
            Emit events, query database & add your own commands.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="theme-bg-bg1 font-bold">SQL Dialects</Tcol>
          <Tcol className="theme-bg-bg1">
            Simple query builder, raw queries & transactions.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="font-bold">Authentication</Tcol>
          <Tcol>
            Sign-in, sign-up, sign-out, password reset & email verification.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="theme-bg-bg1 font-bold">Permissions</Tcol>
          <Tcol className="theme-bg-bg1">
            User roles & static permissions to white-list routes and events.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="font-bold">OAuth &amp; API</Tcol>
          <Tcol>
            Public, app and user endpoints using static configuration.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol className="theme-bg-bg1 font-bold">Email</Tcol>
          <Tcol className="theme-bg-bg1">
            Basic SMTP configuration and backend send events.
          </Tcol>
        </Trow>
        <Trow>
          <Tcol noWrap className="font-bold">UI Components</Tcol>
          <Tcol>
            Just React components. Bring your own design system.
          </Tcol>
        </Trow>
      </Table>

      <Header2>Philosophies</Header2>

      <Paragraph>
        Stackpress is designed around the following concepts.
      </Paragraph>

      <ul className="px-lh-30 px-px-20 px-w-767 flex flex-wrap rmd-block rmd-w-100-0">
        <li className="px-w-50-0">• Server-side first</li>
        <li className="px-w-50-0">• Ecmascript Module Standards</li>
        <li className="px-w-50-0">• Typescript to Production</li>
        <li className="px-w-50-0">• Unopinionated File Structure</li>
        <li className="px-w-50-0">• Event Driven Design</li>
        <li className="px-w-50-0">• Plugggable Design</li>
        <li className="px-w-50-0">• Progressive Code Generators</li>
      </ul>

      <Nav next={{ text: 'Getting Started', href: '/docs/getting-started' }} />
    </main>
  );
}

export function DocumentationPage(props: ServerPageProps<ServerConfigProps>) {
  const { data, session, request, response } = props;
  return (
    <Layout
      data={data}
      session={session}
      request={request}
      response={response}
    >
      <DocumentationBody />
    </Layout>
  );
}

export const Head = DocumentationHead;
export default DocumentationPage;