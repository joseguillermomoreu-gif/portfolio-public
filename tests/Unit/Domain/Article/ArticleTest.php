<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\Article;

use App\Domain\Article\Article;
use PHPUnit\Framework\TestCase;

/**
 * Article Entity Unit Tests.
 *
 * Tests domain entity Article for Code & AI blog context.
 */
final class ArticleTest extends TestCase
{
    public function testItCanBeCreatedWithAllProperties(): void
    {
        // Arrange
        $id = '1';
        $title = 'Mi primer artículo';
        $slug = 'mi-primer-articulo';
        $excerpt = 'Un breve resumen del artículo';
        $content = 'Contenido completo del artículo';
        $publishedAt = new \DateTimeImmutable('2024-01-01 10:00:00');
        $updatedAt = new \DateTimeImmutable('2024-01-02 15:30:00');
        $tags = ['PHP', 'Symfony', 'TDD'];

        // Act
        $article = new Article(
            $id,
            $title,
            $slug,
            $excerpt,
            $content,
            $publishedAt,
            $updatedAt,
            $tags
        );

        // Assert
        $this->assertInstanceOf(Article::class, $article);
    }

    public function testAllPropertiesAreAccessibleViaGetters(): void
    {
        // Arrange
        $id = '123';
        $title = 'Test Article';
        $slug = 'test-article';
        $excerpt = 'Test excerpt';
        $content = 'Test content here';
        $publishedAt = new \DateTimeImmutable('2024-01-01');
        $updatedAt = new \DateTimeImmutable('2024-01-02');
        $tags = ['PHP', 'Testing'];

        // Act
        $article = new Article(
            $id,
            $title,
            $slug,
            $excerpt,
            $content,
            $publishedAt,
            $updatedAt,
            $tags
        );

        // Assert
        $this->assertSame($id, $article->id());
        $this->assertSame($title, $article->title());
        $this->assertSame($slug, $article->slug());
        $this->assertSame($excerpt, $article->excerpt());
        $this->assertSame($content, $article->content());
        $this->assertSame($publishedAt, $article->publishedAt());
        $this->assertSame($updatedAt, $article->updatedAt());
        $this->assertSame($tags, $article->tags());
    }

    public function testItCanHaveMultipleTags(): void
    {
        // Arrange
        $tags = ['PHP', 'Symfony', 'TDD', 'Architecture', 'DDD'];

        // Act
        $article = new Article(
            '1',
            'Article',
            'article',
            'Excerpt',
            'Content',
            new \DateTimeImmutable(),
            new \DateTimeImmutable(),
            $tags
        );

        // Assert
        $this->assertCount(5, $article->tags());
        $this->assertSame($tags, $article->tags());
    }

    public function testItCanHaveNoTags(): void
    {
        // Arrange
        $tags = [];

        // Act
        $article = new Article(
            '1',
            'Article',
            'article',
            'Excerpt',
            'Content',
            new \DateTimeImmutable(),
            new \DateTimeImmutable(),
            $tags
        );

        // Assert
        $this->assertCount(0, $article->tags());
        $this->assertIsArray($article->tags());
    }

    public function testContentCanBeMultiline(): void
    {
        // Arrange
        $content = "First paragraph.\n\nSecond paragraph with more text.\n\nThird paragraph.";

        // Act
        $article = new Article(
            '1',
            'Article',
            'article',
            'Excerpt',
            $content,
            new \DateTimeImmutable(),
            new \DateTimeImmutable(),
            []
        );

        // Assert
        $this->assertStringContainsString("\n\n", $article->content());
        $this->assertSame($content, $article->content());
    }

    public function testPropertiesAreReadonly(): void
    {
        // Arrange & Act
        $article = new Article(
            '1',
            'Article',
            'article',
            'Excerpt',
            'Content',
            new \DateTimeImmutable(),
            new \DateTimeImmutable(),
            []
        );

        // Assert - verify properties are readonly
        $reflection = new \ReflectionClass($article);
        $properties = $reflection->getProperties();

        foreach ($properties as $property) {
            $this->assertTrue(
                $property->isReadOnly(),
                "Property {$property->getName()} should be readonly"
            );
        }
    }

    public function testFromArrayCreatesArticleFromData(): void
    {
        // Arrange
        $data = [
            'id' => '42',
            'title' => 'Article from Array',
            'slug' => 'article-from-array',
            'excerpt' => 'Test excerpt from array',
            'content' => 'Full content from array',
            'published_at' => '2024-01-15T10:30:00+00:00',
            'updated_at' => '2024-01-16T12:45:00+00:00',
            'tags' => ['PHP', 'Symfony'],
        ];

        // Act
        $article = Article::fromArray($data);

        // Assert
        $this->assertSame('42', $article->id());
        $this->assertSame('Article from Array', $article->title());
        $this->assertSame('article-from-array', $article->slug());
        $this->assertSame('Test excerpt from array', $article->excerpt());
        $this->assertSame('Full content from array', $article->content());
        $this->assertEquals(new \DateTimeImmutable('2024-01-15T10:30:00+00:00'), $article->publishedAt());
        $this->assertEquals(new \DateTimeImmutable('2024-01-16T12:45:00+00:00'), $article->updatedAt());
        $this->assertSame(['PHP', 'Symfony'], $article->tags());
    }

    public function testToArrayReturnsArticleAsArray(): void
    {
        // Arrange
        $publishedAt = new \DateTimeImmutable('2024-01-15T10:30:00+00:00');
        $updatedAt = new \DateTimeImmutable('2024-01-16T12:45:00+00:00');

        $article = new Article(
            '99',
            'Array Article',
            'array-article',
            'Array excerpt',
            'Array content',
            $publishedAt,
            $updatedAt,
            ['PHP', 'Testing']
        );

        // Act
        $array = $article->toArray();

        // Assert
        $this->assertIsArray($array);
        $this->assertArrayHasKey('id', $array);
        $this->assertArrayHasKey('title', $array);
        $this->assertArrayHasKey('slug', $array);
        $this->assertArrayHasKey('excerpt', $array);
        $this->assertArrayHasKey('content', $array);
        $this->assertArrayHasKey('published_at', $array);
        $this->assertArrayHasKey('updated_at', $array);
        $this->assertArrayHasKey('tags', $array);

        $this->assertSame('99', $array['id']);
        $this->assertSame('Array Article', $array['title']);
        $this->assertSame('array-article', $array['slug']);
        $this->assertSame('Array excerpt', $array['excerpt']);
        $this->assertSame('Array content', $array['content']);
        $this->assertSame($publishedAt->format('c'), $array['published_at']);
        $this->assertSame($updatedAt->format('c'), $array['updated_at']);
        $this->assertSame(['PHP', 'Testing'], $array['tags']);
    }

    public function testPublishedAtIsImmutable(): void
    {
        // Arrange
        $originalDate = new \DateTimeImmutable('2024-01-01');

        $article = new Article(
            '1',
            'Article',
            'article',
            'Excerpt',
            'Content',
            $originalDate,
            new \DateTimeImmutable(),
            []
        );

        // Act - try to modify the returned date
        $retrievedDate = $article->publishedAt();
        $modifiedDate = $retrievedDate->modify('+1 day');

        // Assert - original should remain unchanged
        $this->assertSame($originalDate, $article->publishedAt());
        $this->assertNotSame($modifiedDate, $article->publishedAt());
    }

    public function testUpdatedAtIsImmutable(): void
    {
        // Arrange
        $originalDate = new \DateTimeImmutable('2024-01-02');

        $article = new Article(
            '1',
            'Article',
            'article',
            'Excerpt',
            'Content',
            new \DateTimeImmutable(),
            $originalDate,
            []
        );

        // Act - try to modify the returned date
        $retrievedDate = $article->updatedAt();
        $modifiedDate = $retrievedDate->modify('+1 day');

        // Assert - original should remain unchanged
        $this->assertSame($originalDate, $article->updatedAt());
        $this->assertNotSame($modifiedDate, $article->updatedAt());
    }

    public function testSlugFollowsUrlFriendlyFormat(): void
    {
        // Arrange & Act
        $article = new Article(
            '1',
            'My Article Title',
            'my-article-title',
            'Excerpt',
            'Content',
            new \DateTimeImmutable(),
            new \DateTimeImmutable(),
            []
        );

        // Assert - slug should be lowercase with hyphens
        $slug = $article->slug();
        $this->assertSame('my-article-title', $slug);
        $this->assertMatchesRegularExpression('/^[a-z0-9\-]+$/', $slug);
    }

    public function testFromArrayThrowsInvalidArgumentExceptionForInvalidPublishedAt(): void
    {
        // Arrange
        $data = [
            'id' => '1',
            'title' => 'Test',
            'slug' => 'test',
            'excerpt' => 'Excerpt',
            'content' => 'Content',
            'published_at' => 'not-a-valid-date',
            'updated_at' => '2024-01-01T00:00:00+00:00',
            'tags' => [],
        ];

        // Assert & Act
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/published_at/');
        Article::fromArray($data);
    }

    public function testFromArrayThrowsInvalidArgumentExceptionForInvalidUpdatedAt(): void
    {
        // Arrange
        $data = [
            'id' => '1',
            'title' => 'Test',
            'slug' => 'test',
            'excerpt' => 'Excerpt',
            'content' => 'Content',
            'published_at' => '2024-01-01T00:00:00+00:00',
            'updated_at' => 'not-a-valid-date',
            'tags' => [],
        ];

        // Assert & Act
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/updated_at/');
        Article::fromArray($data);
    }
}
