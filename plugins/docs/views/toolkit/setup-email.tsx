//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
//docs
import { H1, P, C } from '../../components/index.js';
import { Nav, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`export const config: Config = {
  //...
  email: {
    host: 'smtp.example.com',
    port: 587,
    // upgrade later with STARTTLS
    secure: false, 
    auth: {
      user: 'username',
      pass: 'password',
    }
  }
};`,
//1-------------------------------------------------------------------//
`$ npx config/develop stackpress send-email 
  from="sender@server.com" 
  to="receiver@sender.com"
  subject="Test Email"
  text="This is a test email."
  html="<h1>This is a test email.</h1>"`
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Setup Email - Stackpress Documentation');
  const description = _(
    'To enable emailing, you just need to update the configuration '
    + 'file using the following as a guide.'
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
      <H1>Setup Email</H1>

      <P>
        To enable emailing, you just need to update the configuration 
        file using the following as a guide.
      </P>

      <Code>{examples[0]}</Code>

      <P>
        The email config required the following parameters.
      </P>

      <div className="px-w-100-0 overflow-x-auto">
        <Table>
          <Thead wrap2 className="theme-bg-bg2 text-left">Option</Thead>
          <Thead className="theme-bg-bg2 text-left">Notes</Thead>
          <Trow>
            <Tcol noWrap className="text-left"><C>{'host'}</C></Tcol>
            <Tcol className="text-left">
              The SMTP host to connect to. This is usually the domain
              name of the email provider you are using. For example,
              <C>smtp.example.com</C> or <C>mail.example.com</C>.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'port'}</C></Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              The port to connect to. This is usually <C>465</C>.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="text-left"><C>{'secure'}</C></Tcol>
            <Tcol className="text-left">
              Whether to use SSL or TLS. This is usually <C>false</C>.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="theme-bg-bg1 text-left"><C>{'auth.user'}</C></Tcol>
            <Tcol className="theme-bg-bg1 text-left">
              The username to use to authenticate with the SMTP server.
              This is usually the email address you are using to send 
              emails.
            </Tcol>
          </Trow>
          <Trow>
            <Tcol noWrap className="text-left"><C>{'auth.pass'}</C></Tcol>
            <Tcol className="text-left">
              The password to use to authenticate with the SMTP server.
              This is usually the password you use to log in to your 
              email account.
            </Tcol>
          </Trow>
        </Table>
      </div>

      <P>
        The easiest way to test emailing is by using the command line 
        to emit the <C>"send-email"</C> event.
      </P>

      <Code>{examples[1]}</Code>

      <P>
        After running the above command, you should see an email
        appear in the recpient's inbox. If you don't see the email, 
        check your spam folder. If you still don't see the email, check 
        the SMTP server settings and make sure they are correct. 
      </P>
      
      <Nav
        prev={{ text: 'Add Translations', href: '/docs/toolkit/add-translations' }}
        next={{ text: 'Setup Authentication', href: '/docs/toolkit/setup-authentication' }}
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