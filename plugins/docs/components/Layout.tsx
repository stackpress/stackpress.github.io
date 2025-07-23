//modules
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useLanguage } from 'r22n';
//stackpress
import type { 
  LayoutProviderProps,
  PanelAppProps,
} from 'stackpress/view/client';
import {
  LayoutProvider,
  NotifyContainer,
  unload,
  useTheme,
  useRequest,
  useToggle
} from 'stackpress/view/client';

export function LayoutHead(props: {
  open?: boolean,
  theme: string,
  base?: string,
  logo?: string,
  brand?: string,
  toggleLeft?: () => void,
  toggleTheme?: () => void
}) {
  const { 
    open, 
    theme, 
    base,
    logo,
    brand,
    toggleLeft, 
    toggleTheme 
  } = props;
  const left = open ? 'rmd-px-l-220' : 'rmd-px-l-0';
  const full = typeof open === 'undefined' ? 'px-l-0' : 'px-l-220';
  const themeColor = theme === 'dark' ? 'bg-gray-600': 'bg-orange-600';
  const themeIcon = theme === 'dark' ? 'fa-moon': 'fa-sun';
  return (
    <header className={`theme-bg-bg1 duration-200 absolute px-h-60 px-r-0 px-t-0 ${full} ${left}`}>
      <div className="flex items-center px-px-20 px-h-100-0">
        {toggleLeft && (
          <button className="theme-tx1 md-hidden b-0 p-0 bg-transparent text-xl" onClick={toggleLeft}>
            <i className="fas fa-bars"></i>
          </button>
        )}
        <div className="flex-grow">
          {base ? (
            <a className="theme-tx1 flex items-center no-underline" href={base}>
              {logo && <img src={logo} alt={brand} className="px-w-30 px-h-30 px-mr-10" />}
              {brand && <span className="uppercase px-fs-16">{brand}</span>}
            </a>
          ): brand || logo ? (
            <span>
              {logo && <img src={logo} alt={brand} className="px-w-30 px-h-30 px-mr-10" />}
              {brand && <span className="uppercase px-fs-16">{brand}</span>}
            </span>
          ): undefined}
        </div>
        {toggleTheme && (
          <button 
            className={`flex justify-center items-center b-0 px-mr-10 px-h-26 px-w-26 px-fs-18 rounded-full text-white ${themeColor}`}
            onClick={() => toggleTheme()}
          >
            <i className={`fas ${themeIcon}`}></i>
          </button>
        )}
      </div>
    </header>
  );
}

export function LayoutLeft(props: {
  pathname?: string,
  open: boolean,
  toggle: () => void
}) {
  const { pathname = '/', open, toggle } = props;
  const left = open ? 'rmd-px-l-0' : 'rmd-px-l--220';
  const { _ } = useLanguage();
  const menu = [
    {
      label: '',
      search: '',
      children: [
        {
          label: 'Introduction',
          search: '/docs/introduction',
          href: '/docs/introduction'
        },
        {
          label: 'Getting Started',
          search: '/docs/getting-started',
          href: '/docs/getting-started'
        },
        {
          label: 'Tutorial',
          search: '/docs/tutorial',
          href: '/docs/tutorial'
        }
      ]
    },
    {
      label: 'Develop',
      search: '/docs/develop',
      children: [
        {
          label: 'Configure Project',
          search: '/docs/develop/configure-project',
          href: '/docs/develop/configure-project'
        },
        {
          label: 'Customize Bootstrap',
          search: '/docs/develop/customize-bootstrap',
          href: '/docs/develop/customize-bootstrap'
        },
        {
          label: 'Develop Routes',
          search: '/docs/develop/develop-routes',
          href: '/docs/develop/develop-routes'
        },
        {
          label: 'Develop Events',
          search: '/docs/develop/develop-events',
          href: '/docs/develop/develop-events'
        }
      ]
    },
    /*{
      label: 'Design',
      search: '/docs/design',
      children: [
        {
          label: 'Customize Branding',
          search: '/docs/design/customize-branding',
          href: '/docs/design/customize-branding'
        },
        {
          label: 'Theme Project',
          search: '/docs/design/theme-project',
          href: '/docs/design/theme-project'
        },
        {
          label: 'Template Views',
          search: '/docs/design/template-views',
          href: '/docs/design/template-views'
        },
        {
          label: 'UI Components',
          search: '/docs/design/ui-components',
          href: '/docs/design/ui-components'
        }
      ]
    },*/
    {
      label: 'Transform',
      search: '/docs/transform',
      children: [
        {
          label: 'Form an Idea',
          search: '/docs/transform/form-idea',
          href: '/docs/transform/form-idea'
        },
        {
          label: 'Generate an Idea',
          search: '/docs/transform/generate-idea',
          href: '/docs/transform/generate-idea'
        }
      ]
    },
    {
      label: 'Toolkit',
      search: '/docs/toolkit',
      children: [
        {
          label: 'Toolkit Setup',
          search: '/docs/toolkit/setup',
          href: '/docs/toolkit/setup'
        },
        {
          label: 'Add Translations',
          search: '/docs/toolkit/add-translations',
          href: '/docs/toolkit/add-translations'
        },
        {
          label: 'Setup Email',
          search: '/docs/toolkit/setup-email',
          href: '/docs/toolkit/setup-email'
        },
        {
          label: 'Setup Authentication',
          search: '/docs/toolkit/setup-authentication',
          href: '/docs/toolkit/setup-authentication'
        },
        {
          label: 'Setup Permissions',
          search: '/docs/toolkit/setup-permissions',
          href: '/docs/toolkit/setup-permissions'
        },
        {
          label: 'Setup API',
          search: '/docs/toolkit/setup-api',
          href: '/docs/toolkit/setup-api'
        },
        {
          label: 'Customize Terminal',
          search: '/docs/toolkit/customize-terminal',
          href: '/docs/toolkit/customize-terminal'
        }
      ]
    },
    /*{
      label: 'Deploy',
      search: '/docs/deploy',
      children: [
        {
          label: 'Build Project',
          search: '/docs/deploy/build-project',
          href: '/docs/deploy/build-project'
        },
        {
          label: 'Deploy to Vercel',
          search: '/docs/deploy/deploy-vercel',
          href: '/docs/deploy/deploy-vercel'
        }
      ]
    },
    {
      label: 'Plugins',
      search: '/docs/plugins',
      children: [
        {
          label: 'Toggle Plugins',
          search: '/docs/plugins/toggle-plugins',
          href: '/docs/plugins/toggle-plugins'
        },
        {
          label: 'Create Plugins',
          search: '/docs/plugins/create-plugins',
          href: '/docs/plugins/create-plugins'
        }
      ]
    },*/
    {
      label: 'References',
      search: '/docs/references',
      children: [
        {
          label: 'Client API',
          search: '/docs/references/client-api',
          href: '/docs/references/client-api'
        },
        {
          label: 'Configuration',
          search: '/docs/references/configuration',
          href: '/docs/references/configuration'
        },
        {
          label: 'EventEmitter Class',
          search: '/docs/references/emitter-class',
          href: '/docs/references/emitter-class'
        },
        {
          label: 'Exception Class',
          search: '/docs/references/exception-class',
          href: '/docs/references/exception-class'
        },
        {
          label: 'Query Builder',
          search: '/docs/references/query-builder',
          href: '/docs/references/query-builder'
        },
        {
          label: 'React API',
          search: '/docs/references/react-api',
          href: '/docs/references/react-api'
        },
        {
          label: 'Request Class',
          search: '/docs/references/request-class',
          href: '/docs/references/request-class'
        },
        {
          label: 'Response Class',
          search: '/docs/references/response-class',
          href: '/docs/references/response-class'
        },
        {
          label: 'Router Class',
          search: '/docs/references/router-class',
          href: '/docs/references/router-class'
        },
        {
          label: 'Schema Specifications',
          search: '/docs/references/schema-specifications',
          href: '/docs/references/schema-specifications'
        },
        {
          label: 'Server Class',
          search: '/docs/references/server-class',
          href: '/docs/references/server-class'
        },
        {
          label: 'View Engine',
          search: '/docs/references/view-engine',
          href: '/docs/references/view-engine'
        },
      ]
    }
  ];
  return (
    <aside className={`duration-200 flex flex-col px-h-100-0 px-z-100 absolute px-w-220 px-b-0 px-l-0 px-t-0 ${left}`}>
      <header className="px-p-10 px-h-60 flex items-center theme-bg-bg0">
        <h3 className="flex-grow px-m-0">
          <a className="theme-tx1 flex items-center no-underline" href="/">
            <img src="/icon.png" className="px-w-40 px-h-40 px-mr-10" />
            <span className="uppercase px-fs-16">{_('Stackpress')}</span>
          </a>
        </h3>
        <button className="theme-tx1 md-hidden b-0 p-0 bg-transparent text-xl" onClick={toggle}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </header>
      <main className="theme-bg-bg1 flex-grow overflow-auto px-pt-10 px-pb-40">
        {menu.map((section, i) => (
          <div key={i}>
            {section.label.length ? (
              <a href={section.children[0].href} className="theme-tx1 theme-bg-bg2 theme-bc-bd1 font-semibold px-fs-16 uppercase px-mb-0 px-mt-0 px-py-12 px-px-20 flex items-center">
                <span className="flex-grow">{_(section.label)}</span>
                {pathname.startsWith(section.search) ? (
                  <i className="theme-muted px-fs-12 fas fa-caret-down"></i>
                ) : (
                  <i className="theme-muted px-fs-12 fas fa-caret-left"></i>
                )}
                
              </a>
            ): null}
            {section.children.map((item, j) => {
              const left = section.label.length ? 'px-pl-40' : 'px-pl-20';
              return pathname.startsWith(section.search) ? (
                (pathname === item.search || pathname.startsWith(`${item.search}/`)) ? (
                  <a key={j} className={`theme-tx1 block px-py-10 ${left} font-bold`} href={item.href}>
                    {_(item.label)}
                  </a>
                ) : (
                  <a key={j} className={`theme-muted block px-py-10 ${left}`} href={item.href}>
                    {_(item.label)}
                  </a>
                )
              ): null;
            })}
          </div>
        ))}
      </main>
    </aside>
  );
}

export function LayoutMain(props: {
  open?: boolean,
  right?: boolean,
  children: ReactNode
}) {
  const { open, children } = props;
  const left = open ? 'rmd-px-l-220' : 'rmd-px-l-0';
  const right = props.right ? 'px-r-220 rlg-px-r-0' : 'px-r-0';
  const full = typeof open === 'undefined' ? 'px-l-0' : 'px-l-220';
  return (
    <main className={`theme-bg-bg0 duration-200 absolute px-b-0 px-t-60 ${full} ${left} ${right}`}>
      {children}
    </main>
  );
}

export function LayoutRight({ children }: {
  children: ReactNode
}) {
  return (
    <aside className="duration-200 absolute px-w-220 px-b-0 px-t-0 px-t-60 px-z-100 px-r-0 rlg-hidden">
      <div className="px-h-100-0 theme-bg-bg3 flex flex-col">
        {children}
      </div>
    </aside>
  );
}

export function LayoutApp(props: { 
  right?: ReactNode,
  children: ReactNode
}) {
  const { children } = props;
  const request = useRequest();
  const [ left, toggleLeft ] = useToggle();
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = request.url.pathname;
  return (
    <div className={`${theme} relative overflow-hidden px-w-100-0 px-h-100-0 theme-bg-bg0 theme-tx1`}>
      <LayoutHead 
        open={left} 
        theme={theme}
        toggleLeft={toggleLeft} 
        toggleTheme={toggleTheme} 
      />
      <LayoutLeft
        pathname={pathname}
        open={left}
        toggle={toggleLeft}
      />
      {props.right ? (<LayoutRight>{props.right}</LayoutRight>): null}
      <LayoutMain right={!!props.right} open={left}>{children}</LayoutMain>
    </div>
  );
}

export default function Layout(props: LayoutProviderProps & PanelAppProps) {
  const { 
    data,
    session,
    response,
    right,
    children 
  } = props;
  const [ request, setRequest ] = useState<Record<string, any>>({
    ...(props.request || {}),
    session: {
      ...(props.request?.session || {}),
      theme: props.request?.session?.theme || 'dark'
    }
  });
  //unload flash message
  useEffect(() => {
    const light = document.cookie.includes('theme=light');
    if (!request.session?.theme) {
      setRequest({
        ...request,
        session: { theme: light ? 'light' : 'dark' }
      });
    }
    unload();
  }, []);
  return (
    <LayoutProvider 
      data={data}
      session={session}
      request={request as any}
      response={response}
    >
      <LayoutApp right={right}>
        {children}
      </LayoutApp>
      <NotifyContainer />
    </LayoutProvider>
  );
}