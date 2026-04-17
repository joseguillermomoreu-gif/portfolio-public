import { test } from '@playwright/test';
import * as seo from '@components/seo';

// ─── robots.txt ───────────────────────────────────────────────────────────────

test('SEO: robots.txt responde 200 con User-agent y Allow', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario accede a robots.txt', async () => {
    await seo.robotsTxtReturns200(page);
  });

  await test.step('Then: contiene User-agent y Allow: /', async () => {
    await seo.robotsTxtAllowsAll(page);
  });

  await test.step('And: referencia el sitemap', async () => {
    await seo.robotsTxtContainsSitemap(page);
  });
});

// ─── sitemap.xml ──────────────────────────────────────────────────────────────

test('SEO: sitemap.xml responde 200 y tiene estructura XML válida', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario accede a sitemap.xml', async () => {
    await seo.sitemapReturns200(page);
  });

  await test.step('Then: tiene estructura XML válida (urlset, loc, changefreq, priority)', async () => {
    await seo.sitemapHasValidXmlStructure(page);
  });
});

test('SEO: sitemap.xml contiene todas las URLs principales', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario accede a sitemap.xml', async () => {
    await seo.sitemapReturns200(page);
  });

  await test.step('Then: contiene todas las URLs de secciones principales', async () => {
    await seo.sitemapContainsMainUrls(page);
  });
});

test('SEO: sitemap.xml contiene todos los artículos de Code & AI con lastmod', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario accede a sitemap.xml', async () => {
    await seo.sitemapReturns200(page);
  });

  await test.step('Then: contiene los 12 slugs de artículos', async () => {
    await seo.sitemapContainsArticleUrls(page);
  });

  await test.step('And: el número total de artículos es exactamente 12', async () => {
    await seo.sitemapArticleCountIsCorrect(page);
  });

  await test.step('And: los artículos tienen lastmod con formato YYYY-MM-DD', async () => {
    await seo.sitemapArticlesHaveLastmod(page);
  });
});

// ─── llms.txt ─────────────────────────────────────────────────────────────────

test('SEO: llms.txt responde 200 con información del autor', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario accede a llms.txt', async () => {
    await seo.llmsTxtReturns200(page);
  });

  await test.step('Then: contiene nombre y URL del autor', async () => {
    await seo.llmsTxtContainsAuthorInfo(page);
  });
});

// ─── Meta descriptions por página ─────────────────────────────────────────────

test('SEO: todas las páginas tienen meta description propia', { tag: ['@test', '@seo'] }, async ({ page }) => {
  // /tlotp excluido: en producción redirige al estático TLOTP (302 → /tlotp/index.html)
  // que no tiene meta tags de Symfony. El SEO aplica solo al fallback Twig.
  const pages = ['/', '/cv', '/portfolio', '/code-ai', '/proyectos', '/ppia', '/contacto'];

  for (const url of pages) {
    await test.step(`Then: ${url} tiene meta description`, async () => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await seo.pageHasMetaDescription(page);
    });
  }
});

// ─── Schema.org / JSON-LD ─────────────────────────────────────────────────────

test('SEO: home tiene Schema.org de tipo Person', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario navega a home', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  await test.step('Then: tiene JSON-LD de tipo Person', async () => {
    await seo.schemaOrgTypeIs(page, 'Person');
  });
});

test('SEO: CV tiene Schema.org de tipo ProfilePage', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario navega a /cv', async () => {
    await page.goto('/cv', { waitUntil: 'domcontentloaded' });
  });

  await test.step('Then: tiene JSON-LD de tipo ProfilePage', async () => {
    await seo.schemaOrgTypeIs(page, 'ProfilePage');
  });
});

test('SEO: Code & AI listado tiene Schema.org de tipo Blog', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario navega a /code-ai', async () => {
    await page.goto('/code-ai', { waitUntil: 'domcontentloaded' });
  });

  await test.step('Then: tiene JSON-LD de tipo Blog', async () => {
    await seo.schemaOrgTypeIs(page, 'Blog');
  });
});

test('SEO: artículo de Code & AI tiene Schema.org de tipo Article', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario navega a un artículo', async () => {
    await page.goto('/code-ai/como-construi-este-portfolio', { waitUntil: 'domcontentloaded' });
  });

  await test.step('Then: tiene JSON-LD de tipo Article', async () => {
    await seo.schemaOrgTypeIs(page, 'Article');
  });
});

test('SEO: Proyectos tiene Schema.org de tipo CollectionPage', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario navega a /proyectos', async () => {
    await page.goto('/proyectos', { waitUntil: 'domcontentloaded' });
  });

  await test.step('Then: tiene JSON-LD de tipo CollectionPage', async () => {
    await seo.schemaOrgTypeIs(page, 'CollectionPage');
  });
});

test('SEO: PPiA tiene Schema.org de tipo SoftwareApplication', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario navega a /ppia', async () => {
    await page.goto('/ppia', { waitUntil: 'domcontentloaded' });
  });

  await test.step('Then: tiene JSON-LD de tipo SoftwareApplication', async () => {
    await seo.schemaOrgTypeIs(page, 'SoftwareApplication');
  });
});

// Test de JSON-LD para /tlotp eliminado: en producción el controller redirige (302)
// al estático de TLOTP cuando existe /public/tlotp/index.html. El schema.org solo
// aplica al fallback Twig (cuando TLOTP no está desplegado).

test('SEO: Contacto tiene Schema.org de tipo ContactPage', { tag: ['@test', '@seo'] }, async ({ page }) => {
  await test.step('When: el usuario navega a /contacto', async () => {
    await page.goto('/contacto', { waitUntil: 'domcontentloaded' });
  });

  await test.step('Then: tiene JSON-LD de tipo ContactPage', async () => {
    await seo.schemaOrgTypeIs(page, 'ContactPage');
  });
});
