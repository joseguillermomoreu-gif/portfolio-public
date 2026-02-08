<?php

declare(strict_types=1);

namespace App\Infrastructure\Twig;

use Parsedown;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Markdown Extension for Twig
 *
 * Provides |markdown filter to parse Markdown content using Parsedown.
 *
 * Usage in Twig:
 *   {{ content|markdown }}
 *
 * Security: Runs in safe mode to prevent XSS attacks.
 */
final class MarkdownExtension extends AbstractExtension
{
    private readonly Parsedown $parsedown;

    public function __construct()
    {
        $this->parsedown = new Parsedown();
        $this->parsedown->setSafeMode(true); // XSS protection
    }

    public function getFilters(): array
    {
        return [
            new TwigFilter('markdown', [$this, 'parseMarkdown'], ['is_safe' => ['html']]),
        ];
    }

    public function parseMarkdown(string $content): string
    {
        return $this->parsedown->text($content);
    }
}
