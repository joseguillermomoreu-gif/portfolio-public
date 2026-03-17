import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function robotsTxtReturns200(page: Page): Promise<void> {
  const response = await page.goto('/robots.txt', { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);
}

export async function robotsTxtContainsSitemap(page: Page): Promise<void> {
  const content = await page.content();
  expect(content).toContain('sitemap.xml');
}

export async function robotsTxtAllowsAll(page: Page): Promise<void> {
  const content = await page.content();
  expect(content).toContain('User-agent: *');
  expect(content).toContain('Allow: /');
}

export async function sitemapReturns200(page: Page): Promise<void> {
  const response = await page.goto('/sitemap.xml', { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);
}

export async function sitemapContainsMainUrls(page: Page): Promise<void> {
  const content = await page.content();
  expect(content).toContain('https://josemoreupeso.es/');
  expect(content).toContain('https://josemoreupeso.es/cv');
  expect(content).toContain('https://josemoreupeso.es/portfolio');
  expect(content).toContain('https://josemoreupeso.es/code-ai');
  expect(content).toContain('https://josemoreupeso.es/proyectos');
  expect(content).toContain('https://josemoreupeso.es/ppia');
  expect(content).toContain('https://josemoreupeso.es/contacto');
}

const ARTICLE_SLUGS = [
  'remote-control-terracita-al-sol',
  'experimento-372-gamificacion',
  'matando-moscas-canonazos',
  'sin-duda-mi-prompt-maestro-tlotp',
  'como-construi-este-portfolio',
  'cicd-github-actions-portfolio',
  'ppia-migracion-python',
  'el-vibe-coding-llego',
  'automatizando-e2e-con-ia',
  'tlotp-sdd-ia-san-patricio',
];

export async function sitemapContainsArticleUrls(page: Page): Promise<void> {
  const content = await page.content();
  for (const slug of ARTICLE_SLUGS) {
    expect(content, `Slug "${slug}" no encontrado en el sitemap`).toContain(`/code-ai/${slug}`);
  }
}

export async function sitemapArticleCountIsCorrect(page: Page): Promise<void> {
  const content = await page.content();
  const uniqueSlugs = new Set(
    [...content.matchAll(/\/code-ai\/([a-z0-9-]+)</g)].map(m => m[1])
  );
  expect(
    uniqueSlugs.size,
    `Se esperaban ${ARTICLE_SLUGS.length} artículos únicos pero hay ${uniqueSlugs.size}`
  ).toBe(ARTICLE_SLUGS.length);
}

export async function sitemapHasValidXmlStructure(page: Page): Promise<void> {
  const content = await page.content();
  expect(content).toContain('<urlset');
  expect(content).toContain('sitemaps.org/schemas/sitemap');
  expect(content).toContain('<loc>');
  expect(content).toContain('<changefreq>');
  expect(content).toContain('<priority>');
}

export async function sitemapArticlesHaveLastmod(page: Page): Promise<void> {
  const content = await page.content();
  // Verifica que haya al menos un <lastmod> con formato YYYY-MM-DD
  expect(content).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
}

export async function llmsTxtReturns200(page: Page): Promise<void> {
  const response = await page.goto('/llms.txt', { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);
}

export async function llmsTxtContainsAuthorInfo(page: Page): Promise<void> {
  const response = await page.request.get('/llms.txt');
  const text = await response.text();
  expect(text).toContain('José Moreu Peso');
  expect(text).toContain('josemoreupeso.es');
}

export async function pageHasMetaDescription(page: Page): Promise<void> {
  await expect(page.locator(selectors.metaDescription)).toHaveAttribute('content', /^.{51,}$/s);
}

export async function pageHasSchemaOrg(page: Page): Promise<void> {
  const script = page.locator(selectors.schemaOrgScript);
  await expect(script).toBeAttached();
  const json = await script.evaluate((el: HTMLElement) => el.textContent ?? '');
  const parsed = JSON.parse(json);
  expect(parsed['@context']).toBe('https://schema.org');
  expect(parsed['@type']).toBeTruthy();
}

export async function schemaOrgTypeIs(page: Page, expectedType: string): Promise<void> {
  const json = await page.locator(selectors.schemaOrgScript).evaluate((el: HTMLElement) => el.textContent ?? '');
  const parsed = JSON.parse(json);
  expect(parsed['@type']).toBe(expectedType);
}
