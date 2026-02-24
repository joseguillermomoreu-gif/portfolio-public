<?php

declare(strict_types=1);

namespace App\Application\Service\Article;

use App\Domain\Article\Article;
use App\Domain\Article\ArticleRepository;

final class ArticleService
{
    public function __construct(
        private readonly ArticleRepository $articleRepository
    ) {
    }

    /**
     * @return Article[]
     */
    public function findAll(): array
    {
        return $this->articleRepository->findAll();
    }

    public function findBySlug(string $slug): ?Article
    {
        return $this->articleRepository->findBySlug($slug);
    }
}
