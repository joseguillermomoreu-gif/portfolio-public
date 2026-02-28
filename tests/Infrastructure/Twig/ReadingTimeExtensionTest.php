<?php

declare(strict_types=1);

namespace App\Tests\Infrastructure\Twig;

use App\Infrastructure\Twig\ReadingTimeExtension;
use PHPUnit\Framework\TestCase;

/**
 * Reading Time Extension Unit Tests.
 *
 * Tests the |reading_time Twig filter calculation.
 */
final class ReadingTimeExtensionTest extends TestCase
{
    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private ReadingTimeExtension $extension;

    protected function setUp(): void
    {
        $this->extension = new ReadingTimeExtension();
    }

    public function testItRegistersReadingTimeFilter(): void
    {
        // Act
        $filters = $this->extension->getFilters();

        // Assert
        $this->assertCount(1, $filters);
        $this->assertSame('reading_time', $filters[0]->getName());
    }

    public function testItReturnsOneMinuteForShortContent(): void
    {
        // Arrange
        $content = 'Hello world';

        // Act
        $result = $this->extension->calculateReadingTime($content);

        // Assert
        $this->assertSame(1, $result);
    }

    public function testItReturnsOneMinuteForEmptyContent(): void
    {
        // Arrange
        $content = '';

        // Act
        $result = $this->extension->calculateReadingTime($content);

        // Assert
        $this->assertSame(1, $result);
    }

    public function testItCalculatesCorrectMinutesForLongContent(): void
    {
        // Arrange: 600 words = 3 minutes at 200 WPM
        $content = implode(' ', array_fill(0, 600, 'word'));

        // Act
        $result = $this->extension->calculateReadingTime($content);

        // Assert
        $this->assertSame(3, $result);
    }

    public function testItRoundsToNearestMinute(): void
    {
        // Arrange: 500 words = 2.5 minutes, rounds to 3
        $content = implode(' ', array_fill(0, 500, 'word'));

        // Act
        $result = $this->extension->calculateReadingTime($content);

        // Assert
        $this->assertSame(3, $result);
    }

    public function testItStripsHtmlTagsBeforeCounting(): void
    {
        // Arrange: HTML tags should not count as words
        $content = '<p>Hello</p> <strong>world</strong> <a href="#">link</a>';

        // Act
        $result = $this->extension->calculateReadingTime($content);

        // Assert
        $this->assertSame(1, $result);
    }

    public function testItHandlesMarkdownContent(): void
    {
        // Arrange: 400 words with Markdown formatting = 2 minutes
        $words = array_fill(0, 400, 'word');
        $content = "# Title\n\n" . implode(' ', $words) . "\n\n## Subtitle\n\n**bold text**";

        // Act
        $result = $this->extension->calculateReadingTime($content);

        // Assert
        $this->assertSame(2, $result);
    }

    public function testItReturnsInteger(): void
    {
        // Arrange
        $content = implode(' ', array_fill(0, 200, 'word'));

        // Act
        $result = $this->extension->calculateReadingTime($content);

        // Assert
        $this->assertIsInt($result);
    }
}
