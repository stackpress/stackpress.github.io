//modules
import type { 
  ServerConfigProps, 
  ServerPageProps 
} from 'stackpress/view/client';
import { useLanguage } from 'stackpress/view/client';
//docs
import { H1, H2, P, H, C, E, A, SS } from '../../components/index.js';
import { Nav, Note, Code, Layout } from '../../components/index.js';

const examples = [
//0-------------------------------------------------------------------//
`//schema.idea
plugin "./docs/transform" {
  title "Documentation"
}`,
//1-------------------------------------------------------------------//
`import type { CLIProps } from '@stackpress/idea-transformer/types'
import type Transformer from '@stackpress/idea-transformer/Transformer'
import type Server from '@stackpress/ingest/Server'

export default function plugin(ctx: Server) {
  //generate some code in the client folder
  ctx.on('idea', async req => {
    //get the transformer from the request
    const transformer = req.data<Transformer<CLIProps>>('transformer')
    const schema = await transformer.schema()
    //if no plugin object exists, create one
    if (!schema.plugin) {
      schema.plugin = {}
    }
    //add this plugin generator to the schema
    //so it can be part of the transformation
    schema.plugin[\`\${import.meta.transform}/transform\`] = {
      title: 'Documentation'
    }
  })
}`,
//2-------------------------------------------------------------------//
`import type { IdeaPluginWithProject } from 'stackpress/types'
export default async function transform(props: IdeaPluginWithProject) {
  const { config, project, schema, cli } = props
}`,
//3-------------------------------------------------------------------//
`import type { IdeaPluginWithProject } from 'stackpress/types'
import { Registry } from 'stackpress/schema'
export default async function transform(props: IdeaPluginWithProject) {
  const { config, project, schema, cli } = props
  const registry = new Registry(schema)
  for (const model of registry.model.values()) {
    //generate something per model...
  }
}`,
//4-------------------------------------------------------------------//
`const registry = new Registry(schema)
for (const model of registry.model.values()) {
  //ie. [client]/Profile/docs/index.tsx
  const filepath = \`\${model.name}/docs/index.ts\`
  const source = project.createSourceFile(filepath)
  //build ts file...
}`,
//5-------------------------------------------------------------------//
`for (const model of registry.model.values()) {
  //ie. [client]/Profile/docs/index.tsx
  const filepath = \`\${model.name}/docs/index.ts\`
  const source = project.createSourceFile(filepath)
  //import React from 'react'
  source.addImportDeclaration({
    moduleSpecifier: 'React',
    defaultImport: 'react'
  })
}`,
//6-------------------------------------------------------------------//
`for (const model of registry.model.values()) {
  //ie. [client]/Profile/docs/index.tsx
  const filepath = \`\${model.name}/docs/index.ts\`
  const source = project.createSourceFile(filepath)
  //import React from 'react'
  //...
  //export function Documentation() {}
  source.addFunction({
    isExported: true,
    name: 'Documentation',
    statements: (\`
      return (
        <div>
          <h1>\${config.title} - \${model.name}</h1>
        </div>
      )
    \`)
  })
}`,
//7-------------------------------------------------------------------//
];

export function Head(props: ServerPageProps<ServerConfigProps>) {
  //props
  const { request, styles = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const title = _('Generate an Idea - Transform - Stackpress Documentation');
  const description = _(
    'Once you have an Idea file, you can generate code using a '
    + 'transformer. A transformer is a plugin that can be used to '
    + 'generate code based on the provided Idea file.'
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
          {_('header2')}
        </a>
      </nav>
    </menu>
  );
}

export function Body() {
  return (
    <article className="px-h-100-0 overflow-auto px-px-20 px-pb-20 px-fs-15">
      <H1>Generate an Idea</H1>

      <P>
        Once you have an <SS>Idea</SS> file, you can generate code using
        a transformer. A transformer is a plugin that can be used to 
        generate code based on the provided <SS>Idea</SS> file. 
      </P>

      {/*------------------------------------------------------------*/}

      <a id="declare-transformer"></a>
      <H2>Declare a Transformer</H2>

      <section>
        <P>
          There are two ways to declare a transformer. The first is to
          declare a plugin in the main <SS>Idea</SS> file like the 
          following example.
        </P>

        <Code>{examples[0]}</Code>

        <P>
          The second <E>(harder)</E> way is to create a plugin and listen to 
          the <C>'idea'</C> event like the following example.
        </P>

        <Code>{examples[1]}</Code>

        <P>
          When <SS>Stackpress</SS> calls the <C>idea</C> event, the 
          above code will get the current transformer from the request 
          data via <C>{`req.data('transformer')`}</C>. Next we parse 
          down the schema with <C>{`transformer.schema()`}</C>,
          then manually add the plugin to the schema.
        </P>

        <Note>
          Make sure to add the plugin to 
          the <H>plugins</H> list in <H>package.json</H>.
        </Note>
      </section>

      {/*------------------------------------------------------------*/}

      <a id="Transform"></a>
      <H2>Transform</H2>

      <section>
        <P>
          Inside of a transformer file you just need 
          to <C>export default</C> a function and the function does not 
          need to return anything. The function can be optionally async.
        </P>

        <Code>{examples[2]}</Code>

        <P>
          The transform function can accept an object argument that 
          contains the following properties.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">
            • <C>config</C> - The plugin specific configuration object.
            For example, <C>{`config.title //--> 'Documentation'`}</C>
          </li>
          <li className="px-pb-20">
            • <C>project</C> - A <C>Project</C> object provided 
            from <A href="https://www.npmjs.com/package/ts-morph">ts-morph</A>.
          </li>
          <li className="px-pb-20">
            • <C>schema</C> - The parsed schema object from 
            the <SS>Idea</SS> file. For example, <C>{`schema.model`}</C>.
          </li>
          <li className="px-pb-20">
            • <C>cli</C> - The terminal instance that called this 
            transformer. from the terminal, you can access 
            the <C>server</C> instance. For 
            example, <C>{`cli.server.loader.cwd // [cwd]`}</C>.
          </li>
        </ul>

        <P>
          These given properties are the toolset used to generate code.
          The next thing to do is create a <C>Registry</C> and add the 
          schema like the following example.
        </P>

        <Code>{examples[3]}</Code>

        <P>
          The above example creates a new <C>Registry</C> and loops 
          through the models. The <C>Registry</C> class is used to 
          organize the raw schema into an API set of methods and 
          properties. It contains the following properties.
        </P>

        <ul className="px-lh-30 px-px-20">
          <li className="px-pb-20">
            • <C>prop</C> - A map of props defined in 
            the <SS>Idea</SS> schema.
          </li>
          <li className="px-pb-20">
            • <C>enum</C> - A map of enums defined in 
            the <SS>Idea</SS> schema.
          </li>
          <li className="px-pb-20">
            • <C>fieldset</C> - A map of fieldset objects <E>(type)</E> defined 
            in the <SS>Idea</SS> schema. You can learn more about 
            the <A href="/docs/references/client-api/config/fieldset">Fieldset</A> class in 
            the <A href="/docs/references/client-api/config/fieldset">Client API</A> section.
          </li>
          <li className="px-pb-20">
            • <C>model</C> - A map of model objects defined in 
            the <SS>Idea</SS> schema. You can learn more about 
            the <A href="/docs/references/client-api/config/model">Model</A> class in 
            the <A href="/docs/references/client-api/config/model">Client API</A> section.
          </li>
        </ul>

        <P>
          From here you can generate code heuristically, or use the 
          provided <A href="https://www.npmjs.com/package/ts-morph">
            ts-morph
          </A> <C>project</C> API like the following example.
        </P>

        <Code>{examples[4]}</Code>

        <P>
          The above code creates a new source file
          in <C>[client]/Profile/docs/index.tsx</C>.
          The <C>createSourceFile()</C> method will create a new file
          if it does not exist. This returns a pointer to the file so
          we can add code to it. The following code will add the first 
          code block.
        </P>

        <Code>{examples[5]}</Code>

        <P>
          The above code will add the <C>import React from 'react'</C>
          statement to the top of the file 
          via <C>addImportDeclaration()</C>. The next example 
          demonstrates how to add a function to the file.
        </P>

        <Code>{examples[6]}</Code>

        <P>
          The above code will add a function called <C>Documentation</C>
          to the file. The function is exported and returns a 
          <C>JSX</C> element. The <C>config.title</C> and 
          <C>model.name</C> are passed to the <C>h1</C> tag. To test this
          transformer, you can run the following command in the terminal.
        </P>

        <Code lang="bash">{
          `npx stackpress generate -v`
        }</Code>

        <P>
          The above command will run the transformer and generate a file  
          located at <C>stackpress-client/Profile/docs/index.js</C>. This 
          means you can now import this file from your project like this.
        </P>

        <Code>{
          `import { Documentation } from 'stackpress-client/Profile/docs'`
        }</Code>

        <Note>
          You may need to add this to the client exports list in 
          the <H>stackpress-client</H> <H>package.json</H> file.
        </Note>

      </section>

      <Nav
        prev={{ 
          text: 'Form an Idea',
          href: '/docs/transform/form-idea' 
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