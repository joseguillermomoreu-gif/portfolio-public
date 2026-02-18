<?php

declare(strict_types=1);

namespace App\Domain\Article;

interface ArticleRepository
{
    /**
     * @return Article[]
     */
    public function findAll(): array;

    public function findBySlug(string $slug): ?Article;

    public function findById(string $id): ?Article;

    /**
     * @param string[] $tags
     *
     * @return Article[]
     */
    public function findByTags(array $tags): array;
}
