<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Json;

use App\Domain\Article\Article;
use App\Domain\Article\ArticleRepository;

final class JsonArticleRepository implements ArticleRepository
{
    /** @var Article[]|null */
    private ?array $cache = null;

    public function __construct(
        private readonly string $dataPath = __DIR__ . '/../../../../data/articles.json'
    ) {
    }

    /**
     * @return array<Article>
     */
    public function findAll(): array
    {
        if (null !== $this->cache) {
            return $this->cache;
        }

        $content = @file_get_contents($this->dataPath);

        if (false === $content) {
            throw new \RuntimeException("Failed to read articles data from {$this->dataPath}");
        }

        $data = json_decode($content, true);

        if (!is_array($data)) {
            throw new \RuntimeException('Invalid JSON format in articles data');
        }

        if (!isset($data['articles']) || !is_array($data['articles'])) {
            throw new \RuntimeException('Missing or invalid articles array in data');
        }

        $this->cache = array_map(
            fn (array $articleData) => Article::fromArray($articleData),
            $data['articles']
        );

        return $this->cache;
    }

    public function findBySlug(string $slug): ?Article
    {
        $articles = $this->findAll();

        foreach ($articles as $article) {
            if ($article->slug() === $slug) {
                return $article;
            }
        }

        return null;
    }

    public function findById(string $id): ?Article
    {
        $articles = $this->findAll();

        foreach ($articles as $article) {
            if ($article->id() === $id) {
                return $article;
            }
        }

        return null;
    }

    /**
     * @param array<int, string> $tags
     *
     * @return array<int, Article>
     */
    public function findByTags(array $tags): array
    {
        $articles = $this->findAll();

        return array_filter($articles, function (Article $article) use ($tags) {
            $articleTags = $article->tags();

            return !empty(array_intersect($tags, $articleTags));
        });
    }
}
