<?php

declare(strict_types=1);

namespace App\Infrastructure\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Reading Time Extension for Twig.
 *
 * Provides |reading_time filter to calculate estimated reading time
 * from content text based on 200 words per minute average.
 *
 * Usage in Twig:
 *   {{ article.content|reading_time }} min
 *
 * Returns the estimated minutes as integer (minimum 1).
 */
final class ReadingTimeExtension extends AbstractExtension
{
    private const WORDS_PER_MINUTE = 200;

    public function getFilters(): array
    {
        return [
            new TwigFilter('reading_time', [$this, 'calculateReadingTime']),
        ];
    }

    public function calculateReadingTime(string $content): int
    {
        $plainText = strip_tags($content);
        $wordCount = str_word_count($plainText);

        return max(1, (int) round($wordCount / self::WORDS_PER_MINUTE));
    }
}
