//modules
import { useEffect } from 'react';
//views
import type { 
  PanelAppProps, 
  LayoutHeadProps,
  LayoutPanelProps 
} from 'stackpress/view/client';
import { 
  unload,
  useTheme,
  useLanguage,
  NotifyContainer,
  LayoutMain,
  LayoutProvider
} from 'stackpress/view/client';

export function Head(props: LayoutHeadProps) {
  const { theme, toggleTheme } = props;
  const { _ } = useLanguage();
  const themeColor = theme === 'dark' ? 'bg-gray-600': 'bg-orange-600';
  const themeIcon = theme === 'dark' ? 'fa-moon': 'fa-sun';
  return (
    <header className="theme-bg-bg1 theme-bc-bd0 duration-200 absolute px-h-60 px-l-0 px-r-0 px-t-0 border-b">
      <div className="flex items-center px-px-20 px-h-100-0">
        <a className="theme-tx1 flex items-center no-underline px-mr-10" href="/">
          <img 
            src="/images/stackpress-logo-icon.png" 
            alt="stackpress logo" 
            className="px-w-30 px-h-30 px-mr-10" 
          />
          <img 
            src="/images/stackpress-logo-text.png" 
            alt="stackpress logo" 
            className="px-h-16 px-mr-10" 
          />
        </a>
        <nav className="flex-grow">
          <a className="theme-tx1 flex items-center no-underline uppercase" href="/docs/introduction">
            {_('Docs')}
          </a>
        </nav>
        <nav className="rmd-hidden flex items-center">
          <a className="px-mr-10" href="https://github.com/stackpress">
            <i className="px-fs-26 fab fa-github"></i>
          </a>
          <a 
            className="px-mr-10 px-w-26 px-h-26 hex-bg-CB3837 rounded-full flex justify-center items-center" 
            href="https://www.npmjs.com/package/stackpress"
          >
            <i className="px-fs-16 fab fa-npm text-white"></i>
          </a>
          {toggleTheme && (
            <button 
              className={`flex justify-center items-center b-0 px-mr-10 px-h-26 px-w-26 px-fs-18 rounded-full text-white ${themeColor}`}
              onClick={() => toggleTheme()}
            >
              <i className={`fas ${themeIcon}`}></i>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export function App(props: PanelAppProps) {
  const { children } = props;
  const { theme, toggle: toggleTheme } = useTheme();
  return (
    <div className={`${theme} relative overflow-hidden px-w-100-0 px-h-100-0 theme-bg-bg0 theme-tx1`}>
      <Head theme={theme} toggleTheme={toggleTheme} />
      <LayoutMain head>{children}</LayoutMain>
    </div>
  );
}

export default function Layout(props: LayoutPanelProps) {
  const { 
    data,
    session,
    request,
    response,
    children 
  } = props;
  //unload flash message
  useEffect(unload, []);
  return (
    <LayoutProvider 
      data={data}
      session={session}
      request={request}
      response={response}
    >
      <App>{children}</App>
      <NotifyContainer />
    </LayoutProvider>
  );
}