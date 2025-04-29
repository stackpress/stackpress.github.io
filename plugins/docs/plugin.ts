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
    server.get('/docs/tutorial', '@/plugins/docs/views/tutorial/index', -100);
    server.get('/docs/toolkit/setup', '@/plugins/docs/views/toolkit/setup/index', -100);
    [
      'getting-started',
      'deploy/build-project',
      'deploy/deploy-vercel',
      'design/customize-branding',
      'design/template-views',
      'design/theme-project',
      'design/ui-components',
      'develop/configure-project',
      'develop/develop-events',
      'develop/develop-routes',
      'develop/query-database',
      'plugins/create-plugins',
      'plugins/toggle-plugins',
      'references/config-map',
      'references/database-engine',
      'references/emitter',
      'references/exception',
      'references/queue',
      'references/request',
      'references/response',
      'references/route-map',
      'references/router',
      'references/schema-specs',
      'references/server',
      'references/status-map',
      'references/template-engine',
      'toolkit/add-translations',
      'toolkit/customize-terminal',
      'toolkit/setup-api',
      'toolkit/setup-authentication',
      'toolkit/setup-email',
      'toolkit/setup-permissions',
      'transform/customize-admin',
      'transform/form-idea',
      'transform/generate-idea',
      'tutorial/1-ecmascript',
      'tutorial/2-plugin-architecture',
      'tutorial/3-server-routes',
      'tutorial/4-server-props',
      'tutorial/5-view-engine',
      'toolkit/setup/1-project-setup',
      'toolkit/setup/2-client-engine',
      'toolkit/setup/3-database-engine',
      'toolkit/setup/4-context-provider'
    ].map(route => {
      server.get(`/docs/${route}`, `@/plugins/docs/views/${route}`, -100);  
    });
  });
};