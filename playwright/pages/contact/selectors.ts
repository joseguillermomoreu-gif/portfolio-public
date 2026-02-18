export const ContactSelectors = {
  heading: 'h1',
  emailLink: '.contact-card a[href^="mailto:"], .contact-item a[href^="mailto:"]',
  githubLink: 'a[href*="github.com"]',
  linkedinLink: 'a[href*="linkedin.com"]',
  instagramLink: 'a[href*="instagram.com"]',
  contactCard: '.contact-card',
  contactPage: '.contact-page',
  contactHeader: '.contact-header',
  socialSection: '.social-section',
} as const;
