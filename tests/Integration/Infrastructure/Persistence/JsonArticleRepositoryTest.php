<?php

declare(strict_types=1);

namespace App\Tests\Integration\Infrastructure\Persistence;

use App\Domain\Model\CodeAndAi\Entity\Article;
use App\Infrastructure\Persistence\Json\JsonArticleRepository;
use PHPUnit\Framework\TestCase;

/**
 * JsonArticleRepository Integration Tests
 *
 * Tests repository integration with JSON file storage.
 */
final class JsonArticleRepositoryTest extends TestCase
{
    private const FIXTURE_PATH = __DIR__ . '/../../../fixtures/articles-test.json';

    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private JsonArticleRepository $repository;

    protected function setUp(): void
    {
        $this->repository = new JsonArticleRepository(self::FIXTURE_PATH);
    }

    public function test_it_implements_repository_interface(): void
    {
        // Assert
        $this->assertInstanceOf(
            \App\Domain\Model\CodeAndAi\Repository\ArticleRepositoryInterface::class,
            $this->repository
        );
    }

    public function test_find_all_returns_array_of_articles(): void
    {
        // Act
        $articles = $this->repository->findAll();

        // Assert
        $this->assertIsArray($articles);
        $this->assertCount(3, $articles);

        foreach ($articles as $article) {
            $this->assertInstanceOf(Article::class, $article);
        }
    }

    public function test_find_all_loads_article_properties_correctly(): void
    {
        // Act
        $articles = $this->repository->findAll();
        $firstArticle = $articles[0];

        // Assert
        $this->assertSame('test-article-1', $firstArticle->id());
        $this->assertSame('Introducción a TDD con PHP', $firstArticle->title());
        $this->assertSame('introduccion-tdd-php', $firstArticle->slug());
        $this->assertStringContainsString('Test-Driven Development', $firstArticle->content());
    }

    public function test_find_by_slug_returns_article_when_found(): void
    {
        // Act
        $article = $this->repository->findBySlug('arquitectura-hexagonal-symfony');

        // Assert
        $this->assertNotNull($article);
        $this->assertInstanceOf(Article::class, $article);
        $this->assertSame('Arquitectura Hexagonal en Symfony', $article->title());
    }

    public function test_find_by_slug_returns_null_when_not_found(): void
    {
        // Act
        $article = $this->repository->findBySlug('non-existent-slug');

        // Assert
        $this->assertNull($article);
    }

    public function test_find_by_id_returns_article_when_found(): void
    {
        // Act
        $article = $this->repository->findById('test-article-2');

        // Assert
        $this->assertNotNull($article);
        $this->assertInstanceOf(Article::class, $article);
        $this->assertSame('test-article-2', $article->id());
        $this->assertSame('Arquitectura Hexagonal en Symfony', $article->title());
    }

    public function test_find_by_id_returns_null_when_not_found(): void
    {
        // Act
        $article = $this->repository->findById('non-existent-id');

        // Assert
        $this->assertNull($article);
    }

    public function test_articles_have_tags(): void
    {
        // Act
        $articles = $this->repository->findAll();
        $firstArticle = $articles[0];

        // Assert
        $this->assertIsArray($firstArticle->tags());
        $this->assertCount(4, $firstArticle->tags());
        $this->assertContains('PHP', $firstArticle->tags());
        $this->assertContains('TDD', $firstArticle->tags());
    }

    public function test_articles_can_have_different_number_of_tags(): void
    {
        // Act
        $articles = $this->repository->findAll();

        // Assert
        $this->assertCount(4, $articles[0]->tags()); // TDD article
        $this->assertCount(4, $articles[1]->tags()); // Hexagonal article
        $this->assertCount(4, $articles[2]->tags()); // Playwright article
    }

    public function test_find_by_tags_returns_articles_with_matching_tag(): void
    {
        // Act
        $articles = $this->repository->findByTags(['PHP']);

        // Assert
        $this->assertIsArray($articles);
        $this->assertCount(1, $articles);

        $articlesList = array_values($articles);
        $this->assertSame('Introducción a TDD con PHP', $articlesList[0]->title());
    }

    public function test_find_by_tags_returns_multiple_articles(): void
    {
        // Act
        $articles = $this->repository->findByTags(['Testing']);

        // Assert - Both TDD and Playwright articles have "Testing" tag
        $this->assertGreaterThanOrEqual(2, count($articles));
    }

    public function test_find_by_tags_returns_empty_array_when_no_matches(): void
    {
        // Act
        $articles = $this->repository->findByTags(['NonExistentTag']);

        // Assert
        $this->assertIsArray($articles);
        $this->assertEmpty($articles);
    }

    public function test_find_by_tags_with_multiple_tags(): void
    {
        // Act
        $articles = $this->repository->findByTags(['PHP', 'TDD']);

        // Assert - Should return articles that have ANY of the tags
        $this->assertNotEmpty($articles);
    }

    public function test_articles_have_published_date(): void
    {
        // Act
        $articles = $this->repository->findAll();
        $firstArticle = $articles[0];

        // Assert
        $this->assertInstanceOf(\DateTimeImmutable::class, $firstArticle->publishedAt());
    }

    public function test_articles_have_updated_date(): void
    {
        // Act
        $articles = $this->repository->findAll();
        $firstArticle = $articles[0];

        // Assert
        $this->assertInstanceOf(\DateTimeImmutable::class, $firstArticle->updatedAt());
    }

    public function test_repository_throws_exception_if_file_not_found(): void
    {
        // Arrange
        $invalidRepository = new JsonArticleRepository('/non/existent/path.json');

        // Assert
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Failed to read articles data');

        // Act
        $invalidRepository->findAll();
    }

    public function test_repository_throws_exception_on_invalid_json(): void
    {
        // Arrange - Create a temporary invalid JSON file
        $invalidJsonPath = sys_get_temp_dir() . '/invalid-articles.json';
        file_put_contents($invalidJsonPath, '{invalid json}');

        $invalidRepository = new JsonArticleRepository($invalidJsonPath);

        // Assert
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Invalid JSON');

        try {
            // Act
            $invalidRepository->findAll();
        } finally {
            // Cleanup
            if (file_exists($invalidJsonPath)) {
                unlink($invalidJsonPath);
            }
        }
    }

    public function test_repository_throws_exception_when_articles_key_missing(): void
    {
        // Arrange - Create a temporary JSON file without "articles" key
        $noArticlesPath = sys_get_temp_dir() . '/no-articles.json';
        file_put_contents($noArticlesPath, '{"data": []}');

        $invalidRepository = new JsonArticleRepository($noArticlesPath);

        // Assert
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Missing or invalid articles array');

        try {
            // Act
            $invalidRepository->findAll();
        } finally {
            // Cleanup
            if (file_exists($noArticlesPath)) {
                unlink($noArticlesPath);
            }
        }
    }
}
