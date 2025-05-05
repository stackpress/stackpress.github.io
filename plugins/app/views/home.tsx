//styles
import '../styles/page.css';
//modules
import Control from 'frui/form/Control';
import Button from 'frui/form/Button';
import Input from 'frui/field/Input';
import Image from 'frui/field/Image';
import Switch from 'frui/field/Switch';
import Country from 'frui/field/Country';
import Taglist from 'frui/field/Taglist';
import Metadata from 'frui/field/Metadata';
import Textlist from 'frui/field/Textlist';
import { Table, Thead, Trow, Tcol } from 'frui/element/Table';
import Code from 'frui/format/Code';
import Tags from 'frui/format/Taglist';
//stackpress
import type { ServerPageProps } from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
import Layout from '../Layout.js';

export function Head(props: ServerPageProps) {
  const { styles = [] } = props;
  return (
    <>
      <title>Stackpress</title>
      <meta name="description" content="Stackpress" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/styles/global.css" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  )
}

export default function HomePage(props: ServerPageProps) {
  const { session, request, response } = props;
  const { _ } = useLanguage();
  const code = [
`import { server } from 'stackpress/http'

const app = server()

app.get('/', (req, res) => {
  const name = req.data('name')
  res.render('@/views/home', { name })
})

app.create().listen(3000, () => {
  console.log('Listening on port 3000')
})`,

`export function Head(props: ServerPageProps) {
  const { styles = [] } = props
  return (
    <>
      <title>Stackpress</title>
      <meta name="description" content="Stackpress" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/styles/global.css" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  )
}

export default function HomePage(props: ServerPageProps) {
  const { session, request, response } = props
  const [count, setCount] = useState(0)

  return (
    <Layout session={session} request={request} response={response}>
      <div className="p-4">
        <h1>Welcome to Stackpress</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </Layout>
  )
}`,

`model User
  @label("User" "Users") 
  @template("{{name}}") 
  @icon("user") 
{
  id          String    @label("ID") 
                        @id @default("cuid()")
                        @list.overflow({ length 10 hellip true })
  
  name        String    @label("Name") 
                        @searchable
                        @field.text({ required true })
                        @is.required("Required")
                        @is.notempty("Cannot be empty")
                        @list.text @view.text

  image       String?   @label("Image") 
                        @field.url
                        @list.image(20 20) 
                        @view.image(100 100)
  
  type        String    @label("Type") 
                        @default("person") 
                        @filter.text
                        @field.text({ required true })
                        @is.notempty("Cannot be empty")
                        @list.text({ lower true }) 
                        @view.text({ lower true })
  
  roles       String[]  @label("Roles") 
                        @field.textlist({ add "Add Role" })
                        @list.hide @view.taglist
  
  references  Hash?     @label("References") 
                        @default("{}")
                        @field.metadata({ add "Add Reference" })
                        @list.hide @view.metadata
  
  active      Boolean   @label("Active") 
                        @default(true) @active
                        @filter.switch
                        @list.hide @view.yesno
  
  created     Datetime  @label("Created") 
                        @default("now()") @sortable
                        @span.datetime
                        @list.date("m d, Y h:iA") 
                        @view.date("m d, Y h:iA")
}`
  ];
  return (
    <Layout session={session} request={request} response={response}>
      <main className="theme-bg-bg0 theme-tx1 px-h-100-0 px-w-100-0 overflow-auto">
        <section className="theme-bg-bg1 px-py-40">
          <div className="flex rmd-block px-mw-1024 m-auto">
            <div className="basis-1/2 px-w-50-0 rmd-px-w-100-0">
              <div className="px-px-20">
                <div className="theme-bg-bg0 px-p-20">
                  <h4 className="font-bold px-fs-20 px-mb-20">
                    {_('Search Users')}
                  </h4>
                  <div className="overflow-x-auto">
                    <Table>
                      <Thead noWrap className="theme-bg-bg2 theme-info text-right cursor-pointer border-0">
                        {_('ID')}
                        <i className="inline-block px-ml-10 fas fa-sort" />
                      </Thead>
                      <Thead className="theme-bg-bg2 text-left border-0">
                        {_('Name')}
                      </Thead>
                      <Thead className="theme-bg-bg2 text-center border-0">
                        {_('Role')}
                      </Thead>
                      <Thead className="theme-bg-bg2 text-left border-0">
                        {_('Tags')}
                      </Thead>
                      <Thead className="theme-bg-bg2 text-left border-0">
                        {_('Country')}
                      </Thead>
                      <Thead className="theme-bg-bg2 text-center border-0">
                        {_('Active')}
                      </Thead>
                      <Thead noWrap className="theme-bg-bg2 theme-info text-right cursor-pointer border-0">
                        {_('Created')}
                        <i className="inline-block px-ml-10 fas fa-sort" />
                      </Thead>
                      <Thead className="theme-bg-bg2 px-r--1 border-0" stickyRight>
                        &nbsp;
                      </Thead>
                      <Trow>
                        <Tcol className="theme-bg-bg0 text-right border-0">
                          10431
                        </Tcol>
                        <Tcol noWrap className="theme-bg-bg0 text-left border-0">
                          John Doe
                        </Tcol>
                        <Tcol className="theme-bg-bg0 theme-info text-center cursor-pointer border-0">
                          user
                        </Tcol>
                        <Tcol className="theme-bg-bg0 theme-info text-left border-0">
                          <Tags className="rounded-full theme-bg-warning" value={[ 'location', 'commerce', 'address' ]} />
                        </Tcol>
                        <Tcol noWrap className="theme-bg-bg0 theme-info text-left cursor-pointer border-0">
                          United States
                        </Tcol>
                        <Tcol className="theme-bg-bg0 theme-info text-center cursor- border-0">
                          Yes
                        </Tcol>
                        <Tcol noWrap className="theme-bg-bg0 text-right border-0">
                          2 days ago
                        </Tcol>
                        <Tcol className="theme-bg-bg0 border-0 px-r--1" stickyRight>
                          <Button info>
                            <i className="fas fa-fw fa-caret-right"></i>
                          </Button>
                        </Tcol>
                      </Trow>
                      <Trow>
                        <Tcol className="theme-bg-bg1 text-right border-0">
                          10432
                        </Tcol>
                        <Tcol noWrap className="theme-bg-bg1 text-left border-0">
                          Jane Doe
                        </Tcol>
                        <Tcol className="theme-bg-bg1 theme-info text-center cursor-pointer border-0">
                          admin
                        </Tcol>
                        <Tcol className="theme-bg-bg1 theme-info text-left border-0">
                          <Tags className="rounded-full theme-bg-warning" value={[ 'location', 'commerce', 'address' ]} />
                        </Tcol>
                        <Tcol className="theme-bg-bg1 theme-info text-left cursor-pointer border-0">
                          Canada
                        </Tcol>
                        <Tcol className="theme-bg-bg1 theme-info text-center cursor-pointer border-0">
                          Yes
                        </Tcol>
                        <Tcol noWrap className="theme-bg-bg1 text-right border-0">
                          last week
                        </Tcol>
                        <Tcol className="theme-bg-bg1 border-0 px-r--1" stickyRight>
                          <Button info>
                            <i className="fas fa-fw fa-caret-right"></i>
                          </Button>
                        </Tcol>
                      </Trow>
                    </Table>
                  </div>
                  <div className="rmd-hidden">
                    <Control label="Name">
                      <Input placeholder="ie. John Doe" />
                    </Control>
                    <Control className="px-py-10" label="Country">
                      <Country />
                    </Control>
                    <Control className="px-py-10" label="Tags">
                      <Taglist value={['commerce', 'address']} />
                    </Control>
                    <Button info>{_('Create User')}</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/2 px-w-50-0 rmd-px-w-100-0 rmd-text-center rmd-px-pt-40 flex items-center rmd-justify-center">
              <div className="px-px-20">
                <h1 className="px-fs-30 px-mw-440 font-bold rmd-m-auto">
                  {_('Full Stack Content Management Framework')}
                </h1>
                <p className="px-pt-20 px-fs-16 px-mw-440 px-lh-30 rmd-m-auto">
                  {_(
                    'Stackpress is a server-first framework with modern '
                    + 'routing, React Templating, SQL Dialects and an '
                    + 'Admin generator. Go from zero to sixty and 💯 '
                    + 'open source.'
                  )}
                </p>
                <div className="px-pt-40">
                  <Button info xl3
                    className="inline-block px-mr-10 px-fs-16" 
                    href="/docs/getting-started"
                  >
                    {_('Get Started')}
                  </Button>
                  <Button warning xl3 
                    className="inline-block px-fs-16"
                    href="/docs/introduction"
                  >
                    {_('Read the Docs')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="theme-bg-bg0 px-py-40 text-center">
          <h2 className="px-fs-30 font-bold">
            {_('The Good Ol\' Days')}
          </h2>
          <p className="px-pt-20 px-px-20 px-fs-16 px-mw-767 px-lh-30 m-auto">
            {_(
              'Stackpress is unopinionated and provides a full-stack '
              + 'toolset encouraging abstraction, design patterns and '
              + 'object oriented programming.'
            )}
          </p>
          <div className="text-left px-p-20 px-mw-420 m-auto">
            <Code language="javascript">{code[0]}</Code>
          </div>
          <div className="flex flex-wrap justify-center px-mw-992 m-auto">
            <div className="px-pt-40 basis-1/2 px-w-50-0 rsm-basis-full rmd-px-w-100-0">
              <div className="text-center px-fs-40">
                <i className="fas fa-fw fa-sitemap"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Unopinionated')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Design your project file system the way you want. '
                  + 'Customize your build process, continuous integration '
                  + '& deployment.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/2 px-w-50-0 rsm-basis-full rmd-px-w-100-0">
              <div className="text-center px-fs-40">
                <i className="fas fa-fw fa-route"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Routing')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Event driven, Express-like routing with mapping & '
                  + 'analytics for bundlers. Lazy & Priority routing. '
                  + 'Customizable view engine.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/2 px-w-50-0 rsm-basis-full rmd-px-w-100-0">
              <div className="text-center px-fs-40">
                <i className="fas fa-fw fa-plug"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Pluggable')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Designed with separation of concerns and '
                  + 'extensibility in mind. Create and publish your '
                  + 'own plugins. Toggle built-in plugins.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/2 px-w-50-0 rsm-basis-full rmd-px-w-100-0">
              <div className="text-center px-fs-40">
                <i className="fas fa-fw fa-code"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Open Source Core')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Stackpress is a combination of open source projects '
                  + 'managed by the team. Separate issue trackers. '
                  + 'Syncronized releases.'
                )}
              </p>
            </div>
          </div>
        </section>
        <section className="theme-bg-bg1 px-py-40 flex rmd-block">
          <div className="basis-1/2 px-w-50-0 rmd-px-w-100-0 rmd-text-center rmd-px-pt-40 flex items-center rmd-justify-center">
            <div className="px-px-20 text-center m-auto">
              <h1 className="px-fs-30 font-bold">
                <i className="fab fa-fw fa-react inline-block px-mr-10"></i>
                {_('React Template Engine')}
              </h1>
              <p className="px-pt-20 px-fs-16 px-lh-30 px-mw-420">
                {_(
                  'Pass server props and render "mini-apps". React '
                  + 'reactive templating. Use any Vite plugin. Bring '
                  + 'your own build script. Ejectable for production.'
                )}
              </p>
              <ul className="px-lh-40 px-py-20">
                <li>• {_('No frontend server')}</li>
                <li>• {_('No global state management')}</li>
                <li>• {_('No memoization needed')}</li>
                <li>• {_('No suspense needed')}</li>
                <li>• {_('No frontend routing system')}</li>
              </ul>
            </div>
          </div>
          <div className="basis-1/2 px-w-50-0 rmd-px-w-100-0">
            <div className="px-px-20">
              <Code language="typescript">{code[1]}</Code>
            </div>
          </div>
        </section>
        <section className="theme-bg-bg0 px-py-40 text-center">
          <h2 className="px-fs-30 font-bold">
            {_('Built-in Tools')}
          </h2>
          <p className="px-pt-20 px-px-20 px-fs-16 px-mw-767 px-lh-30 m-auto">
            {_(
              'Don\'t start from scratch. Stackpress comes with a default '
              + 'set of tools to get you started. Toggle them to build against '
              + 'your project requirements.'
            )}
          </p>
          <div className="flex flex-wrap justify-center px-mw-992 m-auto">
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-image"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Theming')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Light & Dark mode. Use Tailwind style & CSS variables.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-language"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Language')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Static i18n & translations for backend & frontend.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-terminal"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('CLI')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Emit events, query database & add your own commands.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-database"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('SQL Dialects')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Simple query builder, raw queries & transactions.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-key"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Authentication')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Sign-in, sign-up, sign-out, password reset & email verification.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-lock"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Permissions')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'User roles & static permissions to white-list routes and events.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-code"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('OAuth & API')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Public, app and user endpoints using static configuration.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-envelope"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Email')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Basic SMTP configuration and backend send events.'
                )}
              </p>
            </div>
            <div className="px-pt-40 basis-1/3 px-w-33-0 rmd-basis-1/2 rmd-px-w-50-0 rsm-basis-full rsm-px-w-100-0">
              <div className="text-center px-fs-30">
                <i className="fas fa-fw fa-pager"></i>
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('UI Components')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Just React components. Bring your own design system.'
                )}
              </p>
            </div>
          </div>
        </section>
        <section className="theme-bg-bg1 px-py-40">
          <h2 className="px-fs-30 font-bold text-center">
            {_('From Idea to Reality')}
          </h2>
          <p className="px-pt-20 px-px-20 px-fs-16 px-lh-30 text-center px-mw-767 m-auto">
            {_(
              'Express your idea in a file to generate types, '
              + 'models, database tables, components, pages and '
              + 'even an Admin panel. Progessively change even after '
              + 'your first deploy. Make your own custom generators '
              + 'and bring your own AI.'
            )}
          </p>
          <div className="flex rmd-block px-pt-40 px-px-20">
            <div className="basis-1/2 px-w-50-0 rmd-px-w-100-0">
              <Code language="typescript">{code[2]}</Code>
            </div>
            <div className="basis-1/2 px-w-50-0 rmd-px-w-100-0 flex items-center justify-center theme-bg-bg0">
              <div className="px-w-90-0 rmd-px-w-100-0 rmd-px-p-20">
                <div className="theme-bg-bg1 px-p-10 px-mb-20">
                  <i className="theme-info cursor-pointer inline-block px-mr-5 fas fa-fw fa-user" />
                  <span className="theme-info cursor-pointer">Users</span>
                  <i className="inline-block px-mx-8 fas fa-fw fa-chevron-right" />
                  <i className="inline-block px-mr-3 fas fa-fw fa-plus" />
                  <span>Create User</span>
                </div>
                <Control className="px-pb-10" label="Name">
                  <Input placeholder="ie. John Doe" />
                </Control>
                <Control className="px-pb-10" label="Image">
                  <Image className="bg-white w-full" value="https://images.wsj.net/im-580612/8SR" />
                </Control>
                <Control className="px-pb-10" label="Type">
                  <Input value="person" />
                </Control>
                <Control className="px-pb-10" label="Roles">
                  <Textlist add="Add Role" value={[ 'ADMIN', 'USER' ]} />
                </Control>
                <Control className="px-pb-10" label="References">
                  <Metadata add="Add Reference" value={[
                    [ 'id', 'abc123' ], 
                    [ 'source', 'facebook' ]
                  ]} />
                </Control>
                <Control className="px-pb-20" label="Active">
                  <Switch orange checkex rounded checked />
                </Control>
                <Button info>{_('Submit')}</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="theme-bg-bg0 px-py-80">
          <h2 className="px-fs-30 font-bold text-center">
            {_('Open Source Foundry')}
          </h2>
          <p className="px-pt-20 px-px-20 px-fs-20 px-lh-30 text-center px-mw-767 m-auto">
            {_(
              'Built on top of both popular and open source projects we manage with Apache GPLv3 Licenses.'
            )}
          </p>
          <div className="flex flex-wrap justify-center px-mw-992 m-auto text-center">
            <div className="px-pt-80 basis-1/2 px-w-50-0 rsm-basis-full rmd-px-w-100-0">
              <div className="bg-black inline-flex items-center justify-center rounded-full px-w-80 px-h-80">
                <img 
                  alt="idea logo"
                  className="inline-block px-w-40 px-h-40"
                  src="https://www.stackpress.io/images/idea-logo-icon.png" 
                />
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Idea')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'Idea language specification and parser. Streamline and automate major parts of your software development.'
                )}
              </p>
              <nav className="flex items-center justify-center px-pt-20">
                <a href="https://github.com/stackpress/idea" target="_blank">
                  <i className="px-fs-26 fab fa-github"></i>
                </a>
                <a 
                  className="px-mx-20 px-w-26 px-h-26 hex-bg-CB3837 rounded-full flex justify-center items-center" 
                  href="https://www.npmjs.com/package/@stackpress/idea"
                  target="_blank"
                >
                  <i className="px-fs-16 fab fa-npm text-white"></i>
                </a>
                <a href="/idea">
                  <i className="px-fs-26 fas fa-globe"></i>
                </a>
              </nav>
            </div>
            <div className="px-pt-80 basis-1/2 px-w-50-0 rsm-basis-full rmd-px-w-100-0">
              <div className="bg-black inline-flex items-center justify-center rounded-full px-w-80 px-h-80">
                <img 
                  alt="ingest logo"
                  className="inline-block px-w-40 px-h-40"
                  src="https://www.stackpress.io/images/ingest-logo-icon.png" 
                />
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Ingest')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'An event driven server/less framework. Deploy to AWS Lambda, GCP Functions, Azure, Netlify, and Vercel. '
                )}
              </p>
              <nav className="flex items-center justify-center px-pt-20">
                <a href="https://github.com/stackpress/ingest" target="_blank">
                  <i className="px-fs-26 fab fa-github"></i>
                </a>
                <a 
                  className="px-mx-20 px-w-26 px-h-26 hex-bg-CB3837 rounded-full flex justify-center items-center" 
                  href="https://www.npmjs.com/package/@stackpress/ingest"
                  target="_blank"
                >
                  <i className="px-fs-16 fab fa-npm text-white"></i>
                </a>
                <a href="/ingest">
                  <i className="px-fs-26 fas fa-globe"></i>
                </a>
              </nav>
            </div>
            <div className="px-pt-80 basis-1/2 px-w-50-0 rsm-basis-full rmd-px-w-100-0">
              <div className="bg-black inline-flex items-center justify-center rounded-full px-w-80 px-h-80">
                <img 
                  alt="inquire logo"
                  className="inline-block px-w-40 px-h-40"
                  src="https://www.stackpress.io/images/inquire-logo-icon.png" 
                />
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Inquire')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'SQL query builder and composite engine for MySQL, Postgres, SQLite, Cockroach DB, Neon DB, Supabase and more.'
                )}
              </p>
              <nav className="flex items-center justify-center px-pt-20">
                <a href="https://github.com/stackpress/inquire" target="_blank">
                  <i className="px-fs-26 fab fa-github"></i>
                </a>
                <a 
                  className="px-mx-20 px-w-26 px-h-26 hex-bg-CB3837 rounded-full flex justify-center items-center" 
                  href="https://www.npmjs.com/package/@stackpress/inquire"
                  target="_blank"
                >
                  <i className="px-fs-16 fab fa-npm text-white"></i>
                </a>
                <a href="/inquire">
                  <i className="px-fs-26 fas fa-globe"></i>
                </a>
              </nav>
            </div>
            <div className="px-pt-80 basis-1/2 px-w-50-0 rsm-basis-full rmd-px-w-100-0">
              <div className="bg-black inline-flex items-center justify-center rounded-full px-w-80 px-h-80">
                <img 
                  alt="reactus logo"
                  className="inline-block px-w-40 px-h-40"
                  src="https://www.stackpress.io/images/reactus-logo-icon.png" 
                />
              </div>
              <h3 className="px-pt-20 font-semibold px-fs-20 uppercase">
                {_('Reactus')}
              </h3>
              <p className="px-pt-20 px-px-20 px-lh-30">
                {_(
                  'A reactive React template engine for next generation server focused web applications.'
                )}
              </p>
              <nav className="flex items-center justify-center px-pt-20">
                <a href="https://github.com/stackpress/reactus" target="_blank">
                  <i className="px-fs-26 fab fa-github"></i>
                </a>
                <a 
                  className="px-mx-20 px-w-26 px-h-26 hex-bg-CB3837 rounded-full flex justify-center items-center" 
                  href="https://www.npmjs.com/package/reactus"
                  target="_blank"
                >
                  <i className="px-fs-16 fab fa-npm text-white"></i>
                </a>
                <a href="/reactus">
                  <i className="px-fs-26 fas fa-globe"></i>
                </a>
              </nav>
            </div>
          </div>
        </section>
        <section className="theme-bg-bg1 px-py-40">
          <h2 className="px-fs-30 font-bold text-center">
            {_('What Are You Waiting For?')}
          </h2>
          <div className="px-py-40 text-center">
            <Button info xl3
              className="inline-block px-mr-20 px-fs-16" 
              href="/docs/getting-started"
            >
              {_('Get Started')}
            </Button>
            <Button warning xl3 
              className="inline-block px-fs-16"
              href="/docs/introduction"
            >
              {_('Read the Docs')}
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  )
}