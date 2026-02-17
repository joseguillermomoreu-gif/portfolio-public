<?php

declare(strict_types=1);

namespace App\Tests\Integration\Infrastructure\Persistence;

use App\Domain\Model\CodeAndAi\Entity\Article;
use App\Infrastructure\Persistence\Json\JsonArticleRepository;
use PHPUnit\Framework\TestCase;

/**
 * JsonArticleRepository Integration Tests.
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

    public function testItImplementsRepositoryInterface(): void
    {
        // Assert
        $this->assertInstanceOf(
            \App\Domain\Model\CodeAndAi\Repository\ArticleRepositoryInterface::class,
            $this->repository
        );
    }

    public function testFindAllReturnsArrayOfArticles(): void
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

    public function testFindAllLoadsArticlePropertiesCorrectly(): void
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

    public function testFindBySlugReturnsArticleWhenFound(): void
    {
        // Act
        $article = $this->repository->findBySlug('arquitectura-hexagonal-symfony');

        // Assert
        $this->assertNotNull($article);
        $this->assertInstanceOf(Article::class, $article);
        $this->assertSame('Arquitectura Hexagonal en Symfony', $article->title());
    }

    public function testFindBySlugReturnsNullWhenNotFound(): void
    {
        // Act
        $article = $this->repository->findBySlug('non-existent-slug');

        // Assert
        $this->assertNull($article);
    }

    public function testFindByIdReturnsArticleWhenFound(): void
    {
        // Act
        $article = $this->repository->findById('test-article-2');

        // Assert
        $this->assertNotNull($article);
        $this->assertInstanceOf(Article::class, $article);
        $this->assertSame('test-article-2', $article->id());
        $this->assertSame('Arquitectura Hexagonal en Symfony', $article->title());
    }

    public function testFindByIdReturnsNullWhenNotFound(): void
    {
        // Act
        $article = $this->repository->findById('non-existent-id');

        // Assert
        $this->assertNull($article);
    }

    public function testArticlesHaveTags(): void
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

    public function testArticlesCanHaveDifferentNumberOfTags(): void
    {
        // Act
        $articles = $this->repository->findAll();

        // Assert
        $this->assertCount(4, $articles[0]->tags()); // TDD article
        $this->assertCount(4, $articles[1]->tags()); // Hexagonal article
        $this->assertCount(4, $articles[2]->tags()); // Playwright article
    }

    public function testFindByTagsReturnsArticlesWithMatchingTag(): void
    {
        // Act
        $articles = $this->repository->findByTags(['PHP']);

        // Assert
        $this->assertIsArray($articles);
        $this->assertCount(1, $articles);

        $articlesList = array_values($articles);
        $this->assertSame('Introducción a TDD con PHP', $articlesList[0]->title());
    }

    public function testFindByTagsReturnsMultipleArticles(): void
    {
        // Act
        $articles = $this->repository->findByTags(['Testing']);

        // Assert - Both TDD and Playwright articles have "Testing" tag
        $this->assertGreaterThanOrEqual(2, count($articles));
    }

    public function testFindByTagsReturnsEmptyArrayWhenNoMatches(): void
    {
        // Act
        $articles = $this->repository->findByTags(['NonExistentTag']);

        // Assert
        $this->assertIsArray($articles);
        $this->assertEmpty($articles);
    }

    public function testFindByTagsWithMultipleTags(): void
    {
        // Act
        $articles = $this->repository->findByTags(['PHP', 'TDD']);

        // Assert - Should return articles that have ANY of the tags
        $this->assertNotEmpty($articles);
    }

    public function testArticlesHavePublishedDate(): void
    {
        // Act
        $articles = $this->repository->findAll();
        $firstArticle = $articles[0];

        // Assert
        $this->assertInstanceOf(\DateTimeImmutable::class, $firstArticle->publishedAt());
    }

    public function testArticlesHaveUpdatedDate(): void
    {
        // Act
        $articles = $this->repository->findAll();
        $firstArticle = $articles[0];

        // Assert
        $this->assertInstanceOf(\DateTimeImmutable::class, $firstArticle->updatedAt());
    }

    public function testRepositoryThrowsExceptionIfFileNotFound(): void
    {
        // Arrange
        $invalidRepository = new JsonArticleRepository('/non/existent/path.json');

        // Assert
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Failed to read articles data');

        // Act
        $invalidRepository->findAll();
    }

    public function testRepositoryThrowsExceptionOnInvalidJson(): void
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

    public function testRepositoryThrowsExceptionWhenArticlesKeyMissing(): void
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
