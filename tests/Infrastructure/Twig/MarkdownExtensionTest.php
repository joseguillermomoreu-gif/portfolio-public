<?php

declare(strict_types=1);

namespace App\Tests\Infrastructure\Twig;

use App\Infrastructure\Twig\MarkdownExtension;
use PHPUnit\Framework\TestCase;

/**
 * MarkdownExtension Tests.
 *
 * Verifies Markdown parsing and code block rendering.
 */
final class MarkdownExtensionTest extends TestCase
{
    private MarkdownExtension $extension; // @phpstan-ignore-line

    protected function setUp(): void
    {
        $this->extension = new MarkdownExtension();
    }

    public function testRegistersMarkdownFilter(): void
    {
        $filters = $this->extension->getFilters();

        $this->assertCount(1, $filters);
        $this->assertSame('markdown', $filters[0]->getName());
    }

    public function testParsesBasicMarkdown(): void
    {
        $result = $this->extension->parseMarkdown('**bold**');

        $this->assertStringContainsString('<strong>bold</strong>', $result);
    }

    /**
     * @dataProvider fencedCodeBlockLanguageProvider
     */
    public function testFencedCodeBlockWithLanguageHasLanguageClass(string $language): void
    {
        $markdown = "```{$language}\necho 'hello';\n```";

        $result = $this->extension->parseMarkdown($markdown);

        $this->assertStringContainsString('class="language-' . $language . '"', $result);
        $this->assertStringContainsString('<pre>', $result);
        $this->assertStringContainsString('<code', $result);
    }

    /**
     * @return array<string, array{string}>
     */
    public static function fencedCodeBlockLanguageProvider(): array
    {
        return [
            'php' => ['php'],
            'bash' => ['bash'],
            'javascript' => ['javascript'],
            'typescript' => ['typescript'],
            'json' => ['json'],
        ];
    }

    public function testFencedCodeBlockWithoutLanguageHasNoLanguageClass(): void
    {
        $markdown = "```\nsome code\n```";

        $result = $this->extension->parseMarkdown($markdown);

        $this->assertStringContainsString('<pre>', $result);
        $this->assertStringContainsString('<code>', $result);
        $this->assertStringNotContainsString('class="language-', $result);
    }

    public function testInlineCodeDoesNotGetLanguageClass(): void
    {
        $result = $this->extension->parseMarkdown('Use `$variable` here');

        $this->assertStringContainsString('<code>', $result);
        $this->assertStringNotContainsString('class="language-', $result);
        $this->assertStringNotContainsString('<pre>', $result);
    }

    public function testCodeContentIsPreserved(): void
    {
        $markdown = "```php\n\$name = 'test';\n```";

        $result = $this->extension->parseMarkdown($markdown);

        $this->assertStringContainsString('$name', $result);
    }
}
