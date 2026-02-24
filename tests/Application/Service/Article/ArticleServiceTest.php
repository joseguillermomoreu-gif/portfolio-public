<?php

declare(strict_types=1);

namespace App\Tests\Application\Service\Article;

use App\Application\Service\Article\ArticleService;
use App\Domain\Article\Article;
use App\Domain\Article\ArticleRepository;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/**
 * @covers \App\Application\Service\Article\ArticleService
 */
final class ArticleServiceTest extends TestCase
{
    /**
     * @var MockObject&ArticleRepository
     *
     * @phpstan-ignore-next-line - Initialized in setUp()
     */
    private ArticleRepository $repositoryMock;

    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private ArticleService $service;

    protected function setUp(): void
    {
        $this->repositoryMock = $this->createMock(ArticleRepository::class);
        $this->service = new ArticleService($this->repositoryMock);
    }

    /**
     * @test
     */
    public function findAllDelegatesToRepository(): void
    {
        $this->repositoryMock
            ->expects($this->once())
            ->method('findAll')
            ->willReturn([]);

        $result = $this->service->findAll();

        static::assertIsArray($result);
    }

    /**
     * @test
     */
    public function findAllReturnsArticleArray(): void
    {
        $article = $this->buildArticleStub();

        $this->repositoryMock
            ->method('findAll')
            ->willReturn([$article]);

        $result = $this->service->findAll();

        static::assertCount(1, $result);
        static::assertSame($article, $result[0]);
    }

    /**
     * @test
     */
    public function findBySlugDelegatesToRepository(): void
    {
        $article = $this->buildArticleStub();

        $this->repositoryMock
            ->expects($this->once())
            ->method('findBySlug')
            ->with('test-slug')
            ->willReturn($article);

        $result = $this->service->findBySlug('test-slug');

        static::assertSame($article, $result);
    }

    private function buildArticleStub(): Article
    {
        return new Article(
            id: 'test-id',
            title: 'Test Article',
            slug: 'test-slug',
            excerpt: 'Excerpt',
            content: 'Content',
            publishedAt: new \DateTimeImmutable('2024-01-01'),
            updatedAt: new \DateTimeImmutable('2024-01-01'),
            tags: []
        );
    }

    /**
     * @test
     */
    public function findBySlugReturnsNullWhenNotFound(): void
    {
        $this->repositoryMock
            ->method('findBySlug')
            ->with('nonexistent')
            ->willReturn(null);

        $result = $this->service->findBySlug('nonexistent');

        static::assertNull($result);
    }
}
