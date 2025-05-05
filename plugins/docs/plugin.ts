//stackpress
import type { Server, Response } from 'stackpress/server';
//view
import type { ViewConfig, BrandConfig, LanguageConfig } from 'stackpress';

export function setServerProps(server: Server, res: Response) {
  //get the view, brand and auth config
  const view = server.config.path<ViewConfig>('view', {});
  const brand = server.config.path<BrandConfig>('brand', {});
  const language = server.config.path<LanguageConfig>('language', {
    key: 'locale',
    locale: 'en_US',
    languages: {}
  });
  //set data for template layer
  res.data.set('view', { 
    base: view.base || '/',
    props: view.props || {}
  });
  res.data.set('brand', { 
    name: brand.name || 'Stackpress',
    logo: brand.logo || '/logo.png',
    icon: brand.icon || '/icon.png',
    favicon: brand.favicon || '/favicon.ico',
  });
  res.data.set('language', { 
    key: language.key || 'locale',
    locale: language.locale || 'en_US',
    languages: language.languages || {}
  });
}

export default function plugin(server: Server) {
  //on route, add docs routes
  server.on('route', _ => {
    server.get('/docs', (_req, res, ctx) => setServerProps(ctx, res));
    server.get('/docs/**', (_req, res, ctx) => setServerProps(ctx, res));
    server.get('/docs', '@/plugins/docs/views/index', -100);
    server.get('/docs/introduction', '@/plugins/docs/views/index', -100);
    //index routes
    [
      'tutorial',
      'toolkit/setup',
      'references/client-api',
      'references/router-class',
    ].map(route => {
      server.get(`/docs/${route}`, `@/plugins/docs/views/${route}/index`, -100);  
    });
    //other routes
    [
      'getting-started',
      'deploy/build-project',
      'deploy/deploy-vercel',
      'design/customize-branding',
      'design/template-views',
      'design/theme-project',
      'design/ui-components',
      'develop/configure-project',
      'develop/customize-bootstrap',
      'develop/develop-events',
      'develop/develop-routes',
      'plugins/create-plugins',
      'plugins/toggle-plugins',
      'references/client-api/actions',
      'references/client-api/config/column',
      'references/client-api/config/fieldset',
      'references/client-api/config/model',
      'references/configuration',
      'references/emitter-class',
      'references/exception-class',
      'references/query-builder',
      'references/query-builder/alter-builder',
      'references/query-builder/create-builder',
      'references/query-builder/delete-builder',
      'references/query-builder/insert-builder',
      'references/query-builder/select-builder',
      'references/query-builder/update-builder',
      'references/react-api',
      'references/request-class',
      'references/response-class',
      'references/router-class/action',
      'references/router-class/entry',
      'references/router-class/import',
      'references/router-class/view',
      'references/schema-specifications',
      'references/server-class',
      'references/view-engine',
      'references/data/callable-map',
      'references/data/callable-nest',
      'references/data/callable-session',
      'toolkit/add-translations',
      'toolkit/customize-terminal',
      'toolkit/setup-api',
      'toolkit/setup-authentication',
      'toolkit/setup-email',
      'toolkit/setup-permissions',
      'toolkit/setup/1-project-setup',
      'toolkit/setup/2-client-engine',
      'toolkit/setup/3-database-engine',
      'toolkit/setup/4-context-provider',
      'transform/form-idea',
      'transform/generate-idea',
      'tutorial/1-ecmascript',
      'tutorial/2-plugin-architecture',
      'tutorial/3-server-routes',
      'tutorial/4-server-props',
      'tutorial/5-view-engine'
    ].map(route => {
      server.get(`/docs/${route}`, `@/plugins/docs/views/${route}`, -100);  
    });
  });
};