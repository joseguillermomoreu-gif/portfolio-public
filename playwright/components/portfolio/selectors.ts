// ── Page structure ─────────────────────────────────────────────
export const portfolioPage = '.portfolio-page';
export const portfolioHeader = '[data-testid="portfolio-header"]';
export const heading = '[data-testid="portfolio-header"] h1';
export const subtitle = '.portfolio-subtitle';

// ── Keywords grid ──────────────────────────────────────────────
export const keywordsSection = '[data-testid="keywords-section"]';
export const keywordCategories = '.keyword-category';
export const keywordItems = '.keyword-item';

// ── Category blocks ────────────────────────────────────────────
export const categoryArquitectura = '[data-category="arquitectura"]';
export const categoryTesting      = '[data-category="testing"]';
export const categoryBackend      = '[data-category="backend"]';
export const categoryTooling      = '[data-category="tooling"]';

// ── Modal ──────────────────────────────────────────────────────
export const modalOverlay = '#modal-overlay';
export const modalClose   = '.modal-close';
export const modalCard    = '.modal-card';
export const modalTitle   = '.modal-title';
export const modalBody    = '.modal-body';

// ── Dynamic helpers ────────────────────────────────────────────
export const modalById   = (id: string): string => `#modal-${id}`;
export const keywordById = (id: string): string => `[data-keyword-id="${id}"]`;
