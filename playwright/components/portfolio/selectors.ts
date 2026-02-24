// ── Page structure ─────────────────────────────────────────────
export const route = '/portfolio';
export const portfolioHeader = '[data-testid="portfolio-header"]';
export const heading = '[data-testid="portfolio-header"] h1';

// ── Keywords grid ──────────────────────────────────────────────
export const keywordsSection = '[data-testid="keywords-section"]';
export const keywordCategories = '.keyword-category';
export const keywordItems = '.keyword-item';

// ── Modal ──────────────────────────────────────────────────────
export const modalOverlay    = '#modal-overlay';
export const activeModalClose = '.modal:not(.hidden) .modal-close';
export const modalTitle   = '.modal-title';
export const modalBody    = '.modal-body';

// ── Category label & icon helpers ──────────────────────────────
export const categoryLabel     = '.category-label';
export const modalIconBrand    = '.modal-icon--brand';
export const modalIconMonogram = '.modal-icon--monogram';

// ── Dynamic helpers ────────────────────────────────────────────
export const categoryByName = (name: string): string => `[data-category="${name}"]`;
export const modalById      = (id: string): string  => `#modal-${id}`;
export const keywordById    = (id: string): string  => `[data-keyword-id="${id}"]`;
